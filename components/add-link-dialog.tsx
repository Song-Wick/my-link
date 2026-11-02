"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Plus,
  Globe,
  ArrowUpRight,
  CircleNotch,
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
  onAddLink: (
    link: Omit<LinkItem, "id" | "order" | "createdAt">
  ) => Promise<void> | void
  trigger?: React.ReactNode
}

// 허용되지 않는 위험한 스킴 목록 (XSS 공격 방지)
const DISALLOWED_SCHEMES = [
  "javascript:",
  "data:",
  "vbscript:",
  "file:",
  "blob:",
  "about:",
]

// 표준 도메인 라벨 및 TLD(최소 2자 이상 영문) 검증 정규식
const DOMAIN_LABEL_REGEX =
  /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/

// IPv4 주소 검증 정규식
const IPV4_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

/**
 * URL 프로토콜 보정 헬퍼
 */
export function formatUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  if (!trimmed) return ""
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`
  }
  return trimmed
}

/**
 * Zod 링크 생성 폼 유효성 검사 스키마
 */
export const linkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "링크 제목을 입력해주세요.")
    .max(50, "제목은 최대 50자까지 입력 가능합니다."),
  url: z
    .string()
    .trim()
    .min(1, "URL 주소를 입력해주세요.")
    .superRefine((val, ctx) => {
      // 1. 공백 포함 검사
      if (/\s/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL 주소에 공백이 포함될 수 없습니다.",
        })
        return
      }

      // 2. 위험 스킴 검사 (XSS 방어)
      const lower = val.toLowerCase()
      for (const scheme of DISALLOWED_SCHEMES) {
        if (lower.startsWith(scheme)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "보안상 http 또는 https 주소만 입력 가능합니다.",
          })
          return
        }
      }

      // 3. 프로토콜 확인 및 자동 보정 검사
      const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(val)
      if (hasScheme && !/^https?:\/\//i.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "보안상 http 또는 https 주소만 입력 가능합니다.",
        })
        return
      }

      // 4. URL 객체 파싱
      const urlToParse = hasScheme ? val : `https://${val}`
      let parsed: URL
      try {
        parsed = new URL(urlToParse)
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "올바른 URL 형식(예: https://example.com)을 입력해주세요.",
        })
        return
      }

      // 5. 프로토콜 엄격 검사
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "보안상 http 또는 https 주소만 입력 가능합니다.",
        })
        return
      }

      // 6. 도메인 및 호스트네임 형식 검사
      const hostname = parsed.hostname.toLowerCase()
      if (hostname.length > 253) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "도메인 이름이 너무 깁니다 (최대 253자).",
        })
        return
      }

      const isDomainValid = DOMAIN_LABEL_REGEX.test(hostname)
      const isIpValid = IPV4_REGEX.test(hostname)

      if (!isDomainValid && !isIpValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "올바른 도메인 주소(예: naver.com, github.com)를 입력해주세요.",
        })
        return
      }

      // 7. 포트 번호 검사
      if (parsed.port) {
        const portNum = Number(parsed.port)
        if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "올바르지 않은 포트 번호입니다.",
          })
          return
        }
      }
    }),
})

export type LinkFormValues = z.infer<typeof linkFormSchema>

export function AddLinkDialog({ onAddLink, trigger }: AddLinkDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [previewFaviconError, setPreviewFaviconError] = React.useState(false)

  // React Hook Form + Zod 설정
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      url: "",
    },
  })

  // 실시간 입력값 구독
  const watchTitle = watch("title") || ""
  const watchUrl = watch("url") || ""

  // URL 변경 시 파비콘 에러 상태 리셋
  React.useEffect(() => {
    setPreviewFaviconError(false)
  }, [watchUrl])

  // URL 유효성 및 파비콘 실시간 계산
  const isUrlValid = Boolean(watchUrl.trim() && !errors.url)
  const formattedUrl = React.useMemo(() => {
    return isUrlValid ? formatUrl(watchUrl) : ""
  }, [isUrlValid, watchUrl])

  const previewFaviconUrl = React.useMemo(() => {
    if (!isUrlValid || !formattedUrl) return ""
    return getFaviconUrl(formattedUrl)
  }, [isUrlValid, formattedUrl])

  // 다이얼로그 열림/닫힘 제어
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      reset()
      setPreviewFaviconError(false)
    }
  }

  // 폼 제출 핸들러
  const onSubmit = async (data: LinkFormValues) => {
    const finalUrl = formatUrl(data.url)
    try {
      await onAddLink({
        title: data.title.trim(),
        url: finalUrl,
        faviconUrl: previewFaviconUrl || getFaviconUrl(finalUrl),
        isActive: true,
      })

      setOpen(false)
      reset()
      setPreviewFaviconError(false)
    } catch {
      // 상위 컴포넌트(LinkManager)에서 에러 메시지 상태 처리
    }
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

        <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex flex-col gap-5">
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
                {watchTitle.length}/50
              </span>
            </div>
            <Input
              id="link-title"
              type="text"
              placeholder="예: 내 기술 블로그, GitHub, 포트폴리오"
              maxLength={50}
              autoFocus
              disabled={isSubmitting}
              className={cn(
                "h-10 rounded-xl bg-background/80 px-3 text-sm ring-1 ring-border focus-visible:ring-2 focus-visible:ring-primary",
                errors.title && "ring-destructive focus-visible:ring-destructive"
              )}
              {...register("title")}
            />
            {errors.title?.message && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <WarningCircle className="size-3.5 shrink-0" weight="fill" />
                {errors.title.message}
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
              placeholder="https://velog.io/@username 또는 naver.com"
              disabled={isSubmitting}
              className={cn(
                "h-10 rounded-xl bg-background/80 px-3 text-sm ring-1 ring-border focus-visible:ring-2 focus-visible:ring-primary",
                errors.url && "ring-destructive focus-visible:ring-destructive"
              )}
              {...register("url")}
            />
            {errors.url?.message && (
              <p className="flex items-center gap-1 text-[11px] text-destructive">
                <WarningCircle className="size-3.5 shrink-0" weight="fill" />
                {errors.url.message}
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
                    {watchTitle.trim() || "링크 제목이 표시됩니다"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {isUrlValid && formattedUrl
                      ? formattedUrl
                      : "URL을 입력하면 파비콘이 자동 로드됩니다"}
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
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}
              className="rounded-xl"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="gap-1.5 rounded-xl font-medium"
            >
              {isSubmitting ? (
                <>
                  <CircleNotch className="size-4 animate-spin" weight="bold" />
                  <span>저장 및 갱신 중...</span>
                </>
              ) : (
                <span>링크 추가하기</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
