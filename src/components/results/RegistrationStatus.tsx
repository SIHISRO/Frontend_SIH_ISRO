"use client";

import React from "react";
import { PredictMetrics } from "@/types/prediction";
import { getRegistrationQuality, getStatusSummary } from "@/utils/metricsUtils";
import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export interface RegistrationStatusProps {
  metrics: PredictMetrics;
  homography: number[][] | null;
  className?: string;
}

export function RegistrationStatus({
  metrics,
  homography,
  className = "",
}: RegistrationStatusProps) {
  const quality = getRegistrationQuality(metrics, homography);
  const summary = getStatusSummary(metrics, homography);

  const containerStyles = {
    good: "border-emerald-500/30 bg-emerald-950/20 text-emerald-200",
    fair: "border-amber-500/30 bg-amber-950/20 text-amber-200",
    poor: "border-[#FF9B51]/40 bg-[#FF9B51]/10 text-[#EAEFEF]",
    failed: "border-rose-500/30 bg-rose-950/20 text-rose-200",
  };

  const icons = {
    good: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />,
    fair: <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />,
    poor: <AlertTriangle className="w-5 h-5 text-[#FF9B51] flex-shrink-0 mt-0.5" />,
    failed: <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="status"
      className={`rounded-2xl border p-4 sm:p-5 backdrop-blur-sm flex items-start gap-3.5 ${containerStyles[quality]} ${className}`}
    >
      {icons[quality]}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold uppercase tracking-wider font-mono mb-1 text-[#EAEFEF]">
          Scientific Registration Summary
        </h4>
        <p className="text-sm leading-relaxed text-[#BFC9D1]">
          {summary}
        </p>
      </div>
    </div>
  );
}
