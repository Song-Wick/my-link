# [PRD] 링크트리 클론 서비스 "마이링크 (My-Link)" 기능 정의서

---

| 항목 | 내용 |
| :--- | :--- |
| **문서 버전** | v1.3.0 |
| **최종 수정일** | 2026-10-11 |
| **상태** | 확정 (Approved) |
| **작성자** | 마이링크 기획/개발팀 |
| **서비스 형태** | 1인 소유자 전용 관리자 패널 + 공개 프로필 링크 허브 |
| **디자인 시스템** | Tailwind CSS + shadcn/ui (단일 모던 미니멀 스타일 고정) |
| **인프라 & BaaS** | Firebase (Auth - Google OAuth, Cloud Firestore, Cloud Storage) |

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1 프로젝트명
- **서비스명**: 마이링크 (My-Link)
- **영문 표기**: My-Link (Minimal Link-in-Bio Platform)

### 1.2 기획 배경 및 목적
- **배경**: 여러 SNS와 포트폴리오를 단 하나의 깔끔한 허브로 연결하며, 복잡한 테마 설정이나 번거로운 팝업 창 없이 본질적인 정보(프로필, 닉네임, 링크)를 빠르고 직관적으로 관리할 수 있는 초경량 링크트리 클론 서비스.
- **목적**:
  1. **구글 파비콘 API 기반 자동 아이콘**: URL 입력 시 Google Favicon API(`https://www.google.com/s2/favicons?domain={domain}&sz=64`)를 활용해 해당 사이트의 파비콘을 자동으로 불러와 시각적 직관성 부여.
  2. **화면 내 즉시 수정 (인라인 편집)**: 모달(팝업) 창을 띄우지 않고, 대시보드 화면 상에서 프로필, 닉네임(`displayName`), 링크 텍스트/URL을 직접 클릭하여 즉시 수정·저장하는 신속한 편집 경험 제공.
  3. **1인 소유자 보안**: Firebase Google 소셜 로그인과 관리자 이메일 화이트리스트를 통한 확실한 1인 관리자 보호.
  4. **순수 링크 중심의 미니멀리즘**: 불필요한 테마 변경 기능을 배제하고, shadcn/ui 기반의 완성도 높은 단일 모던 디자인으로 일관성 유지.
  5. **서브 컬렉션 NoSQL 아키텍처**: `users/{userId}/links/{linkId}` 구조로 계층화된 확장성 있는 데이터 모델링.

### 1.3 대상 사용자 (Target Audience)
- **소유자 (Admin / Owner)**:
  - 복잡한 설정 없이 닉네임, 프로필, 링크를 인라인으로 빠르게 편집하여 본인만의 허브를 운영하려는 1인 개발자 및 크리에이터.
- **방문자 (Visitors / End-User)**:
  - 깔끔하고 반응이 빠른 단일 페이지에서 소유자의 다양한 공식 채널로 안전하게 이동하려는 방문자.

---

## 2. 핵심 기능 목록 (Feature Matrix)

모든 선택 기능과 복잡한 부가 기능을 배제하고, 핵심 필수 기능(P0)으로만 명확히 구성합니다.

| 기능 ID | 기능명 | 중요도 | 세부 설명 |
| :--- | :--- | :---: | :--- |
| **F-PUB-01** | 공개 프로필 헤더 | P0 | 프로필 아바타, 닉네임(`displayName`), 한 줄 소개(Bio), 소셜 아이콘 바 표시 |
| **F-PUB-02** | 구글 파비콘 연동 링크 아이템 | P0 | Google Favicon API를 통해 도메인 파비콘을 자동 아이콘으로 표시하는 링크 카드 목록 |
| **F-PUB-03** | 모바일 퍼스트 반응형 레이아웃 | P0 | 모바일 최적화 원핸드 터치 뷰 및 데스크톱 센터 정렬 레이아웃 |
| **F-AUTH-01** | Firebase Google 소셜 로그인 | P0 | Google OAuth 단독 원클릭 로그인 |
| **F-AUTH-02** | 관리자 이메일 화이트리스트 접근 제어 | P0 | 환경변수(`ADMIN_EMAIL`)와 일치하는 소유자만 `/admin` 대시보드 접근 허용 |
| **F-ADM-01** | 닉네임 및 프로필 인라인 수정 | P0 | 닉네임(`displayName`), Bio, 아바타 이미지, 소셜 링크를 관리자 화면에서 직접 인라인 편집 |
| **F-ADM-02** | 링크 아이템 인라인 편집 CRUD | P0 | 모달 없이 목록 상에서 링크 제목/URL 인라인 편집, 신규 추가, 삭제, 노출 토글 |
| **F-ADM-03** | 드래그 앤 드롭(DnD) 순서 재배치 | P0 | 링크 카드를 마우스/터치로 상하 드래그하여 즉시 노출 순서 변경 |

---

## 3. 기능별 상세 명세 (Detailed Functional Requirements)

### 3.1 [공개 페이지] 프로필 및 링크 허브 (`F-PUB-01` ~ `F-PUB-03`)

#### (1) 프로필 헤더 (`F-PUB-01`)
- **컴포넌트 (shadcn/ui)**: `Avatar`
- **표시 요소**:
  - **프로필 아바타**: 원형 프로필 이미지 (Firebase Storage에 업로드된 커스텀 이미지 또는 기본 Google 프로필 이미지)
  - **닉네임 (`displayName`)**: 소유자가 수정한 대표 닉네임/이름 (굵은 타이포그래피)
  - **한 줄 소개 (Bio)**: 소유자의 직무나 상태를 나타내는 소개글
  - **소셜 아이콘 바**: 주요 소셜 링크(GitHub, X/Twitter, LinkedIn, YouTube, Email) 아이콘 버튼

#### (2) 구글 파비콘 연동 링크 아이템 (`F-PUB-02`)
- **컴포넌트 (shadcn/ui)**: `Card`
- **구글 파비콘 API 규격**:
  - 엔드포인트: `https://www.google.com/s2/favicons?domain={domain}&sz=64`
  - URL 등록/수정 시 도메인(hostname)을 파싱하여 파비콘 이미지 URL을 생성.
  - 파비콘 이미지 로딩 실패 시 Lucide의 `Globe` 또는 `ExternalLink` 아이콘으로 안전 폴백(Fallback).
- **인터랙션**:
  - 좌측: 24x24px 규격의 자동 구글 파비콘 아이콘
  - 중앙: 링크 제목 (`title`)
  - 우측: 외부 링크 화살표 아이콘
  - 클릭 시 `target="_blank"`, `rel="noopener noreferrer"`로 새 탭 열기.
  - 마우스 호버 시 부드러운 스케일 업 및 경계선 강조 효과.

#### (3) 모바일 퍼스트 반응형 레이아웃 (`F-PUB-03`)
- 모바일(360px~480px): 터치하기 편한 원핸드 레이아웃 (카드 최소 높이 48px).
- 데스크톱: 가로 최대 520px 중앙 정렬 카드 컨테이너로 미니멀하고 안정감 있는 렌더링.

---

### 3.2 [인증 & 보안] Firebase Google 소셜 로그인 (`F-AUTH-01`, `F-AUTH-02`)

- **인증 방식**:
  - Firebase Auth의 `GoogleAuthProvider`를 통한 원클릭 로그인.
- **접근 제어 (화이트리스트)**:
  - 로그인된 계정의 이메일이 환경변수(`NEXT_PUBLIC_ADMIN_EMAIL`)와 일치하는 경우에만 관리자 권한 부여.
  - 비인가 계정 접근 시 즉시 `signOut` 처리 및 차단 토스트 알림 표시.
- **라우트 보호**:
  - Next.js 미들웨어 / 보호 가드 컴포넌트를 통해 미인증자의 `/admin` 직접 접근 차단.

---

### 3.3 [관리자 패널] 인라인 편집 & 링크 관리 (`F-ADM-01` ~ `F-ADM-03`)

#### (1) 닉네임 및 프로필 인라인 수정 (`F-ADM-01`)
- **인라인 편집 메커니즘**:
  - 별도의 설정 모달 없이, 관리자 화면 상단 프로필 영역에서 **닉네임(`displayName`)**과 **한 줄 소개(Bio)** 텍스트를 클릭하면 즉시 입력 필드(`Input`, `Textarea`)로 전환.
  - 포커스 아웃(Blur) 또는 엔터(Enter) 입력 시 Firestore의 `users/{userId}` 문서에 즉시 저장 및 토스트 알림.
  - 아바타 이미지: 이미지 위에 마우스 호버 시 카메라 아이콘 표시 -> 클릭 시 파일 선택창 오픈 -> Firebase Storage 업로드 후 `avatarUrl` 즉시 갱신.
  - 소셜 링크: 각 소셜 아이콘 옆 인라인 URL 입력 필드를 통해 즉시 수정.

#### (2) 링크 아이템 인라인 편집 CRUD (`F-ADM-02`)
- **모달 없는 인라인 CRUD**:
  - **신규 추가**: 상단의 간결한 인라인 입력창(제목, URL)에 입력 후 엔터 또는 '추가' 버튼 클릭 시 즉시 목록에 반영.
  - **인라인 수정**: 링크 목록의 제목 또는 URL 영역을 더블클릭/클릭하면 인라인 편집 모드로 전환되어 그 자리에서 텍스트 수정 가능.
  - **파비콘 실시간 반영**: URL 입력/수정 시 Google Favicon API를 통해 추출된 파비콘이 인라인 상에서 즉시 미리보기로 표시됨.
  - **공개/비공개 토글**: 항목 우측의 shadcn/ui `Switch`로 공개 페이지 노출 여부를 실시간 변경.
  - **삭제**: 휴지통 아이콘 클릭 시 즉시 확인 툴팁/확인 후 삭제.

#### (3) 드래그 앤 드롭(DnD) 순서 재배치 (`F-ADM-03`)
- `@dnd-kit`을 활용하여 각 링크 아이템 좌측의 드래그 핸들을 잡고 상하로 드래그하여 순서 변경.
- 드래그 완료 시 해당 서브 컬렉션 문서들의 `order` 값이 실시간 동기화.

---

### 3.4 [디자인 시스템] shadcn/ui 단일 미니멀 스타일

- **테마 기능 제외**:
  - 다크/라이트 모드 선택이나 복잡한 테마 프리셋을 완전히 배제하고, 눈이 편안하고 깔끔한 **단일 모던 미니멀 스타일**로 UI 고정.
- **컴포넌트 라이브러리**:
  - shadcn/ui의 `Card`, `Avatar`, `Button`, `Input`, `Textarea`, `Switch`, `Toast (Sonner)` 활용.

---

## 4. 데이터베이스 모델링 (Firestore Sub-collection 구조)

Firestore의 **루트 `users` 컬렉션**과 **하위 `links` 서브 컬렉션**으로 구성되며, 테마 관련 필드를 모두 제거하고 닉네임(`displayName`)을 필수로 관리합니다.

### 4.1 계층 다이어그램

```text
/users/{userId} (Document: 사용자 프로필)
  ├── displayName: string (필수, 닉네임 / 화면 표시명)
  ├── bio: string (소개글)
  ├── avatarUrl: string (프로필 이미지 URL)
  ├── socialLinks: {
  │     github?: string,
  │     twitter?: string,
  │     linkedin?: string,
  │     youtube?: string,
  │     email?: string
  │   }
  ├── updatedAt: timestamp
  │
  └── /links/{linkId} (Sub-collection: 등록된 링크 아이템들)
        ├── title: string (필수, 링크 제목)
        ├── url: string (필수, 목적지 URL)
        ├── faviconUrl: string (Google Favicon API 추출 URL)
        ├── order: number (정렬 순서 인덱스)
        ├── isActive: boolean (공개 노출 여부)
        └── createdAt: timestamp
```

### 4.2 필드 세부 명세

#### (1) `users/{userId}` 문서
| 필드명 | 타입 | 필수 | 설명 |
| :--- | :--- | :---: | :--- |
| `displayName` | String | **필수** | 인라인으로 수정 가능한 대표 닉네임 (최대 30자) |
| `bio` | String | 선택 | 인라인으로 수정 가능한 한 줄 소개 문구 (최대 150자) |
| `avatarUrl` | String | 선택 | Firebase Storage에 업로드된 아바타 이미지 주소 |
| `socialLinks` | Map / Object | 선택 | 소셜 미디어 플랫폼별 URL 매핑 |
| `updatedAt` | Timestamp | 필수 | 최근 프로필/닉네임 수정 일시 |

#### (2) `users/{userId}/links/{linkId}` 서브 컬렉션 문서
| 필드명 | 타입 | 필수 | 설명 |
| :--- | :--- | :---: | :--- |
| `title` | String | **필수** | 인라인으로 편집 가능한 링크 명칭 (최대 50자) |
| `url` | String | **필수** | 실제 이동할 웹 주소 (`https://...`) |
| `faviconUrl` | String | **필수** | Google Favicon API 기반 추출 파비콘 URL |
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
       // 공개 읽기는 누구나 가능
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
2. **구글 파비콘 API 캐싱 및 폴백 내구성**:
   - 브라우저 및 CDN 이미지 캐싱을 활용해 파비콘 재호출 네트워크 오버헤드 최소화.
   - 외부 URL 접속 불가 또는 파비콘 누락 시 `<img onError={...} />` 처리를 통해 Lucide `Globe` 아이콘으로 안전 전환.
3. **인라인 편집 반응성**:
   - 낙관적 업데이트(Optimistic Update) 패턴을 적용하여, 사용자가 인라인 텍스트를 수정하는 즉시 UI에 반영하고 백그라운드에서 Firestore 비동기 저장.

---

## 6. 향후 산출물 연계 계획

- **사용자 시나리오 (`docs/user-scenarios.md`)**:
  - [방문자] 공개 페이지 열람 및 구글 파비콘 링크 클릭 이동 시나리오.
  - [관리자] Google 소셜 로그인 후 닉네임/Bio 인라인 수정, 신규 링크 인라인 등록(구글 파비콘 자동 연동), 드래그 앤 드롭 순서 변경 시나리오.
- **와이어프레임 (`docs/wireframes.md`)**:
  - 공개 프로필 페이지 (모바일/데스크톱 뷰, 프로필 헤더 및 구글 파비콘 링크 카드).
  - 관리자 대시보드 뷰 (인라인 편집 가능한 프로필 폼 & 인라인 수정형 DnD 링크 목록).
