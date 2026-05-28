# Gemini CLI Instructions: my-link

This directory contains the `my-link` project, which primarily features a Next.js application located in the `my_profile` subdirectory.

## Project Overview

*   **Type:** Next.js Web Application
*   **Main Technologies:**
    *   **Framework:** Next.js 16.2.6 (App Router)
    *   **UI Library:** React 19.2.4
    *   **Styling:** Tailwind CSS 4
    *   **Language:** TypeScript 5
*   **Architecture:** Standard Next.js App Router architecture.

## Directory Structure

*   `my_profile/`: The core Next.js project directory.
    *   `app/`: Contains the application routes, layouts, and styles.
        *   `layout.tsx`: Root layout with font and metadata configuration.
        *   `page.tsx`: The main landing page.
        *   `globals.css`: Global styles including Tailwind CSS 4 configuration.
    *   `public/`: Static assets (images, icons, etc.).
    *   `next.config.ts`: Next.js configuration.
    *   `tsconfig.json`: TypeScript configuration (includes `@/*` path alias).
    *   `eslint.config.mjs`: ESLint flat configuration.

## Building and Running

All commands should be run from within the `my_profile` directory.

| Task | Command |
| :--- | :--- |
| **Development** | `npm run dev` |
| **Build** | `npm run build` |
| **Start Production** | `npm run start` |
| **Linting** | `npm run lint` |

## Development Conventions

*   **Routing:** Use the Next.js App Router (files in `my_profile/app/`).
*   **Styling:** Use Tailwind CSS 4 utility classes. Theme variables are defined in `my_profile/app/globals.css`.
*   **Type Safety:** Strictly use TypeScript. The project is configured with `strict: true`.
*   **Path Aliases:** Use the `@/` alias to refer to the root of the `my_profile` directory (e.g., `import { ... } from "@/app/globals.css"`).
*   **Code Quality:** Adhere to the ESLint rules configured in `my_profile/eslint.config.mjs`.

## Future Instructions

When working on this project, ensure that all changes to the web application are made within the `my_profile` directory and adhere to the established Next.js and TypeScript conventions.
