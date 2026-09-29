"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  VerifiedIcon,
  CopyIcon,
  CheckIcon,
  ShareIcon,
  QrCodeIcon,
  SunIcon,
  MoonIcon,
  SparklesIcon,
} from "./Icons";

interface ProfileHeaderProps {
  onOpenQr: () => void;
  onShare: () => void;
  copied: boolean;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function ProfileHeader({
  onOpenQr,
  onShare,
  copied,
  theme,
  onToggleTheme,
}: ProfileHeaderProps) {
  const [handleCopied, setHandleCopied] = useState(false);

  const copyHandle = () => {
    navigator.clipboard.writeText("@vibe_coder");
    setHandleCopied(true);
    setTimeout(() => setHandleCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Top Utility Controls */}
      <div className="flex w-full items-center justify-between mb-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/70 px-3 py-1 text-xs font-medium text-emerald-700 backdrop-blur-xs dark:bg-emerald-950/30 dark:text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>Open to Connect & Chat</span>
        </div>

        {/* Action icons (Theme toggle, QR, Share) */}
        <div className="flex items-center gap-1.5">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-600 shadow-xs hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-all cursor-pointer"
            title={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
            aria-label="테마 전환"
          >
            {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>

          {/* QR Code */}
          <button
            onClick={onOpenQr}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-600 shadow-xs hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-all cursor-pointer"
            title="QR 코드 보기"
            aria-label="QR 코드 보기"
          >
            <QrCodeIcon size={16} />
          </button>

          {/* Share Button */}
          <button
            onClick={onShare}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/80 bg-white/80 text-zinc-600 shadow-xs hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-all cursor-pointer"
            title="프로필 공유하기"
            aria-label="프로필 공유하기"
          >
            <ShareIcon size={15} />
          </button>
        </div>
      </div>

      {/* Avatar Container with Gradient Glow Ring */}
      <div className="relative mb-5 group">
        {/* Ambient Gradient Glow */}
        <div className="absolute -inset-1 rounded-full bg-linear-to-r from-violet-600 via-fuchsia-500 to-cyan-400 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse-glow" />

        {/* Outer Ring */}
        <div className="relative h-28 w-28 rounded-full p-1 bg-linear-to-tr from-violet-600 via-pink-500 to-cyan-400 shadow-xl transition-transform duration-300 group-hover:scale-105">
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-900">
            <Image
              src="/avatar.jpg"
              alt="Songsoo Avatar"
              fill
              priority
              sizes="(max-width: 768px) 112px, 112px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Live Sparkle / Creator Badge */}
        <div
          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-tr from-violet-600 to-pink-500 text-white shadow-md ring-2 ring-white dark:ring-zinc-900"
          title="Vibe Coder"
        >
          <SparklesIcon size={16} />
        </div>
      </div>

      {/* Name with Verified Badge */}
      <div className="flex items-center gap-1.5">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl font-sans">
          Songsoo <span className="text-purple-600 dark:text-purple-400">(송수)</span>
        </h1>
        <span
          className="text-blue-500 inline-flex items-center"
          title="인증된 바이브 코더"
        >
          <VerifiedIcon size={20} />
        </span>
      </div>

      {/* Handle & Role */}
      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={copyHandle}
          className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-pointer"
          title="핸들 복사"
        >
          <span>@vibe_coder</span>
          {handleCopied ? (
            <CheckIcon size={12} className="text-emerald-500" />
          ) : (
            <CopyIcon size={12} className="opacity-60" />
          )}
        </button>

        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          직장인 빌더
        </span>
      </div>

      {/* Bio Description */}
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 font-sans">
        바이브 코딩으로 아이디어를 현실로 구현하는 직장인 개발자입니다. 🚀
        <br />
        <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
          AI 페어프로그래밍과 Next.js로 가치 있는 프로덕트를 만듭니다.
        </span>
      </p>

      {/* Tech Stack Pills */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-xs">
        {["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "AI Workflows"].map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 shadow-2xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Share / Copy Primary Action */}
      <div className="mt-6 flex w-full max-w-xs items-center gap-2">
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 active:scale-98 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <CheckIcon size={15} />
              <span>프로필 링크 복사됨!</span>
            </>
          ) : (
            <>
              <ShareIcon size={15} />
              <span>프로필 링크 공유하기</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
