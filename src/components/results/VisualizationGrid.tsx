"use client";

import React, { useState } from "react";
import { VisualizationPanel } from "./VisualizationPanel";
import { ImageLightbox } from "./ImageLightbox";
import { PredictVisualizations, PredictMetrics } from "@/types/prediction";

export interface VisualizationGridProps {
  visualizations: PredictVisualizations;
  metrics: PredictMetrics;
  className?: string;
}

interface ActiveLightboxData {
  src: string;
  title: string;
  altText: string;
  filename: string;
  caption: string;
}

export function VisualizationGrid({
  visualizations,
  metrics,
  className = "",
}: VisualizationGridProps) {
  const [activeLightbox, setActiveLightbox] = useState<ActiveLightboxData | null>(
    null
  );

  const panels = [
    {
      id: "registered_overlay",
      title: "Registration Overlay (50/50 Blend)",
      badge: "Primary Output",
      caption:
        "Alpha-blended composite of Reference and warped Chandrayaan-2 image. Sharp crater boundaries demonstrate precise sub-pixel alignment.",
      src: visualizations.registered_overlay,
      filename: "lunar_registration_overlay.jpg",
      altText: `Registration overlay showing 50/50 blend with ${metrics.inliers_count} inliers`,
      featured: true,
    },
    {
      id: "match_lines",
      title: "Correspondence Match Lines",
      badge: "Distribution",
      caption:
        "Side-by-side match vector field. Green lines indicate RANSAC inliers used to compute the homography; red lines indicate rejected outliers.",
      src: visualizations.match_lines,
      filename: "lunar_correspondence_lines.jpg",
      altText: `Correspondence lines showing ${metrics.total_matches} detected match vectors`,
      featured: true,
    },
    {
      id: "warped_source",
      title: "Geometrically Warped Source",
      badge: "Rectified",
      caption:
        "Chandrayaan-2 moving image projected onto the reference coordinate system via the computed 3×3 perspective homography matrix.",
      src: visualizations.warped_source,
      filename: "warped_chandrayaan2_source.jpg",
      altText: "Warped Chandrayaan-2 source image geometrically aligned to reference frame",
      featured: false,
    },
    {
      id: "ref_points",
      title: "Reference Keypoint Detections",
      badge: "image1",
      caption:
        "Reference image (LRO/SELENE) annotated with keypoints. Green dots show verified inliers; red dots show candidates.",
      src: visualizations.ref_points,
      filename: "reference_keypoints.jpg",
      altText: `Reference image with keypoint detections`,
      featured: false,
    },
    {
      id: "src_points",
      title: "Chandrayaan-2 Keypoint Detections",
      badge: "image2",
      caption:
        "Chandrayaan-2 source image annotated with detected feature locations matched against the reference frame.",
      src: visualizations.src_points,
      filename: "source_keypoints.jpg",
      altText: `Chandrayaan-2 source image with keypoint detections`,
      featured: false,
    },
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top row: 2 featured panels (Overlay & Match Lines) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {panels.slice(0, 2).map((panel) => (
          <VisualizationPanel
            key={panel.id}
            title={panel.title}
            badge={panel.badge}
            caption={panel.caption}
            src={panel.src}
            filename={panel.filename}
            altText={panel.altText}
            onExpand={() =>
              setActiveLightbox({
                src: panel.src,
                title: panel.title,
                altText: panel.altText,
                filename: panel.filename,
                caption: panel.caption,
              })
            }
          />
        ))}
      </div>

      {/* Second row: 3 standard panels (Warped, Ref points, Src points) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {panels.slice(2).map((panel) => (
          <VisualizationPanel
            key={panel.id}
            title={panel.title}
            badge={panel.badge}
            caption={panel.caption}
            src={panel.src}
            filename={panel.filename}
            altText={panel.altText}
            onExpand={() =>
              setActiveLightbox({
                src: panel.src,
                title: panel.title,
                altText: panel.altText,
                filename: panel.filename,
                caption: panel.caption,
              })
            }
          />
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeLightbox && (
        <ImageLightbox
          isOpen={Boolean(activeLightbox)}
          onClose={() => setActiveLightbox(null)}
          src={activeLightbox.src}
          title={activeLightbox.title}
          altText={activeLightbox.altText}
          filename={activeLightbox.filename}
          caption={activeLightbox.caption}
        />
      )}
    </div>
  );
}
