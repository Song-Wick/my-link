import * as React from "react"
import { LinkCard } from "@/components/link-card"
import defaultLinks, { LinkItem } from "@/data/links"
import { cn } from "@/lib/utils"

interface LinkListProps {
  items?: LinkItem[]
  className?: string
}

export function LinkList({ items = defaultLinks, className }: LinkListProps) {
  // 활성화된 링크만 order 순서대로 정렬
  const visibleLinks = React.useMemo(() => {
    return [...items]
      .filter((item) => item.isActive)
      .sort((a, b) => a.order - b.order)
  }, [items])

  if (visibleLinks.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        등록된 링크가 없습니다.
      </div>
    )
  }

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {visibleLinks.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  )
}
