"use client";

import React, { useEffect } from "react";
import { CopyIcon, CheckIcon, CloseIcon, BoltIcon } from "./Icons";

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
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Window */}
      <div className="relative w-full max-w-sm neo-card bg-[#fffdf5] dark:bg-[#1a1d24] text-black dark:text-white p-0 shadow-[8px_8px_0px_#000] dark:shadow-[8px_8px_0px_#fff] overflow-hidden z-10">
        
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b-3 border-black dark:border-white bg-[#ffe600] px-4 py-2.5 text-black">
          <div className="flex items-center gap-2">
            <BoltIcon size={16} />
            <span className="font-mono text-xs font-black tracking-wider uppercase">
              QR_CONNECT.POPUP
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <CloseIcon size={14} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 text-center">
          <div className="neo-badge bg-[#55f993] text-black px-3 py-1 text-xs mb-3">
            SMARTPHONE SCAN
          </div>
          
          <h3 className="text-xl font-black text-black dark:text-white">
            송수의 프로필 QR코드
          </h3>
          <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            스마트폰 카메라로 스캔하여 모바일 환경에서 바로 접속하세요.
          </p>

          {/* QR Code Graphic */}
          <div className="my-6 flex justify-center">
            <div className="neo-card bg-white p-4">
              <svg
                className="h-44 w-44"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Corner 1 */}
                <rect x="10" y="10" width="24" height="24" fill="#000" />
                <rect x="14" y="14" width="16" height="16" fill="#fff" />
                <rect x="18" y="18" width="8" height="8" fill="#ffe600" />

                {/* Corner 2 */}
                <rect x="66" y="10" width="24" height="24" fill="#000" />
                <rect x="70" y="14" width="16" height="16" fill="#fff" />
                <rect x="74" y="18" width="8" height="8" fill="#ffe600" />

                {/* Corner 3 */}
                <rect x="10" y="66" width="24" height="24" fill="#000" />
                <rect x="14" y="70" width="16" height="16" fill="#fff" />
                <rect x="18" y="74" width="8" height="8" fill="#ffe600" />

                {/* QR Pattern Dots */}
                <rect x="40" y="12" width="6" height="6" fill="#000" />
                <rect x="50" y="12" width="6" height="6" fill="#ff66c4" />
                <rect x="44" y="24" width="6" height="6" fill="#000" />
                <rect x="54" y="22" width="6" height="6" fill="#55f993" />

                <rect x="12" y="42" width="6" height="6" fill="#000" />
                <rect x="22" y="44" width="6" height="6" fill="#ff66c4" />
                <rect x="16" y="52" width="6" height="6" fill="#000" />

                <rect x="40" y="40" width="8" height="8" fill="#000" />
                <rect x="52" y="40" width="8" height="8" fill="#ffe600" />
                <rect x="40" y="52" width="8" height="8" fill="#55f993" />
                <rect x="52" y="52" width="8" height="8" fill="#000" />

                <rect x="70" y="42" width="6" height="6" fill="#000" />
                <rect x="80" y="46" width="6" height="6" fill="#ff66c4" />
                <rect x="74" y="54" width="6" height="6" fill="#000" />

                <rect x="40" y="68" width="6" height="6" fill="#55f993" />
                <rect x="50" y="70" width="6" height="6" fill="#000" />
                <rect x="44" y="80" width="6" height="6" fill="#ff66c4" />
                <rect x="54" y="80" width="6" height="6" fill="#000" />

                <rect x="70" y="70" width="6" height="6" fill="#000" />
                <rect x="80" y="72" width="6" height="6" fill="#ffe600" />
                <rect x="72" y="82" width="6" height="6" fill="#000" />
                <rect x="82" y="82" width="6" height="6" fill="#000" />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="neo-btn flex-1 py-2.5 bg-[#ffe600] text-black font-mono font-black text-xs uppercase"
            >
              {copied ? (
                <>
                  <CheckIcon size={14} className="mr-1.5" />
                  복사됨!
                </>
              ) : (
                <>
                  <CopyIcon size={14} className="mr-1.5" />
                  링크 복사
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="neo-btn px-4 py-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-mono font-bold text-xs"
            >
              닫기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
