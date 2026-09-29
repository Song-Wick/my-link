"use client";

import React, { useState } from "react";
import { ExternalLinkIcon, CopyIcon, CheckIcon } from "./Icons";

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  handle?: string;
  description: string;
  tag?: string;
  gradient: string;
  icon: React.ReactNode;
}

interface LinkCardProps {
  link: LinkItem;
  onToast: (msg: string) => void;
}

export function LinkCard({ link, onToast }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    onToast(`'${link.name}' 링크가 복사되었습니다!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/80 p-3.5 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:bg-white hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-purple-500/40 dark:hover:bg-zinc-850 cursor-pointer"
    >
      {/* Accent glow on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

      {/* Icon with gradient badge */}
      <div
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${link.gradient}`}
      >
        {link.icon}
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
            {link.name}
          </span>
          {link.tag && (
            <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-purple-600 ring-1 ring-purple-500/20 dark:bg-purple-950/40 dark:text-purple-300">
              {link.tag}
            </span>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
          {link.description}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          title="링크 복사"
          aria-label="링크 복사"
        >
          {copied ? (
            <CheckIcon size={14} className="text-emerald-500" />
          ) : (
            <CopyIcon size={14} />
          )}
        </button>

        {/* External Link Arrow */}
        <div className="flex h-7 w-7 items-center justify-center text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-purple-600 dark:group-hover:text-purple-400">
          <ExternalLinkIcon size={15} />
        </div>
      </div>
    </a>
  );
}
