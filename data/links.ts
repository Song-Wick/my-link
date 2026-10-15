/**
 * 구글 파비콘 API 기반 파비콘 URL 생성 유틸리티
 * @docs/PRD.md 3.1 (2) 및 4.2 (2) 명세 준수
 */
export function getFaviconUrl(url: string, size = 64): string {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
  } catch {
    return `https://www.google.com/s2/favicons?domain=example.com&sz=${size}`
  }
}

/**
 * users/{userId}/links/{linkId} 서브 컬렉션 문서 구조 인터페이스
 * @docs/PRD.md 4.2 (2) 스키마 정의 반영
 */
export interface LinkItem {
  id: string
  title: string
  url: string
  faviconUrl: string
  order: number
  isActive: boolean
  createdAt: string
}

export const links: LinkItem[] = [
  {
    id: "link-1",
    title: "Instagram",
    url: "https://instagram.com/songshoo",
    faviconUrl: getFaviconUrl("https://instagram.com/songshoo"),
    order: 0,
    isActive: true,
    createdAt: "2026-10-15T00:00:00.000Z",
  },
  {
    id: "link-2",
    title: "YouTube",
    url: "https://youtube.com/@SongsooJKim",
    faviconUrl: getFaviconUrl("https://youtube.com/@SongsooJKim"),
    order: 1,
    isActive: true,
    createdAt: "2026-10-15T00:01:00.000Z",
  },
  {
    id: "link-3",
    title: "Blog",
    url: "https://velog.io/@username",
    faviconUrl: getFaviconUrl("https://velog.io/@username"),
    order: 2,
    isActive: true,
    createdAt: "2026-10-15T00:02:00.000Z",
  },
  {
    id: "link-4",
    title: "GitHub",
    url: "https://github.com/song-wick",
    faviconUrl: getFaviconUrl("https://github.com/song-wick"),
    order: 3,
    isActive: true,
    createdAt: "2026-10-15T00:03:00.000Z",
  },
  {
    id: "link-5",
    title: "Portfolio",
    url: "https://portfolio.example.com",
    faviconUrl: getFaviconUrl("https://portfolio.example.com"),
    order: 4,
    isActive: true,
    createdAt: "2026-10-15T00:04:00.000Z",
  },
]

export default links
