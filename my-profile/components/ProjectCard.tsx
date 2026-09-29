"use client";

import React from "react";
import { ExternalLinkIcon, GithubIcon } from "./Icons";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Live" | "Open Source" | "Coming Soon";
  tags: string[];
  link?: string;
  github?: string;
  emoji: string;
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const getStatusBadge = (status: ProjectItem["status"]) => {
    switch (status) {
      case "Live":
      case "Active":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20";
      case "Open Source":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 ring-zinc-500/20";
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white/70 p-4 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:bg-white hover:shadow-lg dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-purple-500/40">
      <div>
        {/* Header: Title & Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{project.emoji}</span>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {project.title}
            </h4>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${getStatusBadge(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-4 flex items-center justify-end gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800/60">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-purple-600 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-purple-400 transition-colors"
          >
            <span>방문하기</span>
            <ExternalLinkIcon size={12} />
          </a>
        )}
      </div>
    </div>
  );
}
