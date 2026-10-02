"use client";

import React, { useState } from "react";
import {
  SparklesIcon,
  BoltIcon,
  StarIcon,
  CopyIcon,
  CheckIcon,
  ArrowDownIcon,
  TerminalIcon,
} from "./Icons";

interface HeroSectionProps {
  onToast: (msg: string) => void;
}

export function HeroSection({ onToast }: HeroSectionProps) {
  const [handleCopied, setHandleCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("songsoo@example.com");
    setHandleCopied(true);
    onToast("이메일 주소(songsoo@example.com)가 복사되었습니다! 📋");
    setTimeout(() => setHandleCopied(false), 2000);
  };

  return (
    <section id="intro" className="relative w-full pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      {/* Background Decorator Stickers */}
      <div className="pointer-events-none absolute -top-4 right-10 hidden xl:block">
        <div className="neo-card bg-[#ffe600] px-4 py-2 text-xs font-black text-black rotate-[6deg] animate-float-badge">
          ★ CREATIVE CODER
        </div>
      </div>
      <div className="pointer-events-none absolute top-40 left-6 hidden xl:block">
        <div className="neo-card bg-[#ff66c4] px-3 py-1.5 text-xs font-black text-black rotate-[-8deg]">
          ⚡ 100% VIBE CODED
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Main Typography & Badges (Col 7) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Top Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Badge */}
              <div className="neo-badge bg-[#55f993] text-black px-3 py-1 text-xs sm:text-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-700 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-black"></span>
                </span>
                <span>OPEN FOR VIBE COLLAB</span>
              </div>

              {/* Role Sticker */}
              <div className="neo-badge bg-[#c084fc] text-black px-3 py-1 text-xs rotate-[-1deg]">
                <SparklesIcon size={14} className="text-black" />
                <span>BUILDER & CREATOR</span>
              </div>

              {/* Location Tag */}
              <div className="neo-badge bg-[#ffe600] text-black px-2.5 py-1 text-xs rotate-[2deg]">
                <span>📍 SEOUL, KR</span>
              </div>
            </div>

            {/* Giant Neobrutal Title (NO PROFILE IMAGE) */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.05] text-black dark:text-white">
                VIBE CODER{" "}
                <span className="inline-block bg-[#ffe600] text-black px-2 sm:px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-[-1deg] dark:border-white">
                  SONGSOO
                </span>
                <br />
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 dark:from-purple-400 dark:via-pink-400 dark:to-yellow-300">
                  송수의 링크 스튜디오
                </span>
              </h1>
            </div>

            {/* Headline Subtitle */}
            <div className="border-l-4 border-black dark:border-white pl-4 py-1">
              <p className="text-base sm:text-lg lg:text-xl font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                아이디어를 가장 빠른 속도로 현실의 프로덕트로 빚어냅니다.
              </p>
              <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                Next.js 16과 React 19, 최신 AI 페어프로그래밍 워크플로우를 결합하여 일상의 비효율을 해결하는 솔루션을 제작합니다.
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a
                href="#links"
                className="neo-btn w-full sm:w-auto px-6 py-3.5 bg-[#ffe600] text-black text-sm sm:text-base font-black"
              >
                <BoltIcon size={18} className="mr-2" />
                모든 링크 바로보기
              </a>
              <a
                href="#projects"
                className="neo-btn w-full sm:w-auto px-6 py-3.5 bg-[#38bdf8] text-black text-sm sm:text-base font-black"
              >
                <StarIcon size={18} className="mr-2" />
                프로젝트 쇼케이스
              </a>
              <button
                onClick={copyEmail}
                className="neo-btn w-full sm:w-auto px-5 py-3.5 bg-white text-black dark:bg-zinc-800 dark:text-white text-sm font-bold"
                title="이메일 복사하기"
              >
                {handleCopied ? (
                  <>
                    <CheckIcon size={16} className="mr-1.5 text-emerald-600" />
                    <span>복사 완료!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon size={16} className="mr-1.5" />
                    <span>이메일 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* Micro Quick Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span className="text-zinc-500 dark:text-zinc-400">KEYWORDS:</span>
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 border border-black dark:border-white">
                #Next.js16
              </span>
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 border border-black dark:border-white">
                #React19
              </span>
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 border border-black dark:border-white">
                #TailwindCSS_v4
              </span>
              <span className="bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 border border-black dark:border-white">
                #VibeCoding
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: Retro Brutalist OS Window Widget (Col 5) */}
          <div className="lg:col-span-5 w-full">
            <div className="neo-card bg-[#fffdf5] dark:bg-[#1a1d24] overflow-hidden">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between border-b-3 border-black dark:border-white bg-[#ffe600] px-4 py-2.5 text-black">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full border border-black bg-[#ff5f56]" />
                    <span className="h-3 w-3 rounded-full border border-black bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full border border-black bg-[#27c93f]" />
                  </div>
                  <span className="font-mono text-xs font-black tracking-wider uppercase ml-1">
                    SYSTEM_PROFILE.EXE
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-bold">
                  <span className="px-1.5 py-0.5 border border-black bg-white">_</span>
                  <span className="px-1.5 py-0.5 border border-black bg-white">□</span>
                  <span className="px-1.5 py-0.5 border border-black bg-white">✕</span>
                </div>
              </div>

              {/* Terminal / Info Body */}
              <div className="p-5 font-mono text-xs sm:text-sm space-y-4">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <TerminalIcon size={16} />
                  <span>SESSION: VIBE_MODE_ACTIVE (2026.Q4)</span>
                </div>

                {/* Info Block 1 */}
                <div className="border-2 border-dashed border-black dark:border-zinc-600 p-3 bg-white dark:bg-zinc-900 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black dark:text-white">IDENTIFIER:</span>
                    <span className="font-black text-[#d946ef]">송수 (Songsoo)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black dark:text-white">CORE IDENTITY:</span>
                    <span className="font-bold text-[#0284c7]">직장인 바이브 빌더</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black dark:text-white">STACK ENVIRONMENT:</span>
                    <span className="font-bold text-[#16a34a]">Next.js 16 + React 19</span>
                  </div>
                </div>

                {/* Status Box */}
                <div className="bg-[#ff66c4]/20 border-2 border-black dark:border-white p-3 space-y-1">
                  <div className="font-bold text-black dark:text-white flex items-center gap-1.5">
                    <span className="inline-block h-2 w-2 bg-[#ff66c4] rounded-full"></span>
                    <span>CURRENT_MISSION:</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">
                    "생각난 아이디어를 묵히지 않고 즉시 코드로 구현하여 실질적인 가치를 지닌 프로덕트로 완성해 배포하기."
                  </p>
                </div>

                {/* Interactive Mini Terminal Output */}
                <div className="bg-black text-[#55f993] p-3 rounded-none font-mono text-xs space-y-1 border-2 border-black">
                  <p className="opacity-70">&gt; songsoo --status</p>
                  <p className="font-bold">✔ Codebase ready: My-Link v2.0</p>
                  <p className="font-bold">✔ Neobrutalism UI applied</p>
                  <p className="opacity-70">&gt; coffee_level: 98% ☕</p>
                </div>

                {/* Bottom Anchor Hint */}
                <div className="pt-1 flex items-center justify-between text-xs text-zinc-500 font-sans">
                  <span>아래로 스크롤하여 더 알아보기</span>
                  <a
                    href="#links"
                    className="inline-flex items-center gap-1 font-bold text-black dark:text-white hover:underline"
                  >
                    <span>탐색하기</span>
                    <ArrowDownIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
