"use client";

import React from "react";
import { Badge } from "../common/Badge";
import { PredictMetrics } from "@/types/prediction";
import { getRegistrationQuality } from "@/utils/metricsUtils";
import { CheckCircle2, AlertTriangle, AlertCircle, XCircle } from "lucide-react";

export interface QualityBadgeProps {
  metrics: PredictMetrics;
  homography: number[][] | null;
  className?: string;
}

export function QualityBadge({
  metrics,
  homography,
  className = "",
}: QualityBadgeProps) {
  const quality = getRegistrationQuality(metrics, homography);

  switch (quality) {
    case "good":
      return (
        <Badge
          variant="success"
          size="md"
          icon={<CheckCircle2 className="w-3.5 h-3.5" />}
          className={className}
        >
          Good Alignment
        </Badge>
      );
    case "fair":
      return (
        <Badge
          variant="warning"
          size="md"
          icon={<AlertCircle className="w-3.5 h-3.5" />}
          className={className}
        >
          Fair Alignment
        </Badge>
      );
    case "poor":
      return (
        <Badge
          variant="warning"
          size="md"
          icon={<AlertTriangle className="w-3.5 h-3.5" />}
          className={className}
        >
          Weak Alignment
        </Badge>
      );
    case "failed":
      return (
        <Badge
          variant="error"
          size="md"
          icon={<XCircle className="w-3.5 h-3.5" />}
          className={className}
        >
          Alignment Failed
        </Badge>
      );
  }
}
