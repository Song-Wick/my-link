"use client";

import React, { useState } from "react";
import {
  BoltIcon,
  SunIcon,
  MoonIcon,
  QrCodeIcon,
  ShareIcon,
  MenuIcon,
  CloseIcon,
  CheckIcon,
} from "./Icons";

interface NavbarProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenQr: () => void;
  onShare: () => void;
  copied: boolean;
}

export function Navbar({
  theme,
  onToggleTheme,
  onOpenQr,
  onShare,
  copied,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "소개", href: "#intro" },
    { label: "하이라이트", href: "#stats" },
    { label: "링크 허브", href: "#links" },
    { label: "프로젝트", href: "#projects" },
    { label: "스택", href: "#tech" },
    { label: "응원", href: "#cheer" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-4 border-black bg-[#fdfbf7] dark:bg-[#111317] dark:border-white transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          aria-label="SONGSOO.DEV 홈으로"
        >
          <div className="flex h-10 items-center justify-center bg-[#ffe600] px-3 font-mono font-black text-black border-2 border-black shadow-[2px_2px_0px_#000] dark:border-white dark:shadow-[2px_2px_0px_#fff] group-hover:-translate-y-0.5 transition-transform">
            <BoltIcon size={18} className="mr-1 text-black" />
            <span className="tracking-tight text-sm sm:text-base">SONGSOO.DEV</span>
          </div>
          <span className="hidden md:inline-block rounded-md bg-[#ff66c4] px-2 py-0.5 text-[11px] font-black text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000] dark:border-white rotate-[-2deg]">
            VIBE CODER
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-sm font-bold">
          {navLinks.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-zinc-800 hover:text-black dark:text-zinc-200 dark:hover:text-white hover:bg-[#ffe600] hover:text-black hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_#000] dark:hover:bg-[#ffe600] dark:hover:text-black dark:hover:border-white transition-all rounded-xs"
            >
              <span className="text-[11px] opacity-60 mr-1">0{idx + 1}.</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="neo-btn h-9 w-9 bg-white text-black dark:bg-zinc-800 dark:text-white"
            title={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            aria-label="테마 전환"
          >
            {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>

          {/* QR Code */}
          <button
            onClick={onOpenQr}
            className="neo-btn h-9 w-9 bg-[#55f993] text-black"
            title="프로필 QR 코드"
            aria-label="QR 코드 보기"
          >
            <QrCodeIcon size={16} />
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="neo-btn h-9 px-2.5 sm:px-3 text-xs bg-[#ff66c4] text-black"
            title="프로필 공유하기"
            aria-label="프로필 공유하기"
          >
            {copied ? (
              <>
                <CheckIcon size={14} className="mr-1" />
                <span className="hidden sm:inline">복사됨!</span>
              </>
            ) : (
              <>
                <ShareIcon size={14} className="mr-1" />
                <span className="hidden sm:inline">공유</span>
              </>
            )}
          </button>

          {/* Contact / CTA Button */}
          <a
            href="mailto:songsoo@example.com"
            className="neo-btn hidden sm:flex h-9 px-3.5 text-xs bg-[#38bdf8] text-black"
          >
            ✉️ 커피챗
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="neo-btn lg:hidden h-9 w-9 bg-[#ffe600] text-black"
            aria-label="모바일 메뉴 열기"
          >
            {mobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-3 border-black dark:border-white bg-[#fffdf5] dark:bg-[#181a20] px-4 py-4 space-y-2">
          {navLinks.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 font-mono text-sm font-bold border-2 border-black bg-white dark:bg-zinc-800 shadow-[2px_2px_0px_#000] dark:border-white dark:shadow-[2px_2px_0px_#fff]"
            >
              <span>{item.label}</span>
              <span className="text-xs bg-[#ffe600] text-black px-1.5 py-0.5 border border-black font-mono">
                0{idx + 1}
              </span>
            </a>
          ))}
          <a
            href="mailto:songsoo@example.com"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center p-2.5 font-mono text-sm font-black border-2 border-black bg-[#38bdf8] text-black shadow-[2px_2px_0px_#000]"
          >
            ✉️ 이메일로 커피챗 제안하기
          </a>
        </div>
      )}
    </header>
  );
}
