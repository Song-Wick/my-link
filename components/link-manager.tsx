"use client"

import * as React from "react"
import defaultLinks, { type LinkItem, getFaviconUrl } from "@/data/links"
import { LinkCard } from "@/components/link-card"
import { AddLinkDialog } from "@/components/add-link-dialog"
import { ArrowsCounterClockwise, CheckCircle, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "my_link_local_items_v1"

// 외부 저장소(localStorage) 구독 리스너 관리
const listeners = new Set<() => void>()
function emitChange() {
  listeners.forEach((listener) => listener())
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback)
  }
  return () => {
    listeners.delete(callback)
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", callback)
    }
  }
}

// 스냅샷 캐싱 (useSyncExternalStore의 getSnapshot은 동일 상태 시 동일 참조 반환 권장)
let cachedRaw: string | null = null
let cachedLinks: LinkItem[] = defaultLinks

function getStoredLinks(): LinkItem[] {
  if (typeof window === "undefined") {
    return defaultLinks
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== cachedRaw) {
      cachedRaw = saved
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          cachedLinks = parsed
        } else {
          cachedLinks = defaultLinks
        }
      } else {
        cachedLinks = defaultLinks
      }
    }
    return cachedLinks
  } catch (e) {
    console.error("로컬 스토리지 링크 로드 실패:", e)
    return defaultLinks
  }
}

function getServerSnapshot(): LinkItem[] {
  return defaultLinks
}

export function LinkManager() {
  const isMounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

  const links = React.useSyncExternalStore(
    subscribe,
    getStoredLinks,
    getServerSnapshot
  )

  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  // 로컬 상태 저장
  const saveLinks = (newLinks: LinkItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLinks))
      emitChange()
    } catch (e) {
      console.error("로컬 스토리지 링크 저장 실패:", e)
    }
  }

  // 링크 추가 핸들러
  const handleAddLink = (
    newLinkData: Omit<LinkItem, "id" | "order" | "createdAt">
  ) => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: newLinkData.title,
      url: newLinkData.url,
      faviconUrl:
        newLinkData.faviconUrl || getFaviconUrl(newLinkData.url),
      order: 0, // 최상단에 배치
      isActive: true,
      createdAt: new Date().toISOString(),
    }

    // 기존 링크들의 order를 1씩 증가시키고 최상단에 새 링크 배치
    const updatedLinks = [
      newLink,
      ...links.map((item, idx) => ({ ...item, order: idx + 1 })),
    ]

    saveLinks(updatedLinks)

    // 성공 피드백 알림 표시
    setSuccessMessage(`'${newLink.title}' 링크가 성공적으로 추가되었습니다!`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3500)
  }

  // 기본 샘플 데이터로 복원
  const handleReset = () => {
    if (window.confirm("링크 목록을 기본 예시 데이터로 초기화하시겠습니까?")) {
      saveLinks(defaultLinks)
      setSuccessMessage("기본 링크 목록으로 초기화되었습니다.")
      setTimeout(() => setSuccessMessage(null), 3000)
    }
  }

  // 활성화 및 정렬된 목록
  const visibleLinks = React.useMemo(() => {
    return [...links]
      .filter((item) => item.isActive)
      .sort((a, b) => a.order - b.order)
  }, [links])

  return (
    <div className="flex w-full flex-col gap-4">
      {/* 액션 헤더 및 다이얼로그 트리거 */}
      <div className="flex flex-col gap-2.5">
        <AddLinkDialog onAddLink={handleAddLink} />

        {/* 성공 피드백 토스트 / 배너 */}
        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-3.5 py-2 text-xs font-medium text-primary duration-200 animate-in fade-in slide-in-from-top-1">
            <CheckCircle className="size-4 shrink-0" weight="fill" />
            <span className="truncate">{successMessage}</span>
          </div>
        )}
      </div>

      {/* 링크 목록 */}
      <div className="flex w-full flex-col gap-3">
        {visibleLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-12 text-center">
            <Sparkle className="size-8 text-muted-foreground/50" weight="duotone" />
            <p className="mt-2 text-sm font-medium text-foreground">등록된 링크가 없습니다</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              위의 &lsquo;새 링크 추가&rsquo; 버튼을 눌러 링크를 추가해보세요.
            </p>
          </div>
        ) : (
          visibleLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))
        )}
      </div>

      {/* 로컬 상태 테스트 안내 & 초기화 버튼 */}
      {isMounted && (
        <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground/70">
          <span>총 {visibleLinks.length}개의 링크 (로컬 상태 연동 중)</span>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleReset}
            className="h-6 gap-1 px-2 text-[11px] text-muted-foreground/70 hover:text-foreground"
          >
            <ArrowsCounterClockwise className="size-3" />
            샘플 초기화
          </Button>
        </div>
      )}
    </div>
  )
}
