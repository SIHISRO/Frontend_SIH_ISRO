"use client";

import React from "react";
import { soundController } from "@/utils/soundController";
import { ArrowRight, Layers } from "lucide-react";
import { FloatingHighlighter, StampBadge } from "../StationeryProps";
import { FloatingSatellite } from "../FloatingSatellite";

interface CoverSlideProps {
  onGoToStudio: () => void;
  onGoToProblem: () => void;
}

export function CoverSlide({ onGoToStudio, onGoToProblem }: CoverSlideProps) {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      {/* Floating Interactive Chandrayaan-2 Satellite with Cursor Evasion */}
      <FloatingSatellite />

      {/* Stationery Props Floating on Top matching original design */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-12 z-20">
        <FloatingHighlighter />
      </div>

      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20">
        <StampBadge text="ISRO PS SIH26166" className="-rotate-6" />
      </div>
      {/* Main Container */}
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Massive Punchy Display Title matching user screenshot */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-black tracking-tight leading-[0.92] text-white mb-6 select-none drop-shadow-[6px_6px_0_#000000]">
          COSMIC<span className="text-[#ef7618] drop-shadow-[6px_6px_0_#000000]">YAAN</span>
        </h1>

        {/* Tagline with highlighter mark */}
        <p className="font-display text-xl sm:text-3xl md:text-4xl text-white font-extrabold max-w-3xl leading-snug mb-6">
          A lunar correspondence tool that sells{" "}
          <span className="bg-[#ef7618] text-black px-2 py-0.5 rounded border-2 border-black inline-block shadow-[2px_2px_0_#000]">
            thinking & sub-pixel precision,
          </span>{" "}
          not misaligned crater slides.
        </p>

        {/* Subtitle / Explainer with exact solution statement */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-black font-semibold max-w-3xl leading-relaxed mb-10 bg-white p-4 rounded-xl border-3 border-black shadow-[4px_4px_0_#000]">
          CosmicYaan takes two images of the same lunar region—Chandrayaan-2 optical (OHRC, TMC-2, IIRS) and reference (LRO NAC, SELENE)—and uses a fine-tuned deep-learning LoFTR model with RANSAC homography to replace fragile SIFT matching across extreme Sun angles and scale variations.
        </p>

        {/* Tactile Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              soundController.playPop();
              onGoToStudio();
            }}
            className="brutal-btn text-base sm:text-lg py-3.5 px-8 shadow-[6px_6px_0_#000000] hover:shadow-[3px_3px_0_#000000]"
          >
            <Layers className="w-5 h-5 text-black stroke-[2.5]" />
            <span>LAUNCH REGISTRATION STUDIO</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => {
              soundController.playClick();
              onGoToProblem();
            }}
            className="brutal-btn-white text-base sm:text-lg py-3.5 px-6 shadow-[6px_6px_0_#000000] hover:shadow-[3px_3px_0_#000000]"
          >
            <span>THE CHALLENGE DECK</span>
          </button>
        </div>
      </div>
    </div>
  );
}
