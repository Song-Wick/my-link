"use client";

import React, { useState } from "react";
import { BoltIcon, SparklesIcon, CheckIcon } from "./Icons";

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
  bg: string;
}

interface StickyNote {
  id: string;
  author: string;
  message: string;
  time: string;
  color: string;
  rotate: string;
}

const INITIAL_REACTIONS: Reaction[] = [
  { id: "heart", emoji: "❤️", label: "응원해요", defaultCount: 42, bg: "#ff66c4" },
  { id: "coffee", emoji: "☕", label: "커피 한잔", defaultCount: 23, bg: "#ffe600" },
  { id: "fire", emoji: "🔥", label: "바이브 파이팅", defaultCount: 58, bg: "#ff9f1c" },
  { id: "rocket", emoji: "🚀", label: "멋진 성장", defaultCount: 39, bg: "#55f993" },
];

const INITIAL_NOTES: StickyNote[] = [
  {
    id: "1",
    author: "개발자A",
    message: "Neobrutalism 스타일 완성도 대박이네요! 🔥",
    time: "방금 전",
    color: "#ffe600",
    rotate: "rotate-[-2deg]",
  },
  {
    id: "2",
    author: "직장인 동료",
    message: "바이브 코딩으로 업무 자동화 툴 만든 것 정말 유용해요 ☕",
    time: "1시간 전",
    color: "#55f993",
    rotate: "rotate-[2deg]",
  },
  {
    id: "3",
    author: "웹 디자이너",
    message: "Next.js 16과 찰떡인 디자인! 응원하고 갑니다 ⭐",
    time: "오늘",
    color: "#ff66c4",
    rotate: "rotate-[-1deg]",
  },
];

export function CheerSection() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    heart: 42,
    coffee: 23,
    fire: 58,
    rocket: 39,
  });
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [counter, setCounter] = useState(0);

  // Sticky notes state
  const [notes, setNotes] = useState<StickyNote[]>(INITIAL_NOTES);
  const [authorInput, setAuthorInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffe600");
  const [noteSuccess, setNoteSuccess] = useState(false);

  const handleCheer = (id: string, emoji: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    const rect = e.currentTarget.getBoundingClientRect();
    const nextId = counter + 1;
    setCounter(nextId);
    const offset = (nextId % 20) - 10;

    const newEmoji: FloatingEmoji = {
      id: nextId,
      emoji,
      x: rect.left + rect.width / 2 - 14 + offset,
    };

    setFloatingEmojis((prev) => [...prev, newEmoji]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== nextId));
    }, 1200);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const rotates = ["rotate-[-2deg]", "rotate-[2deg]", "rotate-[-1deg]", "rotate-[3deg]"];
    const randomRotate = rotates[Math.floor(Math.random() * rotates.length)];

    const newNote: StickyNote = {
      id: Date.now().toString(),
      author: authorInput.trim() || "익명의 응원자",
      message: messageInput.trim(),
      time: "방금 전",
      color: selectedColor,
      rotate: randomRotate,
    };

    setNotes((prev) => [newNote, ...prev]);
    setMessageInput("");
    setAuthorInput("");
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 2000);
  };

  return (
    <section id="cheer" className="w-full py-16 sm:py-20 border-t-4 border-black dark:border-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-4 border-black dark:border-white pb-6 mb-10">
          <div>
            <div className="neo-badge bg-[#ffe600] text-black px-3 py-1 text-xs mb-3">
              <SparklesIcon size={14} className="text-black" />
              <span>INTERACTIVE CHEER & GUESTBOOK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-black dark:text-white">
              응원 & 방명록
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400">
            송수의 바이브 코딩 여정에 힘을 보태주세요! 클릭 리액션과 한 줄 메모를 남길 수 있습니다.
          </p>
        </div>

        {/* Top: 4 Big Reaction Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {INITIAL_REACTIONS.map((item) => {
            const currentCount = counts[item.id] ?? item.defaultCount;
            return (
              <button
                key={item.id}
                onClick={(e) => handleCheer(item.id, item.emoji, e)}
                className="neo-btn flex flex-col items-center justify-center p-5 text-black hover:-translate-y-1 transition-all cursor-pointer"
                style={{ backgroundColor: item.bg }}
                title={`${item.label} 누르기`}
              >
                <span className="text-3xl sm:text-4xl select-none mb-1 transform hover:scale-125 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight">
                  {item.label}
                </span>
                <span className="mt-1 font-mono text-xs sm:text-sm font-bold bg-black text-white px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_#fff]">
                  {currentCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom: Interactive Guestbook Board (Form + Sticky Notes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Note Input Form (lg:col-span-5) */}
          <div className="lg:col-span-5 neo-card bg-white dark:bg-[#1a1d24] p-6 text-black dark:text-white">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-dashed border-black dark:border-zinc-700">
              <BoltIcon size={18} className="text-[#ffe600]" />
              <h3 className="font-mono text-lg font-black uppercase">
                한 줄 응원 스티커 붙이기
              </h3>
            </div>

            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  작성자 닉네임 (선택)
                </label>
                <input
                  type="text"
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  placeholder="예: 송수팬 / 익명의 개발자"
                  maxLength={15}
                  className="w-full p-2.5 font-mono text-sm border-2 border-black dark:border-white bg-[#fdfbf7] dark:bg-zinc-800 text-black dark:text-white focus:outline-hidden shadow-[2px_2px_0px_#000]"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                  응원 메시지 *
                </label>
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="응원의 한마디 또는 피드백을 남겨주세요!"
                  rows={3}
                  maxLength={100}
                  required
                  className="w-full p-2.5 font-mono text-sm border-2 border-black dark:border-white bg-[#fdfbf7] dark:bg-zinc-800 text-black dark:text-white focus:outline-hidden shadow-[2px_2px_0px_#000] resize-none"
                />
              </div>

              {/* Color Picker */}
              <div>
                <label className="block font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-1.5">
                  포스트잇 색상
                </label>
                <div className="flex gap-2">
                  {["#ffe600", "#55f993", "#ff66c4", "#38bdf8", "#ff9f1c"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`h-7 w-7 border-2 border-black cursor-pointer transition-transform ${
                        selectedColor === color ? "scale-115 ring-2 ring-black dark:ring-white" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="neo-btn w-full py-3 bg-[#ffe600] text-black font-mono font-black text-sm uppercase"
              >
                {noteSuccess ? (
                  <span className="flex items-center justify-center gap-1.5 text-emerald-800">
                    <CheckIcon size={16} />
                    스티커가 보드에 붙었습니다!
                  </span>
                ) : (
                  <span>📌 보드에 스티커 붙이기</span>
                )}
              </button>
            </form>
          </div>

          {/* Sticky Notes Board (lg:col-span-7) */}
          <div className="lg:col-span-7 neo-card bg-[#fffdf5] dark:bg-[#15171d] p-6 min-h-[360px]">
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-black dark:border-white">
              <span className="font-mono text-xs font-black uppercase text-zinc-500">
                LIVE_STICKER_BOARD ({notes.length})
              </span>
              <span className="text-xs font-mono font-bold text-[#ff66c4]">
                ● REALTIME UPDATES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className={`neo-card-sm ${note.rotate} p-4 text-black flex flex-col justify-between min-h-[120px] transition-transform hover:rotate-0 hover:scale-102`}
                  style={{ backgroundColor: note.color }}
                >
                  <p className="font-medium text-xs sm:text-sm leading-relaxed">
                    "{note.message}"
                  </p>
                  <div className="mt-3 pt-2 border-t border-black/20 flex items-center justify-between font-mono text-[11px] font-bold">
                    <span>{note.author}</span>
                    <span className="opacity-70">{note.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Floating Particles Portal */}
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {floatingEmojis.map((item) => (
            <div
              key={item.id}
              className="animate-float-up absolute text-3xl select-none"
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
    </section>
  );
}
