# 마이링크 (My-Link) 개발 지침 (GEMINI.md)

## 1. 프로젝트 개요 (Project Overview)
- **프로젝트명**: 마이링크 (My-Link)
- **설명**: 1인 소유자 전용 관리자 패널과 공개 프로필 링크 허브를 제공하는 초경량 링크트리 클론 서비스.
- **주요 특징**:
  - **Google Favicon API** 기반 자동 파비콘 연동 (`https://www.google.com/s2/favicons?domain={domain}&sz=64`).
  - 모달 없는 **화면 내 즉시 수정 (인라인 편집, Inline Editing)** UX.
  - **Firebase Google OAuth** 소셜 로그인 및 이메일 화이트리스트(`NEXT_PUBLIC_ADMIN_EMAIL`) 기반 1인 관리자 보안.
  - **Firestore 서브 컬렉션** 아키텍처 (`users/{userId}/links/{linkId}`).
  - shadcn/ui 기반 단일 모던 미니멀 스타일 (테마 변경 기능 제외).

---

## 2. 주요 기술 스택 (Tech Stack)
- **Framework & Core**: Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5
- **Styling & UI**: Tailwind CSS v4, PostCSS, shadcn/ui, Phosphor Icons (`@phosphor-icons/react`), Base UI (`@base-ui/react`)
- **BaaS / Infrastructure**: Firebase (Auth, Cloud Firestore, Cloud Storage)
- **State & DnD**: React / `@dnd-kit`

---

## 3. 빌드 및 실행 명령어 (Building and Running)

```bash
# 개발 서버 실행
npm run dev

# 타입 체크 (TypeScript)
npm run typecheck

# 코드 린트 (ESLint)
npm run lint

# 코드 포맷팅 (Prettier)
npm run format

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

---

## 4. 개발 컨벤션 및 작업 규칙 (Development Conventions)

### 4.1 Language, Commit, and File Reference Rules
1. **Language**: Plans, tasks, code explanations, and responses should be written in **English** to optimize token usage.
2. **File Reference**: Always prefix file paths with `@` when referencing them in discussions or documents. (e.g., `@docs/PRD.md`, `@package.json`, `@app/page.tsx`)
3. **Commit Messages**: Use detailed and descriptive commit messages with standard prefixes (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, etc.) in English or Korean as appropriate.
4. **Git Staging**: Avoid using `git add .`. Explicitly stage only changed or newly created files.

### 4.2 검증 및 품질
1. **작업 후 검증**: 모든 개발 작업이 완료된 후에는 반드시 `npm run typecheck` 및 `npm run build`를 수행하여 오류가 없는지 검증합니다.
2. **타입 안전성**: TypeScript의 엄격한 타입을 유지하며 `any` 타입 사용을 지양합니다.

### 4.3 데이터 모델 및 데이터베이스 규칙
- Firestore 계층 구조:
  - 프로필: `/users/{userId}` (`displayName`, `bio`, `avatarUrl`, `socialLinks`, `updatedAt`)
  - 링크 서브 컬렉션: `/users/{userId}/links/{linkId}` (`title`, `url`, `faviconUrl`, `order`, `isActive`, `createdAt`)

### 4.4 UI/UX 디자인 원칙
- **단일 모던 미니멀 스펙**: 별도의 다크/라이트 테마 변경 기능을 제공하지 않고 일관된 shadcn/ui 기반 스타일을 유지합니다.
- **인라인 편집**: 관리자 페이지에서 닉네임, Bio, 링크 제목 및 URL을 클릭 시 모달 없이 그 자리에서 즉시 수정할 수 있도록 개발합니다.
- **파비콘 연동**: URL 등록/수정 시 Google Favicon API를 파싱하여 적용하며, 실패 시 Fallback 아이콘(`Globe`/`ExternalLink`)을 처리합니다.
