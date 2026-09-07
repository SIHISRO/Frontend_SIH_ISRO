# TASK.md — Implementation Task Breakdown
## SIH2026 PS SIH26166 — Lunar Image Registration Frontend

**Version:** 2.0.0
**Date:** 2026-09-05
**PS:** SIH26166 — Multi-modal, Sun angle and scale invariant image correspondence (Chandrayaan-2)
**Organization:** ISRO
**Based on:** PRD v2.0.0 (client/PRD/PRD.md)
**Stack:** Next.js 15 · TypeScript 5 · React 19 · Tailwind CSS 4

---

## Priority Legend
- **P0** — Blocker. Must be done first. No dependent work can proceed without it.
- **P1** — Core feature. Required for SIH demo.
- **P2** — Enhancement. Implement if time allows.

---

## Folder-Wise Task Organization

Tasks are organized exactly by the folder/file they create or modify.
This makes it easy to track which files exist and which are pending.

---

## PHASE 1 — `client/` (Root Project Setup)

---

### TASK-001
**Title:** Initialize Next.js 15 project

**Description:**
Run `create-next-app` inside the `client/` directory. Configure TypeScript strict mode, Tailwind CSS 4, ESLint, and the App Router with a `src/` directory.

**Command:**
```bash
cd client
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

**Files Created:**
```
client/
├── package.json
├── package-lock.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .eslintrc.json
└── src/
    ├── app/
    │   ├── layout.tsx        (default — will be replaced)
    │   ├── page.tsx          (default — will be replaced)
    │   └── globals.css       (default — will be replaced)
    └── ...
```

**Dependencies:** None

**Acceptance Criteria:**
- `npm run dev` starts without errors
- TypeScript strict mode confirmed in `tsconfig.json`
- Tailwind utility class renders on default page
- ESLint passes on default code

**Priority:** P0

---

### TASK-002
**Title:** Install npm dependencies

**Description:**
Install all required packages: icons, class utilities, toast library.

**Commands:**
```bash
npm install lucide-react clsx tailwind-merge
npm install sonner
npm install --save-dev prettier eslint-config-prettier
```

**Files Modified:**
```
client/
├── package.json         (updated with new deps)
└── package-lock.json    (updated)
```

**Dependencies:** TASK-001

**Acceptance Criteria:**
- `import { Upload } from 'lucide-react'` resolves
- `clsx` and `tailwind-merge` importable
- `sonner` Toaster component importable

**Priority:** P0

---

### TASK-003
**Title:** Create environment variable files

**Description:**
Create `.env.local` (gitignored) with the FastAPI backend URL. Create `.env.example` (committed) with a placeholder.

**Files Created:**
```
client/
├── .env.local            # FASTAPI_BASE_URL=http://localhost:8000  (gitignored)
└── .env.example          # FASTAPI_BASE_URL=http://localhost:8000  (committed)
```

**Update `.gitignore`:**
Ensure `.env.local` is listed (create-next-app usually adds it automatically).

**Dependencies:** TASK-001

**Acceptance Criteria:**
- `process.env.FASTAPI_BASE_URL` accessible in server-side Next.js code
- `.env.local` NOT committed
- `.env.example` IS committed

**Priority:** P0

---

### TASK-004
**Title:** Configure `next.config.ts` with security headers

**Description:**
Add HTTP security headers to all responses and configure any needed rewrites.

**File Modified:**
```
client/next.config.ts
```

**Headers to add:**
```typescript
headers: [
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY',
  'X-XSS-Protection: 1; mode=block',
  'Referrer-Policy: strict-origin-when-cross-origin'
]
```

**Dependencies:** TASK-001

**Acceptance Criteria:**
- Security headers visible in browser DevTools → Network → Response Headers
- App loads correctly with headers applied

**Priority:** P1

---

### TASK-005
**Title:** Configure Prettier

**Description:**
Create `.prettierrc` with consistent code formatting rules.

**File Created:**
```
client/.prettierrc
```

**Content:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Dependencies:** TASK-002

**Acceptance Criteria:**
- `npx prettier --check src/` passes
- Tailwind class ordering auto-sorted

**Priority:** P1

---

## PHASE 2 — `src/styles/` (Design System)

---

### TASK-006
**Title:** Create `src/styles/globals.css` with design tokens

**Description:**
Replace the default globals.css. Define a dark-mode-first space/lunar design system using Tailwind CSS custom properties. The theme should evoke ISRO's space mission aesthetic.

**File Modified:**
```
client/src/styles/globals.css
```

**Design tokens to define (CSS variables):**
```css
:root {
  /* Background scale — deep space dark */
  --background: #050a14;
  --surface: #0d1b2e;
  --surface-elevated: #112240;
  --border: #1e3a5f;

  /* Brand — ISRO deep blue + gold accent */
  --primary: #1e7de0;
  --primary-hover: #2d8ef3;
  --accent: #f5a623;

  /* Text */
  --text-primary: #e8f4fd;
  --text-secondary: #8bacc8;
  --text-muted: #4a6a8a;

  /* Status */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

**Also configure in `tailwind.config.ts`:**
- Extend colors with token names
- Add Inter font
- Custom animation for loading spinner

**Dependencies:** TASK-001

**Acceptance Criteria:**
- Design tokens are accessible as Tailwind classes (e.g., `bg-surface`, `text-primary`)
- Dark background renders on all pages
- Inter font loaded globally via `next/font/google`
- No flash of unstyled content

**Priority:** P0

---

## PHASE 3 — `src/types/` (Type Definitions)

---

### TASK-007
**Title:** Create `src/types/prediction.ts`

**Description:**
Define all TypeScript interfaces for the API request/response. This is the single source of truth for types used across the entire app.

**File Created:**
```
client/src/types/prediction.ts
```

**Types to define (exact fields from PRD Section 12.1):**
```typescript
export interface PredictMetrics {
  total_matches: number;
  inliers_count: number;
  rmse?: number;              // TBD — not in current API, reserved for future
}

export interface PredictKeypoints {
  reference: [number, number][];
  source: [number, number][];
  confidence: number[];
  inlier_mask: boolean[];
}

export interface PredictVisualizations {
  ref_points: string;
  src_points: string;
  match_lines: string;
  warped_source: string;
  registered_overlay: string;
}

export interface PredictResponse {
  status: "success";
  metrics: PredictMetrics;
  homography: number[][] | null;
  keypoints: PredictKeypoints;
  visualizations: PredictVisualizations;
}

export type RegistrationQuality = "good" | "fair" | "poor" | "failed";
```

**Dependencies:** None

**Acceptance Criteria:**
- All fields match PRD Section 12.1 exactly
- `rmse?: number` present as optional future-ready field
- All types exported and importable
- No TypeScript errors

**Priority:** P0

---

## PHASE 4 — `src/utils/` (Utility Functions)

---

### TASK-008
**Title:** Create `src/utils/metricsUtils.ts`

**Description:**
Pure utility functions for computing registration quality classification and status summary strings (PS-aligned terminology).

**File Created:**
```
client/src/utils/metricsUtils.ts
```

**Functions:**
```typescript
// Returns quality classification based on PRD Section 9.2
export function getRegistrationQuality(
  metrics: PredictMetrics,
  homography: number[][] | null
): RegistrationQuality

// Returns a plain-language summary (from PRD Section 9.3)
export function getStatusSummary(
  metrics: PredictMetrics,
  homography: number[][] | null
): string

// Returns inlier ratio as percentage string, "N/A" if total=0
export function getInlierRatioDisplay(metrics: PredictMetrics): string

// Returns RMSE display string — "X.XX px" or "TBD" if undefined
export function getRMSEDisplay(metrics: PredictMetrics): string
```

**Dependencies:** TASK-007

**Acceptance Criteria:**
- Quality: "good" when inlier ratio >= 50% AND homography != null
- Quality: "failed" when homography == null
- Zero division handled (total_matches = 0 → "N/A")
- Status messages use PS-relevant language (e.g., "sub-pixel correspondences computed")
- All functions are pure (no side effects), fully unit-testable

**Priority:** P0

---

### TASK-009
**Title:** Create `src/utils/imageUtils.ts`

**Description:**
Utility functions for file validation, object URL management, and base64-to-Blob download.

**File Created:**
```
client/src/utils/imageUtils.ts
```

**Functions:**
```typescript
// Validates file type and size — returns { valid, error? }
export function validateImageFile(
  file: File,
  maxSizeMB?: number
): { valid: boolean; error?: string }

// Creates a preview URL (call URL.revokeObjectURL when done)
export function createPreviewURL(file: File): string

// Downloads a base64 data URI as a JPEG file
export function downloadBase64Image(dataUri: string, filename: string): void
```

**Dependencies:** None

**Acceptance Criteria:**
- `validateImageFile` rejects non-image/jpeg and non-image/png MIME types
- `downloadBase64Image` triggers browser download correctly
- Preview URL creation works for JPEG and PNG files

**Priority:** P0

---

### TASK-010
**Title:** Create `src/utils/formatters.ts`

**Description:**
Number and data formatting utilities.

**File Created:**
```
client/src/utils/formatters.ts
```

**Functions:**
```typescript
// Format a number to N decimal places
export function formatDecimal(value: number, places?: number): string

// Format a 3x3 matrix as a 2D array for display
export function formatHomographyMatrix(
  matrix: number[][] | null
): string[][] | null

// Format a percentage
export function formatPercent(value: number, places?: number): string
```

**Dependencies:** None

**Acceptance Criteria:**
- `formatDecimal(1.0023456789, 6)` → `"1.002346"`
- `formatHomographyMatrix(null)` → `null`

**Priority:** P1

---

## PHASE 5 — `src/hooks/` (Custom Hooks)

---

### TASK-011
**Title:** Create `src/hooks/useImageUpload.ts`

**Description:**
Manages state for the image upload form (reference file + source file). Derives `readyToSubmit` boolean.

**File Created:**
```
client/src/hooks/useImageUpload.ts
```

**Returns:**
```typescript
{
  referenceFile: File | null;
  sourceFile: File | null;
  setReferenceFile: (file: File) => void;
  setSourceFile: (file: File) => void;
  clearReference: () => void;
  clearSource: () => void;
  clearAll: () => void;
  readyToSubmit: boolean;  // true when both files are non-null
}
```

**Dependencies:** None

**Acceptance Criteria:**
- `readyToSubmit` only true when both files non-null
- `clearAll()` resets both to null
- No side effects beyond state

**Priority:** P0

---

### TASK-012
**Title:** Create `src/hooks/useLoadingMessages.ts`

**Description:**
Rotates through PS-relevant loading messages during the API call.

**File Created:**
```
client/src/hooks/useLoadingMessages.ts
```

**Messages (in order, 2-second rotation):**
```
"Uploading lunar images..."
"Running LoFTR keypoint detection..."
"Finding multi-modal correspondences..."
"Filtering inlier matches with RANSAC..."
"Computing homography transformation..."
"Generating visualization outputs..."
"Almost done..."
```

**Returns:** `{ currentMessage: string }`

**Dependencies:** None

**Acceptance Criteria:**
- Rotates through all messages while active
- `clearInterval` called on cleanup (no memory leak)
- Stops rotating when `isLoading` is false

**Priority:** P1

---

### TASK-013
**Title:** Create `src/hooks/usePrediction.ts`

**Description:**
Custom hook that manages the full ML prediction lifecycle: calls the prediction service, tracks loading/error/data states.

**File Created:**
```
client/src/hooks/usePrediction.ts
```

**Returns:**
```typescript
{
  predict: (reference: File, source: File) => Promise<void>;
  data: PredictResponse | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}
```

**Logic:**
- `predict()`: set `isLoading=true`, `error=null` → call `predictionService.predictImageRegistration(reference, source)` → set `data` on success → set human-readable `error` on failure → `isLoading=false` in finally
- `reset()`: clear all state

**Dependencies:** TASK-007 (types), TASK-017 (prediction service — depends on it but define interface first)

**Acceptance Criteria:**
- `isLoading` true only during request
- `error` message is human-readable, not raw HTTP body
- Calling `predict` while loading is a no-op
- `reset()` clears all state to initial values

**Priority:** P0

---

## PHASE 6 — `src/context/` (React Context)

---

### TASK-014
**Title:** Create `src/context/PredictionContext.tsx`

**Description:**
React context that shares the prediction result from the upload page (writer) to the results page (reader).

**File Created:**
```
client/src/context/PredictionContext.tsx
```

**Context value:**
```typescript
interface PredictionContextValue {
  result: PredictResponse | null;
  updateResult: (data: PredictResponse) => void;
  clearResult: () => void;
}
```

**Export:** `PredictionProvider` (wraps root layout) + `usePredictionContext()` hook

**Dependencies:** TASK-007

**Acceptance Criteria:**
- `usePredictionContext()` throws if used outside provider
- `result` persists between page navigations (until `clearResult()` called)
- Wraps root `layout.tsx`

**Priority:** P0

---

## PHASE 7 — `src/services/` (API Service Layer)

---

### TASK-015
**Title:** Create `src/app/api/predict/route.ts` (Next.js Proxy)

**Description:**
Server-side Next.js API Route Handler that proxies multipart/form-data POSTs to the FastAPI backend. Keeps backend URL server-side. Resolves CORS issue (FastAPI has no CORS middleware).

**File Created:**
```
client/src/app/api/predict/route.ts
```

**Logic:**
1. Receive `multipart/form-data` from browser
2. Create a new `fetch` request to `${process.env.FASTAPI_BASE_URL}/api/v1/predict`
3. Forward the raw request body and Content-Type header
4. Set a 120-second timeout (AbortSignal.timeout)
5. Forward the response JSON (and status code) back to the browser
6. Handle timeout → return 504 with `{ detail: "Request timed out" }`

**Dependencies:** TASK-003

**Acceptance Criteria:**
- `POST /api/predict` proxies to FastAPI `POST /api/v1/predict`
- Binary image data forwarded intact (file content unchanged)
- 120-second AbortSignal timeout implemented
- 500/422 FastAPI errors forwarded verbatim
- `FASTAPI_BASE_URL` never appears in browser network panel

**Priority:** P0

---

### TASK-016
**Title:** Create `src/services/predictionService.ts`

**Description:**
The API service function called by `usePrediction`. Builds FormData with correct field names and calls the Next.js proxy.

**File Created:**
```
client/src/services/predictionService.ts
```

**Function:**
```typescript
export async function predictImageRegistration(
  reference: File,    // mapped to field "image1"
  source: File,       // mapped to field "image2"
  signal?: AbortSignal
): Promise<PredictResponse>
```

**FormData field mapping (CRITICAL — must match FastAPI exactly):**
```typescript
formData.append("image1", reference);  // image1 = Reference (LRO/SELENE/fixed)
formData.append("image2", source);     // image2 = Source (Chandrayaan-2/moving)
```

**Error handling:**
- HTTP 422 → throw `{ status: 422, message: "Invalid request. Check image file formats." }`
- HTTP 500 → throw `{ status: 500, message: "Server error: {detail from response}" }`
- Timeout → throw `{ status: 504, message: "Request timed out. The model may be loading — please try again." }`
- Network error → throw `{ status: 0, message: "Network error. Check your connection." }`

**Dependencies:** TASK-007, TASK-015

**Acceptance Criteria:**
- Field names are exactly `image1` and `image2`
- No `Content-Type` header set manually (browser sets multipart boundary)
- Typed `PredictResponse` returned on success
- All error cases produce human-readable `message`
- `AbortSignal` plumbed through to fetch

**Priority:** P0

---

## PHASE 8 — `src/components/common/` (Shared UI Components)

---

### TASK-017
**Title:** Create `src/components/common/Button.tsx`

**File Created:**
```
client/src/components/common/Button.tsx
```

**Variants:** `primary` | `secondary` | `ghost` | `danger`
**Sizes:** `sm` | `md` | `lg`
**Props:** `variant`, `size`, `disabled`, `loading`, `onClick`, `children`, `type`, `className`

**Acceptance Criteria:**
- Disabled state: visually distinct, `aria-disabled="true"`, not clickable
- Loading state: inline spinner, `aria-busy="true"`
- Visible focus ring for keyboard users
- Uses `clsx` + `tailwind-merge`

**Dependencies:** TASK-006

**Priority:** P0

---

### TASK-018
**Title:** Create `src/components/common/Badge.tsx`

**File Created:**
```
client/src/components/common/Badge.tsx
```

**Variants:** `success` | `warning` | `error` | `info` | `neutral`
**Props:** `variant`, `children`, `icon?`, `className`

**Acceptance Criteria:**
- All variants render with correct background + text color
- Icon + text always present (never color alone) — REQ-A04

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-019
**Title:** Create `src/components/common/Tooltip.tsx`

**File Created:**
```
client/src/components/common/Tooltip.tsx
```

**Props:** `content: string`, `children: ReactNode`, `side?: "top" | "bottom" | "left" | "right"`

**Acceptance Criteria:**
- Appears on hover AND keyboard focus
- `role="tooltip"` + `aria-describedby` on trigger
- Does not overflow viewport on edges

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-020
**Title:** Create `src/components/common/LoadingSpinner.tsx`

**File Created:**
```
client/src/components/common/LoadingSpinner.tsx
```

**Props:** `size?: "sm" | "md" | "lg"`, `className?`

**Acceptance Criteria:**
- Smooth CSS animation
- Respects `prefers-reduced-motion` (pause animation if reduced) — REQ-A09
- Semantic: has `role="status"` and `aria-label="Loading"`

**Dependencies:** TASK-006

**Priority:** P0

---

### TASK-021
**Title:** Create `src/components/common/LoadingOverlay.tsx`

**File Created:**
```
client/src/components/common/LoadingOverlay.tsx
```

**Props:** `message: string`, `isVisible: boolean`

**Acceptance Criteria:**
- Full section overlay with semi-transparent dark backdrop
- Spinner + message text centered
- `aria-live="polite"` on message region — REQ-A06
- Respects `prefers-reduced-motion`

**Dependencies:** TASK-020

**Priority:** P0

---

### TASK-022
**Title:** Create `src/components/common/ErrorAlert.tsx`

**File Created:**
```
client/src/components/common/ErrorAlert.tsx
```

**Props:** `message: string`, `details?: string`, `onRetry?: () => void`

**Acceptance Criteria:**
- Error icon + message text visible
- `role="alert"` for immediate screen reader announcement
- "Try Again" button rendered when `onRetry` provided
- Visually distinct (red/error styling)

**Dependencies:** TASK-017, TASK-018

**Priority:** P0

---

### TASK-023
**Title:** Create `src/components/common/WarningBanner.tsx`

**File Created:**
```
client/src/components/common/WarningBanner.tsx
```

**Props:** `message: string`, `show: boolean`

**Use:** Shown on Results page when registration quality is "poor" or "failed."

**Acceptance Criteria:**
- Yellow/amber warning styling with warning icon
- Dismissible (optional X button)
- `role="status"` or `role="alert"` depending on severity

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-024
**Title:** Create `src/components/common/Modal.tsx`

**File Created:**
```
client/src/components/common/Modal.tsx
```

**Props:** `isOpen: boolean`, `onClose: () => void`, `title?: string`, `children: ReactNode`

**Acceptance Criteria:**
- Focus trapped inside while open — REQ-A07
- Escape key closes — REQ-A07
- Backdrop click closes
- Focus returns to trigger on close
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Body scroll locked while open

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-025
**Title:** Create `src/components/common/CopyButton.tsx`

**File Created:**
```
client/src/components/common/CopyButton.tsx
```

**Props:** `text: string`, `label?: string`

**Acceptance Criteria:**
- Copies via `navigator.clipboard.writeText()`
- Icon changes from Copy → Check for 2 seconds after copy
- `aria-label` updates to "Copied!" on success
- Graceful fallback if clipboard API unavailable

**Dependencies:** TASK-017

**Priority:** P1

---

### TASK-026
**Title:** Create `src/components/common/EmptyState.tsx`

**File Created:**
```
client/src/components/common/EmptyState.tsx
```

**Props:** `title: string`, `description?: string`, `action?: ReactNode`, `icon?: ReactNode`

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-027
**Title:** Create `src/components/common/Divider.tsx`

**File Created:**
```
client/src/components/common/Divider.tsx
```

**Props:** `className?`

**Dependencies:** TASK-006

**Priority:** P1

---

## PHASE 9 — `src/components/layout/` (Layout Components)

---

### TASK-028
**Title:** Create `src/components/layout/PageLayout.tsx`

**File Created:**
```
client/src/components/layout/PageLayout.tsx
```

**Props:** `children: ReactNode`, `className?`

**Behavior:** Wraps content in `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Dependencies:** TASK-006

**Priority:** P0

---

### TASK-029
**Title:** Create `src/components/layout/Section.tsx`

**File Created:**
```
client/src/components/layout/Section.tsx
```

**Props:** `title?: string`, `description?: string`, `children: ReactNode`, `className?`

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-030
**Title:** Create `src/components/layout/AppFooter.tsx`

**File Created:**
```
client/src/components/layout/AppFooter.tsx
```

**Content:**
- "Smart India Hackathon 2026"
- "PS SIH26166 — ISRO / Department of Space"
- Brief tagline about multi-modal lunar image registration
- Year

**Dependencies:** TASK-006

**Priority:** P1

---

### TASK-031
**Title:** Create `src/components/layout/AppHeader.tsx`

**File Created:**
```
client/src/components/layout/AppHeader.tsx
```

**Content:**
- ISRO-themed logo/icon + project name: "LunarReg — SIH26166"
- Nav links: "Register" (→ `/`), "About" (→ `/about`)
- Mobile: hamburger button → slide-down nav menu
- Active route highlighted

**Acceptance Criteria:**
- Keyboard-navigable nav links
- Mobile menu opens/closes correctly
- Active route visually distinguished
- Meets REQ-M06

**Dependencies:** TASK-006

**Priority:** P0

---

### TASK-032
**Title:** Create `src/app/layout.tsx` (Root Layout)

**File Modified:**
```
client/src/app/layout.tsx
```

**Tasks:**
- Import Inter font via `next/font/google`
- Wrap body with `PredictionProvider` (from context)
- Render `AppHeader` + `{children}` + `AppFooter`
- Set `<html lang="en">`
- Set metadata: `title: "LunarReg — SIH26166 | ISRO Image Registration"`, description referencing PS

**Dependencies:** TASK-014, TASK-031, TASK-030

**Acceptance Criteria:**
- All pages have header + footer
- Inter font applied globally
- PredictionContext available on all pages
- `<title>` and meta description set

**Priority:** P0

---

## PHASE 10 — `src/components/upload/` (Upload Form Components)

---

### TASK-033
**Title:** Create `src/components/upload/ImageDropzone.tsx`

**File Created:**
```
client/src/components/upload/ImageDropzone.tsx
```

**Props:**
```typescript
interface ImageDropzoneProps {
  label: string;          // e.g., "Source Image (Chandrayaan-2)"
  sublabel?: string;      // e.g., "OHRC / TMC-2 / IIRS"
  accept: string;         // "image/jpeg,image/png"
  onFileSelect: (file: File) => void;
  error?: string;
  disabled?: boolean;
}
```

**Acceptance Criteria:**
- Drag enter/leave/over/drop events handled
- Click-to-browse opens native file dialog
- File type validation with inline error on rejection
- Visual feedback on drag-over (highlight border)
- Keyboard accessible: Tab + Enter/Space — REQ-A01
- `aria-label` reflects the label prop

**Dependencies:** TASK-006, TASK-017

**Priority:** P0

---

### TASK-034
**Title:** Create `src/components/upload/ImagePreview.tsx`

**File Created:**
```
client/src/components/upload/ImagePreview.tsx
```

**Props:**
```typescript
interface ImagePreviewProps {
  file: File;
  label: string;
  onRemove: () => void;
}
```

**Acceptance Criteria:**
- Thumbnail via `URL.createObjectURL` — REQ-P04
- Object URL revoked in useEffect cleanup (no memory leak)
- Remove button: `aria-label="Remove {label} image"`
- Filename truncated with ellipsis if too long
- File size shown in KB/MB

**Dependencies:** TASK-009, TASK-017

**Priority:** P0

---

### TASK-035
**Title:** Create `src/components/upload/SensorBadge.tsx`

**File Created:**
```
client/src/components/upload/SensorBadge.tsx
```

**Description:** Clickable chip buttons showing sensor type hints below each dropzone.
- Source slot chips: `OHRC`, `TMC-2`, `IIRS`
- Reference slot chips: `LRO NAC`, `SELENE`, `Other C2`
- Informational only — clicking selects the chip visually but does NOT change API behavior
- Helps evaluators understand the domain context

**Dependencies:** TASK-006

**Priority:** P2

---

### TASK-036
**Title:** Create `src/components/upload/ImageUploadPair.tsx`

**File Created:**
```
client/src/components/upload/ImageUploadPair.tsx
```

**Description:** Composes `ImageDropzone` and `ImagePreview` into a two-slot upload interface. Shows dropzone when no file is selected; shows preview when file is selected. Manages state for both slots.

**Props:**
```typescript
interface ImageUploadPairProps {
  onBothSelected: (reference: File, source: File) => void;
  onSelectionCleared: () => void;
  disabled?: boolean;
}
```

**Layout:**
- Desktop: 2-column side-by-side grid
- Mobile: single-column stacked

**Labels:**
- Left / Top: "Reference Image" + sublabel "LRO NAC / SELENE / Fixed Target"
- Right / Bottom: "Source Image" + sublabel "Chandrayaan-2: OHRC / TMC-2 / IIRS"

**Acceptance Criteria:**
- `onBothSelected(reference, source)` called when both files selected
- `onSelectionCleared()` called if either is removed
- Correctly maps: left slot → `reference` (→ `image1`), right slot → `source` (→ `image2`)

**Dependencies:** TASK-033, TASK-034

**Priority:** P0

---

### TASK-037
**Title:** Create `src/components/upload/SubmitButton.tsx`

**File Created:**
```
client/src/components/upload/SubmitButton.tsx
```

**Props:**
```typescript
interface SubmitButtonProps {
  disabled: boolean;
  isLoading: boolean;
  onClick: () => void;
}
```

**States:**
- Normal (both files selected): "Register Images" — enabled, primary style
- Disabled (files missing): "Register Images" — grayed out, `aria-disabled`
- Loading: "Processing..." + spinner — fully disabled, `aria-busy`

**Dependencies:** TASK-017, TASK-020

**Priority:** P0

---

## PHASE 11 — `src/components/results/` (Results Components)

---

### TASK-038
**Title:** Create `src/components/results/MetricsCard.tsx`

**File Created:**
```
client/src/components/results/MetricsCard.tsx
```

**Props:**
```typescript
interface MetricsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "neutral";
  tooltip?: string;
  unit?: string;          // e.g., "px" for RMSE
}
```

**Acceptance Criteria:**
- Large prominent value, label below
- Variant colors applied
- Tooltip on hover if `tooltip` provided
- Distinct card background (not plain page bg)

**Dependencies:** TASK-006, TASK-019

**Priority:** P0

---

### TASK-039
**Title:** Create `src/components/results/MetricsGrid.tsx`

**File Created:**
```
client/src/components/results/MetricsGrid.tsx
```

**Renders 4 MetricsCards:**
1. "Total Matches" — `metrics.total_matches` — neutral
2. "Inlier Count" — `metrics.inliers_count` — neutral
3. "Inlier Ratio" — `getInlierRatioDisplay(metrics)` — success/warning/error based on ratio
4. "RMSE" — `getRMSEDisplay(metrics)` — neutral (or "TBD" if not in response)

**Layout:**
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 2 columns stacked

**Dependencies:** TASK-038, TASK-008

**Priority:** P0

---

### TASK-040
**Title:** Create `src/components/results/QualityBadge.tsx`

**File Created:**
```
client/src/components/results/QualityBadge.tsx
```

**Props:** `metrics: PredictMetrics`, `homography: number[][] | null`

**Renders:** Badge with quality level: "Good Registration" / "Fair Registration" / "Poor Registration" / "Registration Failed"

**Color + icon (never color alone):**
- Good: green checkmark icon
- Fair: yellow info icon
- Poor: orange warning icon
- Failed: red x-circle icon

**Dependencies:** TASK-018, TASK-008

**Priority:** P0

---

### TASK-041
**Title:** Create `src/components/results/RegistrationStatus.tsx`

**File Created:**
```
client/src/components/results/RegistrationStatus.tsx
```

**Props:** `metrics: PredictMetrics`, `homography: number[][] | null`

**Renders:** A plain-language summary paragraph using `getStatusSummary()` from metricsUtils. Uses ISRO/PS terminology: "sub-pixel correspondences", "inlier matches", "homography transformation."

**Dependencies:** TASK-008

**Priority:** P1

---

### TASK-042
**Title:** Create `src/components/results/ResultsHeader.tsx`

**File Created:**
```
client/src/components/results/ResultsHeader.tsx
```

**Props:** `metrics: PredictMetrics`, `homography: number[][] | null`, `onNewRegistration: () => void`

**Renders:**
- `<h1>` "Registration Results"
- `QualityBadge`
- "New Registration" Button (calls `onNewRegistration`)

**Dependencies:** TASK-017, TASK-040

**Priority:** P0

---

### TASK-043
**Title:** Create `src/components/results/VisualizationPanel.tsx`

**File Created:**
```
client/src/components/results/VisualizationPanel.tsx
```

**Props:**
```typescript
interface VisualizationPanelProps {
  title: string;
  caption: string;        // PS-relevant explanation
  src: string;            // base64 data URI
  filename: string;       // for download
  altText: string;        // meaningful alt text
  onExpand: () => void;
}
```

**Acceptance Criteria:**
- Renders `<img src={base64DataUri} alt={altText} loading="lazy" />`
- Empty `src` → gray placeholder "Visualization unavailable"
- Download button → `downloadBase64Image(src, filename)` from imageUtils
- Expand button / click on image → `onExpand()`
- Keyboard accessible expand

**Dependencies:** TASK-009, TASK-017

**Priority:** P0

---

### TASK-044
**Title:** Create `src/components/results/VisualizationGrid.tsx`

**File Created:**
```
client/src/components/results/VisualizationGrid.tsx
```

**Props:** `visualizations: PredictVisualizations`, `metrics: PredictMetrics`

**Renders 5 VisualizationPanels:**

| # | Title | Caption | Field | Filename | Alt Text |
|---|---|---|---|---|---|
| 1 | Reference Keypoints | "Reference (LRO/SELENE) image with detected keypoints. Green = RANSAC inliers, Red = all matches." | `ref_points` | `reference_keypoints.jpg` | "Reference image with {N} detected keypoints" |
| 2 | Source Keypoints | "Chandrayaan-2 source image with matched keypoints drawn at corresponding positions." | `src_points` | `source_keypoints.jpg` | "Source image with {N} keypoints" |
| 3 | Correspondence Lines | "Both images with lines connecting matched keypoints. Green = inliers used for homography, Red = outliers." | `match_lines` | `match_lines.jpg` | "Match lines showing {N} correspondences" |
| 4 | Warped Source | "Chandrayaan-2 image geometrically warped to align with the reference coordinate system." | `warped_source` | `warped_source.jpg` | "Warped source image aligned to reference" |
| 5 | Registration Overlay | "50/50 alpha blend of reference and warped source. Sharp aligned regions indicate accurate registration." | `registered_overlay` | `registration_overlay.jpg` | "Registration overlay image" |

**Layout:** 3-col (desktop) / 2-col (tablet) / 1-col (mobile)

**Manages:** Which panel is expanded for lightbox; renders `ImageLightbox`

**Dependencies:** TASK-043, TASK-045

**Priority:** P0

---

### TASK-045
**Title:** Create `src/components/results/ImageLightbox.tsx`

**File Created:**
```
client/src/components/results/ImageLightbox.tsx
```

**Props:** `isOpen: boolean`, `onClose: () => void`, `src: string`, `title: string`, `altText: string`

**Acceptance Criteria:**
- Full-screen modal with image at max size (preserving aspect ratio)
- Title shown above image
- Close button (X) in top-right corner
- Escape key closes
- Focus trapped — REQ-A07
- Touch-friendly close button size >= 44x44px — REQ-M07

**Dependencies:** TASK-024

**Priority:** P1

---

### TASK-046
**Title:** Create `src/components/results/HomographyMatrix.tsx`

**File Created:**
```
client/src/components/results/HomographyMatrix.tsx
```

**Props:** `homography: number[][] | null`

**Accepts:**
- 3x3 matrix → render formatted grid with `formatDecimal(val, 6)` per cell
- `null` → show warning: "Homography could not be computed. Insufficient inlier correspondences."

**Includes:** `CopyButton` that copies the matrix as `JSON.stringify(homography, null, 2)`

**Acceptance Criteria:**
- Monospace font in matrix cells
- `overflow-x-auto` wrapper — REQ-M04
- Copy button with clipboard feedback

**Dependencies:** TASK-025, TASK-010

**Priority:** P1

---

### TASK-047
**Title:** Create `src/components/results/KeypointsSummary.tsx`

**File Created:**
```
client/src/components/results/KeypointsSummary.tsx
```

**Props:** `keypoints: PredictKeypoints`, `metrics: PredictMetrics`

**Renders:**
- Summary line: "N total correspondences found, K are inliers. Match points distributed across the image area."
- P2: Expandable table (first 50 rows): x_ref, y_ref, x_src, y_src, confidence, inlier (✓/✗)

**Dependencies:** TASK-006, TASK-017

**Priority:** P1 (summary) / P2 (table)

---

## PHASE 12 — `src/app/` (Pages)

---

### TASK-048
**Title:** Create `src/app/page.tsx` (Home / Upload Page)

**File Modified:**
```
client/src/app/page.tsx
```

**Sections:**
1. **Hero section** — "Lunar Image Registration for Chandrayaan-2" + brief description of PS SIH26166
2. **Upload form** — `ImageUploadPair` component
3. **Submit** — `SubmitButton`
4. **Loading overlay** — `LoadingOverlay` with rotating messages
5. **Error state** — `ErrorAlert` with "Try Again"

**Wiring:**
- Use `useImageUpload` hook for file state
- Use `usePrediction` hook for API call
- On success: `PredictionContext.updateResult(data)` → `router.push("/results")`
- On error: show `ErrorAlert`

**FormData field mapping enforced:**
- `reference` file → appended as `"image1"` (LRO/fixed)
- `source` file → appended as `"image2"` (Chandrayaan-2/moving)

**Acceptance Criteria:**
- Single `<h1>` on page
- Both images required before submit
- LoadingOverlay appears during API call
- Rotating messages show PS-relevant text
- Error is recoverable (try again resets form)
- Navigation to `/results` on success

**Dependencies:** TASK-032, TASK-036, TASK-037, TASK-011, TASK-012, TASK-013, TASK-014, TASK-021, TASK-022

**Priority:** P0

---

### TASK-049
**Title:** Create `src/app/results/page.tsx` (Results Page)

**File Created:**
```
client/src/app/results/page.tsx
```

**On Mount:**
- Read `PredictionContext.result`
- If null → `router.replace("/")` immediately

**Sections (in order, from PRD Section 9.1):**
1. `ResultsHeader` (title + quality badge + "New Registration" button)
2. `MetricsGrid` (4 cards: total, inliers, ratio, RMSE)
3. `RegistrationStatus` (plain-language summary)
4. `WarningBanner` (if quality is "poor" or "failed")
5. `VisualizationGrid` (5 panels + lightbox)
6. `HomographyMatrix`
7. `KeypointsSummary`

**"New Registration" handler:** `context.clearResult()` → `router.push("/")`

**Dependencies:** TASK-014, TASK-042, TASK-039, TASK-041, TASK-023, TASK-044, TASK-046, TASK-047

**Priority:** P0

---

### TASK-050
**Title:** Create `src/app/about/page.tsx` (About Page)

**File Created:**
```
client/src/app/about/page.tsx
```

**Sections:**
1. **Problem Statement** — PS SIH26166 title + ISRO/SIH context
2. **Challenge Description** — illumination variation, viewpoint variation, scale variation (from PS)
3. **How it Works** — pipeline steps (from PRD Appendix B)
4. **Sensor Descriptions** — OHRC, TMC-2, IIRS (source), LRO NAC, SELENE (reference)
5. **About the Model** — LoFTR, fine-tuned on lunar imagery
6. **Datasets** — links to chmapbrowse.issdc.gov.in and LRO NAC dataset
7. **Team** — TBD (team member cards)

**Dependencies:** TASK-032

**Priority:** P2

---

### TASK-051
**Title:** Create `src/app/not-found.tsx` (404 Page)

**File Created:**
```
client/src/app/not-found.tsx
```

**Content:** 404 message + "Go to Registration Tool" button → `/`

**Dependencies:** TASK-032

**Priority:** P2

---

## PHASE 13 — Testing

---

### TASK-052
**Title:** Unit tests for `metricsUtils.ts`

**Files Created:**
```
client/src/utils/__tests__/metricsUtils.test.ts
```

**Test cases:**
- `getRegistrationQuality` with: null homography, 0 total, ratio < 20%, ratio 20-49%, ratio >= 50%
- `getStatusSummary` produces PS-relevant language
- `getInlierRatioDisplay` handles zero total_matches (→ "N/A")
- `getRMSEDisplay` returns "TBD" when rmse is undefined

**Dependencies:** TASK-008

**Priority:** P2

---

### TASK-053
**Title:** Unit tests for `imageUtils.ts`

**Files Created:**
```
client/src/utils/__tests__/imageUtils.test.ts
```

**Test cases:**
- `validateImageFile` rejects `.pdf`, `.tiff`, `.bmp`
- `validateImageFile` accepts `image/jpeg`, `image/png`
- Large file size triggers warning

**Dependencies:** TASK-009

**Priority:** P2

---

### TASK-054
**Title:** Integration test for prediction service

**Files Created:**
```
client/src/services/__tests__/predictionService.test.ts
```

**Test cases:**
- FormData contains `image1` (reference) and `image2` (source) — exact field names
- 422 response → readable error message
- 500 response → readable error message
- Network error → readable error message

**Dependencies:** TASK-016

**Priority:** P2

---

### TASK-055
**Title:** End-to-end test — full registration flow

**Files Created:**
```
client/e2e/registration.spec.ts
```

**Flow tested:**
1. Navigate to `/`
2. Upload two test images
3. Click "Register Images"
4. Wait for `/results` navigation
5. Assert 5 visualization panels exist
6. Assert metrics cards exist

**Dependencies:** All Phase 10-12 tasks

**Priority:** P2

---

## PHASE 14 — Responsive + Accessibility

---

### TASK-056
**Title:** Responsive implementation review

**Description:**
Verify all responsive requirements from PRD Section 15 across all breakpoints.

**Checklist:**
- [ ] Mobile upload form: stacked single-column
- [ ] Mobile metrics: 2-column grid
- [ ] Mobile visualizations: 1-column stacked
- [ ] Tablet visualizations: 2-column grid
- [ ] Desktop visualizations: 3-column grid
- [ ] Homography matrix: overflow-x-auto on mobile
- [ ] Header: hamburger menu on mobile

**Dependencies:** All component tasks

**Priority:** P1

---

### TASK-057
**Title:** Accessibility audit

**Description:**
Verify all accessibility requirements from PRD Section 16.

**Checklist:**
- [ ] REQ-A01: All interactive elements keyboard-navigable
- [ ] REQ-A02: All inputs have `<label>`
- [ ] REQ-A03: All images have meaningful `alt` text (dynamically including metric values)
- [ ] REQ-A04: No status conveyed by color alone
- [ ] REQ-A05: Contrast >= 4.5:1
- [ ] REQ-A06: aria-live on loading regions
- [ ] REQ-A07: Modal focus trap + Escape + focus restore
- [ ] REQ-A08: Errors linked via aria-describedby
- [ ] REQ-A09: prefers-reduced-motion respected
- [ ] REQ-A10: Semantic HTML throughout

**Tool:** axe DevTools browser extension + Lighthouse Accessibility

**Acceptance Criteria:** Lighthouse Accessibility score >= 90

**Dependencies:** All component tasks

**Priority:** P1

---

## PHASE 15 — Deployment

---

### TASK-058
**Title:** Production build and deployment

**Files Modified:**
```
client/.env.local      (production FASTAPI_BASE_URL)
client/next.config.ts  (if needed)
```

**Steps:**
1. Set `FASTAPI_BASE_URL` to production FastAPI URL (deployed server)
2. Run `npm run build` — must exit with code 0, no TypeScript errors
3. Deploy to Vercel: `npx vercel --prod`
4. Verify proxy route reaches FastAPI backend from production
5. Run Lighthouse on production URL

**Acceptance Criteria:**
- Build passes with zero TypeScript errors
- `/api/predict` proxy route works in production
- At least one successful registration test on production deployment
- Lighthouse Performance >= 80, Accessibility >= 90

**Dependencies:** All previous tasks

**Priority:** P1

---

## Complete File Tree Reference

```
client/
├── .env.local                                    TASK-003
├── .env.example                                  TASK-003
├── .eslintrc.json                                TASK-001
├── .prettierrc                                   TASK-005
├── next.config.ts                                TASK-004
├── package.json                                  TASK-001, 002
├── tailwind.config.ts                            TASK-006
├── tsconfig.json                                 TASK-001
│
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── isro-logo.png
│       └── lunar-bg.jpg
│
└── src/
    ├── styles/
    │   └── globals.css                           TASK-006
    │
    ├── types/
    │   └── prediction.ts                         TASK-007
    │
    ├── utils/
    │   ├── metricsUtils.ts                       TASK-008
    │   ├── imageUtils.ts                         TASK-009
    │   ├── formatters.ts                         TASK-010
    │   └── __tests__/
    │       ├── metricsUtils.test.ts              TASK-052
    │       └── imageUtils.test.ts                TASK-053
    │
    ├── hooks/
    │   ├── useImageUpload.ts                     TASK-011
    │   ├── useLoadingMessages.ts                 TASK-012
    │   └── usePrediction.ts                      TASK-013
    │
    ├── context/
    │   └── PredictionContext.tsx                 TASK-014
    │
    ├── services/
    │   ├── predictionService.ts                  TASK-016
    │   └── __tests__/
    │       └── predictionService.test.ts         TASK-054
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx                        TASK-017
    │   │   ├── Badge.tsx                         TASK-018
    │   │   ├── Tooltip.tsx                       TASK-019
    │   │   ├── LoadingSpinner.tsx                TASK-020
    │   │   ├── LoadingOverlay.tsx                TASK-021
    │   │   ├── ErrorAlert.tsx                    TASK-022
    │   │   ├── WarningBanner.tsx                 TASK-023
    │   │   ├── Modal.tsx                         TASK-024
    │   │   ├── CopyButton.tsx                    TASK-025
    │   │   ├── EmptyState.tsx                    TASK-026
    │   │   └── Divider.tsx                       TASK-027
    │   │
    │   ├── layout/
    │   │   ├── PageLayout.tsx                    TASK-028
    │   │   ├── Section.tsx                       TASK-029
    │   │   ├── AppFooter.tsx                     TASK-030
    │   │   └── AppHeader.tsx                     TASK-031
    │   │
    │   ├── upload/
    │   │   ├── ImageDropzone.tsx                 TASK-033
    │   │   ├── ImagePreview.tsx                  TASK-034
    │   │   ├── SensorBadge.tsx                   TASK-035
    │   │   ├── ImageUploadPair.tsx               TASK-036
    │   │   └── SubmitButton.tsx                  TASK-037
    │   │
    │   └── results/
    │       ├── MetricsCard.tsx                   TASK-038
    │       ├── MetricsGrid.tsx                   TASK-039
    │       ├── QualityBadge.tsx                  TASK-040
    │       ├── RegistrationStatus.tsx            TASK-041
    │       ├── ResultsHeader.tsx                 TASK-042
    │       ├── VisualizationPanel.tsx            TASK-043
    │       ├── VisualizationGrid.tsx             TASK-044
    │       ├── ImageLightbox.tsx                 TASK-045
    │       ├── HomographyMatrix.tsx              TASK-046
    │       └── KeypointsSummary.tsx              TASK-047
    │
    └── app/
        ├── layout.tsx                            TASK-032
        ├── page.tsx                              TASK-048
        ├── not-found.tsx                         TASK-051
        │
        ├── results/
        │   └── page.tsx                          TASK-049
        │
        ├── about/
        │   └── page.tsx                          TASK-050
        │
        └── api/
            └── predict/
                └── route.ts                      TASK-015

e2e/
└── registration.spec.ts                          TASK-055
```

---

## Critical Path (P0 Tasks — must complete in this order)

```
TASK-001 (init project)
  └── TASK-002 (install deps)
  └── TASK-003 (env vars)
  └── TASK-006 (design tokens)       ← all components depend on this
      └── TASK-007 (TS types)        ← all API layer depends on this
      └── TASK-017 (Button)
      └── TASK-020 (LoadingSpinner)
          └── TASK-021 (LoadingOverlay)
      └── TASK-022 (ErrorAlert)
      └── TASK-028 (PageLayout)

TASK-007 → TASK-008 (metricsUtils) → TASK-039, 040, 041, 042
TASK-007 → TASK-014 (PredictionContext)

TASK-003 → TASK-015 (proxy route)
TASK-015 → TASK-016 (prediction service)
TASK-016 → TASK-013 (usePrediction hook)

TASK-031 (AppHeader) + TASK-030 (AppFooter) + TASK-014 + TASK-028
  └── TASK-032 (root layout) ← all pages depend on this

TASK-033 + TASK-034 → TASK-036 (ImageUploadPair)
TASK-036 + TASK-037 + TASK-013 + TASK-014
  └── TASK-048 (Home page — FULL SUBMISSION WIRED)

TASK-038 → TASK-039 → TASK-042
TASK-040 → TASK-041
TASK-043 → TASK-044
TASK-046 → TASK-047 (HomographyMatrix → KeypointsSummary)

TASK-039 + TASK-041 + TASK-042 + TASK-044 + TASK-046 + TASK-047 + TASK-014
  └── TASK-049 (Results page — FULL DASHBOARD VISIBLE)

[TASK-048 + TASK-049] = COMPLETE USER JOURNEY
```

---

*Document: client/TASK/TASK.md | PS: SIH26166 | ISRO / SIH2026 | Updated: 2026-09-05*
