"use client";

import { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "Uploading lunar images to processing pipeline...",
  "Running LoFTR deep feature detection...",
  "Matching correspondences across illumination differences...",
  "Executing RANSAC geometric inlier filtering...",
  "Estimating 3×3 projective homography matrix...",
  "Warping Chandrayaan-2 frame to reference coordinates...",
  "Generating blended overlays and correspondence maps...",
  "Finalizing sub-pixel alignment metrics...",
];

export function useLoadingMessages(isLoading: boolean, intervalMs: number = 2500) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, intervalMs);

    return () => {
      clearInterval(interval);
      setMessageIndex(0);
    };
  }, [isLoading, intervalMs]);

  const activeIndex = isLoading ? messageIndex : 0;

  return {
    currentMessage: LOADING_MESSAGES[activeIndex],
    allMessages: LOADING_MESSAGES,
    currentIndex: activeIndex,
  };
}
