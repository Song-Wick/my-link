"use client";

import React from "react";

export function MarqueeBanner() {
  const items = [
    "★ NEXT.JS 16",
    "⚡ REACT 19",
    "🎨 TAILWIND CSS V4",
    "🤖 AI VIBE CODING",
    "📦 TYPESCRIPT STRICT",
    "🚀 RAPID PROTOTYPING",
    "☕ WORKER BUILDER",
    "🔥 OPEN TO COLLAB",
    "💻 FULL RESPONSIVE",
    "⭐ NEOBRUTALISM STYLE",
  ];

  return (
    <div className="w-full overflow-hidden border-y-4 border-black bg-[#ffe600] py-3 text-black dark:border-white select-none">
      <div className="flex w-max animate-marquee">
        {/* First set */}
        <div className="flex shrink-0 items-center gap-8 font-mono text-sm sm:text-base font-black tracking-widest uppercase px-4">
          {items.map((item, idx) => (
            <span key={`item-1-${idx}`} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-xl">■</span>
            </span>
          ))}
        </div>
        {/* Repeated duplicate set for seamless loop */}
        <div className="flex shrink-0 items-center gap-8 font-mono text-sm sm:text-base font-black tracking-widest uppercase px-4">
          {items.map((item, idx) => (
            <span key={`item-2-${idx}`} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-xl">■</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
