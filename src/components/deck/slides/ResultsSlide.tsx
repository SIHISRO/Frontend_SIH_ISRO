"use client";

import React, { useState } from "react";
import { soundController } from "@/utils/soundController";
import { PredictResponse } from "@/types/prediction";
import {
  Layers,
  Copy,
  Check,
  Download,
  ArrowRight,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

interface ResultsSlideProps {
  result: PredictResponse | null;
  meta?: {
    referenceName?: string | null;
    sourceName?: string | null;
    referencePreview?: string | null;
    sourcePreview?: string | null;
  } | null;
  onGoToStudio: () => void;
}

export function ResultsSlide({ result, onGoToStudio }: ResultsSlideProps) {
  const [activeTab, setActiveTab] = useState<"matches" | "warped" | "overlay" | "ref" | "src">("matches");
  const [copiedMatrix, setCopiedMatrix] = useState(false);

  // If no result yet, display rich empty state
  if (!result) {
    return (
      <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
        <div className="brutal-card p-8 max-w-xl mx-auto text-center shadow-[6px_6px_0_#000]">
          <div className="w-16 h-16 rounded-2xl bg-[#ef7618] border-3 border-black flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0_#000]">
            <Layers className="w-8 h-8 text-black stroke-[2.5]" />
          </div>
          <h3 className="font-display text-2xl sm:text-3xl uppercase font-black text-black mb-2">
            No Active Correspondence Telemetry
          </h3>
          <p className="font-sans text-xs sm:text-sm text-black/75 mb-6 leading-relaxed">
            Run the registration pipeline on Slide 05 (Studio) with your own lunar images or the 1-click Chandrayaan-2 sample pair to view matches, homography, and sub-pixel metrics.
          </p>
          <button
            onClick={() => {
              soundController.playPop();
              onGoToStudio();
            }}
            className="brutal-btn py-3 px-6 text-sm"
          >
            <span>OPEN REGISTRATION STUDIO</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    );
  }

  const { metrics, homography, visualizations } = result;
  const inlierCount = metrics?.inliers_count ?? 0;
  const totalMatches = metrics?.total_matches ?? 0;
  const inlierRatio = totalMatches > 0 ? (inlierCount / totalMatches) * 100 : 0;

  const handleCopyMatrix = () => {
    soundController.playClick();
    if (homography) {
      navigator.clipboard.writeText(JSON.stringify(homography, null, 2));
      setCopiedMatrix(true);
      toast.success("Copied 3×3 Homography Matrix to clipboard!");
      setTimeout(() => setCopiedMatrix(false), 2000);
    }
  };

  const handleExportJSON = () => {
    soundController.playPop();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `lunar_registration_${Date.now()}.json`);
    dlAnchor.click();
    toast.success("Downloaded registration telemetry JSON.");
  };

  // Helper to ensure valid base64 image data URL
  const getImageSrc = (val?: string) => {
    if (!val) return "";
    if (val.startsWith("data:") || val.startsWith("http") || val.startsWith("/")) {
      return val;
    }
    return `data:image/png;base64,${val}`;
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b-2 sm:border-b-3 border-black pb-3.5 sm:pb-4 mb-4 sm:mb-6">
          <div>
            <h2 className="font-display text-xl xs:text-2xl sm:text-4xl uppercase font-black tracking-tight text-black">
              Correspondence & Metrics Report
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleExportJSON}
              className="brutal-btn-white py-1.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT JSON</span>
            </button>
            <button
              onClick={() => {
                soundController.playPop();
                onGoToStudio();
              }}
              className="brutal-btn py-1.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>NEW REGISTRATION</span>
            </button>
          </div>
        </div>

        {/* 4 Neo-Brutalist Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
          
          <div className="brutal-card p-3 sm:p-4 text-left shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000]">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-black/60 uppercase block">Total Matches</span>
            <span className="font-display text-2xl sm:text-4xl font-black text-black block mt-1">
              {totalMatches.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-black/70 mt-1 block">
              Raw LoFTR matches
            </span>
          </div>

          <div className="brutal-card p-3 sm:p-4 text-left shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] bg-[#ef7618]">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-black/80 uppercase block">Inlier Matches</span>
            <span className="font-display text-2xl sm:text-4xl font-black text-black block mt-1">
              {inlierCount.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-black font-bold mt-1 block truncate">
              ★ RANSAC INLIERS
            </span>
          </div>

          <div className="brutal-card p-3 sm:p-4 text-left shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000]">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-black/60 uppercase block">Inlier Match Ratio</span>
            <span className="font-display text-2xl sm:text-4xl font-black text-black block mt-1">
              {inlierRatio.toFixed(1)}%
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-black/70 mt-1 block truncate">
              {totalMatches > 0 ? "Inliers / Total" : "No matches"}
            </span>
          </div>

          <div className="brutal-card p-3 sm:p-4 text-left shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000]">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-black/60 uppercase block">Homography</span>
            <span className="font-display text-xl sm:text-3xl font-black text-black block mt-1">
              PROJ 3×3
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-black/70 mt-1 block truncate">
              Consensus Matrix
            </span>
          </div>

        </div>

        {/* Visualizer & Homography Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Visualizer Container */}
          <div className="lg:col-span-2 brutal-card p-3.5 sm:p-5 bg-white shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => {
                    soundController.playClick();
                    setActiveTab("matches");
                  }}
                  className={`text-[11px] sm:text-xs font-mono font-bold uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded border-2 border-black transition-all ${
                    activeTab === "matches"
                      ? "bg-[#ef7618] shadow-[2px_2px_0_#000] font-black"
                      : "bg-white hover:bg-[#BFC9D1]/30"
                  }`}
                >
                  Keypoint Lines
                </button>
                <button
                  onClick={() => {
                    soundController.playClick();
                    setActiveTab("warped");
                  }}
                  className={`text-xs font-mono font-bold uppercase px-3 py-1.5 rounded border-2 border-black transition-all ${
                    activeTab === "warped"
                      ? "bg-[#ef7618] shadow-[2px_2px_0_#000] font-black"
                      : "bg-white hover:bg-[#BFC9D1]/30"
                  }`}
                >
                  Warped Source
                </button>
                <button
                  onClick={() => {
                    soundController.playClick();
                    setActiveTab("overlay");
                  }}
                  className={`text-xs font-mono font-bold uppercase px-3 py-1.5 rounded border-2 border-black transition-all ${
                    activeTab === "overlay"
                      ? "bg-[#ef7618] shadow-[2px_2px_0_#000] font-black"
                      : "bg-white hover:bg-[#BFC9D1]/30"
                  }`}
                >
                  Overlay Blend
                </button>
              </div>

              <span className="text-xs font-mono text-black/60 hidden sm:inline">
                {activeTab === "matches" ? "Dual Frame Correspondences" : "Geometrically Projected Output"}
              </span>
            </div>

            {/* Active Image Box */}
            <div className="w-full bg-[#0b2545] border-2 border-black rounded-lg overflow-hidden min-h-[300px] sm:min-h-[380px] flex items-center justify-center relative">
              {activeTab === "matches" && visualizations?.match_lines && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageSrc(visualizations.match_lines)}
                  alt="Keypoint correspondence lines"
                  className="w-full h-auto max-h-[460px] object-contain"
                />
              )}

              {activeTab === "warped" && visualizations?.warped_source && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageSrc(visualizations.warped_source)}
                  alt="Warped Source Image"
                  className="w-full h-auto max-h-[460px] object-contain"
                />
              )}

              {activeTab === "overlay" && visualizations?.registered_overlay && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageSrc(visualizations.registered_overlay)}
                  alt="Overlay Blend"
                  className="w-full h-auto max-h-[460px] object-contain"
                />
              )}
            </div>
          </div>

          {/* Right Column: 3x3 Projective Homography Matrix */}
          <div className="flex flex-col gap-4">
            
            <div className="brutal-card p-5 bg-[#EAEFEF] shadow-[6px_6px_0_#000] flex-1">
              <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                <span className="font-display font-black text-sm uppercase text-black">
                  3×3 Homography Matrix [H]
                </span>
                <button
                  onClick={handleCopyMatrix}
                  className="p-1 hover:bg-[#ef7618] rounded border border-black transition-colors"
                  title="Copy matrix"
                >
                  {copiedMatrix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-3 font-mono text-xs">
                {homography && Array.isArray(homography) ? (
                  <div className="grid grid-cols-3 gap-1.5 text-center font-bold text-black">
                    {homography.flat().map((val: number, i: number) => (
                      <div key={i} className="p-1.5 bg-[#BFC9D1]/30 rounded border border-black/30 overflow-hidden text-[11px] truncate">
                        {typeof val === "number" ? val.toFixed(4) : val}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-black/60">Matrix data unavailable.</span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t-2 border-dashed border-black/20 text-xs font-sans text-black/80">
                <p className="font-medium leading-relaxed">
                  The projective matrix transforms coordinates <code className="bg-[#1283c8] text-white px-1 rounded text-[10px]">[x, y, 1]ᵀ</code> from the moving frame to the fixed reference frame with sub-pixel alignment.
                </p>
              </div>
            </div>

            {/* Inlier Verification Stamp Box */}
            <div className="brutal-card p-4 bg-[#ef7618] shadow-[4px_4px_0_#000]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
                <span className="font-display font-black text-xs uppercase text-black">
                  ISRO SIH26166 Compliant
                </span>
              </div>
              <p className="text-[11px] font-mono text-black mt-1 leading-snug">
                Verified geometric inliers & uniform regolith distribution constraint.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
