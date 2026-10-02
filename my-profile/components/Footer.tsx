"use client";

import React from "react";
import {
  BoltIcon,
  GithubIcon,
  BlogIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  ArrowDownIcon,
} from "./Icons";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full border-t-4 border-black dark:border-white bg-[#fffdf5] dark:bg-[#0c0e12] text-black dark:text-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b-3 border-black dark:border-white">
          <div className="flex items-center gap-3">
            <div className="flex h-11 items-center justify-center bg-[#ffe600] px-3 font-mono font-black text-black border-2 border-black shadow-[3px_3px_0px_#000]">
              <BoltIcon size={20} className="mr-1" />
              <span className="text-base sm:text-lg">SONGSOO.DEV</span>
            </div>
            <span className="font-mono text-xs font-bold text-zinc-500">
              EST. 2026 / SEOUL
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="neo-btn px-4 py-2 bg-white dark:bg-zinc-800 text-black dark:text-white font-mono font-bold text-xs self-start sm:self-auto"
          >
            <span>▲ 맨 위로 가기</span>
          </button>
        </div>

        {/* Middle Row: Massive Headline */}
        <div className="py-12 border-b-3 border-black dark:border-white">
          <p className="font-mono text-xs sm:text-sm font-black uppercase text-[#ff66c4] mb-2 tracking-widest">
            THE VIBE CODING MANIFESTO
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
            TURNING AMBITIOUS IDEAS INTO LIVING SOFTWARE.
          </h2>
        </div>

        {/* Bottom Columns */}
        <div className="pt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Col 1: Tech Badges (Col 7) */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="neo-badge bg-[#ffe600] text-black px-2.5 py-0.5 text-[11px]">
                Next.js 16.3.4
              </span>
              <span className="neo-badge bg-[#55f993] text-black px-2.5 py-0.5 text-[11px]">
                React 19.2.8
              </span>
              <span className="neo-badge bg-[#38bdf8] text-black px-2.5 py-0.5 text-[11px]">
                Tailwind CSS v4
              </span>
              <span className="neo-badge bg-[#c084fc] text-black px-2.5 py-0.5 text-[11px]">
                TypeScript
              </span>
              <span className="neo-badge bg-[#ff66c4] text-black px-2.5 py-0.5 text-[11px]">
                Neobrutalism
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-mono">
              Designed & Engineered with pair-programming intelligence. Hand-crafted for creators and builders.
            </p>
          </div>

          {/* Col 2: Social Icons (Col 5) */}
          <div className="md:col-span-5 flex md:justify-end items-center gap-2">
            {[
              { href: "https://github.com", icon: <GithubIcon size={18} />, label: "GitHub" },
              { href: "https://velog.io", icon: <BlogIcon size={18} />, label: "Blog" },
              { href: "https://instagram.com", icon: <InstagramIcon size={18} />, label: "Instagram" },
              { href: "https://linkedin.com", icon: <LinkedinIcon size={18} />, label: "LinkedIn" },
              { href: "mailto:songsoo@example.com", icon: <MailIcon size={18} />, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn h-10 w-10 bg-white dark:bg-zinc-800 text-black dark:text-white"
                title={s.label}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} SONGSOO (송수). ALL RIGHTS RESERVED.</p>
          <p>BUILT TO INSPIRE AND CONNECT 🚀</p>
        </div>

      </div>
    </footer>
  );
}
