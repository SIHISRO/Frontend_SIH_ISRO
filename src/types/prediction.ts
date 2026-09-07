/**
 * TypeScript Definitions for Lunar Image Registration API
 * Based on PRD SIH26166 v2.0.0
 */

export interface PredictMetrics {
  total_matches: number;
  inliers_count: number;
  rmse?: number; // Optional reprojection RMSE in pixels (TBD in current backend)
}

export interface PredictKeypoints {
  reference: [number, number][]; // [x, y] coordinates in Reference image
  source: [number, number][];    // [x, y] coordinates in Source image
  confidence: number[];          // Match confidence score (0.0 - 1.0)
  inlier_mask: boolean[];        // RANSAC inlier status (sub-pixel level)
}

export interface PredictVisualizations {
  ref_points: string;         // Base64 data URI of reference keypoints
  src_points: string;         // Base64 data URI of source keypoints
  match_lines: string;        // Base64 data URI of correspondence lines
  warped_source: string;      // Base64 data URI of warped source
  registered_overlay: string; // Base64 data URI of 50/50 blend overlay
}

export interface PredictResponse {
  status: "success";
  metrics: PredictMetrics;
  homography: number[][] | null; // 3x3 perspective transformation matrix or null
  keypoints: PredictKeypoints;
  visualizations: PredictVisualizations;
}

export type RegistrationQuality = "good" | "fair" | "poor" | "failed";

export type SensorSourceType = "OHRC" | "TMC-2" | "IIRS" | "Other C2";
export type SensorReferenceType = "LRO-NAC" | "SELENE" | "Other Reference";

export interface SelectedFileMeta {
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  sensorHint?: string;
}
