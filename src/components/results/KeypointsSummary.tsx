"use client";

import React, { useState } from "react";
import { PredictKeypoints, PredictMetrics } from "@/types/prediction";
import { Button } from "../common/Button";
import { ChevronDown, ChevronUp, Download, CheckCircle, XCircle, Crosshair } from "lucide-react";
import { formatDecimal } from "@/utils/formatters";

export interface KeypointsSummaryProps {
  keypoints: PredictKeypoints;
  metrics: PredictMetrics;
  className?: string;
}

export function KeypointsSummary({
  keypoints,
  metrics,
  className = "",
}: KeypointsSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  const totalPoints = keypoints?.reference?.length || 0;
  const inlierPoints = metrics.inliers_count;

  const downloadCSV = () => {
    if (!keypoints || totalPoints === 0) return;

    const headers = [
      "Index",
      "Ref_X",
      "Ref_Y",
      "Source_X",
      "Source_Y",
      "Confidence",
      "Is_Inlier",
    ];

    const rows = keypoints.reference.map((refPt, idx) => {
      const srcPt = keypoints.source[idx] || [0, 0];
      const conf = keypoints.confidence[idx] || 0;
      const isInlier = keypoints.inlier_mask[idx] ? 1 : 0;
      return [
        idx + 1,
        refPt[0].toFixed(3),
        refPt[1].toFixed(3),
        srcPt[0].toFixed(3),
        srcPt[1].toFixed(3),
        conf.toFixed(4),
        isInlier,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lunar_correspondences.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`rounded-2xl glass-panel-elevated border border-[#BFC9D1]/25 p-6 backdrop-blur-md ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#BFC9D1]/15">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#ef7618]/15 text-[#ef7618] border border-[#ef7618]/30">
            <Crosshair className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#EAEFEF]">
              Sub-Pixel Correspondence Point Cloud
            </h3>
            <p className="text-xs text-[#BFC9D1] font-mono">
              {totalPoints} total matches detected · {inlierPoints} geometric inliers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {totalPoints > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCSV}
              icon={<Download className="w-3.5 h-3.5 text-[#ef7618]" />}
            >
              Export Points CSV
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={
              isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )
            }
          >
            {isExpanded ? "Hide Point Cloud" : "Inspect Point Cloud"}
          </Button>
        </div>
      </div>

      {/* Distribution summary note */}
      <div className="pt-4 text-xs text-[#BFC9D1] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p>
          Correspondences maintain uniform distribution across both images to ensure global geometric consistency and avoid localized distortion.
        </p>
        <span className="font-mono text-[11px] text-[#ef7618] flex-shrink-0">
          RANSAC Threshold: 3.0px
        </span>
      </div>

      {/* Expanded Table */}
      {isExpanded && totalPoints > 0 && (
        <div className="mt-6 pt-4 border-t border-[#BFC9D1]/15 space-y-4 animate-in fade-in duration-200">
          <div className="overflow-x-auto max-h-96 rounded-xl border border-[#BFC9D1]/20">
            <table className="min-w-full divide-y divide-[#BFC9D1]/15 font-mono text-xs">
              <thead className="bg-[#0b2545]/95 sticky top-0 z-10 text-[#BFC9D1]">
                <tr>
                  <th className="py-2.5 px-3 text-left">#</th>
                  <th className="py-2.5 px-3 text-left">Reference (x, y)</th>
                  <th className="py-2.5 px-3 text-left">Chandrayaan-2 (x, y)</th>
                  <th className="py-2.5 px-3 text-left">LoFTR Confidence</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BFC9D1]/10 bg-[#0b2545]/40 text-[#EAEFEF]">
                {keypoints.reference.slice(0, visibleCount).map((refPt, idx) => {
                  const srcPt = keypoints.source[idx] || [0, 0];
                  const conf = keypoints.confidence[idx] || 0;
                  const isInlier = keypoints.inlier_mask[idx];

                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-[#1283c8]/20 transition-colors ${
                        isInlier ? "" : "opacity-60 bg-rose-950/10"
                      }`}
                    >
                      <td className="py-2 px-3 text-[#BFC9D1]/60">{idx + 1}</td>
                      <td className="py-2 px-3">
                        ({formatDecimal(refPt[0], 1)}, {formatDecimal(refPt[1], 1)})
                      </td>
                      <td className="py-2 px-3">
                        ({formatDecimal(srcPt[0], 1)}, {formatDecimal(srcPt[1], 1)})
                      </td>
                      <td className="py-2 px-3 font-semibold text-[#ef7618]">
                        {formatDecimal(conf, 3)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {isInlier ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Inlier
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-400">
                            <XCircle className="w-3.5 h-3.5" />
                            Outlier
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Show more button */}
          {visibleCount < totalPoints && (
            <div className="flex justify-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 50, totalPoints))}
              >
                Load Next 50 Points ({totalPoints - visibleCount} remaining)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
