import { NextResponse } from "next/server";
import { courses } from "@/data/courses";
import fs from "fs";
import path from "path";

// SHEET_URL 환경 변수 확인 (기존 .env, .env.local, public/.env 등 탐색)
function getSheetUrl(): string | undefined {
  if (process.env.SHEET_URL) {
    return process.env.SHEET_URL.trim();
  }
  const possiblePaths = [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), "public", ".env"),
  ];
  for (const envPath of possiblePaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/^SHEET_URL=(.*)$/m);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }
  return undefined;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { courseId, course, date, name, phone, people } = body;

    // 필수 입력값 검증
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "이름을 입력해 주세요." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "연락처를 입력해 주세요." },
        { status: 400 }
      );
    }

    // 서버의 강좌 데이터(courses)에서 해당 강좌 조회
    const matchedCourse = courses.find(
      (c) =>
        (courseId !== undefined && String(c.id) === String(courseId)) ||
        c.name === course
    );

    if (!matchedCourse) {
      return NextResponse.json(
        { success: false, error: "강좌 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 인원 수 파싱 (최소 1명)
    const peopleCount = Math.max(1, parseInt(String(people || 1), 10));

    // 남은 자리 검증: 인원이 남은 자리보다 많으면 오류 반환
    const remainingSeats = matchedCourse.seat - matchedCourse.booked;
    if (peopleCount > remainingSeats) {
      return NextResponse.json(
        {
          success: false,
          error: `인원이 남은 자리(${remainingSeats}석)보다 많습니다.`,
        },
        { status: 400 }
      );
    }

    // 요구사항: 결제 금액(total)은 화면이 보낸 값이 아니라 서버가 강좌 데이터의 수강료 × 인원으로 계산
    const total = matchedCourse.price * peopleCount;

    // .env의 SHEET_URL 확인 (브라우저에 노출되지 않도록 서버에서 처리)
    const sheetUrl = getSheetUrl();
    if (!sheetUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "서버에 SHEET_URL 환경 변수가 설정되어 있지 않습니다.",
        },
        { status: 500 }
      );
    }

    // SHEET_URL로 전송할 JSON 페이로드 {date, course, name, phone, people, total}
    const payload = {
      date: date || matchedCourse.date,
      course: matchedCourse.name,
      name: name.trim(),
      phone: phone.trim(),
      people: peopleCount,
      total,
    };

    // 서버에서 구글 시트 웹앱(SHEET_URL)으로 JSON 데이터 전송
    const sheetResponse = await fetch(sheetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text().catch(() => "");
      console.error("Sheet API error status:", sheetResponse.status, errorText);
      return NextResponse.json(
        {
          success: false,
          error: "구글 시트 연동에 실패했습니다.",
          status: sheetResponse.status,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "예약 신청이 성공적으로 접수되었습니다.",
      data: payload,
    });
  } catch (error) {
    console.error("Reservation API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "서버 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

