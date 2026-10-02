"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MarqueeBanner } from "@/components/MarqueeBanner";
import { BentoStats } from "@/components/BentoStats";
import { LinksSection } from "@/components/LinksSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CheerSection } from "@/components/CheerSection";
import { Footer } from "@/components/Footer";
import { QrModal } from "@/components/QrModal";
import { Toast } from "@/components/Toast";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");

  // Synchronize theme on client mount
  useEffect(() => {
    // Default to dark or check system preference
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

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

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#fdfbf7] dark:bg-[#111317] text-black dark:text-white transition-colors duration-200 bg-grid-pattern">
      {/* Top Brutalist Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenQr={() => setIsQrOpen(true)}
        onShare={handleShare}
        copied={copied}
      />

      {/* Main Full Landing Content */}
      <main className="flex-1 w-full">
        {/* 1. Hero Section (NO PROFILE IMAGE, Typography & Retro Window) */}
        <HeroSection onToast={triggerToast} />

        {/* 2. Infinite Marquee Ticker */}
        <MarqueeBanner />

        {/* 3. Bento Grid: Philosophy & Metrics */}
        <BentoStats />

        {/* 4. Curated Links Hub with Category Filter */}
        <LinksSection onToast={triggerToast} />

        {/* 5. Projects Showcase */}
        <ProjectsSection />

        {/* 6. Tech Stack & Sticker Wall */}
        <TechStackSection />

        {/* 7. Interactive Cheer & Guestbook */}
        <CheerSection />
      </main>

      {/* Footer */}
      <Footer />

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
