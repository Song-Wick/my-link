"use client";

import React from "react";
import { BoltIcon, SparklesIcon, StarIcon } from "./Icons";

export function BentoStats() {
  return (
    <section id="stats" className="w-full py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-white pb-6">
          <div>
            <div className="neo-badge bg-[#ff9f1c] text-black px-3 py-1 text-xs mb-3">
              ★ HIGHLIGHTS & IDENTITY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black dark:text-white">
              핵심 가치 & 통계
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400">
            직장인으로서의 통찰과 AI 페어프로그래밍의 기동성을 결합해 실제로 가치를 만들어내는 개발 생태계를 지향합니다.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Vibe Coding Philosophy (lg:col-span-7) */}
          <div className="lg:col-span-7 neo-card bg-[#fffdf5] dark:bg-[#191c22] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Corner Badge */}
            <div className="absolute top-4 right-4 bg-[#ffe600] text-black font-mono font-black text-xs px-2.5 py-1 border-2 border-black rotate-2 shadow-[2px_2px_0px_#000]">
              CORE_VALUE_01
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center bg-[#ffe600] text-black border-2 border-black shadow-[3px_3px_0px_#000]">
                  <BoltIcon size={26} />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-zinc-500 uppercase">PHILOSOPHY</span>
                  <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white">
                    바이브 코딩(Vibe Coding) 철학
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                구상 단계에서 주저하지 않고, <strong>최신 AI 모델(Gemini, Claude, Copilot)</strong>과 협업하여
                아이디어를 24시간 내에 동작 가능한 웹 서비스로 전환합니다. 완벽함보다 빠른 실행과 배포를 통한 피드백을 신뢰합니다.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-black dark:border-zinc-700 flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-bold">
              <span className="bg-[#55f993] text-black px-2.5 py-1 border border-black">
                ⚡ Rapid Delivery
              </span>
              <span className="bg-[#c084fc] text-black px-2.5 py-1 border border-black">
                🤖 AI Pair-Dev
              </span>
              <span className="bg-[#38bdf8] text-black px-2.5 py-1 border border-black">
                🎯 User Value First
              </span>
            </div>
          </div>

          {/* Card 2: 10+ Shipped Apps (lg:col-span-5) */}
          <div className="lg:col-span-5 neo-card bg-[#55f993]/20 dark:bg-[#55f993]/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#55f993] text-black font-mono font-black text-xs px-2.5 py-1 border-2 border-black rotate-[-2deg] shadow-[2px_2px_0px_#000]">
              METRICS
            </div>

            <div>
              <span className="font-mono text-xs font-bold text-zinc-500 uppercase">OUTPUT & VELOCITY</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black text-black dark:text-white">10+</span>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">Shipped Tools</span>
              </div>
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                개인 유틸리티, CLI 자동화 스크립트, 프로필 매니저, 실무 프롬프트 툴킷 등 직접 필요해서 만든 유용한 프로젝트들을 지속적으로 오픈소스로 공개합니다.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <div className="flex-1 bg-white dark:bg-zinc-800 p-2 border-2 border-black text-center font-mono text-xs font-bold">
                <span className="block text-zinc-500">COMMITS</span>
                <span className="text-base font-black text-black dark:text-white">500+</span>
              </div>
              <div className="flex-1 bg-white dark:bg-zinc-800 p-2 border-2 border-black text-center font-mono text-xs font-bold">
                <span className="block text-zinc-500">COFFEE</span>
                <span className="text-base font-black text-black dark:text-white">∞ CUPS</span>
              </div>
              <div className="flex-1 bg-white dark:bg-zinc-800 p-2 border-2 border-black text-center font-mono text-xs font-bold">
                <span className="block text-zinc-500">PASSION</span>
                <span className="text-base font-black text-[#d946ef]">100%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Modern Tech Stack Focus (lg:col-span-6) */}
          <div className="lg:col-span-6 neo-card bg-[#38bdf8]/20 dark:bg-[#38bdf8]/10 p-6 sm:p-8 flex flex-col justify-between relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center bg-[#38bdf8] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                <StarIcon size={20} />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-zinc-500 uppercase">TECH STACK</span>
                <h4 className="text-lg sm:text-xl font-black text-black dark:text-white">
                  Next.js 16 & React 19 최전선
                </h4>
              </div>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
              Turbopack, CSS-first 방식의 Tailwind CSS v4, TypeScript 엄격 모드 등 가장 최신 웹 표준 기술을 적극적으로 도입하여 프로덕션 품질을 유지합니다.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-mono font-bold">
              <div className="p-2 bg-white dark:bg-zinc-800 border-2 border-black">
                ✔ Turbopack 번들링
              </div>
              <div className="p-2 bg-white dark:bg-zinc-800 border-2 border-black">
                ✔ Tailwind v4 CSS-First
              </div>
              <div className="p-2 bg-white dark:bg-zinc-800 border-2 border-black">
                ✔ React Server Components
              </div>
              <div className="p-2 bg-white dark:bg-zinc-800 border-2 border-black">
                ✔ 완전 반응형 UI/UX
              </div>
            </div>
          </div>

          {/* Card 4: Worker Builder Mindset (lg:col-span-6) */}
          <div className="lg:col-span-6 neo-card bg-[#ff66c4]/20 dark:bg-[#ff66c4]/10 p-6 sm:p-8 flex flex-col justify-between relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center bg-[#ff66c4] text-black border-2 border-black shadow-[2px_2px_0px_#000]">
                <SparklesIcon size={20} />
              </div>
              <div>
                <span className="font-mono text-xs font-bold text-zinc-500 uppercase">DUAL PERSPECTIVE</span>
                <h4 className="text-lg sm:text-xl font-black text-black dark:text-white">
                  직장인의 시선으로 푸는 문제 해결
                </h4>
              </div>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
              실제 현업 업무에서 발생하는 비효율적인 반복 작업, 데이터 정리, 커뮤니케이션 비용을 절감하는 자동화 도구를 직접 기획하고 코딩합니다.
            </p>

            <div className="mt-5 bg-white dark:bg-zinc-800 p-3 border-2 border-black text-xs font-mono">
              <span className="font-bold text-purple-700 dark:text-purple-300">💡 WORKFLOW:</span>
              <span className="ml-1 text-zinc-600 dark:text-zinc-400">
                문제 발견 → AI 페어 프로토타이핑 → 실무 검증 → 오픈 패키지화
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
