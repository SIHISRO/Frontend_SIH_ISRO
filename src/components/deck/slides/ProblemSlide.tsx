"use client";

import React from "react";
import { soundController } from "@/utils/soundController";
import { SunMedium, Maximize2, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

interface ProblemSlideProps {
  onNext: () => void;
}

export function ProblemSlide({ onNext }: ProblemSlideProps) {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Big Headline in Jet Black with Blue Collapse Badge */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-black tracking-tight leading-[1.05] text-black mb-8">
          Every orbit, sun angles shift by 45°, crater shadows{" "}
          <span className="bg-white text-black px-2 py-0.5 rounded border-2 border-black inline-block shadow-[2px_2px_0_#000]">invert 180°,</span> and scale scales 10×.{" "}
          <span className="bg-[#1283c8] text-white px-2 py-0.5 rounded-md inline-block mt-1 border-2 border-black shadow-[2px_2px_0_#000]">
            Classical feature matching collapses.
          </span>
        </h2>

        {/* 3 Neo-Brutalist Challenge Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10 mb-10">
          
          {/* Card 1: Illumination variation */}
          <div className="brutal-card p-6 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#ef7618] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
              <SunMedium className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 01
            </div>
            <h3 className="font-display text-xl font-black uppercase text-black mb-2">
              Illumination Variation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Changes in sun azimuth & elevation drastically affect surface lighting and cast severe deceptive shadows on regolith craters, making lunar features hard to correlate.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Resolved by LoFTR Attention</span>
            </div>
          </div>

          {/* Card 2: Viewpoint variation */}
          <div className="brutal-card p-6 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#1283c8] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
              <Maximize2 className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 02
            </div>
            <h3 className="font-display text-xl font-black uppercase text-black mb-2">
              Viewpoint Variation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Geometric distortions from different camera positions and orientations. Craters appear shifted, scaled, rotated, or perspective-distorted depending on observing angles.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Homography & Affine Invariance</span>
            </div>
          </div>

          {/* Card 3: Scale variation */}
          <div className="brutal-card p-6 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#ef7618] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
              <AlertTriangle className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 03
            </div>
            <h3 className="font-display text-xl font-black uppercase text-black mb-2">
              Scale Variation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Lunar missions operate at vastly different altitudes and spatial resolutions (e.g. OHRC 0.25m vs TMC-2 5m). Creating large scale ratios requiring sub-pixel correspondence.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Sub-pixel Coarse-to-Fine Grid</span>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundController.playPop();
            onNext();
          }}
          className="brutal-btn-navy py-3 px-6 shadow-[4px_4px_0_#000]"
        >
          <span>EXPLORE MISSION PAYLOADS</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
}
