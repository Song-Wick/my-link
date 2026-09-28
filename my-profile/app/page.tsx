"use client";

import React, { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const links = [
    { name: "GitHub", url: "https://github.com", icon: "🐈", bg: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
    { name: "Blog", url: "https://velog.io", icon: "📝", bg: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
    { name: "Instagram", url: "https://instagram.com", icon: "📸", bg: "hover:bg-zinc-100 dark:hover:bg-zinc-800" },
  ];

  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 px-4 py-12 dark:from-zinc-950 dark:to-black">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-900/70">
        <div className="flex flex-col items-center text-center">
          {/* Avatar Icon with rich aesthetics */}
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30">
            <span className="text-3xl font-bold text-white select-none">S</span>
            <span className="absolute right-0 bottom-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-[10px] text-white border-2 border-white dark:border-zinc-900 animate-pulse">
              🟢
            </span>
          </div>

          {/* Name */}
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Songsoo
          </h1>

          {/* Badge */}
          <span className="mt-2 inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 ring-1 ring-purple-700/10 dark:bg-purple-950/30 dark:text-purple-400 dark:ring-purple-400/20">
            @vibe_coder
          </span>

          {/* Introduction */}
          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 font-sans">
            안녕하세요! 바이브 코딩을 배우고 있는 직작인입니다.
          </p>

          {/* Action / Share Button */}
          <button
            onClick={handleShare}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                링크 복사 완료!
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.303 2.651m-5.303-2.651a2.25 2.25 0 11-5.303-2.651m5.303 2.651L12.48 8.25m-5.263 2.657l5.263 2.657m0 0a2.25 2.25 0 102.243-1.677 2.247 2.247 0 00-2.243 1.677z" />
                </svg>
                프로필 공유하기
              </>
            )}
          </button>
        </div>

        {/* Links section fits perfectly with "My Link" theme */}
        <div className="mt-8 space-y-3">
          <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full" />
          <p className="text-center text-xs font-medium tracking-wider text-zinc-400 uppercase">My Links</p>
          
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 rounded-2xl border border-zinc-200 px-5 py-4 text-sm font-semibold text-zinc-800 transition-all active:scale-98 dark:border-zinc-800 dark:text-zinc-200 ${link.bg}`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="flex-1">{link.name}</span>
              <svg className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} Songsoo. All rights reserved.
        </div>
      </div>
    </div>
  );
}
