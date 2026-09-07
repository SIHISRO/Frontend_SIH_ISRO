import {
  getInlierRatio,
  getInlierRatioDisplay,
  getRegistrationQuality,
  getStatusSummary,
  getRMSEDisplay,
} from "../metricsUtils";
import { PredictMetrics } from "@/types/prediction";

describe("metricsUtils", () => {
  describe("getInlierRatio & getInlierRatioDisplay", () => {
    it("computes correct percentage", () => {
      const metrics: PredictMetrics = { total_matches: 100, inliers_count: 65 };
      expect(getInlierRatio(metrics)).toBe(65);
      expect(getInlierRatioDisplay(metrics)).toBe("65.0%");
    });

    it("handles zero total_matches without division by zero error", () => {
      const metrics: PredictMetrics = { total_matches: 0, inliers_count: 0 };
      expect(getInlierRatio(metrics)).toBe(0);
      expect(getInlierRatioDisplay(metrics)).toBe("N/A");
    });
  });

  describe("getRegistrationQuality", () => {
    const validH = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];

    it("returns 'failed' when homography is null", () => {
      const metrics: PredictMetrics = { total_matches: 100, inliers_count: 80 };
      expect(getRegistrationQuality(metrics, null)).toBe("failed");
    });

    it("returns 'good' when inlier ratio >= 50% with valid H", () => {
      const metrics: PredictMetrics = { total_matches: 100, inliers_count: 55 };
      expect(getRegistrationQuality(metrics, validH)).toBe("good");
    });

    it("returns 'fair' when inlier ratio between 20% and 49%", () => {
      const metrics: PredictMetrics = { total_matches: 100, inliers_count: 35 };
      expect(getRegistrationQuality(metrics, validH)).toBe("fair");
    });

    it("returns 'poor' when inlier ratio < 20%", () => {
      const metrics: PredictMetrics = { total_matches: 100, inliers_count: 10 };
      expect(getRegistrationQuality(metrics, validH)).toBe("poor");
    });
  });

  describe("getRMSEDisplay", () => {
    it("returns formatted px string when rmse is present", () => {
      const metrics: PredictMetrics = { total_matches: 50, inliers_count: 40, rmse: 0.456 };
      expect(getRMSEDisplay(metrics)).toBe("0.46 px");
    });

    it("returns 'TBD' when rmse is undefined", () => {
      const metrics: PredictMetrics = { total_matches: 50, inliers_count: 40 };
      expect(getRMSEDisplay(metrics)).toBe("TBD");
    });
  });

  describe("getStatusSummary", () => {
    it("mentions sub-pixel and homography for good registration", () => {
      const validH = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      const metrics: PredictMetrics = { total_matches: 200, inliers_count: 150 };
      const summary = getStatusSummary(metrics, validH);
      expect(summary).toContain("Strong registration");
      expect(summary).toContain("sub-pixel");
    });
  });
});
