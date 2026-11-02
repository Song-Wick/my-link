"use client"

import * as React from "react"
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import {
  CheckCircle,
  CloudCheck,
  Sparkle,
  WarningCircle,
} from "@phosphor-icons/react"
import { db } from "@/lib/firebase"
import { getFaviconUrl, type LinkItem } from "@/data/links"
import { LinkCard } from "@/components/link-card"
import { AddLinkDialog } from "@/components/add-link-dialog"

const ANONYMOUS_USER_ID = "anonymous"

function formatCreatedAt(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString()
  }
  if (typeof value === "string" && value.trim().length > 0) {
    return value
  }
  return new Date().toISOString()
}

export function LinkManager() {
  const [links, setLinks] = React.useState<LinkItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  )
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const successTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  const showSuccess = React.useCallback((msg: string) => {
    setErrorMessage(null)
    setSuccessMessage(msg)
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current)
    }
    successTimerRef.current = setTimeout(() => {
      setSuccessMessage(null)
    }, 3500)
  }, [])

  // Firestore users/anonymous/links 실시간 구독
  React.useEffect(() => {
    const linksRef = collection(db, "users", ANONYMOUS_USER_ID, "links")
    const linksQuery = query(linksRef, orderBy("order", "asc"))

    const unsubscribe = onSnapshot(
      linksQuery,
      (snapshot) => {
        const fetchedLinks: LinkItem[] = snapshot.docs.map((docSnap, idx) => {
          const data = docSnap.data()
          const url = typeof data.url === "string" ? data.url : ""
          return {
            id: docSnap.id,
            title: typeof data.title === "string" ? data.title : "제목 없음",
            url,
            faviconUrl:
              typeof data.faviconUrl === "string" && data.faviconUrl
                ? data.faviconUrl
                : getFaviconUrl(url),
            order: typeof data.order === "number" ? data.order : idx,
            isActive:
              typeof data.isActive === "boolean" ? data.isActive : true,
            createdAt: formatCreatedAt(data.createdAt),
          }
        })

        setLinks(fetchedLinks)
        setIsLoading(false)
        setErrorMessage(null)
      },
      (error) => {
        console.error("Firestore 링크 목록 구독 실패:", error)
        setErrorMessage(
          "링크 목록을 불러오는 중 오류가 발생했습니다. Firebase 설정 및 권한을 확인해주세요."
        )
        setIsLoading(false)
      }
    )

    return () => {
      unsubscribe()
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current)
      }
    }
  }, [])

  // 링크 추가 핸들러 (users/anonymous/links 경로에 저장 및 기존 order +1 배치 업데이트)
  const handleAddLink = async (
    newLinkData: Omit<LinkItem, "id" | "order" | "createdAt">
  ) => {
    setErrorMessage(null)

    try {
      const linksRef = collection(db, "users", ANONYMOUS_USER_ID, "links")
      const newDocRef = doc(linksRef)
      const batch = writeBatch(db)

      // 1. 신규 링크를 최상단(order: 0)으로 추가
      batch.set(newDocRef, {
        title: newLinkData.title,
        url: newLinkData.url,
        faviconUrl:
          newLinkData.faviconUrl || getFaviconUrl(newLinkData.url),
        order: 0,
        isActive: newLinkData.isActive ?? true,
        createdAt: serverTimestamp(),
      })

      // 2. 기존 링크들의 order를 1씩 증가시켜 순서 유지
      const sortedCurrentLinks = [...links].sort((a, b) => a.order - b.order)
      sortedCurrentLinks.forEach((item, idx) => {
        const existingDocRef = doc(
          db,
          "users",
          ANONYMOUS_USER_ID,
          "links",
          item.id
        )
        batch.update(existingDocRef, { order: idx + 1 })
      })

      await batch.commit()

      showSuccess(`'${newLinkData.title}' 링크가 성공적으로 추가되었습니다!`)
    } catch (error) {
      console.error("Firestore 링크 추가 실패:", error)
      setErrorMessage(
        "링크를 Firebase에 저장하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      )
      throw error
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

        {/* 에러 피드백 배너 */}
        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3.5 py-2 text-xs font-medium text-destructive duration-200 animate-in fade-in slide-in-from-top-1">
            <WarningCircle className="size-4 shrink-0" weight="fill" />
            <span className="truncate">{errorMessage}</span>
          </div>
        )}
      </div>

      {/* 링크 목록 */}
      <div className="flex w-full flex-col gap-3">
        {isLoading ? (
          <div
            className="flex flex-col gap-3"
            aria-busy="true"
            aria-label="링크 목록 불러오는 중"
          >
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex h-[74px] w-full animate-pulse items-center justify-between rounded-[24px] border border-border/50 bg-card/50 p-4.5"
              >
                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-xl bg-muted/70" />
                  <div className="h-4 w-36 rounded-md bg-muted/70" />
                </div>
                <div className="size-6 rounded-lg bg-muted/50" />
              </div>
            ))}
          </div>
        ) : visibleLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-12 text-center">
            <Sparkle
              className="size-8 text-muted-foreground/50"
              weight="duotone"
            />
            <p className="mt-2 text-sm font-medium text-foreground">
              등록된 링크가 없습니다
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              위의 &lsquo;새 링크 추가&rsquo; 버튼을 눌러 첫 번째 링크를 추가해보세요.
            </p>
          </div>
        ) : (
          visibleLinks.map((link) => <LinkCard key={link.id} link={link} />)
        )}
      </div>

      {/* Firebase 연동 상태 안내 */}
      {!isLoading && (
        <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-muted-foreground/70">
          <span>총 {visibleLinks.length}개의 링크</span>
          <span className="flex items-center gap-1">
            <CloudCheck className="size-3.5 text-primary/80" weight="duotone" />
            Firebase 실시간 연동 중 (users/anonymous/links)
          </span>
        </div>
      )}
    </div>
  )
}
