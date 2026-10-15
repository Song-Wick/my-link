"use client"

import * as React from "react"
import { ArrowUpRight, Globe } from "@phosphor-icons/react"
import { Card } from "@/components/ui/card"
import type { LinkItem } from "@/data/links"
import { cn } from "@/lib/utils"

interface LinkCardProps {
  link: LinkItem
  className?: string
}

export function LinkCard({ link, className }: LinkCardProps) {
  const [imgError, setImgError] = React.useState(false)

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full rounded-[min(var(--radius-4xl),24px)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${link.title} 새 탭에서 열기`}
    >
      <Card
        className={cn(
          "relative flex flex-row items-center justify-between border-border/60 bg-card/80 p-4.5 backdrop-blur-sm transition-all duration-200",
          "hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-accent/40 hover:shadow-md",
          "active:translate-y-0 active:scale-[0.99]",
          className
        )}
      >
        <div className="flex min-w-0 items-center gap-3.5 pr-2">
          {/* Favicon Container */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted/60 p-2 text-muted-foreground ring-1 ring-border/40 transition-colors group-hover:bg-background group-hover:ring-border/80">
            {!imgError && link.faviconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={link.faviconUrl}
                alt=""
                width={20}
                height={20}
                className="size-5 object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <Globe className="size-5" weight="duotone" />
            )}
          </div>

          {/* Title */}
          <div className="flex min-w-0 flex-col text-left">
            <span className="truncate text-base font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
              {link.title}
            </span>
          </div>
        </div>

        {/* External Link Icon */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground">
          <ArrowUpRight className="size-4.5" weight="bold" />
        </div>
      </Card>
    </a>
  )
}
