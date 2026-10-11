# [PRD] 링크트리 클론 서비스 "마이링크 (My-Link)" 기능 정의서

---

| 항목 | 내용 |
| :--- | :--- |
| **문서 버전** | v1.2.0 |
| **최종 수정일** | 2026-10-11 |
| **상태** | 확정 (Approved) |
| **작성자** | 마이링크 기획/개발팀 |
| **서비스 형태** | 1인 소유자 전용 관리자 패널 + 공개 프로필 링크 허브 |
| **디자인 시스템** | Tailwind CSS + shadcn/ui |
| **인프라 & BaaS** | Firebase (Auth - Google OAuth, Cloud Firestore, Cloud Storage) |

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1 프로젝트명
- **서비스명**: 마이링크 (My-Link)
- **영문 표기**: My-Link (Minimal Link-in-Bio Platform)

### 1.2 기획 배경 및 목적
- **배경**: 개발자 및 크리에이터가 GitHub, 기술 블로그, SNS, 포트폴리오 등 분산된 채널을 단 하나의 깔끔한 링크로 연결하고자 함. 군더더기 없는 링크 본연의 가치에 집중한 가볍고 빠른 링크트리 클론 서비스가 필요함.
- **목적**:
  1. **자동 파비콘 기반의 직관적인 링크 아이템**: 사용자가 URL을 등록하면 해당 도메인의 파비콘(Favicon)을 자동으로 추출·표시하여 시각적 인지성을 극대화.
  2. **1인 소유자 중심의 안전한 인증**: Firebase Google 소셜 로그인 및 관리자 이메일 화이트리스트를 통한 간결하고 안전한 관리자 보호.
  3. **쉬운 링크 순서 관리**: 드래그 앤 드롭(Drag & Drop)을 통한 직관적인 링크 배치 순서 변경.
  4. **shadcn/ui 기반의 모던하고 일관된 디자인**: 가볍고 세련된 UI와 라이트/다크 모드 지원.
  5. **서브 컬렉션 기반의 체계적인 NoSQL 데이터 구조**: 확장성과 보안을 갖춘 Firestore 모델링.

### 1.3 대상 사용자 (Target Audience)
- **소유자 (Admin / Owner)**:
  - 개인 SNS 프로필(X, 인스타그램, 깃허브 등)에 단 하나의 허브 링크를 걸어두고 관리하려는 1인 개발자 및 크리에이터.
- **방문자 (Visitors / End-User)**:
  - 마이링크 주소를 통해 소유자의 다양한 채널로 이동하려는 방문자.

---

## 2. 핵심 기능 목록 (Feature Matrix)

불필요한 부가 기능을 배제하고, 서비스 핵심 가치를 담은 **필수 기능(Must-Have)**에 집중합니다.

| 기능 ID | 기능명 | 중요도 | 세부 설명 |
| :--- | :--- | :---: | :--- |
| **F-PUB-01** | 공개 프로필 헤더 | P0 | 프로필 아바타, `displayName`, 한 줄 소개(Bio), 소셜 아이콘 바 렌더링 |
| **F-PUB-02** | 파비콘 자동 추출 링크 아이템 목록 | P0 | 등록된 URL의 도메인 파비콘을 자동 아이콘으로 표시하는 링크 카드 목록 |
| **F-PUB-03** | 모바일 퍼스트 반응형 레이아웃 | P0 | 모바일 최적화 뷰포트 및 데스크톱 센터 정렬 카드 뷰 |
| **F-AUTH-01** | Firebase Google 소셜 로그인 | P0 | Google OAuth 단독 원클릭 로그인 |
| **F-AUTH-02** | 관리자 이메일 화이트리스트 접근 제어 | P0 | 환경변수(`ADMIN_EMAIL`)와 일치하는 소유자만 `/admin` 접근 허용 |
| **F-ADM-01** | 프로필 및 링크 CRUD 관리 | P0 | 프로필 정보 수정 및 링크 아이템의 생성·수정·삭제·공개 토글 |
| **F-ADM-02** | 드래그 앤 드롭(DnD) 순서 재배치 | P0 | 관리자 화면에서 링크 아이템 순서를 직관적으로 드래그하여 변경 |
| **F-THM-01** | shadcn/ui 기반 테마 지원 | P1 | 다크/라이트 모드 지원 및 shadcn/ui 기반의 일관된 UI 시스템 |

---

## 3. 기능별 상세 명세 (Detailed Functional Requirements)

### 3.1 [공개 페이지] 프로필 및 파비콘 링크 허브 (`F-PUB-01` ~ `F-PUB-03`)

#### (1) 프로필 헤더 (`F-PUB-01`)
- **컴포넌트 (shadcn/ui)**: `Avatar`, `Badge`
- **표시 요소**:
  - **프로필 아바타**: 원형 이미지 (Firebase Storage 업로드 이미지 또는 Google 프로필 기본 이미지)
  - **표시 이름 (`displayName`)**: 강조된 타이포그래피로 표시 (필수값)
  - **한 줄 소개 (Bio)**: 최대 150자 이내의 자기소개 문구
  - **소셜 아이콘 바**: 주요 소셜 채널(GitHub, X/Twitter, LinkedIn, YouTube, Email) 바로가기 아이콘 버튼

#### (2) 자동 파비콘 링크 아이템 (`F-PUB-02`)
- **컴포넌트 (shadcn/ui)**: `Card`, `Button`
- **파비콘 자동 추출 메커니즘**:
  - 링크 URL 등록 시 도메인(hostname)을 파싱하여 파비콘 서비스(Google Favicon API: `https://www.google.com/s2/favicons?domain={domain}&sz=64`) 연동.
  - 파비콘 로드 실패 또는 미지원 도메인의 경우 Lucide의 기본 `Globe` 또는 `ExternalLink` 아이콘으로 자동 폴백(Fallback).
- **인터랙션**:
  - 좌측: 자동 추출된 파비콘 이미지 (20x20px ~ 24x24px, 둥근 모서리)
  - 중앙: 링크 타이틀 (`title`)
  - 우측: 외부 이동 표시 아이콘
  - 클릭 시 새 탭(`_blank`, `rel="noopener noreferrer"`)으로 안전하게 이동.
  - 호버 시 부드러운 스케일 업 및 보더 하이라이트 애니메이션.

#### (3) 모바일 퍼스트 레이아웃 (`F-PUB-03`)
- 모바일(360px~480px) 환경에서 최적의 원핸드 터치 영역(최소 48px 높이) 보장.
- 데스크톱에서는 최대 너비 540px의 중앙 집중형 카드 레이아웃으로 모던하게 렌더링.

---

### 3.2 [인증 & 보안] Firebase Google 소셜 로그인 (`F-AUTH-01`, `F-AUTH-02`)

- **인증 프로세스**:
  1. 관리자 접근 시 Google 로그인 팝업 호출(`signInWithPopup(auth, new GoogleAuthProvider())`).
  2. 인증 성공 후 반환된 계정의 이메일 주소를 검증.
  3. 사전에 지정된 관리자 이메일(`NEXT_PUBLIC_ADMIN_EMAIL`)과 일치할 경우에만 `/admin` 대시보드 진입 허용.
  4. 인가되지 않은 타 구글 계정일 경우 즉시 `signOut` 처리 및 접근 거부 안내 토스트(Toast) 노출.
- **보안 라우트 보호**:
  - Next.js 미들웨어 / Auth 가드 컴포넌트를 통해 미인증자의 `/admin` 직접 URL 접근 차단.

---

### 3.3 [관리자 패널] 프로필 & 링크 관리 (`F-ADM-01`, `F-ADM-02`)

- **UI 레이아웃**:
  - 모바일 라이브 프리뷰 없이, 작업에 집중할 수 있는 깔끔한 단일 컬럼 형태의 관리자 대시보드.
  - shadcn/ui `Tabs`를 활용한 영역 분리:
    - **[프로필 탭]**: `displayName`, `bio`, 아바타 이미지 업로드, 소셜 링크 입력 폼.
    - **[링크 탭]**: 링크 아이템 목록 및 신규 링크 추가 모달(`Dialog`).
- **링크 CRUD**:
  - **생성 (Add)**: 제목(`title`), 웹 주소(`url`) 입력 -> 파비콘 자동 미리보기 제공 -> 저장.
  - **수정 (Edit)**: 제목 및 주소 인라인/모달 수정.
  - **삭제 (Delete)**: 확인 팝업(`AlertDialog`) 후 안전하게 삭제.
  - **공개/숨김 (Toggle)**: shadcn/ui `Switch`로 공개 페이지 노출 여부 즉시 변경.
- **드래그 앤 드롭 (DnD) 순서 재배치 (`F-ADM-02`)**:
  - `@dnd-kit`을 적용하여 링크 항목 좌측의 드래그 핸들을 잡고 상하로 순서 이동.
  - 드래그 완료 시 해당 서브 컬렉션 문서들의 `order` 필드가 일괄 업데이트.

---

### 3.4 [디자인 시스템] shadcn/ui 테마 시스템 (`F-THM-01`)

- **컴포넌트 라이브러리**: Tailwind CSS + shadcn/ui
  - 사용 컴포넌트: `Button`, `Card`, `Avatar`, `Input`, `Textarea`, `Switch`, `Tabs`, `Dialog`, `AlertDialog`, `Toast (Sonner)`
- **테마 전환**:
  - `next-themes`를 통한 시스템 설정 연동 및 원클릭 라이트/다크 모드 토글.

---

## 4. 데이터베이스 모델링 (Firestore Sub-collection 구조)

Firestore의 **루트 `users` 컬렉션**과 **하위 `links` 서브 컬렉션**으로 계층을 구성하며, 사용자 문서에 `displayName` 필드를 필수 관리합니다.

### 4.1 계층 다이어그램

```text
/users/{userId} (Document: 사용자 프로필)
  ├── displayName: string (필수, 화면 표시명)
  ├── bio: string (소개글)
  ├── avatarUrl: string (프로필 이미지 URL)
  ├── socialLinks: {
  │     github?: string,
  │     twitter?: string,
  │     linkedin?: string,
  │     youtube?: string,
  │     email?: string
  │   }
  ├── themeMode: "light" | "dark" | "system"
  ├── updatedAt: timestamp
  │
  └── /links/{linkId} (Sub-collection: 등록된 링크 아이템들)
        ├── title: string (필수, 링크 명칭)
        ├── url: string (필수, 목적지 URL)
        ├── faviconUrl: string (자동 추출된 파비콘 URL)
        ├── order: number (정렬 순서)
        ├── isActive: boolean (공개 노출 여부)
        └── createdAt: timestamp
```

### 4.2 필드 세부 명세

#### (1) `users/{userId}` 문서
| 필드명 | 타입 | 필수 | 설명 |
| :--- | :--- | :---: | :--- |
| `displayName` | String | **필수** | 공개 페이지 최상단에 표시될 소유자 이름/닉네임 |
| `bio` | String | 선택 | 소유자 한 줄 소개 문구 |
| `avatarUrl` | String | 선택 | Firebase Storage에 업로드된 아바타 이미지 주소 |
| `socialLinks` | Map / Object | 선택 | 소셜 미디어 플랫폼별 URL 매핑 |
| `themeMode` | String | 선택 | 선호 테마 (`"light"`, `"dark"`, `"system"`) |
| `updatedAt` | Timestamp | 필수 | 최근 프로필 수정 일시 |

#### (2) `users/{userId}/links/{linkId}` 서브 컬렉션 문서
| 필드명 | 타입 | 필수 | 설명 |
| :--- | :--- | :---: | :--- |
| `title` | String | **필수** | 링크 버튼에 표시될 텍스트 (최대 50자) |
| `url` | String | **필수** | 실제 이동할 웹 주소 (`https://...`) |
| `faviconUrl` | String | **필수** | 도메인 기준 자동 추출된 파비콘 이미지 URL |
| `order` | Number | **필수** | 링크 목록 내 노출 순서 (0, 1, 2, ...) |
| `isActive` | Boolean | **필수** | 공개 페이지 노출 여부 (기본값: true) |
| `createdAt` | Timestamp | 필수 | 링크 최초 생성 일시 |

---

## 5. 비기능 요구사항 & 보안 (Non-Functional Requirements)

1. **Firestore 보안 규칙 (Security Rules)**:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // 공개 읽기는 모든 사용자 허용
       match /users/{userId} {
         allow read: if true;
         // 쓰기는 화이트리스트 관리자 계정만 허용
         allow write: if request.auth != null && 
                         request.auth.token.email == "관리자구글이메일@gmail.com";

         // 서브 컬렉션 links 보안 규칙
         match /links/{linkId} {
           allow read: if true;
           allow write: if request.auth != null && 
                           request.auth.token.email == "관리자구글이메일@gmail.com";
         }
       }
     }
   }
   ```
2. **파비콘 장애 내구성 (Fault Tolerance)**:
   - 외부 파비콘 서비스 장애나 특정 사이트의 파비콘 부재 시에도 UI가 깨지지 않도록 `<img onError={...} />` 핸들링을 통해 Fallback 아이콘으로 안전 전환.
3. **성능 & 웹 접근성**:
   - shadcn/ui 기반의 철저한 접근성 준수 (Tab 키 내비게이션, ARIA 속성).
   - Next.js App Router를 활용한 빠른 초기 로딩 및 SEO 메타 태그 완비.

---

## 6. 향후 산출물 연계 계획

- **사용자 시나리오 (`docs/user-scenarios.md`)**:
  - [방문자] 링크 허브 열람 및 파비콘 링크 클릭 이동 시나리오.
  - [관리자] Google 소셜 로그인 후 링크 추가(파비콘 자동 반영) 및 DnD 순서 변경 시나리오.
- **와이어프레임 (`docs/wireframes.md`)**:
  - 공개 프로필 페이지 (모바일/데스크톱 뷰 및 파비콘 링크 카드 UI).
  - 관리자 대시보드 뷰 (단일 컬럼 프로필 폼 & DnD 링크 관리 리스트).
