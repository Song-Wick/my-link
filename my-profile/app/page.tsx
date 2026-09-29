"use client";

import React, { useState } from "react";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkCard, LinkItem } from "@/components/LinkCard";
import { ProjectCard, ProjectItem } from "@/components/ProjectCard";
import { CheerSection } from "@/components/CheerSection";
import { QrModal } from "@/components/QrModal";
import { Toast } from "@/components/Toast";
import {
  GithubIcon,
  BlogIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  SparklesIcon,
} from "@/components/Icons";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"links" | "projects" | "about">("links");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      triggerToast("프로필 주소가 클립보드에 복사되었습니다! 🎉");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      triggerToast("링크 복사에 실패했습니다.");
    }
  };

  const links: LinkItem[] = [
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com",
      description: "@Song-Wick · 오픈소스 & 개인 학습 리포지토리",
      tag: "Code",
      gradient: "bg-linear-to-br from-zinc-700 to-zinc-900",
      icon: <GithubIcon size={22} />,
    },
    {
      id: "blog",
      name: "Tech Blog (Velog)",
      url: "https://velog.io",
      description: "TIL, 개발 회고 & 직장인의 바이브 코딩 성장 기록",
      tag: "Weekly",
      gradient: "bg-linear-to-br from-emerald-500 to-teal-700",
      icon: <BlogIcon size={22} />,
    },
    {
      id: "instagram",
      name: "Instagram",
      url: "https://instagram.com",
      description: "개발 라이프스타일, 데스크 셋업 & 일상 영감",
      tag: "Daily",
      gradient: "bg-linear-to-br from-purple-600 via-pink-600 to-amber-500",
      icon: <InstagramIcon size={22} />,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://linkedin.com",
      description: "커리어 이력, 기술 역량 & 비즈니스 네트워킹",
      tag: "Career",
      gradient: "bg-linear-to-br from-blue-600 to-indigo-700",
      icon: <LinkedinIcon size={22} />,
    },
    {
      id: "email",
      name: "Email (협업 및 커피챗)",
      url: "mailto:songsoo@example.com",
      description: "프로젝트 제안, 멘토링, 언제든 편하게 연락주세요",
      tag: "Contact",
      gradient: "bg-linear-to-br from-indigo-500 to-purple-600",
      icon: <MailIcon size={22} />,
    },
  ];

  const projects: ProjectItem[] = [
    {
      id: "my-link",
      title: "My Link (마이 링크)",
      description:
        "Next.js 16과 Tailwind CSS v4 기반의 반응형 통합 프로필 & 스마트 링크 매니저입니다.",
      status: "Live",
      tags: ["Next.js 16", "React 19", "Tailwind v4", "TypeScript"],
      link: "#",
      github: "https://github.com",
      emoji: "🔗",
    },
    {
      id: "ai-prompt-studio",
      title: "AI Vibe Prompt Studio",
      description:
        "개발자와 크리에이터를 위한 실무 프롬프트 템플릿과 워크플로우를 모아둔 생산성 도구입니다.",
      status: "Active",
      tags: ["AI Tools", "Automation", "Workflow"],
      link: "#",
      github: "https://github.com",
      emoji: "⚡",
    },
    {
      id: "office-bot",
      title: "직장인 업무 자동화 툴킷",
      description:
        "반복적인 데이터 가공 및 파일 정리를 클릭 한 번으로 끝내는 Node.js 기반 자동화 패키지입니다.",
      status: "Open Source",
      tags: ["Node.js", "CLI", "Productivity"],
      github: "https://github.com",
      emoji: "🤖",
    },
  ];

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden px-4 py-8 sm:py-16 transition-colors duration-500 ${theme === "dark" ? "dark bg-zinc-950 text-zinc-100" : "bg-slate-50 text-zinc-900"}`}>
      {/* Dynamic Background Glowing Orbs (Aurora Effect) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-pink-500/15 blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
        
        {/* Subtle grid pattern for tech feel */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Main Glassmorphism Card */}
      <main className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/80 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-zinc-800/80 dark:bg-zinc-900/75">
        {/* Profile Header */}
        <ProfileHeader
          onOpenQr={() => setIsQrOpen(true)}
          onShare={handleShare}
          copied={copied}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Tab Navigation */}
        <div className="mt-8 flex rounded-2xl bg-zinc-100/90 p-1 backdrop-blur-xs dark:bg-zinc-800/60">
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "links"
                ? "bg-white text-purple-700 shadow-xs dark:bg-zinc-700/80 dark:text-purple-300"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            주요 링크 ({links.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-white text-purple-700 shadow-xs dark:bg-zinc-700/80 dark:text-purple-300"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            프로젝트 ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "about"
                ? "bg-white text-purple-700 shadow-xs dark:bg-zinc-700/80 dark:text-purple-300"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            소개 & 가치
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6 min-h-[300px]">
          {/* TAB 1: LINKS */}
          {activeTab === "links" && (
            <div className="space-y-3 animate-fadeIn">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} onToast={triggerToast} />
              ))}
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-3.5 animate-fadeIn">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {activeTab === "about" && (
            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800/80 dark:bg-zinc-800/40 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
                <SparklesIcon size={18} className="text-purple-600 dark:text-purple-400" />
                <span>안녕하세요, 송수(Songsoo)입니다!</span>
              </div>
              <p>
                본업을 가진 직장인으로서, 최신 <strong>AI 페어 프로그래밍(바이브 코딩)</strong>과
                <strong> Next.js</strong> 생태계를 활용해 빠르고 단단한 웹 서비스를 만드는 여정을 걷고 있습니다.
              </p>
              <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-3 text-xs space-y-1">
                <p className="font-semibold text-purple-700 dark:text-purple-300">💡 저의 지향점</p>
                <p>• 작은 아이디어라도 실제로 동작하는 제품으로 세상에 선보이기</p>
                <p>• 단순 코딩을 넘어 사용자의 불편함을 해소하는 실용적인 유틸리티 구축</p>
                <p>• 배운 지식을 기술 블로그에 성실히 아카이빙하고 공유하기</p>
              </div>
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">커피챗 및 협업 문의</span>
                <a
                  href="mailto:songsoo@example.com"
                  className="font-medium text-purple-600 hover:underline dark:text-purple-400"
                >
                  songsoo@example.com
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Cheer Section (Bottom of Card) */}
        <CheerSection />

        {/* Footer */}
        <footer className="mt-8 border-t border-zinc-200/80 pt-5 text-center text-xs text-zinc-400 dark:border-zinc-800/80 dark:text-zinc-500">
          <p className="font-medium">
            Designed & Built with <span className="text-purple-500">Next.js 16</span> & <span className="text-cyan-500">Tailwind v4</span>
          </p>
          <p className="mt-1 text-[11px]">
            © {new Date().getFullYear()} Songsoo. All rights reserved.
          </p>
        </footer>
      </main>

      {/* QR Code Modal */}
      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        onCopy={handleShare}
        copied={copied}
      />

      {/* Toast Notification */}
      <Toast show={showToast} message={toastMessage} />
    </div>
  );
}
