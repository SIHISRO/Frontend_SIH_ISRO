"use client";

import React from "react";
import {
  Brain,
  Database,
  Cpu,
  Zap,
  Check,
  Lightbulb,
  Target,
  Orbit,
  Sparkles,
} from "lucide-react";

export function FeasibilitySlide() {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Title */}
        <h2 className="font-display text-3xl sm:text-5xl uppercase font-black tracking-tight text-black mb-1">
          <span className="text-[#ef7618] border-b-4 border-[#ef7618] pb-0.5">Feasibility</span>
          <span className="text-black mx-2">&</span>
          <span className="text-[#1283c8] border-b-4 border-[#1283c8] pb-0.5">Viability</span>
        </h2>

        {/* Core Question Subtitle */}
        <p className="font-mono text-sm sm:text-base font-black text-black/80 my-4 flex items-center justify-center gap-2">
          <span className="w-8 h-1 bg-[#ef7618] rounded-full hidden sm:inline-block" />
          <span>Can we build it? Can it work? Can it scale?</span>
          <span className="w-8 h-1 bg-[#1283c8] rounded-full hidden sm:inline-block" />
        </p>

        {/* 3 Main Feasibility Columns matching PPT slide */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left mb-6">
          
          {/* Card 1: Technical Feasibility */}
          <div className="brutal-card p-5 bg-[#FAF7F2] shadow-[6px_6px_0_#000] flex flex-col justify-between border-3 border-black rounded-xl">
            <div>
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
                  <Brain className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-black/60 uppercase block">Category 01</span>
                  <h3 className="font-display font-black text-base uppercase">
                    <span className="text-[#ef7618]">TECHNICAL</span>{" "}
                    <span className="text-[#1283c8]">FEASIBILITY</span>
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#ef7618]/20 border border-black shrink-0 mt-0.5">
                    <Brain className="w-3.5 h-3.5 text-[#ef7618]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#ef7618]">Proven AI</span> Components
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      Fine-tuned LoFTR correspondence model, RANSAC and homography form the registration Pipeline.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#1283c8]/20 border border-black shrink-0 mt-0.5">
                    <Database className="w-3.5 h-3.5 text-[#1283c8]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#1283c8]">Available</span> Data
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      Chandrayaan-2 lunar imagery (OHRC, TMC-2, IIRS) datasets + lunar reference imagery (LRO NAC / SELENE).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#ef7618]/20 border border-black shrink-0 mt-0.5">
                    <Cpu className="w-3.5 h-3.5 text-[#ef7618]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#ef7618]">GPU</span> Compatible
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      GPU-accelerated inference for fast, sub-second lunar optical image matching.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#1283c8]/20 border border-black shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#1283c8]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#1283c8]">Real-Time / Batch</span> Processing
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed font-mono">
                      Predict points → RANSAC → Homography → Registered image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Deployment Feasibility */}
          <div className="brutal-card p-5 bg-[#FAF7F2] shadow-[6px_6px_0_#000] flex flex-col justify-between border-3 border-black rounded-xl">
            <div>
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
                  <Lightbulb className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-black/60 uppercase block">Category 02</span>
                  <h3 className="font-display font-black text-base uppercase">
                    <span className="text-[#ef7618]">DEPLOYMENT</span>{" "}
                    <span className="text-[#1283c8]">FEASIBILITY</span>
                  </h3>
                </div>
              </div>

              {/* 4 Checkmark criteria */}
              <div className="space-y-2 mb-4">
                {[
                  "Works across different lunar image sources",
                  "Handles variations in scale, viewpoint and illumination",
                  "Software-only deployment on existing systems",
                  "Supports automated processing of multiple image pairs",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-sans font-bold text-black bg-white p-2 rounded border border-black/30">
                    <span className="w-4 h-4 rounded-full bg-[#1283c8] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Process Strip matching PPT diagram */}
            <div className="bg-white border-2 border-black rounded-lg p-3">
              <span className="font-mono text-[10px] font-black uppercase text-black/60 block mb-2">
                Pipeline Architecture Flow
              </span>
              <div className="grid grid-cols-5 gap-1 items-center text-center">
                <div className="p-1 bg-[#ef7618]/15 border border-black rounded text-[9px] font-mono font-black text-black">
                  Image Pairs
                </div>
                <div className="text-black font-black text-xs">→</div>
                <div className="p-1 bg-[#1283c8]/15 border border-black rounded text-[9px] font-mono font-black text-black">
                  LoFTR Match
                </div>
                <div className="text-black font-black text-xs">→</div>
                <div className="p-1 bg-[#ef7618] text-black border border-black rounded text-[9px] font-mono font-black">
                  Registered
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Viability & Impact */}
          <div className="brutal-card p-5 bg-[#FAF7F2] shadow-[6px_6px_0_#000] flex flex-col justify-between border-3 border-black rounded-xl">
            <div>
              <div className="flex items-center gap-2.5 border-b-2 border-black pb-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
                  <Target className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-black/60 uppercase block">Category 03</span>
                  <h3 className="font-display font-black text-base uppercase">
                    <span className="text-[#ef7618]">VIABILITY</span>{" "}
                    <span className="text-[#1283c8]">& IMPACT</span>
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#ef7618]/20 border border-black shrink-0 mt-0.5">
                    <Target className="w-3.5 h-3.5 text-[#ef7618]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#ef7618]">Scientific</span> Viability
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      Improves alignment of lunar images for mapping, comparison and terrain analysis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#1283c8]/20 border border-black shrink-0 mt-0.5">
                    <Orbit className="w-3.5 h-3.5 text-[#1283c8]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#1283c8]">Mission</span> Viability
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      Supports Chandrayaan-2 and lunar reference datasets for multi-source registration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#ef7618]/20 border border-black shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#ef7618]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#ef7618]">Reduced</span> Manual Effort
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      Automatically predicts correspondences instead of relying on manual keypoint selection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded bg-[#1283c8]/20 border border-black shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#1283c8]" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-black">
                      <span className="text-[#1283c8]">Future</span> Applicability
                    </h4>
                    <p className="text-xs font-sans text-black/80 font-medium leading-relaxed">
                      Can be adapted to additional lunar datasets through domain fine-tuning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Summary Banner */}
        <div className="brutal-card p-3.5 bg-white border-2 border-black shadow-[4px_4px_0_#000] inline-flex items-center gap-3 text-xs font-mono font-bold text-black">
          <span className="px-2 py-0.5 bg-[#ef7618] text-black border border-black rounded">SOLUTION VERIFIED</span>
          <span>Fine-tuned LoFTR outperforms traditional SIFT across dynamic lunar regolith and illumination changes.</span>
        </div>

      </div>
    </div>
  );
}
