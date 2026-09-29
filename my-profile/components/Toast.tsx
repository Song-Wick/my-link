"use client";

import React from "react";
import { CheckIcon } from "./Icons";

interface ToastProps {
  show: boolean;
  message: string;
}

export function Toast({ show, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-purple-500/30 bg-zinc-900/90 px-4 py-2.5 text-xs font-medium text-white shadow-xl backdrop-blur-md transition-all animate-bounce dark:bg-white/90 dark:text-zinc-900">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
        <CheckIcon size={12} />
      </span>
      <span>{message}</span>
    </div>
  );
}
