"use client";

import React from "react";
import { ProjectCard, ProjectItem } from "./ProjectCard";
import { StarIcon, GithubIcon } from "./Icons";

export function ProjectsSection() {
  const projects: ProjectItem[] = [
    {
      id: "my-link",
      title: "My Link (마이 링크 v2)",
      description:
        "Next.js 16, React 19 및 Tailwind CSS v4 기반의 초고속 Neobrutalism 반응형 프로필 & 스마트 링크 매니저입니다.",
      status: "Live",
      tags: ["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "Neobrutalism"],
      link: "#",
      github: "https://github.com",
      emoji: "🔗",
      accentColor: "#ffe600",
    },
    {
      id: "ai-prompt-studio",
      title: "AI Vibe Prompt Studio",
      description:
        "개발자와 1인 크리에이터를 위한 실무 프롬프트 템플릿과 워크플로우를 모아둔 오픈 생산성 도구입니다.",
      status: "Active",
      tags: ["AI Prompts", "Workflows", "Automation", "Next.js"],
      link: "#",
      github: "https://github.com",
      emoji: "⚡",
      accentColor: "#ff66c4",
    },
    {
      id: "office-bot",
      title: "직장인 업무 자동화 툴킷",
      description:
        "반복적인 데이터 정제, 엑셀 시트 취합 및 파일 정리 작업을 단 1초만에 끝내는 Node.js 기반 CLI 자동화 패키지입니다.",
      status: "Open Source",
      tags: ["Node.js", "CLI", "Automation", "OpenSource"],
      github: "https://github.com",
      emoji: "🤖",
      accentColor: "#55f993",
    },
    {
      id: "vibe-starter",
      title: "Vibe Coding Full-Starter",
      description:
        "Next.js 16 최신 App Router 및 ESLint 9 플랫 컨피그가 완비된 고속 프로토타이핑 전용 스타터 템플릿입니다.",
      status: "Coming Soon",
      tags: ["Template", "Turbopack", "React 19"],
      emoji: "🚀",
      accentColor: "#38bdf8",
    },
  ];

  return (
    <section id="projects" className="w-full py-16 sm:py-20 border-t-4 border-black dark:border-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-white pb-6">
          <div>
            <div className="neo-badge bg-[#38bdf8] text-black px-3 py-1 text-xs mb-3">
              <StarIcon size={14} className="text-black" />
              <span>FEATURED WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black dark:text-white">
              프로젝트 쇼케이스
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="max-w-md text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400">
              실무의 필요성과 호기심에서 출발해 완성한 대표 프로젝트들을 소개합니다.
            </p>
          </div>
        </div>

        {/* Project Cards Grid (2x2 on desktop, 1 on mobile) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 neo-card bg-[#ffe600] p-6 sm:p-8 text-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black uppercase">
              더 많은 실험과 코드가 궁금하신가요?
            </h3>
            <p className="text-sm font-medium text-zinc-800">
              GitHub 리포지토리에서 진행 중인 다양한 사이드 프로젝트와 유틸리티를 확인하세요.
            </p>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn px-6 py-3 bg-black text-white hover:bg-zinc-800 text-sm font-black shrink-0"
          >
            <GithubIcon size={18} className="mr-2" />
            GitHub 방문하기
          </a>
        </div>

      </div>
    </section>
  );
}
