# Product Requirements Document (PRD)
## SIH2026 — PS SIH26166: Lunar Image Correspondence Tool
### Multi-modal, Sun Angle and Scale Invariant Image Correspondence using Chandrayaan-2 Optical Images

**Version:** 2.0.0
**Date:** 2026-09-05
**Status:** Final Draft
**PS Number:** SIH26166
**Organization:** Indian Space Research Organisation (ISRO)
**Department:** Department of Space / Indian Space Research Organisation
**Category:** Software
**Theme:** Space Technology
**Deadline:** 30 September 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Goals and Objectives](#4-goals-and-objectives)
5. [Core User Journeys](#5-core-user-journeys)
6. [Frontend Feature Requirements](#6-frontend-feature-requirements)
7. [Pages and Routes](#7-pages-and-routes)
8. [UI Components Required](#8-ui-components-required)
9. [Dashboard Requirements](#9-dashboard-requirements)
10. [Forms and User Inputs](#10-forms-and-user-inputs)
11. [ML / API Integration Requirements](#11-ml--api-integration-requirements)
12. [API Endpoints — Request / Response Schemas](#12-api-endpoints--request--response-schemas)
13. [Loading, Error, Empty, and Success States](#13-loading-error-empty-and-success-states)
14. [Authentication / Authorization Requirements](#14-authentication--authorization-requirements)
15. [Responsive / Mobile Requirements](#15-responsive--mobile-requirements)
16. [Accessibility Requirements](#16-accessibility-requirements)
17. [Performance Requirements](#17-performance-requirements)
18. [Security Considerations](#18-security-considerations)
19. [Recommended Frontend Architecture](#19-recommended-frontend-architecture)
20. [Technology Stack](#20-technology-stack)

---

## 1. Project Overview

This project is submitted for **Smart India Hackathon 2026** under **Problem Statement SIH26166** issued by the **Indian Space Research Organisation (ISRO)**.

**PS Title:** Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical images (OHRC, TMC and IIRS)

The system performs **lunar surface image registration** — finding point-to-point correspondences between two lunar images and geometrically aligning them into a common coordinate system. It targets images acquired by the Chandrayaan-2 mission's three optical payloads:

| Sensor | Full Name | Purpose |
|---|---|---|
| **OHRC** | Orbiter High Resolution Camera | High-resolution surface imaging |
| **TMC-2** | Terrain Mapping Camera-2 | Stereo terrain mapping |
| **IIRS** | Imaging Infrared Spectrometer | Surface composition mapping |

Reference images come from external sources such as **LRO NAC** (Lunar Reconnaissance Orbiter Narrow Angle Camera) and **SELENE** images.

The ML backend uses a fine-tuned **LoFTR (Local Feature TRansformer)** model (`best_lunar_loftr.pt`, HuggingFace: `VashuTheGreat2/lunar-loftr-registration`) to detect and match keypoints between two lunar images, then computes a **homography matrix** to geometrically align the source image onto the reference image coordinate system. The system returns sub-pixel level correspondences and rich visualizations.

The frontend is a **web-based interface** that allows ISRO researchers to:
- Upload a Chandrayaan-2 image (source) and a reference lunar image (LRO/SELENE)
- Submit them to the ML/CV registration pipeline
- Visualize the detected correspondences, warped image, and overlay
- Evaluate registration quality via metrics: RMSE, inlier count, inlier ratio
- Download results for further scientific analysis

---

## 2. Problem Statement

### Official PS Description (SIH26166)

> Image Registration is the process of aligning two or more images of the same scene taken at different times, from different viewpoints, or by different sensors into a common coordinate system.
>
> - **Source Image (Moving):** The image that is to be geometrically transformed to align with the reference image.
> - **Reference Image (Fixed):** The target image about which source image is to be geometrically transformed.
>
> The process of lunar image registration involves finding match points between source and reference image and then aligning the source image with the reference image.

### Key Challenges (from PS)

| Challenge | Description |
|---|---|
| **Illumination Variation** | Changes in sun azimuth and elevation affect surface lighting conditions, making the same features appear differently across images. Hard to correlate. |
| **Viewpoint Variation** | Geometric distortions caused by different camera positions/orientations. Objects appear shifted, scaled, rotated, or perspective-distorted depending on observing angle. |
| **Scale Variation** | Chandrayaan-2 imaging missions operate at vastly different altitudes and spatial resolutions, creating large scale ratios between source and reference images. |

### Expected Solution (from PS)

> Generic software solution for finding correspondence between Chandrayaan-2 acquired optical images and Lunar reference images with **sub-pixel accuracy** of source image maintaining **uniform distribution** across the images.
>
> **Deliverables:**
> - Software and registered product with corresponding match points
> - Evaluation metrics (e.g. RMSE, inlier match count, inlier ratio, etc.)

### Datasets
- **Chandrayaan-2 data:** https://chmapbrowse.issdc.gov.in/ (OHRC, TMC-2, IIRS images)
- **LRO NAC reference:** https://lroc.im-ldi.com/images/downloads/ and https://quickmap.lroc.im-ldi.com/
- **SELENE images** (TBD — specific dataset link to be provided)

---

## 3. Target Users

| User Type | Description | Technical Level |
|---|---|---|
| **ISRO Scientists / Remote Sensing Researchers** | Work with Chandrayaan-2 imagery for scientific analysis. Need sub-pixel registration results, RMSE metrics, and downloadable output products. | High |
| **Planetary Geologists** | Use registered image pairs for crater morphology, stratigraphy, change detection. Need visual overlays and comparison views. | Medium-High |
| **Photogrammetry Engineers** | Perform 3D reconstruction and terrain mapping. Need homography matrix and warped outputs. | High |
| **SIH Judges / ISRO Evaluators** | Assess the demo. Need a polished, self-explanatory interface with clear evaluation metrics. | Low-Medium |
| **Students / Interns** | Learning multi-modal image registration. Need clearly labeled outputs with explanations of each metric. | Low-Medium |

---

## 4. Goals and Objectives

### Primary Goals (Directly from PS Requirements)
- **G1:** Accept a Chandrayaan-2 optical image (OHRC/TMC-2/IIRS) as Source and a lunar reference image (LRO NAC / SELENE) as Reference.
- **G2:** Run the LoFTR-based registration pipeline and return sub-pixel correspondences.
- **G3:** Display evaluation metrics: **RMSE**, inlier match count, inlier ratio.
- **G4:** Show the registered/warped source image aligned to the reference coordinate system.
- **G5:** Show a blended overlay to visually assess registration quality.
- **G6:** Display all matched keypoints with their confidence scores and inlier/outlier classification.

### Secondary Goals
- **G7:** Show all 5 visualization outputs: reference keypoints, source keypoints, match lines, warped source, overlay.
- **G8:** Display the 3x3 homography matrix (the geometric transformation found).
- **G9:** Allow users to download registered output images.
- **G10:** Provide contextual explanations for non-expert evaluators.

### Non-Goals (Out of Scope for v1)
- Batch processing of entire image archives — TBD
- Automatic sensor type detection — TBD
- 3D reconstruction from registered pairs — Out of scope
- Support for raw FITS or TIFF formats — TBD
- User authentication and session persistence — TBD

---

## 5. Core User Journeys

### Journey 1: Researcher — Chandrayaan-2 to LRO Registration
```
1. Researcher lands on the Home page.
2. Reads brief explanation: "Register Chandrayaan-2 images against LRO reference imagery."
3. Uploads a Chandrayaan-2 image (e.g., OHRC) as the Source Image.
4. Uploads an LRO NAC image of the same lunar region as the Reference Image.
5. Previews both images. Clicks "Register Images."
6. Loading state shown ("Detecting keypoints...", "Computing homography...", etc.)
7. Results page appears:
   - RMSE, inlier count, inlier ratio shown as metric cards.
   - 5 visualization panels displayed.
   - Homography matrix displayed.
8. Researcher downloads the registered overlay for scientific use.
```

### Journey 2: Multi-modal (IIRS to OHRC) Registration
```
1. Researcher uploads an IIRS image (Source) and an OHRC image of the same area (Reference).
2. Submits for registration.
3. Results show how different sensors of the same mission can be co-registered.
4. Evaluator uses metrics to judge accuracy.
```

### Journey 3: Evaluator — Assessing Registration Quality
```
1. Evaluator submits a known test image pair (with ground truth).
2. Views RMSE metric prominently.
3. Checks inlier ratio — green badge if good.
4. Inspects match lines visualization to see uniform distribution of matches.
5. Downloads overlay to visually verify alignment.
```

### Journey 4: Poor Match / Error Scenario
```
1. User uploads images with very different sun angles or scales.
2. API returns success but with very few inliers, RMSE is high / homography is null.
3. UI shows warning: "Low registration quality. Illumination or scale differences may be too large."
4. User is guided to try different images or image preprocessing.
```

---

## 6. Frontend Feature Requirements

### 6.1 Image Upload
- **REQ-F01:** Accept two image uploads: "Source Image" (Chandrayaan-2: OHRC/TMC-2/IIRS) and "Reference Image" (LRO NAC / SELENE / other Chandrayaan-2 image).
- **REQ-F02:** Supported formats: JPEG, JPG, PNG (matching backend cv2.imread compatibility).
- **REQ-F03:** File size validation: TBD (suggest 15MB per image — lunar images can be large).
- **REQ-F04:** Drag-and-drop and click-to-browse for each slot.
- **REQ-F05:** Thumbnail preview before submission using URL.createObjectURL.
- **REQ-F06:** Allow replacing a selected image before submission.
- **REQ-F07:** Client-side file type validation.
- **REQ-F08:** Labels must clearly indicate which slot is "Source (Chandrayaan-2)" and which is "Reference (LRO/SELENE)."

### 6.2 Submission
- **REQ-F09:** "Register Images" button disabled until both files are selected.
- **REQ-F10:** Loading overlay during API call with rotating contextual messages.
- **REQ-F11:** Cannot submit twice simultaneously.

### 6.3 Results — Evaluation Metrics (per PS requirement)
The PS explicitly requires evaluation metrics. Display:

| Metric | Source | Display |
|---|---|---|
| **Total Matches** | `metrics.total_matches` | Stat card |
| **Inlier Count** | `metrics.inliers_count` | Stat card |
| **Inlier Ratio** | Computed: `inliers_count / total_matches * 100%` | Stat card + quality badge |
| **RMSE** | TBD — not yet returned by API. Mark as **TBD** in UI if not available | Stat card (when available) |

- **REQ-F12:** Display all available metrics as highlighted stat cards.
- **REQ-F13:** Inlier ratio color-coded: green >= 50%, yellow 20-49%, red < 20%.
- **REQ-F14:** RMSE field: render if present in response, show "TBD" placeholder if not yet implemented in API.

### 6.4 Results — Visualizations
Five visualization images returned as base64 data URIs:

| Panel | API Field | Description |
|---|---|---|
| Reference Keypoints | `visualizations.ref_points` | Reference image with detected keypoints (red=all, green=inliers) |
| Source Keypoints | `visualizations.src_points` | Source image with detected keypoints drawn |
| Feature Match Lines | `visualizations.match_lines` | Side-by-side with lines connecting matched keypoints (green=inlier, red=outlier) |
| Warped Source | `visualizations.warped_source` | Source image geometrically warped to reference coordinate system |
| Registration Overlay | `visualizations.registered_overlay` | 50/50 blend of reference and warped source |

- **REQ-F15:** All 5 panels displayed with titles and captions explaining PS-relevant context.
- **REQ-F16:** Click any panel to open in full-screen lightbox.
- **REQ-F17:** Download button on each panel.

### 6.5 Results — Match Distribution (PS requirement: uniform distribution)
The PS requires "uniform distribution across the images." The frontend must indicate whether match distribution is uniform.

- **REQ-F18:** Show the match lines visualization prominently — this directly demonstrates distribution quality.
- **REQ-F19:** In the keypoints summary, show match count alongside a note about distribution (e.g., "matches distributed across the full image area").
- **REQ-F20:** TBD — if the backend adds a distribution score or grid-based match density metric, display it.

### 6.6 Results — Homography Matrix
- **REQ-F21:** Display 3x3 homography matrix in a formatted grid.
- **REQ-F22:** Values to 6 decimal places.
- **REQ-F23:** If null: "Homography could not be computed. Insufficient inlier correspondences."
- **REQ-F24:** Copy-to-clipboard as JSON.

### 6.7 Results — Keypoints Data
- **REQ-F25:** Summary: "N total correspondences found, K are inliers (sub-pixel level)."
- **REQ-F26:** Expandable table of first 50 correspondences (x_ref, y_ref, x_src, y_src, confidence, inlier) — P2.

### 6.8 Navigation and About
- **REQ-F27:** Header with project name and navigation links (Home, About).
- **REQ-F28:** "New Registration" button on results page.
- **REQ-F29:** About page explaining the PS, ISRO context, and sensor descriptions (OHRC, TMC-2, IIRS, LoFTR).

---

## 7. Pages and Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home / Upload** | Landing page. Hero section explaining the PS. Image upload form. |
| `/results` | **Results / Dashboard** | Displays metrics, all 5 visualizations, homography matrix, keypoints summary. Data from React context. |
| `/about` | **About** | PS details, ISRO sensor descriptions, LoFTR model explanation, team info. |
| `*` | **404** | Not-found page with redirect to home. |

> Redirect from `/results` to `/` if no prediction data in context.

---

## 8. UI Components Required

### Layout Components
| Component | File | Description |
|---|---|---|
| `AppHeader` | `components/layout/AppHeader.tsx` | Nav bar: logo + project name + nav links + mobile menu |
| `AppFooter` | `components/layout/AppFooter.tsx` | Footer: SIH2026, PS SIH26166, ISRO attribution |
| `PageLayout` | `components/layout/PageLayout.tsx` | Max-width wrapper with consistent padding |
| `Section` | `components/layout/Section.tsx` | Titled section container |

### Upload Components
| Component | File | Description |
|---|---|---|
| `ImageDropzone` | `components/upload/ImageDropzone.tsx` | Drag-and-drop zone with click fallback |
| `ImagePreview` | `components/upload/ImagePreview.tsx` | Thumbnail + filename + remove button |
| `ImageUploadPair` | `components/upload/ImageUploadPair.tsx` | Two dropzones side by side (Source + Reference) |
| `SubmitButton` | `components/upload/SubmitButton.tsx` | Disabled/loading-aware submit button |
| `SensorBadge` | `components/upload/SensorBadge.tsx` | Clickable badge chips for sensor type hint (OHRC / TMC-2 / IIRS / LRO NAC) |

### Results Components
| Component | File | Description |
|---|---|---|
| `VisualizationPanel` | `components/results/VisualizationPanel.tsx` | Single image panel with title, caption, download |
| `VisualizationGrid` | `components/results/VisualizationGrid.tsx` | Responsive grid of all 5 panels |
| `ImageLightbox` | `components/results/ImageLightbox.tsx` | Full-screen modal viewer |
| `MetricsCard` | `components/results/MetricsCard.tsx` | Single stat card (value + label + icon + tooltip) |
| `MetricsGrid` | `components/results/MetricsGrid.tsx` | Row of stat cards: matches, inliers, ratio, RMSE |
| `QualityBadge` | `components/results/QualityBadge.tsx` | Good / Fair / Poor / Failed registration quality |
| `RegistrationStatus` | `components/results/RegistrationStatus.tsx` | Plain-language status summary banner |
| `HomographyMatrix` | `components/results/HomographyMatrix.tsx` | 3x3 matrix grid with copy button |
| `KeypointsSummary` | `components/results/KeypointsSummary.tsx` | Match count + inlier summary + optional expandable table |
| `ResultsHeader` | `components/results/ResultsHeader.tsx` | Page title + quality badge + "New Registration" button |

### Common Components
| Component | File | Description |
|---|---|---|
| `Button` | `components/common/Button.tsx` | Variants: primary, secondary, ghost, danger |
| `Badge` | `components/common/Badge.tsx` | Status badge: success, warning, error, info, neutral |
| `Tooltip` | `components/common/Tooltip.tsx` | Hover/focus popover for term definitions |
| `LoadingSpinner` | `components/common/LoadingSpinner.tsx` | Animated spinner, size variants |
| `LoadingOverlay` | `components/common/LoadingOverlay.tsx` | Full-section overlay with spinner + status message |
| `ErrorAlert` | `components/common/ErrorAlert.tsx` | Error display + optional retry button |
| `EmptyState` | `components/common/EmptyState.tsx` | No-data placeholder |
| `Modal` | `components/common/Modal.tsx` | Accessible modal with focus trap |
| `CopyButton` | `components/common/CopyButton.tsx` | Clipboard copy with confirmation feedback |
| `Divider` | `components/common/Divider.tsx` | Visual section separator |
| `WarningBanner` | `components/common/WarningBanner.tsx` | Yellow warning banner for poor quality results |

---

## 9. Dashboard Requirements

The Results page is the primary output dashboard.

### 9.1 Layout Structure

```
+----------------------------------------------------------+
|  Results Header                                          |
|  "Registration Results" | Quality Badge | New Reg. btn   |
+----------------------------------------------------------+
|  Metrics Grid (4 cards)                                  |
|  [ Total Matches ] [ Inliers ] [ Inlier Ratio ] [ RMSE ] |
+----------------------------------------------------------+
|  Registration Status Banner (plain-language summary)     |
+----------------------------------------------------------+
|  Visualization Grid (responsive: 1/2/3 cols)             |
|  [ Ref Keypoints ] [ Src Keypoints ] [ Match Lines ]     |
|  [ Warped Source ] [ Registration Overlay ]              |
+----------------------------------------------------------+
|  Homography Matrix Panel (3x3 grid + copy button)        |
+----------------------------------------------------------+
|  Keypoints Summary (count + expandable table P2)         |
+----------------------------------------------------------+
```

### 9.2 Quality Thresholds

| Quality | Condition |
|---|---|
| **Good** | inlier ratio >= 50% AND homography != null |
| **Fair** | inlier ratio 20%-49% OR (total_matches >= 4 but low ratio) |
| **Poor** | inlier ratio < 20% OR total_matches < 4 |
| **Failed** | homography == null |

### 9.3 Registration Status Messages
- Good: "Strong registration: N matches, K inliers (X%). Sub-pixel correspondences computed. Homography valid."
- Fair: "Moderate registration: N matches, K inliers (X%). Results may have some error — consider image preprocessing."
- Poor: "Weak registration: Very few inliers. Illumination variation or scale mismatch may be too large. Try different images."
- Failed: "Registration failed: Insufficient correspondences. Homography could not be estimated."

### 9.4 RMSE Display
- If RMSE is returned by API: display as "X.XX px" with tooltip "Root Mean Square Error of keypoint reprojection — lower is better."
- If not returned (current API does not include RMSE): display placeholder "RMSE: TBD" in a neutral/gray card.

---

## 10. Forms and User Inputs

### 10.1 Image Upload Form

| Field | API Field Name | Label | Validation |
|---|---|---|---|
| Source Image | `image2` | "Source Image (Chandrayaan-2: OHRC / TMC-2 / IIRS)" | Required; image/jpeg or image/png |
| Reference Image | `image1` | "Reference Image (LRO NAC / SELENE / Other)" | Required; image/jpeg or image/png |

> **IMPORTANT — Field Name Mapping:**
> The FastAPI route uses: `image1` = Reference (fixed), `image2` = Source (moving).
> The UI labels must be clear to ISRO users about which sensor's image goes where.

**Client-side validations:**
- Both files required before enabling submit
- File type: image/jpeg or image/png only
- File size warning: > TBD MB (suggest 15MB for lunar imagery)

**Optional UX — Sensor Type Hints:**
Below each dropzone, show small clickable chips for sensor context (informational only, not sent to API):
- Source slot: [OHRC] [TMC-2] [IIRS]
- Reference slot: [LRO NAC] [SELENE] [Other C2]

---

## 11. ML / API Integration Requirements

### 11.1 Backend Base URL
- Development: `http://localhost:8000`
- Production: TBD (env var: `FASTAPI_BASE_URL`, server-side only)

### 11.2 Communication
- `multipart/form-data` POST with binary image files
- `application/json` response
- Visualizations as base64 data URIs (no separate image fetch)
- Synchronous — may take 15-90 seconds on CPU

### 11.3 Timeout
Set **120-second** timeout. LoFTR inference on CPU can be slow for large lunar images.

### 11.4 CORS
No CORS middleware in current FastAPI app. Use **Next.js API route proxy** (`/api/predict`) to forward all requests server-side. Backend URL never exposed to browser.

### 11.5 RMSE Note
The current API (`/api/v1/predict`) does NOT return an RMSE value. RMSE is mentioned as an expected evaluation metric in the PS. The frontend should:
- Display RMSE as "TBD" if not present in API response
- Be designed to easily add RMSE display when backend adds support
- The `PredictMetrics` TypeScript interface should have `rmse?: number` as an optional field

---

## 12. API Endpoints — Request / Response Schemas

### 12.1 POST `/api/v1/predict`

**Purpose:** Submit Chandrayaan-2 source image and lunar reference image. Returns keypoint correspondences, homography, evaluation metrics, and 5 visualization images.

**Request:**
```
Method:       POST
Content-Type: multipart/form-data
URL:          {BASE_URL}/api/v1/predict

Form fields:
  image1: <binary file>   // Reference image (LRO NAC / SELENE / fixed)
  image2: <binary file>   // Source image (Chandrayaan-2 OHRC/TMC-2/IIRS / moving)
```

**Success Response (HTTP 200):**
```json
{
  "status": "success",
  "metrics": {
    "total_matches": 423,
    "inliers_count": 312
  },
  "homography": [
    [1.0023, 0.0041, -2.3145],
    [-0.0019, 0.9987, 1.8762],
    [0.0000, 0.0000, 1.0000]
  ],
  "keypoints": {
    "reference": [[x1, y1], [x2, y2]],
    "source":    [[x1, y1], [x2, y2]],
    "confidence": [0.987, 0.923],
    "inlier_mask": [true, false]
  },
  "visualizations": {
    "ref_points":          "data:image/jpeg;base64,...",
    "src_points":          "data:image/jpeg;base64,...",
    "match_lines":         "data:image/jpeg;base64,...",
    "warped_source":       "data:image/jpeg;base64,...",
    "registered_overlay":  "data:image/jpeg;base64,..."
  }
}
```

**TypeScript Interface Definitions:**
```typescript
// src/types/prediction.ts

export interface PredictMetrics {
  total_matches: number;
  inliers_count: number;
  rmse?: number;              // TBD — not in current API, optional future field
}

export interface PredictKeypoints {
  reference: [number, number][];   // [x, y] pairs — reference (LRO/SELENE) image
  source:    [number, number][];   // [x, y] pairs — source (Chandrayaan-2) image
  confidence: number[];            // match confidence 0.0-1.0 per keypoint pair
  inlier_mask: boolean[];          // true = RANSAC inlier (sub-pixel level)
}

export interface PredictVisualizations {
  ref_points:         string;  // Reference image annotated with keypoint dots
  src_points:         string;  // Source image annotated with keypoint dots
  match_lines:        string;  // Side-by-side with correspondence lines
  warped_source:      string;  // Source warped to reference coordinate system
  registered_overlay: string;  // 50/50 blend of reference + warped source
}

export interface PredictResponse {
  status: "success";
  metrics: PredictMetrics;
  homography: number[][] | null;  // 3x3 perspective transform matrix or null
  keypoints: PredictKeypoints;
  visualizations: PredictVisualizations;
}

export type RegistrationQuality = "good" | "fair" | "poor" | "failed";

export interface SensorType {
  source: "OHRC" | "TMC-2" | "IIRS" | "other";
  reference: "LRO-NAC" | "SELENE" | "C2-other" | "other";
}
```

**Error Responses:**
```json
// HTTP 422 — validation error
{ "detail": [{ "loc": ["body", "image1"], "msg": "field required" }] }

// HTTP 500 — server error
{ "detail": "Could not save vis_img0.jpg." }
```

**Edge Case — Insufficient Matches (HTTP 200, null homography):**
```json
{
  "status": "success",
  "metrics": { "total_matches": 2, "inliers_count": 0 },
  "homography": null,
  "keypoints": { "reference": [], "source": [], "confidence": [], "inlier_mask": [] },
  "visualizations": { ... }
}
```

> **No other API endpoints exist** in the current codebase. No auth, health-check, or history endpoints.
> OpenAPI docs: `{BASE_URL}/docs` and `{BASE_URL}/redoc`

---

## 13. Loading, Error, Empty, and Success States

### 13.1 Upload Form States

| State | Trigger | UI Behavior |
|---|---|---|
| **Initial** | Page load | Both dropzones show icon + "Drop Chandrayaan-2 image here" / "Drop reference image here" |
| **Partial** | 1 of 2 images selected | Filled slot shows preview; empty slot still prompts |
| **Ready** | Both images selected | Submit button enabled; both previews visible |
| **Processing** | Submit clicked | Loading overlay with rotating contextual messages |
| **Error — type** | Wrong file type | Inline: "Only JPEG and PNG formats are supported." |
| **Error — size** | File too large | Inline warning about file size |

### 13.2 Results Page States

| State | Trigger | UI Behavior |
|---|---|---|
| **Loading** | In-flight request | Overlay with spinner + "Analyzing Chandrayaan-2 imagery..." |
| **Good** | inlier ratio >= 50% | Full dashboard, green quality badge |
| **Fair** | inlier ratio 20-49% | Full dashboard, yellow badge, no warning banner |
| **Poor** | inlier ratio < 20% OR total < 4 | Full dashboard + orange warning banner |
| **Failed** | homography == null | Full dashboard + red warning banner, homography shows "N/A" |
| **API Error** | HTTP 500 / timeout | ErrorAlert + "Try Again" button |
| **No Data** | Direct URL access | Redirect to `/` |

### 13.3 Loading Messages (Rotation, 2s interval)
```
"Uploading lunar images..."
"Running LoFTR keypoint detection..."
"Finding multi-modal correspondences..."
"Filtering inlier matches with RANSAC..."
"Computing homography transformation..."
"Generating visualization outputs..."
"Almost done..."
```

---

## 14. Authentication / Authorization Requirements

**Not required for v1 (SIH Demo).**

The FastAPI backend has no authentication in the current codebase. This is appropriate for a hackathon demo in a controlled environment.

Future (post-SIH): API key authentication for ISRO intranet deployment, rate limiting.

---

## 15. Responsive / Mobile Requirements

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, stacked dropzones, 1-col visualization grid |
| Tablet | 640-1024px | 2-col visualization grid, 2-col metrics |
| Desktop | > 1024px | 3-col visualization grid, 4-col metrics row |

- **REQ-M01:** All pages usable on mobile.
- **REQ-M02:** Dropzones tap-accessible on mobile.
- **REQ-M03:** Visualization panels stack on small screens.
- **REQ-M04:** Homography matrix: `overflow-x-auto` wrapper.
- **REQ-M05:** Metrics cards stack to 2-col on mobile.
- **REQ-M06:** Header collapses to hamburger on mobile.
- **REQ-M07:** Lightbox is touch-friendly with close button.

---

## 16. Accessibility Requirements

- **REQ-A01:** All interactive elements keyboard-navigable (Tab + Enter/Space).
- **REQ-A02:** All form inputs have visible `<label>` elements.
- **REQ-A03:** All visualization images have descriptive `alt` text (e.g., "Reference image with 423 detected keypoints drawn — 312 green inliers, 111 red outliers").
- **REQ-A04:** Quality never conveyed by color alone — always include icon + text.
- **REQ-A05:** Text contrast >= 4.5:1 (WCAG AA).
- **REQ-A06:** Loading/alert states announced via `aria-live="polite"`.
- **REQ-A07:** Modal focuses trap + Escape to close + focus restored on close.
- **REQ-A08:** Error messages linked to inputs via `aria-describedby`.
- **REQ-A09:** Respect `prefers-reduced-motion`.
- **REQ-A10:** Semantic HTML: `<main>`, `<header>`, `<nav>`, `<section>`, `<footer>`.

---

## 17. Performance Requirements

- **REQ-P01:** TTI < 3s on standard broadband.
- **REQ-P02:** LCP < 2.5s.
- **REQ-P03:** Base64 visualization images (~200-500KB each) rendered lazily to avoid blocking.
- **REQ-P04:** Image previews via `URL.createObjectURL` — not FileReader base64.
- **REQ-P05:** API wait of 15-90s — UI must not freeze.
- **REQ-P06:** Bundle < 300KB gzipped for initial load.

---

## 18. Security Considerations

- **SEC-01:** FastAPI backend URL never exposed to browser — use Next.js server-side proxy.
- **SEC-02:** Client-side file type validation for UX.
- **SEC-03:** No uploaded images stored in localStorage or IndexedDB.
- **SEC-04:** base64 data URI rendered only from trusted API response — not from user input.
- **SEC-05:** Security headers in `next.config.ts`: X-Content-Type-Options, X-Frame-Options, CSP.
- **SEC-06:** Backend URL in server-only env var (`FASTAPI_BASE_URL`, no NEXT_PUBLIC_ prefix).
- **SEC-07:** Rate limiting on Next.js proxy route — TBD for production.

---

## 19. Recommended Frontend Architecture

### 19.1 Full Project Structure
```
client/
├── public/
│   ├── favicon.ico
│   └── assets/
│       ├── isro-logo.png
│       └── lunar-bg.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (AppHeader + AppFooter)
│   │   ├── page.tsx                      # Home / Upload page  [route: /]
│   │   ├── not-found.tsx                 # 404 page
│   │   ├── results/
│   │   │   └── page.tsx                  # Results dashboard  [route: /results]
│   │   ├── about/
│   │   │   └── page.tsx                  # About / PS info    [route: /about]
│   │   └── api/
│   │       └── predict/
│   │           └── route.ts              # Next.js proxy → FastAPI
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx
│   │   │   ├── AppFooter.tsx
│   │   │   ├── PageLayout.tsx
│   │   │   └── Section.tsx
│   │   ├── upload/
│   │   │   ├── ImageDropzone.tsx
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── ImageUploadPair.tsx
│   │   │   ├── SubmitButton.tsx
│   │   │   └── SensorBadge.tsx
│   │   ├── results/
│   │   │   ├── VisualizationPanel.tsx
│   │   │   ├── VisualizationGrid.tsx
│   │   │   ├── ImageLightbox.tsx
│   │   │   ├── MetricsCard.tsx
│   │   │   ├── MetricsGrid.tsx
│   │   │   ├── QualityBadge.tsx
│   │   │   ├── RegistrationStatus.tsx
│   │   │   ├── HomographyMatrix.tsx
│   │   │   ├── KeypointsSummary.tsx
│   │   │   └── ResultsHeader.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Tooltip.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── LoadingOverlay.tsx
│   │       ├── ErrorAlert.tsx
│   │       ├── EmptyState.tsx
│   │       ├── Modal.tsx
│   │       ├── CopyButton.tsx
│   │       ├── Divider.tsx
│   │       └── WarningBanner.tsx
│   │
│   ├── services/
│   │   └── predictionService.ts          # API call logic
│   │
│   ├── types/
│   │   └── prediction.ts                 # All TypeScript interfaces
│   │
│   ├── hooks/
│   │   ├── usePrediction.ts              # API call + state management
│   │   ├── useImageUpload.ts             # File selection state
│   │   └── useLoadingMessages.ts         # Rotating loading messages
│   │
│   ├── context/
│   │   └── PredictionContext.tsx         # Global prediction result state
│   │
│   ├── utils/
│   │   ├── imageUtils.ts                 # File validation, objectURL, base64→Blob
│   │   ├── metricsUtils.ts               # Quality classification, RMSE, status summary
│   │   └── formatters.ts                 # Number formatting, matrix display
│   │
│   └── styles/
│       └── globals.css                   # Tailwind base + design tokens
│
├── .env.local                            # FASTAPI_BASE_URL (not committed)
├── .env.example                          # Template (committed)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

### 19.2 State Management
- Local: `useState` for file selection
- Global: `PredictionContext` for sharing results to Results page
- No Redux/Zustand needed for v1

### 19.3 Data Flow
```
User selects images (ImageUploadPair)
  → Both files stored in useImageUpload hook
  → Submit → usePrediction.predict(reference, source)
      → predictionService.predictImageRegistration()
          → FormData: image1=reference, image2=source
          → POST /api/predict (Next.js proxy)
              → Proxy → FastAPI POST /api/v1/predict
              → LoFTR pipeline (15-90s)
              → JSON response with base64 images
      → usePrediction updates: { data, isLoading, error }
  → PredictionContext.updateResult(data)
  → router.push("/results")
  → Results page reads context
  → All components render from context data
```

---

## 20. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x (strict) |
| UI | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Icons | Lucide React | latest |
| Fonts | Inter (next/font/google) | — |
| HTTP | Native fetch | — |
| Linting | ESLint (Next.js config) | 9.x |
| Formatting | Prettier | 3.x |
| Package Manager | npm or pnpm | TBD |
| Deployment | Vercel (recommended) | — |

### Optional Libraries
| Purpose | Library |
|---|---|
| Toast notifications | `react-hot-toast` or `sonner` |
| Zip download | `jszip` |
| Animations | `framer-motion` (optional) |
| Class utilities | `clsx` + `tailwind-merge` |

---

## Appendix A — Domain Terminology

| Term | Definition |
|---|---|
| **Image Registration** | Aligning multiple images of the same scene (different time/sensor/angle) into a common coordinate system |
| **Source Image (Moving)** | The Chandrayaan-2 image (OHRC/TMC-2/IIRS) being geometrically transformed to align with the reference |
| **Reference Image (Fixed)** | The target image (LRO NAC / SELENE) that the source is aligned to |
| **OHRC** | Orbiter High Resolution Camera — Chandrayaan-2 payload, high-resolution surface images |
| **TMC-2** | Terrain Mapping Camera-2 — Chandrayaan-2 payload, stereo topographic mapping |
| **IIRS** | Imaging Infrared Spectrometer — Chandrayaan-2 payload, surface composition imaging |
| **LRO NAC** | Lunar Reconnaissance Orbiter Narrow Angle Camera — US reference imagery |
| **SELENE** | Japanese lunar orbiter (Kaguya) — another source of reference imagery |
| **Keypoint / Correspondence** | A matched point pair — one in source, one in reference — representing the same physical lunar surface point |
| **Homography** | 3x3 perspective transformation matrix mapping source coordinates to reference coordinates |
| **RANSAC** | Random Sample Consensus — robustly separates inlier correspondences from outliers |
| **Inlier** | A correspondence geometrically consistent with the estimated homography |
| **Inlier Ratio** | inliers / total correspondences — quality proxy |
| **RMSE** | Root Mean Square Error of keypoint reprojection — sub-pixel accuracy metric (TBD in current API) |
| **Sub-pixel accuracy** | Registration error smaller than 1 pixel — the PS target accuracy |
| **Uniform distribution** | Match points spread evenly across the image area — PS requirement |
| **LoFTR** | Local Feature TRansformer — detector-free deep-learning keypoint matching |
| **Warped Source** | Source image after inverse homography — aligned to reference coordinate system |
| **Overlay** | 50/50 alpha blend of reference and warped source for visual quality assessment |
| **CLAHE** | Contrast Limited Adaptive Histogram Equalization — preprocessing for low-contrast lunar images |

---

## Appendix B — Backend Pipeline Summary

```
Input: reference (LRO/SELENE image) + source (Chandrayaan-2 OHRC/TMC-2/IIRS image)
  |
  v
Preprocessing (per image):
  - cv2.imread (grayscale)
  - CLAHE (clipLimit=3.0, tileGridSize=8x8) — handles illumination variation
  - Resize to 480x480
  - Normalize to [0,1] tensor
  |
  v
LoFTR Inference (VashuTheGreat2/lunar-loftr-registration):
  - Fine-tuned for multi-modal, illumination/scale-invariant lunar matching
  - Output: dense keypoint correspondences + confidence scores
  |
  v
Homography Estimation:
  - Confidence threshold: >= 0.01
  - cv2.findHomography (USAC_MAGSAC, threshold=5.0, confidence=0.99)
  - Output: 3x3 H matrix + RANSAC inlier mask
  |
  v
Warping:
  - H_inv = inverse(H) — maps reference → source space
  - warped = warpPerspective(source, H_inv, 480x480)
  - overlay = 0.5 * reference + 0.5 * warped
  |
  v
5x Visualization (base64 JPEG encoded)
  + Metrics: total_matches, inliers_count
  + Keypoints: reference[], source[], confidence[], inlier_mask[]
  + Homography: 3x3 matrix or null
  |
  v
JSON response → Next.js proxy → Browser
```

---

*Document: client/PRD/PRD.md | PS: SIH26166 | ISRO / SIH 2026 | Updated: 2026-09-05*
