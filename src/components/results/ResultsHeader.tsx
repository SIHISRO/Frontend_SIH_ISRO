"use client";

import React from "react";
import { QualityBadge } from "./QualityBadge";
import { Button } from "../common/Button";
import { PredictMetrics } from "@/types/prediction";
import { PlusCircle, DownloadCloud } from "lucide-react";

export interface ResultsHeaderProps {
  metrics: PredictMetrics;
  homography: number[][] | null;
  onNewRegistration: () => void;
  onDownloadAll?: () => void;
  className?: string;
}

export function ResultsHeader({
  metrics,
  homography,
  onNewRegistration,
  onDownloadAll,
  className = "",
}: ResultsHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#BFC9D1]/20 ${className}`}
    >
      <div>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="px-2 py-0.5 text-xs font-mono uppercase rounded bg-[#ef7618]/15 text-[#ef7618] border border-[#ef7618]/30">
            Pipeline Output
          </span>
          <QualityBadge metrics={metrics} homography={homography} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAEFEF] tracking-tight">
          Image Correspondence & Alignment Results
        </h1>
        <p className="text-xs sm:text-sm text-[#BFC9D1] font-mono mt-1">
          Chandrayaan-2 to Lunar Reference Registration via LoFTR
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-shrink-0">
        {onDownloadAll && (
          <Button
            variant="secondary"
            size="md"
            onClick={onDownloadAll}
            icon={<DownloadCloud className="w-4 h-4 text-[#ef7618]" />}
          >
            Export All
          </Button>
        )}
        <Button
          variant="primary"
          size="md"
          onClick={onNewRegistration}
          icon={<PlusCircle className="w-4 h-4 stroke-[2.5]" />}
        >
          New Registration
        </Button>
      </div>
    </div>
  );
}
