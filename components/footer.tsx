"use client"

import * as React from "react"
import { Check, Copy } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const [copied, setCopied] = React.useState(false)

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // fallback
    }
  }

  return (
    <footer className="mt-8 flex flex-col items-center justify-center gap-4 text-center">
      {/* Share / Copy Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="h-9 rounded-full px-4 text-xs font-medium text-muted-foreground transition-all hover:text-foreground"
      >
        {copied ? (
          <>
            <Check className="mr-1.5 size-3.5 text-primary" weight="bold" />
            링크가 복사되었습니다
          </>
        ) : (
          <>
            <Copy className="mr-1.5 size-3.5" />
            페이지 링크 복사
          </>
        )}
      </Button>

      {/* Powered by */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
        <span>Powered by</span>
        <span className="font-semibold tracking-tight text-foreground/80">
          My-Link
        </span>
      </div>
    </footer>
  )
}
