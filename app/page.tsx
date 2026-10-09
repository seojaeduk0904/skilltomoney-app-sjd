"use client";

import React, { useState } from "react";
import { courses } from "@/data/courses";

interface Course {
  id: string | number;
  name: string;
  price: number;
  seat: number; // 정원
  booked: number; // 예약 인원
  date: string; // 강좌 일자
  tags: string[]; // 태그 목록
  icon?: string;
  summary?: string;
  schedule?: string;
  format?: string;
  benefit?: string;
  target?: string;
}

export default function HomePage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isReserved, setIsReserved] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const displayedCourses = onlyAvailable
    ? courses.filter((course) => course.seat - course.booked > 0)
    : courses;

  const handleOpenModal = (course: Course) => {
    if (course.seat - course.booked <= 0) return;
    setSelectedCourse(course);
    setIsReserved(false);
    setUserName("");
    setUserPhone("");
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setIsReserved(false);
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) {
      alert("이름과 연락처를 입력해 주세요.");
      return;
    }
    setIsReserved(true);
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-[#e2e8f0] flex flex-col justify-between selection:bg-[#ffd700] selection:text-[#070d1e]">
      {/* 상단 네비게이션 헤더 */}
      <header className="sticky top-0 z-50 bg-[#070d1e]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#e6a817] flex items-center justify-center font-black text-lg text-[#070d1e] shadow-md shadow-[#ffd700]/25">
              ₩
            </span>
            <div>
              <span className="font-black text-xl sm:text-2xl tracking-tight gold-text">
                스킬투머니
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium text-slate-400">
                원데이 강좌 플랫폼
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-3 sm:gap-6">
            <a
              href="#courses"
              className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-[#ffd700] transition-colors"
            >
              강좌 목록
            </a>
            <a
              href="#features"
              className="hidden sm:inline-block text-xs sm:text-sm font-semibold text-slate-300 hover:text-[#ffd700] transition-colors"
            >
              서비스 특징
            </a>
            <a
              href="#courses"
              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-[#ffd700] to-[#e6a817] text-[#070d1e] hover:from-[#ffdf33] hover:to-[#f3b31e] transition-all shadow-md shadow-[#ffd700]/20"
            >
              수강 신청
            </a>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center">
        {/* 히어로 헤더 */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="gold-badge mb-5">
            ✦ 배운 기술이 돈이 되는 실전 원데이 클래스
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            <span className="gold-text">스킬투머니</span> 강좌 목록
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-300 leading-relaxed mb-3">
            끝까지 듣지 못할 지루한 강의는 그만! 단 하루 3시간 집중 실습으로
            <br className="hidden sm:inline" /> 당일 첫 수익화 채널과 포트폴리오를 완성하세요.
          </p>

          <p className="text-xs sm:text-sm text-slate-400">
            소수정예 밀착 코칭 · 실전 템플릿 100% 증정 · 만족도 4.9점
          </p>
        </section>

        {/* 강좌 카드 목록 (4개 강좌) */}
        <section id="courses" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffd700]"></span>
                개설 강좌 안내
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                현재 수강 신청 가능한 {courses.length}개의 실전 수익화 원데이 클래스입니다.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* 예약 가능한 강좌만 보기 체크 상자 */}
              <label
                htmlFor="filter-available"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 cursor-pointer select-none px-3 py-2 rounded-xl bg-[#0d1838] border border-white/15 hover:border-[#ffd700]/50 transition-all shadow-sm"
              >
                <input
                  type="checkbox"
                  id="filter-available"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#ffd700] accent-[#ffd700] bg-slate-900 border-white/30 focus:ring-0 focus:outline-none cursor-pointer"
                />
                <span>예약 가능한 강좌만 보기</span>
              </label>

              <span className="text-xs sm:text-sm font-bold px-3 py-2 rounded-xl bg-slate-800 text-[#ffd700] border border-[#ffd700]/30 whitespace-nowrap shadow-sm">
                {onlyAvailable
                  ? `예약 가능 ${displayedCourses.length}개 / 전체 ${courses.length}개`
                  : `총 ${courses.length}개 강좌 모집 중`}
              </span>
            </div>
          </div>

          {displayedCourses.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#0a1530]/60 rounded-2xl border border-white/10">
              <span className="text-4xl mb-3 block">⏳</span>
              <p className="text-base font-bold text-white mb-1">현재 예약 가능한 강좌가 없습니다.</p>
              <p className="text-xs text-slate-400 mb-4">체크를 해제하시면 전체 강좌를 확인하실 수 있습니다.</p>
              <button
                type="button"
                onClick={() => setOnlyAvailable(false)}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-800 text-[#ffd700] border border-[#ffd700]/30 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                전체 강좌 보기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCourses.map((course: Course) => {
              const remainingSeats = course.seat - course.booked;
              const isSoldOut = remainingSeats === 0;
              const isUrgent = remainingSeats >= 1 && remainingSeats <= 2;

              return (
                <div
                  key={course.id}
                  className={`group relative rounded-2xl bg-[#0f1c3d] border transition-all duration-300 shadow-xl flex flex-col overflow-hidden ${
                    isSoldOut
                      ? "border-slate-800 opacity-95"
                      : isUrgent
                      ? "border-red-500/50 hover:border-red-400 shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(239,68,68,0.2)] hover:-translate-y-2"
                      : "border-white/10 hover:border-[#ffd700]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(212,175,55,0.18)] hover:-translate-y-2"
                  }`}
                >
                  {/* 상단 포인트 바 */}
                  <div
                    className={`h-1.5 w-full ${
                      isSoldOut
                        ? "bg-slate-700"
                        : isUrgent
                        ? "bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 animate-pulse"
                        : "bg-gradient-to-r from-[#ffd700] via-[#ffb703] to-[#d4af37]"
                    }`}
                  />

                  {/* 카드 헤더 */}
                  <div className="p-5 bg-gradient-to-br from-[#182852] to-[#101c3f] border-b border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                        원데이 클래스
                      </span>
                      {/* 상태 뱃지 (마감 / 마감 임박 / 모집 중) */}
                      {isSoldOut ? (
                        <span className="text-xs font-black text-rose-300 bg-rose-950/90 border border-rose-600/70 px-2.5 py-0.5 rounded shadow-sm">
                          마감
                        </span>
                      ) : isUrgent ? (
                        <span className="text-xs font-black text-red-400 bg-red-950/90 border border-red-500 px-2.5 py-0.5 rounded shadow-sm animate-pulse">
                          🔥 마감 임박
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded">
                          모집 중
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="w-11 h-11 rounded-xl bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center text-xl shrink-0 mt-0.5">
                        {course.icon || "🎓"}
                      </span>
                      <div className="min-w-0 flex-1">
                        {/* 강좌 이름 */}
                        <h3 className="text-xl font-black text-white group-hover:text-[#ffd700] transition-colors tracking-tight">
                          {course.name}
                        </h3>
                        {/* 강좌 이름 아래 작은 배지 (tags) */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {course.tags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/30 shadow-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 카드 본문 */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* 강좌 소개 요약 */}
                      <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[44px] line-clamp-2">
                        {course.summary || "실전 수익화 원데이 집중 클래스"}
                      </p>

                      {/* 남은 좌석 ○석 / 정원 ○명 강조 바 */}
                      <div className="mb-4 px-3 py-2 rounded-xl bg-[#081229] border border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSoldOut
                                ? "bg-rose-500"
                                : isUrgent
                                ? "bg-red-500 animate-ping"
                                : "bg-emerald-400"
                            }`}
                          />
                          모집 현황
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isSoldOut && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-extrabold border border-rose-500/30">
                              마감
                            </span>
                          )}
                          {isUrgent && (
                            <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 text-[10px] font-extrabold border border-red-500/30 animate-pulse">
                              임박
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold ${
                              isSoldOut
                                ? "text-rose-400"
                                : isUrgent
                                ? "text-red-500 font-extrabold"
                                : "text-[#ffd700]"
                            }`}
                          >
                            {remainingSeats}석 남음 / 정원 {course.seat}명
                          </span>
                        </div>
                      </div>

                      {/* 강좌 상세 정보 리스트 */}
                      <div className="space-y-2 text-xs text-slate-300 bg-[#081229]/60 p-3 rounded-xl border border-white/5 mb-5">
                        <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                          <span className="text-slate-400">📅 강좌 일자</span>
                          <span className="font-semibold text-slate-200">{course.date}</span>
                        </div>
                        <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                          <span className="text-slate-400">⏱️ 상세 일정</span>
                          <span className="font-semibold text-slate-200 truncate ml-2">
                            {course.schedule || `${course.date} (3시간)`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                          <span className="text-slate-400">👥 예약/정원</span>
                          <span
                            className={`font-bold ${
                              isSoldOut
                                ? "text-rose-400"
                                : isUrgent
                                ? "text-red-500 font-extrabold"
                                : "text-[#ffd700]"
                            }`}
                          >
                            {course.booked}명 예약 / {course.seat}명 정원
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">🎁 제공 혜택</span>
                          <span className="font-semibold text-amber-200 truncate ml-2">
                            {course.benefit || "실전 템플릿 증정"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 카드 하단: 수강료 & [예약하기 / 예약 마감] 버튼 */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-400">수강료</span>
                        <div className="text-right">
                          <span className="text-xl sm:text-2xl font-black text-[#ffd700] tracking-tight">
                            {course.price.toLocaleString()}원
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1">/ 1인</span>
                        </div>
                      </div>

                      {/* [예약하기] / [예약 마감] 버튼 */}
                      {isSoldOut ? (
                        <button
                          type="button"
                          disabled
                          className="w-full py-3 px-4 rounded-xl font-bold text-slate-400 bg-slate-800/80 border border-slate-700/60 cursor-not-allowed text-center text-sm flex items-center justify-center gap-2 select-none shadow-none"
                        >
                          <span>예약 마감</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenModal(course)}
                          className="w-full py-3 px-4 rounded-xl font-extrabold text-[#070d1e] bg-gradient-to-r from-[#ffd700] via-[#ffc720] to-[#f39c12] hover:from-[#ffdf33] hover:to-[#f7ab2c] shadow-[0_4px_18px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.55)] active:scale-[0.98] transition-all duration-200 cursor-pointer text-center text-sm flex items-center justify-center gap-2"
                        >
                          <span>예약하기</span>
                          <span className="text-xs">→</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

        {/* 1장 스타일 특징 요약 배너 */}
        <section id="features" className="w-full mt-20">
          <div className="rounded-2xl bg-gradient-to-r from-[#0d1b3d] to-[#0a1530] border border-[rgba(212,175,55,0.3)] p-8 sm:p-10 shadow-xl text-center">
            <div className="gold-badge mb-3">WHY SKILL TO MONEY</div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              단 하루 만에 당신의 기술을 <span className="gold-text">가치 있는 수익</span>으로 바꾸세요
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
              이론 공부만 하다가 지치는 강의는 그만두세요. 스킬투머니는 수강 당일 나만의 결과물과 포트폴리오를 완성해 실제 외주와 부수입 창출로 바로 연결해 드립니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-xl mb-1 text-[#ffd700]">⚡ 100% 실전 중심</div>
                <div className="text-xs text-slate-400">
                  군더더기 이론은 걷어내고 당장 써먹을 수 있는 핵심 실습만 진행합니다.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-xl mb-1 text-[#ffd700]">💰 수익화 채널 완성</div>
                <div className="text-xs text-slate-400">
                  수업 종료와 동시에 크몽, 숨고, SNS 등에 상품을 등록하도록 돕습니다.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-xl mb-1 text-[#ffd700]">🎁 실전 템플릿 제공</div>
                <div className="text-xs text-slate-400">
                  혼자서도 바로 재활용할 수 있는 현업 실무 서식과 자동화 템플릿을 드립니다.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 예약 신청 모달 팝업 */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0f1c3d] border border-[#ffd700]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.25)] overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-[#ffd700] via-[#ffb703] to-[#d4af37]" />

            <div className="p-6">
              {/* 모달 닫기 버튼 */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>

              {!isReserved ? (
                <>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-[#ffd700] bg-[#ffd700]/15 border border-[#ffd700]/30 mb-3">
                    강좌 예약 신청
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1.5">
                    {selectedCourse.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {selectedCourse.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    원데이 올인원 라이브 클래스 (정원 {selectedCourse.seat}명)
                  </p>

                  <div className="bg-[#081229] p-4 rounded-xl border border-white/10 mb-5">
                    <div className="flex justify-between items-center mb-2 text-xs">
                      <span className="text-slate-400">일정</span>
                      <span className="font-semibold text-slate-200">
                        {selectedCourse.schedule || selectedCourse.date}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2 text-xs">
                      <span className="text-slate-400">좌석 현황</span>
                      <span
                        className={`font-bold ${
                          selectedCourse.seat - selectedCourse.booked === 0
                            ? "text-rose-400"
                            : "text-[#ffd700]"
                        }`}
                      >
                        남은 좌석 {selectedCourse.seat - selectedCourse.booked}석 / 정원{" "}
                        {selectedCourse.seat}명
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">최종 수강료</span>
                      <span className="text-lg font-black text-[#ffd700]">
                        {selectedCourse.price.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitReservation} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        예약자 이름
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="홍길동"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#070d1e] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        휴대폰 번호 (수강 안내 링크 발송)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="010-1234-5678"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#070d1e] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#ffd700] focus:ring-1 focus:ring-[#ffd700]"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      * 예약 접수 후 담당 멘토가 안내 문자 및 라이브 참여 링크를 발송해 드립니다.
                    </p>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="flex-1 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-slate-700 cursor-pointer"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="flex-2 py-3 rounded-xl font-black text-[#070d1e] bg-gradient-to-r from-[#ffd700] via-[#ffc720] to-[#f39c12] hover:from-[#ffdf33] hover:to-[#f7ab2c] text-sm shadow-md shadow-[#ffd700]/30 cursor-pointer"
                      >
                        예약 접수 완료
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#ffd700]/20 border border-[#ffd700] flex items-center justify-center text-2xl">
                    🎉
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">
                    예약 신청이 접수되었습니다!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    <strong className="text-[#ffd700]">{userName}</strong>님,{" "}
                    <strong className="text-white">[{selectedCourse.name}]</strong> 강좌 예약이
                    정상 접수되었습니다.
                    <br />
                    입력하신 연락처({userPhone})로 30분 내 결제 안내 및 참가 링크가 발송됩니다.
                  </p>
                  <div className="p-3 bg-[#081229] rounded-xl border border-white/10 text-xs text-slate-400 mb-5">
                    수강료: <span className="font-bold text-[#ffd700]">{selectedCourse.price.toLocaleString()}원</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-3 rounded-xl font-bold text-[#070d1e] bg-gradient-to-r from-[#ffd700] to-[#e6a817] hover:from-[#ffdf33] hover:to-[#f3b31e] text-sm cursor-pointer"
                  >
                    확인
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 하단 푸터 (1장 소개 페이지 디자인과 통일) */}
      <footer className="w-full border-t border-white/10 bg-[#050a17] py-10 px-4 sm:px-6 text-slate-400 text-xs mt-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="font-extrabold text-base tracking-tight gold-text">
              스킬투머니
            </span>
            <p className="mt-1 text-slate-400">
              배운 기술을 돈으로 바꾸는 실전 원데이 클래스 플랫폼. 이론보다 실행, 배움보다 수익에 집중합니다.
            </p>
          </div>
          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-slate-200">
              이용약관
            </a>
            <a href="#" className="hover:text-slate-200">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-slate-200">
              강사 지원
            </a>
            <a href="#" className="hover:text-slate-200">
              고객센터
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 text-center sm:text-left text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 스킬투머니 (SkillToMoney). All rights reserved.</p>
          <p>신뢰와 성장을 약속하는 실전 지식 거래 플랫폼</p>
        </div>
      </footer>
    </div>
  );
}
