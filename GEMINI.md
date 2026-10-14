# My-Link Development Guidelines (GEMINI.md)

## 1. Project Overview
- **Project Name**: My-Link
- **Description**: Lightweight Linktree clone service featuring a single-owner admin panel and a public profile link hub.
- **Key Features**:
  - Automatic favicon fetching via **Google Favicon API** (`https://www.google.com/s2/favicons?domain={domain}&sz=64`).
  - **Inline Editing** UX without modal popups for profile info and link items.
  - **Firebase Google OAuth** social login secured with an email whitelist (`NEXT_PUBLIC_ADMIN_EMAIL`).
  - **Firestore Sub-collection** architecture (`users/{userId}/links/{linkId}`).
  - Fixed single modern minimal style based on shadcn/ui (theme toggling excluded).

---

## 2. Tech Stack
- **Framework & Core**: Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5
- **Styling & UI**: Tailwind CSS v4, PostCSS, shadcn/ui, Phosphor Icons (`@phosphor-icons/react`), Base UI (`@base-ui/react`)
- **BaaS / Infrastructure**: Firebase (Auth, Cloud Firestore, Cloud Storage)
- **State & DnD**: React / `@dnd-kit`

---

## 3. Building and Running Commands

```bash
# Start development server
npm run dev

# Run TypeScript type check
npm run typecheck

# Run ESLint linter
npm run lint

# Format code with Prettier
npm run format

# Production build
npm run build

# Start production server
npm run start
```

---

## 4. Development Conventions & Rules

### 4.1 Language, Commit, and File Reference Rules
1. **Language**: Plans, tasks, code explanations, and agent responses must be written in **English** to optimize token usage.
2. **File Reference**: Always prefix file paths with `@` when referencing them in discussions or documents. (e.g., `@docs/PRD.md`, `@package.json`, `@app/page.tsx`)
3. **Commit Messages**: Write clear, detailed, and descriptive commit messages in English using standard prefixes (`feat:`, `fix:`, `docs:`, `refactor:`, `style:`, etc.).
4. **Git Staging**: Do NOT use `git add .`. Explicitly stage only changed or newly created files.

### 4.2 Quality Assurance & Type Safety
1. **Post-Development Verification**: Always run `npm run typecheck` and `npm run build` after completing code modifications to ensure no build or typing errors exist.
2. **Type Safety**: Maintain strict TypeScript typing and avoid using `any`.

### 4.3 Database Architecture & Data Modeling
- Firestore Hierarchy:
  - Owner Profile: `/users/{userId}` (`displayName`, `bio`, `avatarUrl`, `socialLinks`, `updatedAt`)
  - Links Sub-collection: `/users/{userId}/links/{linkId}` (`title`, `url`, `faviconUrl`, `order`, `isActive`, `createdAt`)

### 4.4 UI/UX Design Principles
- **Single Modern Minimal Specification**: Do not implement theme switching (dark/light mode); maintain a consistent modern minimal style using shadcn/ui.
- **Inline Editing**: Enable direct inline editing for nickname, bio, link title, and URL on click without opening modal dialogs.
- **Favicon Handling**: Automatically generate favicon URLs using Google Favicon API upon link insertion/update, with a fallback icon (`Globe`/`ExternalLink`) on image load failure.
