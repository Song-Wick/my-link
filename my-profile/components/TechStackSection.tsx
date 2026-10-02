"use client";

import React, { useState } from "react";
import { BoltIcon, SparklesIcon, CheckIcon } from "./Icons";

interface TechItem {
  name: string;
  category: "frontend" | "ai" | "tools" | "mindset";
  color: string;
  rotate: string;
}

export function TechStackSection() {
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const techItems: TechItem[] = [
    // Frontend
    { name: "Next.js 16 (App Router)", category: "frontend", color: "#ffe600", rotate: "-rotate-2" },
    { name: "React 19", category: "frontend", color: "#38bdf8", rotate: "rotate-1" },
    { name: "Tailwind CSS v4", category: "frontend", color: "#55f993", rotate: "-rotate-1" },
    { name: "TypeScript 5", category: "frontend", color: "#60a5fa", rotate: "rotate-2" },
    { name: "Turbopack", category: "frontend", color: "#ff66c4", rotate: "-rotate-2" },
    
    // AI & Pair Dev
    { name: "AI Vibe Coding", category: "ai", color: "#ff66c4", rotate: "rotate-2" },
    { name: "Gemini / Claude AI", category: "ai", color: "#c084fc", rotate: "-rotate-1" },
    { name: "Prompt Engineering", category: "ai", color: "#ffe600", rotate: "rotate-1" },
    { name: "Antigravity IDE", category: "ai", color: "#38bdf8", rotate: "-rotate-2" },
    
    // Tools
    { name: "Node.js & CLI", category: "tools", color: "#55f993", rotate: "rotate-1" },
    { name: "Git & GitHub", category: "tools", color: "#ff9f1c", rotate: "-rotate-2" },
    { name: "Vercel Deployment", category: "tools", color: "#ffe600", rotate: "rotate-2" },
    { name: "Figma & Notion", category: "tools", color: "#c084fc", rotate: "-rotate-1" },
    
    // Mindset
    { name: "24h Rapid Prototyping", category: "mindset", color: "#ffe600", rotate: "-rotate-2" },
    { name: "Problem Solving", category: "mindset", color: "#55f993", rotate: "rotate-1" },
    { name: "Mobile-Desktop Responsive", category: "mindset", color: "#38bdf8", rotate: "-rotate-1" },
  ];

  const handleStickerClick = (name: string) => {
    setClickedItem(name);
    setTimeout(() => setClickedItem(null), 1500);
  };

  return (
    <section id="tech" className="w-full py-16 sm:py-20 bg-[#fdfbf7] dark:bg-[#111317] border-t-4 border-black dark:border-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-white pb-6 mb-10">
          <div>
            <div className="neo-badge bg-[#c084fc] text-black px-3 py-1 text-xs mb-3">
              <BoltIcon size={14} className="text-black" />
              <span>SKILLS & TOOLKIT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black dark:text-white">
              기술 스택 & 스티커 보드
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400">
            실전에서 가치를 증명하는 도구들입니다. 스티커를 클릭해보세요!
          </p>
        </div>

        {/* Sticker Cloud Box */}
        <div className="neo-card bg-white dark:bg-[#1a1d24] p-6 sm:p-10 relative overflow-hidden">
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4.5 py-4">
            {techItems.map((item) => {
              const isClicked = clickedItem === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleStickerClick(item.name)}
                  className={`neo-box ${item.rotate} hover:rotate-0 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-mono font-black text-black transition-all cursor-pointer select-none`}
                  style={{ backgroundColor: item.color }}
                  title="클릭하여 리액션"
                >
                  <span className="flex items-center gap-2">
                    {isClicked ? (
                      <>
                        <CheckIcon size={16} />
                        <span>VERIFIED!</span>
                      </>
                    ) : (
                      <>
                        <SparklesIcon size={14} />
                        <span>{item.name}</span>
                      </>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Footer Note */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-700 text-center font-mono text-xs text-zinc-500">
            ★ 끊임없이 학습하고 새로운 웹 표준과 AI 툴킷을 탐구합니다 ★
          </div>
        </div>

      </div>
    </section>
  );
}
