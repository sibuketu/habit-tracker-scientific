# Primal Logic - Project Rules & Guidelines

## 1. Core Philosophy
- **Primal & Wild**: The UI should feel raw, visceral, and premium. Use "Bonfire" metaphors (fire, sparks, dark wood/stone textures).
- **Carnivore First**: Prioritize animal-based nutrition. Plants are secondary or "survival food". Avoid "balanced diet" rhetoric; focus on "optimal human fuel".
- **Data Driven**: Decisions should be backed by logic and data (the "Logic" in Primal Logic).

## 2. Tech Stack
- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Vanilla CSS. Avoid Tailwind unless explicitly requested. Design for mobile-first (PWA ready).
- **State Management**: React Context + Custom Hooks (`useApp`, `useNutrition`).
- **Data Persistence**: `localStorage` (Offline first) + Supabase (Optional sync).

## 3. Coding Standards
- **Strict TypeScript**: Avoid `any`. Define interfaces in `src/types`.
- **No Placeholders**: Do not leave dead buttons. Implement functionality or hide/disable.
- **Internationalization (i18n)**: Use `t('key')` for all user-facing text. Default to Japanese (`ja`).
- **Error Handling**: Use `try/catch` with `logError`. Prevent white-screen crashes using distinct Error Boundaries or safe renders.
- **Components**: Keep components small (`src/components`). Pages in `src/screens`.

## 4. Development Rules
- **Proactive Fixes**: If you see a bug or lint error, fix it immediately without asking.
- **Turbo Mode**: When running safe commands (lint, build, type-check), do not wait for user approval properly (`SafeToAutoRun: true`).
- **Clean Console**: Remove valid warnings. Keep `npm run lint` clean.
