"use client";

import React, { useState } from "react";
import { ExternalLinkIcon, CopyIcon, CheckIcon } from "./Icons";

export interface LinkItem {
  id: string;
  name: string;
  url: string;
  category: "dev" | "blog" | "social" | "contact";
  handle?: string;
  description: string;
  tag: string;
  accentColor: string; // e.g. '#ffe600', '#55f993', '#ff66c4', '#38bdf8', '#c084fc', '#ff9f1c'
  textColor?: string;
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
    onToast(`'${link.name}' 주소가 복사되었습니다! 📋`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between neo-box bg-white dark:bg-[#1a1d24] p-5 text-black dark:text-white cursor-pointer"
      style={{
        borderLeftWidth: "6px",
        borderLeftColor: link.accentColor,
      }}
    >
      <div>
        {/* Top Header: Tag & Copy Button */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="neo-badge px-2 py-0.5 text-[10px] text-black"
            style={{ backgroundColor: link.accentColor }}
          >
            {link.tag}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex h-7 w-7 items-center justify-center border-2 border-black bg-white dark:bg-zinc-800 text-black dark:text-white hover:bg-[#ffe600] dark:hover:bg-[#ffe600] dark:hover:text-black transition-colors"
              title="링크 주소 복사"
              aria-label="링크 복사"
            >
              {copied ? (
                <CheckIcon size={14} className="text-emerald-600" />
              ) : (
                <CopyIcon size={13} />
              )}
            </button>

            <span className="flex h-7 w-7 items-center justify-center border-2 border-black bg-black text-white dark:bg-white dark:text-black group-hover:bg-[#ffe600] group-hover:text-black transition-colors">
              <ExternalLinkIcon size={13} />
            </span>
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black text-black shadow-[2px_2px_0px_#000] dark:border-white dark:shadow-[2px_2px_0px_#fff]"
            style={{ backgroundColor: link.accentColor }}
          >
            {link.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-mono text-lg font-black text-black dark:text-white truncate group-hover:text-[#d946ef] transition-colors">
              {link.name}
            </h3>
            {link.handle && (
              <span className="font-mono text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {link.handle}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
          {link.description}
        </p>
      </div>

      {/* Card Footer URL preview */}
      <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
        <span className="truncate max-w-[200px]">{link.url.replace(/^https?:\/\//, "")}</span>
        <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
  );
}
