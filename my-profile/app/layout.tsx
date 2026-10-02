import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "송수 (Songsoo) | Vibe Coder & Creator Profile — Neobrutalism Landing",
  description:
    "바이브 코딩으로 아이디어를 현실의 가치로 구현하는 직장인 개발자 송수의 Neobrutalism 올인원 링크 & 프로젝트 랜딩 페이지입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
