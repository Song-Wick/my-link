import type { Metadata } from "next"
import { ProfileHeader } from "@/components/profile-header"
import { LinkManager } from "@/components/link-manager"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "송슈 (Song-Wick) | My-Link",
  description:
    "소셜 미디어, 블로그, 포트폴리오 등 모든 링크를 한 곳에서 확인하세요.",
}

export default function HomePage() {
  return (
    <main className="flex min-h-svh w-full flex-col items-center justify-between px-4 py-12 selection:bg-primary/20 sm:py-16">
      {/* 중앙 정렬 컨테이너 (최대 가로폭 520px) */}
      <div className="flex w-full max-w-[520px] flex-col items-center gap-8">
        {/* 프로필 헤더 */}
        <ProfileHeader />

        {/* 링크 관리 및 목록 (다이얼로그 추가 기능 + Firebase Firestore 연동) */}
        <section aria-label="링크 목록" className="w-full">
          <LinkManager />
        </section>

        {/* 하단 푸터 (페이지 공유 및 Powered by) */}
        <Footer />
      </div>
    </main>
  )
}
