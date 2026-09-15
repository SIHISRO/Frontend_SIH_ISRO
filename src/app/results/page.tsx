"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { ResultsHeader } from "@/components/results/ResultsHeader";
import { MetricsGrid } from "@/components/results/MetricsGrid";
import { RegistrationStatus } from "@/components/results/RegistrationStatus";
import { WarningBanner } from "@/components/common/WarningBanner";
import { VisualizationGrid } from "@/components/results/VisualizationGrid";
import { HomographyMatrix } from "@/components/results/HomographyMatrix";
import { KeypointsSummary } from "@/components/results/KeypointsSummary";
import { usePredictionContext } from "@/context/PredictionContext";
import { getRegistrationQuality } from "@/utils/metricsUtils";
import { downloadBase64Image } from "@/utils/imageUtils";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/common/Button";
import { toast } from "sonner";

export default function ResultsPage() {
  const router = useRouter();
  const { result, meta, clearResult } = usePredictionContext();

  // Redirect to home if no prediction in context
  useEffect(() => {
    if (!result) {
      router.replace("/");
    }
  }, [result, router]);

  if (!result) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="w-12 h-12 rounded-full border-2 border-[#ef7618] border-t-transparent animate-spin mb-4" />
          <p className="text-sm text-[#BFC9D1] font-mono">
            Loading registration results...
          </p>
        </div>
      </PageLayout>
    );
  }

  const { metrics, homography, keypoints, visualizations } = result;
  const quality = getRegistrationQuality(metrics, homography);
  const showWarning = quality === "poor" || quality === "failed";

  const handleNewRegistration = () => {
    clearResult();
    router.push("/");
  };

  const handleDownloadAll = () => {
    const list = [
      { uri: visualizations.registered_overlay, name: "1_registered_overlay.jpg" },
      { uri: visualizations.match_lines, name: "2_correspondence_lines.jpg" },
      { uri: visualizations.warped_source, name: "3_warped_source.jpg" },
      { uri: visualizations.ref_points, name: "4_reference_keypoints.jpg" },
      { uri: visualizations.src_points, name: "5_source_keypoints.jpg" },
    ];

    list.forEach((item, index) => {
      setTimeout(() => {
        downloadBase64Image(item.uri, item.name);
      }, index * 300);
    });

    toast.success("Downloading all 5 registered visualization products...");
  };

  return (
    <PageLayout className="space-y-8">
      {/* Back button link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleNewRegistration}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#BFC9D1] hover:text-[#ef7618] transition-colors self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Upload / New Image Pair</span>
        </button>

        <span className="text-[11px] sm:text-xs font-mono text-[#BFC9D1]/60">
          LoFTR Pipeline v2.0 · Chandrayaan-2 Optical Suite
        </span>
      </div>

      {/* 1. Results Header */}
      <ResultsHeader
        metrics={metrics}
        homography={homography}
        onNewRegistration={handleNewRegistration}
        onDownloadAll={handleDownloadAll}
      />

      {/* 2. Warning Banner (if poor or failed) */}
      {showWarning && (
        <WarningBanner
          message={
            quality === "failed"
              ? "Registration failed: Could not estimate valid 3×3 projective homography. The image pair may have insufficient visual overlap, drastic scale disparity, or extreme lighting differences."
              : "Low registration confidence: Less than 20% of detected correspondences were verified as inliers by RANSAC. Ensure images share a common lunar scene."
          }
        />
      )}

      {/* 3. Metrics Grid (4 cards: matches, inliers, ratio, transform) */}
      <MetricsGrid metrics={metrics} homography={homography} />

      {/* 4. Plain Language Registration Status Banner */}
      <RegistrationStatus metrics={metrics} homography={homography} />

      {/* Input Comparison Strip (Original Reference & Source thumbnails) */}
      {(meta.referencePreview || meta.sourcePreview) && (
        <div className="glass-panel p-4 rounded-2xl border border-[#BFC9D1]/20">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-4 h-4 text-[#ef7618]" />
            <span className="text-xs font-mono uppercase font-bold text-[#EAEFEF]">
              Input Pair Referenced in Registration
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {meta.referencePreview && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#18232c]/70 border border-[#BFC9D1]/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.referencePreview}
                  alt="Reference thumbnail"
                  className="w-16 h-16 rounded-lg object-contain bg-[#121920]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-sky-400/15 text-sky-300 border border-sky-400/30">
                    image1 (Reference)
                  </span>
                  <p className="text-xs font-mono text-[#EAEFEF] truncate mt-1">
                    {meta.referenceName || "Reference Image"}
                  </p>
                </div>
              </div>
            )}
            {meta.sourcePreview && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#18232c]/70 border border-[#BFC9D1]/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.sourcePreview}
                  alt="Source thumbnail"
                  className="w-16 h-16 rounded-lg object-contain bg-[#121920]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#FF9B51]/15 text-[#FF9B51] border border-[#FF9B51]/30">
                    image2 (Chandrayaan-2 Source)
                  </span>
                  <p className="text-xs font-mono text-[#EAEFEF] truncate mt-1">
                    {meta.sourceName || "Source Image"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Visualization Grid (5 products with lightbox & individual download) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#EAEFEF]">
            Registration Visualizations & Verification
          </h2>
          <span className="text-xs font-mono text-[#BFC9D1]">
            Click any image to view full resolution
          </span>
        </div>
        <VisualizationGrid
          visualizations={visualizations}
          metrics={metrics}
        />
      </div>

      {/* 6. Homography Matrix Panel */}
      <div className="space-y-4">
        <HomographyMatrix homography={homography} />
      </div>

      {/* 7. Keypoints Summary & Point Cloud Table */}
      <div className="space-y-4">
        <KeypointsSummary keypoints={keypoints} metrics={metrics} />
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-[#BFC9D1]/20 flex justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNewRegistration}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Register Another Lunar Image Pair
        </Button>
      </div>
    </PageLayout>
  );
}
