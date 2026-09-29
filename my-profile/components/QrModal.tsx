"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { CopyIcon, CheckIcon } from "./Icons";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
}

export function QrModal({ isOpen, onClose, onCopy, copied }: QrModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all dark:border-zinc-800 dark:bg-zinc-900/95 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-purple-500/50 shadow-md mb-3">
            <Image
              src="/avatar.jpg"
              alt="Songsoo Profile"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            송수의 프로필 QR코드
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            스마트폰 카메라로 스캔하여 바로 접속하세요
          </p>
        </div>

        {/* QR Code Container */}
        <div className="my-6 flex justify-center">
          <div className="relative rounded-2xl border border-zinc-200 bg-white p-4 shadow-inner dark:border-zinc-700">
            <svg
              className="h-44 w-44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner 1 */}
              <rect x="10" y="10" width="24" height="24" rx="4" fill="#0f172a" />
              <rect x="14" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="18" width="8" height="8" rx="1.5" fill="#7c3aed" />

              {/* Corner 2 */}
              <rect x="66" y="10" width="24" height="24" rx="4" fill="#0f172a" />
              <rect x="70" y="14" width="16" height="16" rx="2" fill="white" />
              <rect x="74" y="18" width="8" height="8" rx="1.5" fill="#7c3aed" />

              {/* Corner 3 */}
              <rect x="10" y="66" width="24" height="24" rx="4" fill="#0f172a" />
              <rect x="14" y="70" width="16" height="16" rx="2" fill="white" />
              <rect x="18" y="74" width="8" height="8" rx="1.5" fill="#7c3aed" />

              {/* QR Pattern Dots */}
              <rect x="40" y="12" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="50" y="12" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="44" y="24" width="6" height="6" rx="1.5" fill="#7c3aed" />
              <rect x="54" y="22" width="6" height="6" rx="1.5" fill="#0f172a" />

              <rect x="12" y="42" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="22" y="44" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="16" y="52" width="6" height="6" rx="1.5" fill="#7c3aed" />

              <rect x="40" y="40" width="8" height="8" rx="2" fill="#7c3aed" />
              <rect x="52" y="40" width="8" height="8" rx="2" fill="#0f172a" />
              <rect x="40" y="52" width="8" height="8" rx="2" fill="#0f172a" />
              <rect x="52" y="52" width="8" height="8" rx="2" fill="#7c3aed" />

              <rect x="70" y="42" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="80" y="46" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="74" y="54" width="6" height="6" rx="1.5" fill="#7c3aed" />

              <rect x="40" y="68" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="50" y="70" width="6" height="6" rx="1.5" fill="#7c3aed" />
              <rect x="44" y="80" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="54" y="80" width="6" height="6" rx="1.5" fill="#0f172a" />

              <rect x="70" y="70" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="80" y="72" width="6" height="6" rx="1.5" fill="#7c3aed" />
              <rect x="72" y="82" width="6" height="6" rx="1.5" fill="#0f172a" />
              <rect x="82" y="82" width="6" height="6" rx="1.5" fill="#0f172a" />
            </svg>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onCopy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-purple-700 active:scale-98 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <CheckIcon size={16} />
              링크 복사 완료!
            </>
          ) : (
            <>
              <CopyIcon size={16} />
              프로필 링크 복사
            </>
          )}
        </button>
      </div>
    </div>
  );
}
