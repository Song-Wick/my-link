"use client";

import React, { useState } from "react";

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
}

interface Reaction {
  id: string;
  emoji: string;
  label: string;
  defaultCount: number;
}

const REACTIONS: Reaction[] = [
  { id: "heart", emoji: "❤️", label: "응원해요", defaultCount: 42 },
  { id: "coffee", emoji: "☕", label: "커피 한잔", defaultCount: 18 },
  { id: "fire", emoji: "🔥", label: "갓생 파이팅", defaultCount: 35 },
  { id: "rocket", emoji: "🚀", label: "멋진 성장", defaultCount: 29 },
];

export function CheerSection() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    heart: 42,
    coffee: 18,
    fire: 35,
    rocket: 29,
  });
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [counter, setCounter] = useState(0);

  const handleCheer = (id: string, emoji: string, e: React.MouseEvent<HTMLButtonElement>) => {
    // Update count
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    // Calculate position
    const rect = e.currentTarget.getBoundingClientRect();
    const nextId = counter + 1;
    setCounter(nextId);
    const offset = (nextId % 20) - 10;

    const newEmoji: FloatingEmoji = {
      id: nextId,
      emoji,
      x: rect.left + rect.width / 2 - 12 + offset,
    };

    setFloatingEmojis((prev) => [...prev, newEmoji]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== nextId));
    }, 1200);
  };

  return (
    <div className="relative mt-8 w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-800/40">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            송수에게 응원 남기기
          </span>
          <span className="text-xs text-zinc-400">✨ Click!</span>
        </div>
        <span className="text-[11px] font-medium text-purple-600 dark:text-purple-400">
          실시간 반응
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {REACTIONS.map((item) => {
          const currentCount = counts[item.id] ?? item.defaultCount;
          return (
            <button
              key={item.id}
              onClick={(e) => handleCheer(item.id, item.emoji, e)}
              className="group relative flex flex-col items-center justify-center rounded-xl border border-zinc-200/70 bg-white/80 py-2.5 px-1 shadow-xs transition-all hover:-translate-y-1 hover:border-purple-300 hover:bg-white hover:shadow-md active:scale-95 dark:border-zinc-700/60 dark:bg-zinc-900/60 dark:hover:border-purple-500/50 dark:hover:bg-zinc-800 cursor-pointer"
              title={`${item.label} 누르기`}
            >
              <span className="text-xl transition-transform duration-200 group-hover:scale-125">
                {item.emoji}
              </span>
              <span className="mt-1 text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                {item.label}
              </span>
              <span className="mt-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                {currentCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Floating particles portal */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {floatingEmojis.map((item) => (
          <div
            key={item.id}
            className="animate-float-up absolute text-2xl select-none"
            style={{
              left: `${item.x}px`,
              bottom: "20%",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
