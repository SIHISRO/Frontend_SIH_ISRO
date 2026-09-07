import { PredictMetrics, RegistrationQuality } from "@/types/prediction";

/**
 * Calculates inlier ratio percentage (0 to 100)
 */
export function getInlierRatio(metrics: PredictMetrics): number {
  if (!metrics || metrics.total_matches <= 0) return 0;
  return (metrics.inliers_count / metrics.total_matches) * 100;
}

/**
 * Returns formatted inlier ratio string (e.g. "73.8%") or "N/A"
 */
export function getInlierRatioDisplay(metrics: PredictMetrics): string {
  if (!metrics || metrics.total_matches <= 0) return "N/A";
  const ratio = getInlierRatio(metrics);
  return `${ratio.toFixed(1)}%`;
}

/**
 * Returns quality classification per PRD Section 9.2:
 * - "good": inlier ratio >= 50% AND homography != null
 * - "fair": inlier ratio 20-49% OR (total_matches >= 4 but low ratio)
 * - "poor": inlier ratio < 20% OR total_matches < 4
 * - "failed": homography == null
 */
export function getRegistrationQuality(
  metrics: PredictMetrics,
  homography: number[][] | null
): RegistrationQuality {
  if (!homography || homography.length < 3) {
    return "failed";
  }

  if (!metrics || metrics.total_matches < 4) {
    return "poor";
  }

  const ratio = getInlierRatio(metrics);
  if (ratio >= 50) {
    return "good";
  } else if (ratio >= 20) {
    return "fair";
  } else {
    return "poor";
  }
}

/**
 * Returns plain-language summary for researchers per PRD Section 9.3
 */
export function getStatusSummary(
  metrics: PredictMetrics,
  homography: number[][] | null
): string {
  const quality = getRegistrationQuality(metrics, homography);
  const ratio = getInlierRatioDisplay(metrics);
  const total = metrics?.total_matches ?? 0;
  const inliers = metrics?.inliers_count ?? 0;

  switch (quality) {
    case "good":
      return `Strong registration achieved: ${total} correspondences detected with ${inliers} verified RANSAC inliers (${ratio}). Sub-pixel geometric alignment verified with a valid homography transformation matrix.`;
    case "fair":
      return `Moderate registration achieved: ${total} correspondences detected, ${inliers} inliers (${ratio}). Alignment is functional, though illumination differences or scale variations may slightly impact edge boundaries.`;
    case "poor":
      return `Weak registration: Only ${inliers} inlier matches (${ratio}) from ${total} initial points. Large solar illumination angle discrepancies or extreme spatial resolution differences detected between sensors.`;
    case "failed":
      return `Registration failed: Insufficient geometric correspondences found (${total} matches, ${inliers} inliers). A valid 3×3 projective homography matrix could not be estimated.`;
  }
}

/**
 * Returns RMSE display string or "TBD" per PRD Section 9.4
 */
export function getRMSEDisplay(metrics: PredictMetrics): string {
  if (metrics?.rmse !== undefined && metrics.rmse !== null) {
    return `${metrics.rmse.toFixed(2)} px`;
  }
  return "TBD";
}
