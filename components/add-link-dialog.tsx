"use client"

import * as React from "react"
import {
  Plus,
  Globe,
  ArrowUpRight,
  LinkSimple,
  TextT,
  WarningCircle,
} from "@phosphor-icons/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getFaviconUrl, type LinkItem } from "@/data/links"
import { cn } from "@/lib/utils"

interface AddLinkDialogProps {
  onAddLink: (link: Omit<LinkItem, "id" | "order" | "createdAt">) => void
  trigger?: React.ReactNode
}

function formatUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  if (!trimmed) return ""
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

function isValidUrl(rawUrl: string): boolean {
  try {
    const formatted = formatUrl(rawUrl)
    const parsed = new URL(formatted)
    return Boolean(parsed.hostname && parsed.hostname.includes("."))
  } catch {
    return false
  }
}

export function AddLinkDialog({ onAddLink, trigger }: AddLinkDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [touched, setTouched] = React.useState({ title: false, url: false })
  const [previewFaviconError, setPreviewFaviconError] = React.useState(false)

  // 폼 초기화
  const resetForm = React.useCallback(() => {
    setTitle("")
    setUrl("")
    setTouched({ title: false, url: false })
    setPreviewFaviconError(false)
  }, [])

  // 다이얼로그 열림/닫힘 제어
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      resetForm()
    }
  }

  // URL 및 파비콘 실시간 계산
  const formattedUrl = React.useMemo(() => formatUrl(url), [url])
  const isUrlValid = React.useMemo(() => isValidUrl(url), [url])
  const previewFaviconUrl = React.useMemo(() => {
    if (!isUrlValid) return ""
    return getFaviconUrl(formattedUrl)
  }, [formattedUrl, isUrlValid])

  // 유효성 에러 메시지
  const titleError = React.useMemo(() => {
    if (!touched.title) return null
    if (!title.trim()) return "링크 제목을 입력해주세요."
    if (title.length > 50) return "제목은 최대 50자까지 입력 가능합니다."
    return null
  }, [title, touched.title])

  const urlError = React.useMemo(() => {
    if (!touched.url) return null
    if (!url.trim()) return "URL 주소를 입력해주세요."
    if (!isUrlValid) return "올바른 URL 형식(예: https://example.com)을 입력해주세요."
    return null
  }, [url, isUrlValid, touched.url])

  const isFormValid =
    title.trim().length > 0 && title.length <= 50 && isUrlValid

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ title: true, url: true })

    if (!isFormValid) return

    onAddLink({
      title: title.trim(),
      url: formattedUrl,
      faviconUrl: previewFaviconUrl,
      isActive: true,
    })

    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button
              className="group h-11 w-full gap-2 rounded-2xl bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.99]"
              variant="default"
            />
          )
        }
      >
        <Plus
          className="size-4.5 transition-transform duration-200 group-hover:rotate-90"
          weight="bold"
        />
        <span>새 링크 추가</span>
      </DialogTrigger>

      <DialogContent className="max-w-md p-6 sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">새 링크 추가</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            공개 프로필에 노출될 새로운 링크 정보를 입력하세요. Google Favicon API를 통해 아이콘이 자동으로 생성됩니다.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5">
          {/* 1. 링크 제목 입력 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="link-title"
                className="flex items-center gap-1.5 text-xs font-medium text-foreground/80"
              >
                <TextT className="size-3.5 text-muted-foreground" weight="bold" />
                링크 제목 <span className="text-destructive">*</span>
              </label>
              <span className="text-[11px] text-muted-foreground">
                {title.length}/50
              </span>
            </div>
            <Input
              id="link-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
              placeholder="예: 내 기술 블로그, GitHub, 포트폴리오"
              maxLength={50}
              className={cn(
                "h-10 rounded-xl bg-background/80 px-3 text-sm ring-1 ring-border focus-visible:ring-2 focus-visible:ring-primary",
                titleError && "ring-destructive focus-visible:ring-destructive"
              )}
              autoFocus
            />
            {titleError && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <WarningCircle className="size-3.5 shrink-0" weight="fill" />
                {titleError}
              </p>
            )}
          </div>

          {/* 2. 웹사이트 주소 URL 입력 */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="link-url"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground/80"
            >
              <LinkSimple className="size-3.5 text-muted-foreground" weight="bold" />
              웹 주소 (URL) <span className="text-destructive">*</span>
            </label>
            <Input
              id="link-url"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
                setPreviewFaviconError(false)
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, url: true }))}
              placeholder="https://velog.io/@username 또는 naver.com"
              className={cn(
                "h-10 rounded-xl bg-background/80 px-3 text-sm ring-1 ring-border focus-visible:ring-2 focus-visible:ring-primary",
                urlError && "ring-destructive focus-visible:ring-destructive"
              )}
            />
            {urlError && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <WarningCircle className="size-3.5 shrink-0" weight="fill" />
                {urlError}
              </p>
            )}
          </div>

          {/* 3. 실시간 파비콘 & 카드 미리보기 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                실시간 미리보기
              </span>
              {isUrlValid && (
                <span className="text-[11px] text-primary">
                  파비콘 자동 감지 완료
                </span>
              )}
            </div>

            <div className="relative flex items-center justify-between rounded-2xl border border-border/80 bg-muted/40 p-3.5 transition-all">
              <div className="flex min-w-0 items-center gap-3 pr-2">
                {/* Favicon Container */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background p-1.5 text-muted-foreground shadow-xs ring-1 ring-border/60">
                  {isUrlValid && previewFaviconUrl && !previewFaviconError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={previewFaviconUrl}
                      src={previewFaviconUrl}
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 object-contain"
                      onError={() => setPreviewFaviconError(true)}
                    />
                  ) : (
                    <Globe className="size-5 text-muted-foreground/70" weight="duotone" />
                  )}
                </div>

                {/* Title & Hostname */}
                <div className="flex min-w-0 flex-col text-left">
                  <span className="truncate text-sm font-medium text-foreground">
                    {title.trim() || "링크 제목이 표시됩니다"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {isUrlValid ? formattedUrl : "URL을 입력하면 파비콘이 자동 로드됩니다"}
                  </span>
                </div>
              </div>

              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground/60">
                <ArrowUpRight className="size-4" weight="bold" />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="rounded-xl"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="rounded-xl font-medium"
            >
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
