# MyLink - Project Instructions

MyLink is a customizable multi-link profile service designed for developers and creators. It allows users to aggregate their various portfolios, social media, and project links into a single, easily shareable page.

## Project Overview

- **Purpose**: Centralized link profile service for developers and creators.
- **Tech Stack**:
  - **Framework**: Next.js 16 (App Router)
  - **Language**: TypeScript
  - **Styling**: Tailwind CSS 4, Shadcn UI
  - **Backend**: Firebase (Authentication, Firestore)
  - **Icons**: Tabler Icons (`@tabler/icons-react`)
  - **Utilities**: `clsx`, `tailwind-merge`, `next-themes`

## Building and Running

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Code Quality
```bash
npm run lint       # ESLint
npm run format     # Prettier
npm run typecheck  # TypeScript
```

## Architecture & Conventions

### Directory Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable components.
  - `ui/`: Shadcn UI components.
- `lib/`: Utilities and shared logic.
- `hooks/`: Custom React hooks.
- `docs/`: Project documentation.
- `public/`: Static assets.

### Development Guidelines
- **UI**: Use Shadcn UI (`components/ui/`).
- **Styling**: Tailwind CSS 4. Use `cn` utility from `@lib/utils.ts` for dynamic classes.
- **Firebase**:
  - Auth: Google Social Login only.
  - Firestore: Use sub-collections for link data.
- **Routing**: Profiles served at `/[displayName]`.
- **Favicons**: Use Google Favicon API for link thumbnails.

### Documentation Reference
- `@docs/PRD.md`: Core features and tech stack.
- `@docs/UserScenario.md`: Interaction flows.
- `@docs/Wireframe.md`: UI/UX designs and Inline Editing policies.

## AI Agent Conventions
- **File References**: Always prefix files with `@` (e.g., `@package.json`, `@app/layout.tsx`).

## Roadmap
- [ ] Google Social Login (Firebase Auth)
- [ ] Profile Management (displayName, Bio) with Inline Editing
- [ ] Link Management (CRUD) with Inline Editing and Favicon API
- [ ] Public Profile Page (Minimalist)
- [ ] Click analytics (Future)
