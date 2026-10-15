"use client"

import * as React from "react"
import {
  GithubLogo,
  InstagramLogo,
  YoutubeLogo,
  EnvelopeSimple,
  Globe,
} from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileHeaderProps {
  displayName?: string
  bio?: string
  subtitle?: string
  avatarUrl?: string
}

export function ProfileHeader({
  displayName = "송슈 (Song-Wick)",
  subtitle = "Full-Stack Engineer & Tech Writer",
  bio = "코드로 가치를 만들고 기록합니다.",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=faces",
}: ProfileHeaderProps) {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/song-wick",
      icon: GithubLogo,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/songshoo",
      icon: InstagramLogo,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@SongsooJKim",
      icon: YoutubeLogo,
    },
    {
      name: "Website",
      url: "https://velog.io",
      icon: Globe,
    },
    {
      name: "Email",
      url: "mailto:contact@example.com",
      icon: EnvelopeSimple,
    },
  ]

  return (
    <header className="flex flex-col items-center text-center">
      {/* 80x80 Profile Avatar */}
      <div className="relative mb-4">
        <Avatar className="size-20 shadow-md ring-4 ring-background">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
            {displayName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name and Titles */}
      <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {displayName}
      </h1>
      {subtitle && (
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {subtitle}
        </p>
      )}
      {bio && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground/90">
          &ldquo;{bio}&rdquo;
        </p>
      )}

      {/* Social Links Bar */}
      <nav
        aria-label="소셜 링크"
        className="mt-4 flex items-center justify-center gap-2"
      >
        {socialLinks.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} 열기`}
              className="flex size-9 items-center justify-center rounded-full text-muted-foreground/80 transition-all hover:bg-muted hover:text-foreground active:scale-95"
            >
              <Icon className="size-5" weight="regular" />
            </a>
          )
        })}
      </nav>
    </header>
  )
}
