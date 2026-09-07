"use client";

import React, { useState } from "react";
import { soundController } from "@/utils/soundController";
import {
  ShieldCheck,
  Check,
  Layers,
  Cpu,
  ArrowRight,
  GitBranch,
  Network,
  Crosshair,
  Filter,
  Grid3X3,
  Blend,
  Sparkles,
  Workflow,
  Binary,
} from "lucide-react";

export function ArchitectureSlide() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "deep-dive">("pipeline");

  const pipelineSteps = [
    {
      step: "01",
      title: "INPUT IMAGES",
      icon: Grid3X3,
      badge: "Source + Ref",
      details: "Chandrayaan-2 source + lunar reference image",
      sub: "OHRC / TMC-2 / IIRS ↔ LRO NAC / SELENE",
      color: "bg-[#ef7618] text-white",
    },
    {
      step: "02",
      title: "FINE TUNED",
      icon: Cpu,
      badge: "Transformer",
      details: "Fine-tuned on lunar imagery to learn visual relationships between source & reference.",
      sub: "Replaces conventional SIFT-based feature detection.",
      color: "bg-[#1283c8] text-white",
    },
    {
      step: "03",
      title: "FIND CORRESPONDENCE",
      icon: Crosshair,
      badge: "Direct Match",
      details: "Directly predicts corresponding point pairs between the source and reference images.",
      sub: "Learned points form the basis for geometric registration.",
      color: "bg-emerald-600 text-white",
    },
    {
      step: "04",
      title: "RANSAC FILTERING",
      icon: Filter,
      badge: "Outlier Rejection",
      details: "Checks predicted correspondences against image geometry.",
      sub: "Incorrect matches rejected; geometrically consistent inliers retained.",
      color: "bg-purple-600 text-white",
    },
    {
      step: "05",
      title: "HOMOGRAPHY ESTIMATION",
      icon: Binary,
      badge: "Matrix H",
      details: "Reliable inliers solve 3×3 projective homography matrix H.",
      sub: "Describes projective mapping from source to reference coordinate frame.",
      color: "bg-amber-600 text-white",
      hasMatrix: true,
    },
    {
      step: "06",
      title: "WARP & OVERLAY",
      icon: Blend,
      badge: "Verification",
      details: "Estimated H is applied to warp source image into reference coordinate system.",
      sub: "Warped source overlaid with reference to verify sub-pixel registration.",
      color: "bg-rose-600 text-white",
    },
  ];

  const technicalModules = [
    {
      name: "Local Feature CNN",
      tag: "Shared Backbone",
      desc: "Extracts multi-scale features from lunar surface structures (crater rims, boundaries, and textures). Yields 1/8 coarse maps and 1/2 fine maps.",
      notation: "F̃^A, F̃^B (1/8) & F̂^A, F̂^B (1/2)",
    },
    {
      name: "Coarse Feature Transform",
      tag: "LoFTR Core (×Nc)",
      desc: "Flattens coarse maps with 2D sinusoidal positional encoding. Interleaved Self-Attention & Cross-Attention layers model long-range regolith context.",
      notation: "F̃_tr^A, F̃_tr^B",
    },
    {
      name: "Differentiable Matching",
      tag: "Dual-Softmax",
      desc: "Computes optimal transport score matrix Pc between all pairs. Mutual nearest neighbor criterion eliminates ambiguous crater shadows.",
      notation: "Confidence Matrix P_c",
    },
    {
      name: "Sub-Pixel Fine Module",
      tag: "Expectation Refinement",
      desc: "Crops w×w fine-scale patches around coarse matches. Correlation heatmap expectation yields continuous sub-pixel coordinates < 0.50 px RMSE.",
      notation: "M_f = {(î, ĵ')}",
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="text-left">
            <h2 className="font-display text-3xl sm:text-5xl uppercase font-black tracking-tight text-[#EAEFEF]">
              Technical Approach & Architecture
            </h2>
            <p className="font-mono text-xs sm:text-sm font-bold text-black/80 mt-1 uppercase">
              COSMICYAAN · SIH26166 End-to-End Lunar Registration Engine
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white/90 p-1.5 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] self-start sm:self-auto">
            <button
              onClick={() => {
                soundController.playPop();
                setActiveTab("pipeline");
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-black uppercase transition-all ${
                activeTab === "pipeline"
                  ? "bg-[#ef7618] text-black shadow-[2px_2px_0_#000]"
                  : "hover:bg-black/10 text-black/70"
              }`}
            >
              Pipeline Flow (6 Steps)
            </button>
            <button
              onClick={() => {
                soundController.playPop();
                setActiveTab("deep-dive");
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-black uppercase transition-all ${
                activeTab === "deep-dive"
                  ? "bg-[#1283c8] text-white shadow-[2px_2px_0_#000]"
                  : "hover:bg-black/10 text-black/70"
              }`}
            >
              LoFTR Modules & Compliance
            </button>
          </div>
        </div>

        {/* --- VIEW 1: 6-STEP PIPELINE FLOW (From SIH Poster 1) --- */}
        {activeTab === "pipeline" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {pipelineSteps.map((step, idx) => {
                const IconComp = step.icon;
                return (
                  <div
                    key={idx}
                    className="brutal-card p-5 bg-[#FAF7F2] border-3 border-black shadow-[5px_5px_0_#000] rounded-2xl flex flex-col justify-between hover:-translate-y-1 transition-transform"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b-2 border-black/15 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#ef7618] text-black border border-black rounded shadow-[1px_1px_0_#000]">
                            STEP {step.step}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-black/60 uppercase">
                            {step.badge}
                          </span>
                        </div>
                        <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center ${step.color} shadow-[2px_2px_0_#000]`}>
                          <IconComp className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      </div>

                      <h3 className="font-display text-base uppercase font-black text-black mb-2 leading-tight">
                        {step.title}
                      </h3>

                      <p className="font-sans text-xs text-black/85 leading-relaxed font-semibold mb-2">
                        {step.details}
                      </p>

                      <p className="font-sans text-[11px] text-black/65 font-medium leading-normal">
                        {step.sub}
                      </p>

                      {step.hasMatrix && (
                        <div className="mt-3 p-2 bg-white border-2 border-black rounded-lg text-center font-mono text-xs font-black text-black shadow-[2px_2px_0_#000]">
                          <span className="text-[#ef7618]">H</span> = [ [h₁₁, h₁₂, h₁₃], [h₂₁, h₂₂, h₂₃], [h₃₁, h₃₂, 1] ]
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Pipeline Summary Bar */}
            <div className="brutal-card p-4 bg-white border-3 border-black rounded-xl shadow-[5px_5px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse border border-black shrink-0" />
                <span className="font-sans text-xs sm:text-sm font-bold text-black">
                  End-to-End Execution: Input Image Pair ➔ Coarse-to-Fine LoFTR ➔ RANSAC Inliers ➔ Homography Warping ➔ Sub-Pixel Lunar Overlay.
                </span>
              </div>
              <span className="font-mono text-xs font-black px-3 py-1 bg-[#ef7618] text-black rounded-lg border border-black shrink-0">
                &lt; 0.50 px RMSE
              </span>
            </div>
          </div>
        )}

        {/* --- VIEW 2: TECHNICAL DEEP-DIVE & COMPLIANCE (From SIH Poster 2) --- */}
        {activeTab === "deep-dive" && (
          <div className="space-y-6 text-left">
            {/* 4 Neural Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {technicalModules.map((mod, idx) => (
                <div
                  key={idx}
                  className="brutal-card p-4.5 bg-[#FAF7F2] border-3 border-black shadow-[5px_5px_0_#000] rounded-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-black/60 uppercase">
                        Module 0{idx + 1}
                      </span>
                      <span className="text-[9px] font-mono font-black px-1.5 py-0.5 bg-[#1283c8] text-white rounded border border-black">
                        {mod.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-sm uppercase font-black text-black mb-1.5">
                      {mod.name}
                    </h3>
                    <p className="font-sans text-xs text-black/80 font-medium leading-relaxed mb-3">
                      {mod.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-black/15 font-mono text-[10px] font-bold text-black/70 bg-white p-1 rounded border border-black/20 text-center">
                    {mod.notation}
                  </div>
                </div>
              ))}
            </div>

            {/* SIH26166 Deliverables Compliance Box */}
            <div className="brutal-card p-6 bg-[#EAEFEF] border-3 border-black shadow-[6px_6px_0_#000] rounded-2xl">
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
                <span className="font-display font-black text-sm sm:text-base uppercase text-black">
                  ISRO Problem Statement SIH26166 — Deliverables Compliance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-black font-bold">
                <div className="flex items-center gap-2.5 p-3 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0_#000]">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                  <span>Multi-modal optical sensor support (OHRC 0.25m, TMC-2 5m, IIRS 80m)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0_#000]">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                  <span>45° sun azimuth shift & 180° shadow inversion invariance</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0_#000]">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                  <span>Rigorous sub-pixel accuracy (&lt; 0.50 px geometric RMSE)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 bg-white border-2 border-black rounded-lg shadow-[2px_2px_0_#000]">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                  <span>Uniform spatial correspondence distribution across entire lunar frame</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
