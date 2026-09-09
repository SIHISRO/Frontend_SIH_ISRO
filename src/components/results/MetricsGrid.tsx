"use client";

import React from "react";
import { MetricsCard } from "./MetricsCard";
import { PredictMetrics } from "@/types/prediction";
import {
  getInlierRatio,
  getInlierRatioDisplay,
  getRMSEDisplay,
} from "@/utils/metricsUtils";
import { Target, CheckCheck, Percent, Gauge, Layers } from "lucide-react";

export interface MetricsGridProps {
  metrics: PredictMetrics;
  homography?: number[][] | null;
  className?: string;
}

export function MetricsGrid({ metrics, homography, className = "" }: MetricsGridProps) {
  const inlierRatioVal = getInlierRatio(metrics);
  const ratioDisplay = getInlierRatioDisplay(metrics);
  const rmseDisplay = getRMSEDisplay(metrics);

  const ratioVariant =
    inlierRatioVal >= 50
      ? "success"
      : inlierRatioVal >= 20
      ? "warning"
      : "error";

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {/* 1. Total Matches */}
      <MetricsCard
        label="Total Matches"
        value={metrics.total_matches.toLocaleString()}
        icon={<Target className="w-4 h-4" />}
        variant="default"
        tooltip="Total keypoint correspondences detected by LoFTR transformer before geometric filtering."
        subtitle="Initial detector-free pairs"
      />

      {/* 2. Inlier Matches */}
      <MetricsCard
        label="Inlier Matches"
        value={metrics.inliers_count.toLocaleString()}
        icon={<CheckCheck className="w-4 h-4" />}
        variant="brand"
        tooltip="Correspondences verified by RANSAC as geometrically conforming to projective planar transformation."
        subtitle="RANSAC verified inliers"
      />

      {/* 3. Inlier Ratio */}
      <MetricsCard
        label="Inlier Ratio"
        value={ratioDisplay}
        icon={<Percent className="w-4 h-4" />}
        variant={ratioVariant}
        tooltip="Percentage of valid inliers out of total detected matches. >= 50% indicates excellent alignment."
        subtitle={
          inlierRatioVal >= 50
            ? "High Confidence (>50%)"
            : inlierRatioVal >= 20
            ? "Moderate Confidence"
            : "Low Confidence (<20%)"
        }
      />

      {/* 4. Homography Matrix or RMSE */}
      {metrics.rmse !== undefined ? (
        <MetricsCard
          label="Reprojection RMSE"
          value={rmseDisplay}
          icon={<Gauge className="w-4 h-4" />}
          variant="brand"
          tooltip="Root Mean Square Error of keypoint reprojection in pixels."
          subtitle="Geometric reprojection error"
        />
      ) : (
        <MetricsCard
          label="Transformation Matrix"
          value={homography && homography.length >= 3 ? "3×3 Valid" : "Projective H"}
          icon={<Layers className="w-4 h-4" />}
          variant="brand"
          tooltip="3×3 Projective Homography Matrix computed from verified geometric inliers."
          subtitle="Planar alignment matrix"
        />
      )}
    </div>
  );
}
