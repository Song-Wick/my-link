# GEMINI.md - Project Context & Instructions

## Project Overview
This workspace represents **My Link**, a link manager designed to organize and manage links in a single unified interface. It contains a modern frontend sub-application called `my-profile`, bootstrapped with `create-next-app` using **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Key Technologies & Versions
- **Parent Workspace**: My Link (root directory: `C:\Users\HYU\Documents\my-link`)
- **Frontend App**: `my-profile` (located under `./my-profile/`)
- **Framework**: Next.js 16.3.4 (App Router enabled with Turbopack support)
- **UI Library**: React 19.2.8
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/postcss` and CSS-first config)
- **Language**: TypeScript 5.x
- **Linting**: ESLint 9.x (configured with Next.js core web vitals and TypeScript configs)

---

## Directory Structure
The project workspace is structured as follows:
```text
C:\Users\HYU\Documents\my-link\
├── GEMINI.md                # This file (Instructional context for AI agents)
├── README.md                 # Project root introduction
└── my-profile\               # Next.js 16.3.4 Application
    ├── .gitignore
    ├── AGENTS.md             # Automated Next.js breaking change rules
    ├── CLAUDE.md             # Agent reference pointing to AGENTS.md
    ├── eslint.config.mjs     # ESLint 9.x flat configuration
    ├── next-env.d.ts
    ├── next.config.ts        # Next.js configuration
    ├── package.json          # Project scripts and dependencies
    ├── postcss.config.mjs    # PostCSS configuration for Tailwind CSS v4
    ├── README.md             # my-profile README
    ├── tsconfig.json         # TypeScript configuration
    ├── app\                  # Next.js App Router root
    │   ├── favicon.ico
    │   ├── globals.css       # CSS-first Tailwind configuration
    │   ├── layout.tsx        # Base HTML layout
    │   └── page.tsx          # Homepage view
    └── public\               # Public assets (SVGs, icons, logos)
```

---

## Building and Running
All build, development, and linting commands must be executed from within the `my-profile/` directory.

### Key Commands
To run commands, change directory to `my-profile` first:
```bash
cd my-profile
```

- **Start Development Server**: 
  ```bash
  npm run dev
  ```
  Starts the local development server utilizing Next.js Turbopack.
- **Production Build**: 
  ```bash
  npm run build
  ```
  Generates an optimized, type-checked production build inside the `.next` directory.
- **Start Production Server**: 
  ```bash
  npm run start
  ```
  Launches the built production application.
- **Linting**: 
  ```bash
  npm run lint
  ```
  Executes ESLint using Flat Config to scan for code issues and enforce Next.js Core Web Vitals.

*Note: There is currently no configured test suite in the scripts. To add testing in the future, a tool like Jest or Vitest must be installed and configured in `package.json`.*

---

## Architectural & Development Conventions

### 1. Next.js 16.3.4 & React 19 Support
* **CRITICAL:** Next.js 16 introduces breaking changes and file structure differences from older versions. Prior to writing layout, routing, or page logic, verify conventions using files such as `my-profile/AGENTS.md` and relevant internal documentation.
* **Layout Props**: Notice the typing in `layout.tsx` for layout components using `LayoutProps<"/">` instead of general `React.ReactNode` for children typing. Maintain this native Next.js 16 page-type structure.
* **Next Dev Injection**: The `AGENTS.md` file contains automatic nextjs-agent-rules injected and updated by `next dev` (managed by `node_modules/next/dist/server/lib/generate-agent-files.js`). Ensure this file is committed and not stripped from git diffs.

### 2. Styling with Tailwind CSS v4
* **CSS-First Config**: Tailwind CSS v4 does not use a traditional `tailwind.config.js`. Instead, global styles and custom themes are declared directly inside `my-profile/app/globals.css`.
* **Theme Extension**: Custom colors, fonts, and variables are specified inside the `@theme inline` block:
  ```css
  @import "tailwindcss";

  :root {
    --background: #ffffff;
    --foreground: #171717;
  }

  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: var(--font-geist-sans);
    --font-mono: var(--font-geist-mono);
  }
  ```

### 3. TypeScript & Path Aliases
* **Strict Mode**: TypeScript is configured with `"strict": true` and `"noEmit": true`. Bypassing type checking or using implicit `any` is strictly prohibited.
* **Path Alias**: The compiler configuration includes a path alias `@/*` pointing to `./*` inside the `my-profile` directory:
  ```json
  "paths": {
    "@/*": ["./*"]
  }
  ```
  Always use `@/components/`, `@/lib/`, or `@/app/` paths for clean, absolute imports.

### 4. ESLint 9.x (Flat Config)
* Flat configuration is handled in `eslint.config.mjs` using `defineConfig` from `eslint/config`.
* It integrates `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
* Default ignores are modified using `globalIgnores` to avoid scanning files under `.next/**`, `out/**`, `build/**`, and `next-env.d.ts`. Ensure your custom configurations do not break the Flat Config array.

### 5. Creating New Components and Modules
* **Shared Components**: Create a `my-profile/components` directory for all reusable presentation/UI components.
* **Responsive Design**: Ensure any UI additions follow a mobile-first responsive approach, utilizing standard Tailwind screen prefix utilities (`sm:`, `md:`, `lg:`, etc.).
* **Semantic HTML**: Maintain highly accessible components with proper ARIA attributes, landmarks, and semantic HTML tag definitions.
