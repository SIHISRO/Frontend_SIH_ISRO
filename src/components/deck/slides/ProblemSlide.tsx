"use client";

import React from "react";
import { soundController } from "@/utils/soundController";
import {
  SunMedium,
  Maximize2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Brain,
  Sparkles,
  Layers,
  Crosshair,
  Satellite,
  Compass,
} from "lucide-react";

interface ProblemSlideProps {
  onNext: () => void;
}

export function ProblemSlide({ onNext }: ProblemSlideProps) {
  const whyCosmicYaanPoints = [
    {
      icon: SunMedium,
      title: "Handles Real Lunar Challenges",
      desc: "Works reliably even with severe differences in illumination, shadows, scale, and viewpoint across lunar orbits.",
      badge: "Invariance",
      color: "bg-[#ef7618] text-white",
    },
    {
      icon: Brain,
      title: "Learns from Lunar Data",
      desc: "Fine-tuned on lunar image pairs to understand crater rims, impact boundaries, and texture patterns specific to the Moon.",
      badge: "Domain Trained",
      color: "bg-[#1283c8] text-white",
    },
    {
      icon: Crosshair,
      title: "Direct Correspondence Prediction",
      desc: "Directly predicts dense matching point pairs between source and reference images, without relying on fragile traditional keypoint detection.",
      badge: "Detector-Free",
      color: "bg-black text-white",
    },
    {
      icon: Layers,
      title: "Combines ML with Classical Geometry",
      desc: "ML finds reliable correspondences and RANSAC removes outliers, while 3×3 projective homography guarantees rigorous geometric alignment.",
      badge: "Hybrid Rigor",
      color: "bg-emerald-600 text-white",
      formula: "LoFTR (ML) + RANSAC + H (Geometry)",
    },
    {
      icon: Satellite,
      title: "Works Across Multiple Datasets",
      desc: "Enables accurate co-registration across Chandrayaan-2 (OHRC, TMC-2, IIRS) and lunar reference frames (LRO NAC, SELENE).",
      badge: "Multi-Sensor",
      color: "bg-purple-600 text-white",
      sensors: ["OHRC (0.25m)", "TMC-2 (5m)", "IIRS (80m)", "LRO NAC"],
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        
        {/* Big Headline with Angled Neo-Brutalist Badges */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl uppercase font-black tracking-tight leading-[1.12] text-black mb-8">
          Every orbit, sun angles shift by 45°, crater shadows{" "}
          <span className="bg-white text-black px-2.5 py-1 rounded border-2 sm:border-3 border-black inline-block -rotate-2 sm:-rotate-3 shadow-[3px_3px_0_#000] hover:rotate-0 transition-transform select-none">
            invert 180°,
          </span>{" "}
          and scale scales 10×.{" "}
          <span className="bg-[#1283c8] text-white px-3 py-1.5 rounded-md inline-block mt-2 border-2 sm:border-3 border-black shadow-[4px_4px_0_#000] -rotate-1 sm:-rotate-1.5 hover:rotate-0 transition-transform select-none">
            Classical feature matching collapses.
          </span>
        </h2>

        {/* 3 Neo-Brutalist Challenge Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left mt-6 mb-10">
          
          {/* Card 1: Illumination variation */}
          <div className="brutal-card p-5 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform border-3 border-black shadow-[5px_5px_0_#000] rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-[#ef7618] border-3 border-black flex items-center justify-center mb-3 shadow-[3px_3px_0_#000]">
              <SunMedium className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-[10px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 01
            </div>
            <h3 className="font-display text-lg sm:text-xl font-black uppercase text-black mb-2">
              Illumination Variation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Changes in sun azimuth & elevation drastically affect surface lighting and cast severe deceptive shadows on regolith craters, causing SIFT & ORB descriptors to fail.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Resolved by Global LoFTR Attention</span>
            </div>
          </div>

          {/* Card 2: Viewpoint variation */}
          <div className="brutal-card p-5 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform border-3 border-black shadow-[5px_5px_0_#000] rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-[#1283c8] border-3 border-black flex items-center justify-center mb-3 shadow-[3px_3px_0_#000]">
              <Maximize2 className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-[10px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 02
            </div>
            <h3 className="font-display text-lg sm:text-xl font-black uppercase text-black mb-2">
              Viewpoint Variation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Geometric distortions from different orbital tracks and off-nadir tilt angles. Craters appear shifted, rotated, or foreshortened across repeated flybys.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Robust 3×3 Projective Homography</span>
            </div>
          </div>

          {/* Card 3: Scale variation */}
          <div className="brutal-card p-5 bg-[#EAEFEF] relative group hover:-translate-y-1 transition-transform border-3 border-black shadow-[5px_5px_0_#000] rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-[#ef7618] border-3 border-black flex items-center justify-center mb-3 shadow-[3px_3px_0_#000]">
              <AlertTriangle className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="text-[10px] font-mono font-bold uppercase text-black/60 mb-1">
              CHALLENGE 03
            </div>
            <h3 className="font-display text-lg sm:text-xl font-black uppercase text-black mb-2">
              Scale Variation
            </h3>
            <p className="font-sans text-xs sm:text-sm text-black/80 leading-relaxed font-medium">
              Lunar payloads operate at vastly disparate resolutions (OHRC 0.25m vs TMC-2 5m vs IIRS 80m), creating up to 10×–160× scale gaps across paired frames.
            </p>
            <div className="mt-4 pt-3 border-t-2 border-black/10 flex items-center gap-1.5 text-xs font-mono font-bold text-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Sub-Pixel Coarse-to-Fine Matching</span>
            </div>
          </div>

        </div>

        {/* --- NEW FILLED SECTION: WHY COSMICYAAN? (From SIH Poster) --- */}
        <div className="brutal-card p-6 sm:p-7 bg-[#FAF7F2] border-3 border-black shadow-[6px_6px_0_#000] rounded-2xl mb-8 text-left">
          
          {/* Header pill badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-[#1283c8] text-white font-display font-black text-sm uppercase rounded-lg border-2 border-black shadow-[2px_2px_0_#000]">
                WHY COSMICYAAN?
              </div>
              <span className="font-mono text-xs font-bold text-black uppercase tracking-wider hidden sm:inline-block">
                The SIH26166 Solution Architecture
              </span>
            </div>
            <span className="font-mono text-[11px] font-black px-2.5 py-1 bg-[#ef7618] text-black rounded border border-black shadow-[2px_2px_0_#000] self-start sm:self-auto">
              REPLACES SIFT / ORB PIPELINES
            </span>
          </div>

          {/* 5-Pillar Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-5">
            {whyCosmicYaanPoints.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center ${item.color} shadow-[2px_2px_0_#000]`}>
                        <IconComp className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.5 bg-[#EAEFEF] border border-black rounded text-black">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="font-display text-xs uppercase font-black text-black mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[11px] text-black/75 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {item.formula && (
                    <div className="mt-3 pt-2 border-t border-black/15 text-[10px] font-mono font-black text-[#1283c8] bg-[#1283c8]/10 p-1 rounded text-center">
                      {item.formula}
                    </div>
                  )}

                  {item.sensors && (
                    <div className="mt-3 pt-2 border-t border-black/15 flex flex-wrap gap-1">
                      {item.sensors.map((s, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-mono font-bold bg-[#EAEFEF] px-1 rounded border border-black/30">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Result Banner from SIH Poster */}
          <div className="p-3 sm:p-3.5 bg-white border-2 sm:border-3 border-black rounded-xl shadow-[3px_3px_0_#000] flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <span className="font-display font-black text-xs sm:text-sm uppercase text-[#ef7618] px-2 py-0.5 bg-[#ef7618]/15 border border-black rounded">
              VERIFIED RESULT:
            </span>
            <span className="font-mono text-xs sm:text-sm font-black text-black">
              Reliable correspondence + geometrically consistent alignment + registered lunar imagery
            </span>
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
