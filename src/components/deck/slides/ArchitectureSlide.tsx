"use client";

import React from "react";
import { ShieldCheck, Check } from "lucide-react";

export function ArchitectureSlide() {
  const steps = [
    {
      num: "01",
      title: "Coarse Feature Extraction",
      desc: "Standard CNN backbone extracts 1/8 scale feature maps from both images with positional encoding.",
      tag: "ResNet-FPN",
    },
    {
      num: "02",
      title: "Linear Transformer Attention",
      desc: "Interleaved self and cross-attention blocks model global context to resolve repetitive crater textures and shadow inversions.",
      tag: "LoFTR Core",
    },
    {
      num: "03",
      title: "Optimal Transport Matching",
      desc: "Dual-softmax score matrix extracts mutually nearest coarse correspondences, discarding low-confidence outlier tracks.",
      tag: "Dual Softmax",
    },
    {
      num: "04",
      title: "Sub-Pixel Fine Refinement",
      desc: "Fine-level windows crop features around coarse matches to achieve sub-pixel accuracy below 0.50 px.",
      tag: "Expectation Refinement",
    },
    {
      num: "05",
      title: "RANSAC Homography Matrix",
      desc: "MAGSAC++ robust estimation solves the 3×3 projective homography matrix H to warp moving Chandrayaan-2 frames.",
      tag: "RANSAC / MAGSAC++",
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        
        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-5xl uppercase font-black tracking-tight text-[#EAEFEF] mb-6">
          How Lunar LoFTR Works
        </h2>

        {/* 5-Step Pipeline Strip */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8 text-left">
          {steps.map((step) => (
            <div
              key={step.num}
              className="brutal-card p-4 bg-[#EAEFEF] shadow-[4px_4px_0_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#ef7618] border border-black rounded text-black">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-black/60">
                    {step.tag}
                  </span>
                </div>
                <h3 className="font-display text-sm uppercase font-black text-black mb-1.5 leading-snug">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-black/75 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CosmicYaan Paradigm Callout Box */}
        <div className="brutal-card p-5 bg-white text-left shadow-[6px_6px_0_#000] max-w-4xl mx-auto mb-6 border-3 border-black rounded-xl">
          <div className="flex items-center justify-between border-b-2 border-black/20 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xs uppercase px-2 py-0.5 bg-[#ef7618] text-black border border-black rounded shadow-[2px_2px_0_#000]">
                THE COSMICYAAN SOLUTION
              </span>
              <span className="font-mono text-xs font-bold text-black">
                End-to-End Lunar Correspondence
              </span>
            </div>
            <span className="font-mono text-[10px] font-black px-1.5 py-0.5 bg-[#1283c8] text-white rounded border border-black hidden sm:inline-block">
              REPLACES SIFT
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-black/90 font-medium leading-relaxed">
            <strong className="text-black font-bold">CosmicYaan</strong> takes two images of the same lunar region. The source can be a Chandrayaan-2 optical image (OHRC, TMC-2 or IIRS), while the reference can be a corresponding lunar image from LRO NAC or SELENE. The two images are given to a fine-tuned deep-learning correspondence model trained on lunar imagery. The model directly predicts corresponding point pairs between the source and reference images. This replaces the conventional SIFT-based correspondence stage, which can struggle with the appearance changes found in lunar imagery. The model is fine-tuned on lunar image data so that it can learn correspondences specific to the target domain. The predicted points are then passed to RANSAC to reject incorrect matches and retain geometrically consistent inliers. These reliable correspondences are used for homography estimation, after which the source image is warped and overlaid with the reference image to obtain the registered result.
          </p>
        </div>

        {/* Deliverables Checklist Box */}
        <div className="brutal-card p-6 bg-[#EAEFEF] text-left shadow-[6px_6px_0_#000] max-w-4xl mx-auto">
          <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-4">
            <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
            <span className="font-display font-black text-base uppercase text-black">
              ISRO Problem Statement SIH26166 — Deliverables Compliance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-black font-semibold">
            <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-black rounded-md">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Multi-modal optical sensor support (OHRC, TMC-2, IIRS)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-black rounded-md">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Sun angle & shadow inversion invariance</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-black rounded-md">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Sub-pixel accuracy (&lt; 0.50 px geometric RMSE)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border-2 border-black rounded-md">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Uniform spatial distribution across entire lunar frame</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
