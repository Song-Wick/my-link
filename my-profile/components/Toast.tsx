"use client";

import React from "react";
import { BoltIcon } from "./Icons";

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="neo-card bg-[#ffe600] px-4 py-3 text-black font-mono font-black text-xs sm:text-sm flex items-center gap-2 shadow-[4px_4px_0px_#000]">
        <BoltIcon size={18} className="shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}
