"use client";

import React from "react";
import { soundController } from "@/utils/soundController";
import { FloatingHighlighter, StampBadge } from "../StationeryProps";
import { ArrowRight, Sparkles, Orbit, Layers, ShieldCheck } from "lucide-react";

interface CoverSlideProps {
  onGoToStudio: () => void;
  onGoToProblem: () => void;
}

export function CoverSlide({ onGoToStudio, onGoToProblem }: CoverSlideProps) {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      
      {/* Stationery Props Floating on Top */}
      <div className="absolute top-4 sm:top-10 right-4 sm:right-16 hidden sm:block z-10">
        <FloatingHighlighter />
      </div>

      <div className="absolute top-6 left-4 sm:left-12 hidden md:block z-10">
        <StampBadge text="ISRO PS SIH26166" className="-rotate-6 bg-[#EAEFEF]" />
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Eyebrow Pill */}
        <div className="brutal-badge brutal-badge-navy mb-6 sm:mb-8 font-mono tracking-widest text-xs sm:text-sm py-1.5 px-4 shadow-[3px_3px_0_#000]">
          <Orbit className="w-4 h-4 animate-spin [animation-duration:8s] text-[#FF9B51]" />
          <span>CHANDRAYAAN-2 OPTICAL IMAGE CORRESPONDENCE</span>
        </div>

        {/* Massive Punchy Display Title (Nodeck style) */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-black tracking-tight leading-[0.92] text-black mb-6 select-none">
          LUNAR<span className="text-[#EAEFEF] drop-shadow-[5px_5px_0_#000000]">-REG</span>
        </h1>

        {/* Tagline with highlighter mark */}
        <p className="font-display text-xl sm:text-3xl md:text-4xl text-black font-extrabold max-w-3xl leading-snug mb-8">
          A lunar correspondence tool that sells{" "}
          <span className="text-highlight-light">thinking & sub-pixel precision,</span>{" "}
          not misaligned crater slides.
        </p>

        {/* Subtitle / Explainer */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-black font-semibold max-w-2xl leading-relaxed mb-10">
          Geometric alignment and keypoint matching across extreme sun azimuth variations, shadow inversions, and multi-sensor scale shifts (OHRC, TMC-2, IIRS) using fine-tuned LoFTR.
        </p>

        {/* Tactile Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              soundController.playPop();
              onGoToStudio();
            }}
            className="brutal-btn-navy text-base sm:text-lg py-3.5 px-8 shadow-[6px_6px_0_#000000] hover:shadow-[3px_3px_0_#000000]"
          >
            <Layers className="w-5 h-5 text-[#FF9B51] stroke-[2.5]" />
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
