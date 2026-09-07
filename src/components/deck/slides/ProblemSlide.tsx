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
        
        {/* Eyebrow */}
        <div className="brutal-badge brutal-badge-orange mb-6 font-mono font-bold text-xs tracking-widest shadow-[3px_3px_0_#000]">
          <span>THE SCIENTIFIC CHALLENGE // ISRO PROBLEM STATEMENT SIH26166</span>
        </div>

        {/* Big Headline in Pale Ice White with Solar Orange Highlighter */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-black tracking-tight leading-[1.05] text-[#EAEFEF] mb-8">
          Every orbit, sun angles shift by 45°, crater shadows{" "}
          <span className="text-highlight text-black">invert 180°,</span> and scale scales 10×.{" "}
          <span className="bg-[#FF9B51] text-black px-2 py-0.5 rounded-md inline-block mt-1 border-2 border-black">
            Classical feature matching collapses.
          </span>
        </h2>

        {/* 3 Neo-Brutalist Challenge Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-10 mb-10">
          
          {/* Card 1 */}
          <div className="brutal-card p-6 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#FF9B51] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
              <SunMedium className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 01
            </div>
            <h3 className="font-display text-xl font-black uppercase text-black mb-2">
              Illumination & Shadow Reversal
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Changes in solar azimuth and elevation cast huge deceptive shadows on regolith craters. SIFT/ORB mistake shadow borders for topography.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Resolved by LoFTR Attention</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="brutal-card p-6 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#BFC9D1] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
              <Maximize2 className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 02
            </div>
            <h3 className="font-display text-xl font-black uppercase text-black mb-2">
              Extreme Multi-Scale Swaths
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              OHRC images lunar surface at 0.25m/pixel, while TMC-2 captures 5m/pixel stereos. Matching requires invariant scale estimation across 20× magnification ratios.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Sub-pixel Coarse-to-Fine Grid</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="brutal-card p-6 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[#FF9B51] border-3 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0_#000]">
              <AlertTriangle className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div className="text-[11px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 03
            </div>
            <h3 className="font-display text-xl font-black uppercase text-black mb-2">
              Featureless Lunar Seas & Maria
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Smooth volcanic maria lack discrete corners. Detector-free transformers correlate entire context fields to reliably pair flat surfaces.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Dense Global Receptive Field</span>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundController.playPop();
            onNext();
          }}
          className="brutal-btn py-3 px-6 shadow-[4px_4px_0_#000]"
        >
          <span>EXPLORE MISSION PAYLOADS</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

      </div>
    </div>
  );
}
