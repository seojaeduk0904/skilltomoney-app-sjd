import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스킬투머니 | 원데이 강좌 목록",
  description: "배운 기술이 돈이 되는 원데이 클래스, 스킬투머니 강좌 목록입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col font-sans bg-[#070d1e] text-[#e2e8f0] antialiased">
        {children}
      </body>
    </html>
  );
}
