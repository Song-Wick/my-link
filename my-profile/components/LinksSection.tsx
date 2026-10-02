"use client";

import React, { useState } from "react";
import { LinkCard, LinkItem } from "./LinkCard";
import {
  GithubIcon,
  BlogIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  SparklesIcon,
} from "./Icons";

interface LinksSectionProps {
  onToast: (msg: string) => void;
}

export function LinksSection({ onToast }: LinksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const links: LinkItem[] = [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com",
      category: "dev",
      handle: "@Song-Wick",
      description: "오픈소스 프로젝트, 바이브 코딩 유틸리티 & 개인 학습 리포지토리 모음입니다.",
      tag: "CODE / REPO",
      accentColor: "#ffe600",
      icon: <GithubIcon size={24} />,
    },
    {
      id: "blog",
      name: "Tech Blog (Velog)",
      url: "https://velog.io",
      category: "blog",
      handle: "@songsoo.dev",
      description: "Next.js 16, React 19 탐구와 AI 페어프로그래밍 실전 노하우를 주간 단위로 연재합니다.",
      tag: "WEEKLY BLOG",
      accentColor: "#55f993",
      icon: <BlogIcon size={24} />,
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com",
      category: "social",
      handle: "@vibe_coder",
      description: "개발자 데스크 셋업, 일상적인 생각, AI 개발 워크플로우 팁을 공유합니다.",
      tag: "DAILY & SETUP",
      accentColor: "#ff66c4",
      icon: <InstagramIcon size={24} />,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com",
      category: "contact",
      handle: "Songsoo (송수)",
      description: "직장인 이력, 비즈니스 네트워킹 및 기술 커리어 교류를 위한 프로페셔널 링크입니다.",
      tag: "CAREER / NETWORK",
      accentColor: "#38bdf8",
      icon: <LinkedinIcon size={24} />,
    },
    {
      id: "email",
      name: "Email (Direct)",
      url: "mailto:songsoo@example.com",
      category: "contact",
      handle: "songsoo@example.com",
      description: "프로젝트 협업, 기술 멘토링, 커피챗 문의는 언제든 환영합니다.",
      tag: "COFFEE CHAT",
      accentColor: "#c084fc",
      icon: <MailIcon size={24} />,
    },
    {
      id: "notion",
      name: "Notion Portfolio",
      url: "https://notion.so",
      category: "dev",
      handle: "Songsoo's Workspace",
      description: "지금까지 진행한 프로젝트의 아키텍처 상세 문서 및 작업 회고록입니다.",
      tag: "DOCS / ARCHIVE",
      accentColor: "#ff9f1c",
      icon: <SparklesIcon size={24} />,
    },
  ];

  const categories = [
    { id: "all", label: "전체 보기", count: links.length },
    { id: "dev", label: "개발 & 코드", count: links.filter((l) => l.category === "dev").length },
    { id: "blog", label: "기술 블로그", count: links.filter((l) => l.category === "blog").length },
    { id: "social", label: "소셜 & 일상", count: links.filter((l) => l.category === "social").length },
    { id: "contact", label: "협업 & 연락", count: links.filter((l) => l.category === "contact").length },
  ];

  const filteredLinks =
    activeCategory === "all"
      ? links
      : links.filter((item) => item.category === activeCategory);

  return (
    <section id="links" className="w-full py-16 sm:py-20 bg-[#fffdf5] dark:bg-[#15171d] border-t-4 border-black dark:border-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-white pb-6">
          <div>
            <div className="neo-badge bg-[#55f993] text-black px-3 py-1 text-xs mb-3">
              🔗 CURATED DIRECTORY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black dark:text-white">
              주요 링크 허브
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400">
            개발 활동, 기술 글, 소셜 네트워크 및 연락 채널을 한자리에서 탐색할 수 있습니다.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`neo-btn px-4 py-2 text-xs sm:text-sm font-mono font-black ${
                activeCategory === cat.id
                  ? "bg-[#ffe600] text-black shadow-[3px_3px_0px_#000]"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
              }`}
            >
              <span>{cat.label}</span>
              <span className="ml-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black px-1.5 py-0.2 text-[10px]">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Links Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} onToast={onToast} />
          ))}
        </div>

      </div>
    </section>
  );
}
