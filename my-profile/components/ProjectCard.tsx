"use client";

import React from "react";
import { ExternalLinkIcon, GithubIcon, ArrowUpRightIcon } from "./Icons";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Live" | "Open Source" | "Coming Soon";
  tags: string[];
  link?: string;
  github?: string;
  emoji: string;
  accentColor?: string;
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const accent = project.accentColor || "#ffe600";

  const getStatusColor = (status: ProjectItem["status"]) => {
    switch (status) {
      case "Live":
        return "bg-[#55f993] text-black";
      case "Active":
        return "bg-[#ffe600] text-black";
      case "Open Source":
        return "bg-[#c084fc] text-black";
      default:
        return "bg-zinc-300 text-black";
    }
  };

  return (
    <div className="neo-card bg-white dark:bg-[#1a1d24] flex flex-col justify-between overflow-hidden group">
      
      {/* Window Title Bar */}
      <div className="flex items-center justify-between border-b-3 border-black dark:border-white px-4 py-2 bg-zinc-100 dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-xl select-none">{project.emoji}</span>
          <span className="font-mono text-xs font-black tracking-wider uppercase text-zinc-700 dark:text-zinc-300">
            {project.id}.APP
          </span>
        </div>
        <span className={`neo-badge px-2 py-0.5 text-[10px] ${getStatusColor(project.status)}`}>
          ● {project.status}
        </span>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white group-hover:text-[#d946ef] transition-colors">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed">
            {project.description}
          </p>

          {/* Tech Tag Badges */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs font-bold px-2 py-0.5 border border-black bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-600 text-zinc-800 dark:text-zinc-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-3 py-1.5 text-xs bg-white dark:bg-zinc-800 text-black dark:text-white"
            >
              <GithubIcon size={14} className="mr-1.5" />
              <span>GitHub</span>
            </a>
          ) : (
            <div />
          )}

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn px-3.5 py-1.5 text-xs font-black"
              style={{ backgroundColor: accent, color: "#000" }}
            >
              <span>라이브 데모</span>
              <ArrowUpRightIcon size={14} className="ml-1" />
            </a>
          ) : (
            <span className="font-mono text-xs text-zinc-400">준비 중</span>
          )}
        </div>
      </div>
    </div>
  );
}
