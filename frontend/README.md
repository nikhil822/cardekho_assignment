# ShortlistIQ — Car Recommendation Frontend

A React + Vite + TypeScript frontend for the car recommendation system, built with **MUI (Material UI)** as the only UI/component library. No Tailwind, no shadcn/ui, no Axios, no TanStack Query — API calls use the native `fetch` API wrapped in a small client, and server state lives in React Context + hooks.

## Stack

- React 19 + TypeScript + Vite
- MUI v9 (`@mui/material`, `@mui/icons-material`) for all UI components
- React Router v7 for the 4-page flow (Form → Results → Details → Compare)
- Native `fetch` for API calls (`src/api`)
- React Context for recommendation results, compare selection, and toasts

## Getting started

```bash
npm install
npm run dev
```

The app expects the backend at `http://localhost:8080` (see `src/api/client.ts` to change the base URL). Start your backend first so the recommendation form has something to call.

```bash
npm run build   # type-checks and builds a production bundle to dist/
```

## Project structure

```
src/
  api/            fetch client + typed request/response mapping
  components/
    layout/       Header, AppLayout
    forms/        BudgetRangeSlider, FeatureChips, PrioritySelector
    cards/        CarCard, ScoreGauge (signature dashboard-gauge), ScoreBar
    ui/           EmptyState, CarCardSkeleton
  context/        AppDataContext (results + compare selection), ToastContext
  hooks/          useCarDetails
  pages/          RecommendationForm, RecommendationResults, CarDetails, CompareCars
  theme/          MUI theme + design tokens
  types/          Car, filters, and API response interfaces
  utils/          formatting helpers (₹ lakhs, mileage)
```

## Design notes

The visual direction is an "instrument panel" aesthetic — since the domain is car shortlisting with budgets, mileage, and safety ratings, the UI borrows from dashboard instrumentation: a deep ink header, an amber needle accent, and a **circular gauge with a needle** (`ScoreGauge`) standing in for the generic percentage badge on every result card and the details page. Data figures (prices, scores, specs) are set in a monospace face (JetBrains Mono) to read like a spec sheet; headings use Space Grotesk; body text uses Inter.

## Notes on the backend contract

- `POST /api/v1/cars/recommend` — the request body is built in `src/api/cars.ts#toRecommendPayload`. It matches the documented shape; optional fields (`seats`, `fuel`, etc.) are omitted when set to "Any" rather than sent as null.
- `GET /api/v1/cars/:id` — used by both the Car Details page and the Compare page (fetched independently for each of the two selected cars).
- The recommend response is parsed tolerantly: either a bare array of cars or a `{ results, count }` envelope both work.
- `score_breakdown` keys (`budget`, `safety`, `mileage`, `features`) are optional — bars only render for keys the backend actually returns.
- `highlights` (the short explanation bullets like "Excellent safety") are optional and rendered as a checklist if present.

If your backend's field names differ from what's in `src/types/car.ts`, that file plus `toRecommendPayload` in `src/api/cars.ts` are the two places to adjust.
