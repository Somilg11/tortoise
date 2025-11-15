# tortoise — a minimal typing test and analysis tool

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-blue?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Tortoise is a focused typing test web app that emphasizes clean UX, instant settings feedback, and actionable analysis. It provides per-word heatmaps, WPM timelines, keystroke charts and a persistent session history stored in localStorage.

<!-- ![Main](/public/tortoise_test.png) -->
![Analysis](/public/tortoise_analyse.png)

Summary
----------------------
- Problem solved: built a compact typing test experience that immediately reflects user settings (difficulty/time/word count) without page reloads, and provides analyzable session data for performance review.
- Why this approach: local first (fast, private), simple predictable UI, and a single reusable hook (`useTyping`) responsible for generation, sampling and metrics; avoids heavy backend dependencies for quick iteration.
- Key technologies: Next.js (App Router), React 19, TypeScript 5, Tailwind CSS, Recharts.
- What to demo in an interview:
  1. Change difficulty/time/wordcount in Settings and show instant update in the Test view.
 2. Run a short timed test and open the Results modal to showcase the heatmap and WPM timeline.
 3. Open Analysis page to show session history thumbnails and Reset Data functionality.
 4. Explain `useTyping` responsibilities and how timeline sampling uses refs to avoid stale closures.

Quick start
-----------
Requirements
- Node.js 18+ (recommended)
- npm, pnpm or yarn

Install and run locally:

```bash
# install
npm install

# run development server
npm run dev

# build and preview
npm run build
npm run start
```

Open http://localhost:3000 in your browser.

Tech stack (with icons)
-----------------------
- ⚡ Next.js 16 (App Router)
- ⚛️ React 19
- 🧭 TypeScript 5
- 🎨 Tailwind CSS 4
- 📊 Recharts (charts)
- 🗄️ localStorage (session persistence)
- 🪄 Custom hooks (notably `useTyping`)

Features
--------
- Configurable typing test: difficulty, word count, time limit, punctuation.
- Same-tab settings propagation (CustomEvent + localStorage) — changes apply immediately.
- Results modal with per-word heatmap and metrics.
- Analysis page with latest session details and previous session thumbnails.
- Theme & font selectors that apply instantly.

Important files
---------------
- `src/hooks/useTyping.ts` — hook managing generation, timer, sampling, metrics and reset.
- `src/components/typing/typing-box.tsx` — typing UI, caret logic and input handling.
- `src/components/charts/heatmap.tsx` — heatmap renderer.
- `src/lib/sessionStore.ts` — localStorage session persistence helpers.
- `src/app/globals.css` — fonts and theme variables.

How settings update instantly
----------------------------
Controls persist choices to localStorage and emit a same-window CustomEvent (`tortoise_setting_changed`). The typing UI listens for that event, updates local component state and regenerates words or resets the test as needed — no navigation or reload required.

Troubleshooting & notes
-----------------------
- Font/theme not applying instantly: the `FontSelector` sets `document.body.style.fontFamily` in addition to applying a body class so fonts apply immediately.
- CSS build error about `@import`: ensure `@import` statements (Google Fonts) are at the top of `src/app/globals.css` — this repo already places them correctly.
- Empty WPM timeline: fixed by sampling using a `timeLeft` ref and appending a final sample on test finish (see `useTyping`).

Development
-----------
- Type check: `npx tsc --noEmit`
- Lint: `npm run lint` (ESLint configured)

Extending ideas
---------------
- Add server-side export (API route) to download session CSVs.
- Replace native `title` hover on heatmap with a styled tooltip component.
- Add unit tests for `useTyping` sampling and metric calculations.

Contributing & license
----------------------
PRs welcome. For larger changes, open an issue first. Licensed under MIT.