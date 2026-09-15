"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { soundController } from "@/utils/soundController";
import {
  ShieldCheck,
  Check,
  Layers,
  Cpu,
  ArrowRight,
  ArrowLeft,
  Crosshair,
  Filter,
  Grid3X3,
  Blend,
  Binary,
  Play,
  Pause,
  Sparkles,
  Zap,
  Activity,
  Maximize2,
  Workflow,
  Radio,
  Plane,
} from "lucide-react";
import { AircraftFlightScanner } from "./AircraftFlightScanner";

interface PipelineStep {
  step: string;
  index: number;
  title: string;
  shortName: string;
  tag: string;
  icon: React.ElementType;
  summary: string;
  deepDescription: string;
  lunarSolution: string;
  formula?: string;
  inputs: string;
  outputs: string;
  sensors: string[];
  sihCompliance: string;
  color: string;
  accentHex: string;
}

export function ArchitectureSlide() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"connected-pipeline" | "deep-dive">("connected-pipeline");
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pipelineSteps: PipelineStep[] = [
    {
      step: "01",
      index: 0,
      title: "INPUT SENSOR IMAGERY",
      shortName: "INPUT",
      tag: "Source + Reference",
      icon: Grid3X3,
      summary: "Chandrayaan-2 moving optical frame paired with fixed canonical lunar reference frame.",
      deepDescription:
        "Accepts multi-modal Chandrayaan-2 optical datasets (OHRC at 0.25m, TMC-2 stereo at 5m, or IIRS at 80m) alongside the fixed NASA LRO NAC (0.5m) or SELENE global reference coordinate grid.",
      lunarSolution:
        "Resolves up to 160× scale disparities between payloads, 45° sun azimuth changes, and 180° inverted shadow illumination across repeated lunar orbits.",
      formula: "I_source (OHRC / TMC-2 / IIRS) ⊗ I_ref (LRO NAC / SELENE)",
      inputs: "Raw PDS4 Orbital Swath + Selenographic Reference Image",
      outputs: "Dual Normalized Grayscale Tensors (H × W)",
      sensors: ["OHRC (0.25m)", "TMC-2 (5m)", "IIRS (80m)", "LRO NAC (0.5m)"],
      sihCompliance: "Full multi-modal optical sensor support covering all Chandrayaan-2 payloads.",
      color: "bg-[#ef7618] text-black",
      accentHex: "#ef7618",
    },
    {
      step: "02",
      index: 1,
      title: "FINE-TUNED TRANSFORMER",
      shortName: "LoFTR",
      tag: "Deep Planetary Attention",
      icon: Cpu,
      summary: "Fine-tuned transformer with 2D sinusoidal positional encodings replaces conventional SIFT.",
      deepDescription:
        "A multi-scale ResNet-FPN backbone extracts coarse (1/8) and fine (1/2) feature maps. Interleaved Self-Attention and Cross-Attention layers condition both images on each other's global regolith context.",
      lunarSolution:
        "Replaces fragile SIFT / ORB gradient detectors that fail in textureless lunar maria or when crater shadow inversions reverse local descriptor gradients.",
      formula: "F̃_tr = Transformer(ResNet_FPN(I)) + 2D_Sinusoidal_PE",
      inputs: "Dual Normalized Image Tensors",
      outputs: "Contextualized Coarse Feature Maps (F̃_tr^A, F̃_tr^B)",
      sensors: ["Coarse: 1/8 resolution", "Fine: 1/2 resolution"],
      sihCompliance: "Invariant to 45° solar azimuth shifts and 180° shadow reversals on crater rims.",
      color: "bg-[#1283c8] text-white",
      accentHex: "#1283c8",
    },
    {
      step: "03",
      index: 2,
      title: "DENSE CORRESPONDENCE",
      shortName: "MATCHING",
      tag: "Dual-Softmax & Sub-Pixel",
      icon: Crosshair,
      summary: "Optimal transport confidence matrix and expectation refinement predict sub-pixel point pairs.",
      deepDescription:
        "Computes optimal transport score matrix Pc between all coarse feature pairs. Mutual nearest neighbor criterion filters ambiguities, followed by local patch expectation yielding continuous coordinates < 0.50 px RMSE.",
      lunarSolution:
        "Directly predicts matching pairs across craters and boulder fields without requiring discrete keypoint detection steps, ensuring dense coverage even in low-contrast regolith.",
      formula: "P_c(i, j) = softmax(F̃^A · (F̃^B)ᵀ / √d) · MNN(i, j)",
      inputs: "Contextualized Feature Tensors",
      outputs: "Sub-Pixel Match Coordinates {(x_i, y_i) ↔ (x'_i, y'_i)}",
      sensors: ["Dual-Softmax", "Mutual Nearest Neighbor", "Expectation Regressor"],
      sihCompliance: "Maintains uniform spatial correspondence distribution across the lunar scene.",
      color: "bg-emerald-600 text-white",
      accentHex: "#059669",
    },
    {
      step: "04",
      index: 3,
      title: "RANSAC OUTLIER REJECTION",
      shortName: "RANSAC",
      tag: "Geometric Inlier Consensus",
      icon: Filter,
      summary: "Epipolar & projective consistency filtering purges false crater associations.",
      deepDescription:
        "Iterative Random Sample Consensus (RANSAC) tests candidate correspondences against epipolar geometry constraints, filtering out false associations caused by repetitive crater patterns and steep topography.",
      lunarSolution:
        "Guarantees that only geometrically verified inliers contribute to the alignment, eliminating misleading matches from symmetrical impact craters.",
      formula: "p₂ᵀ · F · p₁ = 0, with Inlier Ratio = N_inliers / N_total",
      inputs: "Raw Predicted Candidate Matches (1,000+ points)",
      outputs: "Geometrically Consistent Inlier Set (Robust Consensus)",
      sensors: ["Epipolar Verification", "Outlier Distance < 1.5 px"],
      sihCompliance: "Guarantees mathematically rigorous inlier retention with < 0.50 px residual error.",
      color: "bg-purple-600 text-white",
      accentHex: "#9333ea",
    },
    {
      step: "05",
      index: 4,
      title: "HOMOGRAPHY ESTIMATION",
      shortName: "MATRIX H",
      tag: "3×3 Projective Transform",
      icon: Binary,
      summary: "Inlier correspondences solve the 8-DOF 3×3 projective homography matrix H.",
      deepDescription:
        "Normalized Direct Linear Transformation (DLT) with Levenberg-Marquardt optimization solves the 3×3 projective homography matrix H, describing the planar coordinate mapping between orbital swaths.",
      lunarSolution:
        "Accounts for spacecraft tilt, orbital altitude variations, camera focal lengths, and ground terrain perspective differences between observation passes.",
      formula: "H = [ [h₁₁, h₁₂, h₁₃], [h₂₁, h₂₂, h₂₃], [h₃₁, h₃₂, 1] ]",
      inputs: "RANSAC-Verified Inlier Correspondence Pairs",
      outputs: "Solved 3×3 Projective Homography Matrix H",
      sensors: ["8-DOF Planar Projective", "Geometric RMSE < 0.50 px"],
      sihCompliance: "Provides direct numerical transform matrix for automated GIS pipelines.",
      color: "bg-amber-600 text-white",
      accentHex: "#d97706",
    },
    {
      step: "06",
      index: 5,
      title: "WARP & SUB-PIXEL OVERLAY",
      shortName: "WARP",
      tag: "Sub-Pixel Verification",
      icon: Blend,
      summary: "Bicubic warping maps the source frame into reference coordinates with 50/50 overlay.",
      deepDescription:
        "Matrix H is applied to warp the moving Chandrayaan-2 image into the fixed reference coordinate system using bicubic interpolation, generating the registered product and a 50/50 visual overlay blend.",
      lunarSolution:
        "Allows ISRO mission planners to visually verify sub-meter crater rim alignment, boulder positioning, and safe landing coordinates for future lander missions.",
      formula: "I_warped = H · I_source, Overlay = 0.5·I_ref + 0.5·I_warped",
      inputs: "Source Image + Solved Matrix H",
      outputs: "Registered Source Product + 50/50 Overlay Blend",
      sensors: ["Bicubic Resampling", "Dual-Channel Blend", "Pixel Delta Telemetry"],
      sihCompliance: "Delivers registered product and evaluation metrics (RMSE, inlier ratio).",
      color: "bg-rose-600 text-white",
      accentHex: "#e11d48",
    },
  ];

  const technicalModules = [
    {
      name: "Local Feature CNN Backbone",
      tag: "Shared Weights",
      desc: "Extracts multi-scale features from lunar surface structures (crater rims, boundaries, and textures). Yields 1/8 coarse maps and 1/2 fine maps.",
      notation: "F̃^A, F̃^B (1/8) & F̂^A, F̂^B (1/2)",
    },
    {
      name: "Coarse Feature Transformer",
      tag: "LoFTR Core (×Nc)",
      desc: "Flattens coarse maps with 2D sinusoidal positional encoding. Interleaved Self-Attention & Cross-Attention layers model long-range regolith context.",
      notation: "F̃_tr^A, F̃_tr^B",
    },
    {
      name: "Differentiable Matching Module",
      tag: "Dual-Softmax",
      desc: "Computes optimal transport score matrix Pc between all pairs. Mutual nearest neighbor criterion eliminates ambiguous crater shadows.",
      notation: "Confidence Matrix P_c",
    },
    {
      name: "Sub-Pixel Fine Refinement",
      tag: "Expectation Regressor",
      desc: "Crops w×w fine-scale patches around coarse matches. Correlation heatmap expectation yields continuous sub-pixel coordinates < 0.50 px RMSE.",
      notation: "M_f = {(î, ĵ')}",
    },
  ];

  // The displayed step is the hovered one (if any) or the active one
  const displayedStepIndex = hoveredStepIndex !== null ? hoveredStepIndex : activeStepIndex;
  const currentStep = pipelineSteps[displayedStepIndex];
  const StepIcon = currentStep.icon;

  const handleStepSelect = useCallback((idx: number) => {
    soundController.playPop();
    setActiveStepIndex(idx);
  }, []);

  const handleNextStep = useCallback(() => {
    const nextIdx = (activeStepIndex + 1) % pipelineSteps.length;
    handleStepSelect(nextIdx);
  }, [activeStepIndex, handleStepSelect, pipelineSteps.length]);

  const handlePrevStep = useCallback(() => {
    const prevIdx = (activeStepIndex - 1 + pipelineSteps.length) % pipelineSteps.length;
    handleStepSelect(prevIdx);
  }, [activeStepIndex, handleStepSelect, pipelineSteps.length]);

  // Auto-play simulation cycle
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setActiveStepIndex((prev) => {
          const next = (prev + 1) % pipelineSteps.length;
          soundController.playClick();
          return next;
        });
      }, 2600);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying, pipelineSteps.length]);

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] pb-32 flex flex-col justify-start items-center px-4 sm:px-8 py-6 relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 text-left">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] sm:text-xs font-black px-2.5 py-0.5 bg-[#ef7618] text-black border border-black rounded shadow-[2px_2px_0_#000]">
                SIH26166 SOLUTION
              </span>
              <span className="font-mono text-xs font-bold text-black/70 hidden sm:inline">
                End-to-End Lunar Registration Pipeline
              </span>
            </div>
            <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl uppercase font-black tracking-tight text-[#EAEFEF]">
              Technical Approach & Architecture
            </h2>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/95 p-1 sm:p-1.5 rounded-xl border-3 border-black shadow-[3px_3px_0_#000] self-stretch sm:self-auto justify-center">
            <button
              onClick={() => {
                soundController.playPop();
                setActiveTab("connected-pipeline");
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-black uppercase transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === "connected-pipeline"
                  ? "bg-[#ef7618] text-black shadow-[2px_2px_0_#000]"
                  : "hover:bg-black/10 text-black/70"
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Connected Nodes</span>
            </button>
            <button
              onClick={() => {
                soundController.playPop();
                setActiveTab("deep-dive");
              }}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs font-black uppercase transition-all text-center flex items-center justify-center gap-1.5 ${
                activeTab === "deep-dive"
                  ? "bg-[#1283c8] text-white shadow-[2px_2px_0_#000]"
                  : "hover:bg-black/10 text-black/70"
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Aircraft Scan & Modules</span>
            </button>
          </div>
        </div>

        {/* --- VIEW 1: CONNECTED DOTS PIPELINE (INTERACTIVE CURSOR NODES) --- */}
        {activeTab === "connected-pipeline" && (
          <div className="space-y-6">
            
            {/* Top Circuit Stage with Interconnected Dots */}
            <div className="brutal-card p-4 sm:p-6 bg-[#FAF7F2] border-3 border-black shadow-[6px_6px_0_#000] rounded-2xl relative text-left">
              
              {/* Circuit Header Bar: Status, Auto-Play & Cursor Prompt */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 sm:border-b-3 border-black pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef7618] animate-pulse border border-black" />
                  <span className="font-display font-black text-xs sm:text-sm uppercase text-black">
                    INTERCONNECTED LoFTR PIPELINE CONSTELLATION
                  </span>
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white border border-black rounded text-black hidden md:inline-block shadow-[1px_1px_0_#000]">
                    HOVER OR CLICK ANY DOT TO REVEAL CARD
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Auto-Simulation Trigger Button */}
                  <button
                    onClick={() => {
                      soundController.playPop();
                      setIsAutoPlaying(!isAutoPlaying);
                    }}
                    className={`brutal-btn-white py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs font-mono font-black flex items-center gap-1.5 ${
                      isAutoPlaying ? "bg-[#ef7618] text-black shadow-[2px_2px_0_#000]" : "hover:bg-[#ef7618]"
                    }`}
                    title={isAutoPlaying ? "Pause automated step simulation" : "Auto-simulate pipeline flow across dots"}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3 h-3 fill-current" />
                        <span>PAUSE SIMULATION</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>AUTO-SIMULATE FLOW</span>
                      </>
                    )}
                  </button>

                  <span className="font-mono text-xs font-black px-2 py-1 bg-black text-white rounded border border-black shadow-[1px_1px_0_#000]">
                    NODE 0{displayedStepIndex + 1} / 06
                  </span>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* --- INTERCONNECTED DOTS TRACK (WITH ANIMATED SIGNAL LINES) --- */}
              {/* ========================================================================= */}
              <div className="relative w-full py-4 px-2 sm:px-6 overflow-x-auto no-scrollbar">
                
                {/* SVG Connecting Track Wires across all 6 Dots */}
                <div className="relative min-w-[620px] sm:min-w-0">
                  <svg
                    className="absolute top-7 sm:top-8 left-6 right-6 w-[calc(100%-3rem)] h-6 pointer-events-none z-0"
                    preserveAspectRatio="none"
                  >
                    {/* Background solid black circuit wire */}
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="#000000"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />

                    {/* Animated electrical flow beam over wire */}
                    <line
                      x1="0"
                      y1="50%"
                      x2={`${((displayedStepIndex) / 5) * 100}%`}
                      y2="50%"
                      stroke="#ef7618"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />

                    {/* Laser Pulse Particles */}
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="#1283c8"
                      strokeWidth="2"
                      strokeDasharray="8 12"
                      strokeLinecap="round"
                      className="animate-circuit-flow opacity-60"
                    />
                  </svg>

                  {/* The 6 Connected Dots */}
                  <div className="relative z-10 flex items-center justify-between gap-2 sm:gap-4">
                    {pipelineSteps.map((step, idx) => {
                      const Icon = step.icon;
                      const isHighlighted = displayedStepIndex === idx;
                      const isCompleted = displayedStepIndex > idx;

                      return (
                        <div
                          key={step.step}
                          className="flex flex-col items-center group relative cursor-pointer"
                          onMouseEnter={() => {
                            soundController.playPop();
                            setHoveredStepIndex(idx);
                          }}
                          onMouseLeave={() => {
                            setHoveredStepIndex(null);
                          }}
                          onClick={() => {
                            handleStepSelect(idx);
                          }}
                        >
                          {/* Floating Cursor Preview Tooltip on Hover */}
                          {hoveredStepIndex === idx && (
                            <div className="hidden sm:flex absolute -top-12 z-40 bg-black text-white px-2.5 py-1 rounded-lg border border-[#ef7618] shadow-[2px_2px_0_#ef7618] font-mono text-[10px] font-black uppercase whitespace-nowrap items-center gap-1.5 animate-card-reveal-pop pointer-events-none">
                              <Sparkles className="w-3 h-3 text-[#ef7618]" />
                              <span>STEP {step.step}: {step.shortName}</span>
                            </div>
                          )}

                          {/* The Tactile Dot Node */}
                          <div className="relative flex items-center justify-center">
                            {/* Radiating Pulse Ring on Active Dot */}
                            {isHighlighted && (
                              <div className="absolute inset-0 -m-2 sm:-m-2.5 rounded-full border-2 border-[#ef7618] animate-dot-pulse-ring pointer-events-none" />
                            )}

                            <button
                              type="button"
                              aria-label={`Inspect Step ${step.step}: ${step.title}`}
                              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-black flex items-center justify-center transition-all duration-200 cursor-pointer ${
                                isHighlighted
                                  ? `${step.color} scale-110 sm:scale-120 shadow-[0_0_0_4px_#000000,4px_4px_0_4px_#000000] -translate-y-1`
                                  : isCompleted
                                  ? "bg-[#1283c8] text-white shadow-[3px_3px_0_#000000] hover:scale-105"
                                  : "bg-white text-black hover:bg-[#FAF7F2] shadow-[3px_3px_0_#000000] hover:scale-105"
                              }`}
                            >
                              <Icon className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
                            </button>

                            {/* Mini Connected Status Pip */}
                            <span
                              className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-black flex items-center justify-center font-mono text-[9px] sm:text-[10px] font-black shadow-[1px_1px_0_#000] ${
                                isHighlighted
                                  ? "bg-black text-[#ef7618]"
                                  : isCompleted
                                  ? "bg-black text-white"
                                  : "bg-[#EAEFEF] text-black"
                              }`}
                            >
                              {step.step}
                            </span>
                          </div>

                          {/* Node Step Label & Tag Underneath */}
                          <div className="mt-2.5 sm:mt-3 text-center">
                            <span
                              className={`font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider block transition-colors ${
                                isHighlighted ? "text-[#ef7618]" : "text-black"
                              }`}
                            >
                              {step.shortName}
                            </span>
                            <span className="font-mono text-[9px] font-bold text-black/60 hidden sm:block">
                              {step.tag}
                            </span>
                          </div>

                          {/* Active Arrow Indicator pointing to Revealed Card */}
                          {isHighlighted && (
                            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-black mt-1 animate-bounce" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile swipe hint */}
              <div className="sm:hidden text-center mt-2 font-mono text-[10px] text-black/60 font-bold">
                👉 Swipe nodes horizontally or tap to open step card
              </div>
            </div>

            {/* ========================================================================= */}
            {/* --- THE REVEALED CARD (OPENS INSTANTLY AS CURSOR HOVERS ON ANY DOT) --- */}
            {/* ========================================================================= */}
            <div
              key={`card-reveal-${currentStep.step}`}
              className="brutal-card p-5 sm:p-7 bg-white border-3 border-black shadow-[8px_8px_0_#000] rounded-2xl text-left animate-card-reveal-pop relative overflow-hidden"
            >
              {/* Corner Decorative Circuit Accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-10"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${currentStep.accentHex} 0%, transparent 70%)`,
                }}
              />

              {/* Revealed Card Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-4 mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-3 border-black flex items-center justify-center ${currentStep.color} shadow-[3px_3px_0_#000] shrink-0`}
                  >
                    <StepIcon className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 bg-black text-white rounded shadow-[1px_1px_0_#000]">
                        NODE STEP {currentStep.step}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded border border-black bg-[#FAF7F2]">
                        {currentStep.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-3xl uppercase font-black text-black leading-tight mt-1">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                {/* Progress Indicators & Quick Controls */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] border border-black rounded-lg shadow-[1px_1px_0_#000]">
                    {pipelineSteps.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => handleStepSelect(dotIdx)}
                        className={`w-2.5 h-2.5 rounded-full border border-black transition-all ${
                          dotIdx === displayedStepIndex
                            ? "bg-[#ef7618] scale-125 shadow-[1px_1px_0_#000]"
                            : dotIdx < displayedStepIndex
                            ? "bg-black"
                            : "bg-[#EAEFEF]"
                        }`}
                        title={`Jump to Step ${dotIdx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handlePrevStep}
                    className="brutal-btn-white py-1 px-2.5 text-xs font-mono font-bold flex items-center gap-1"
                    title="Previous Pipeline Step"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="hidden sm:inline">PREV</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="brutal-btn py-1 px-2.5 text-xs font-mono font-bold flex items-center gap-1 shadow-[2px_2px_0_#000]"
                    title="Next Pipeline Step"
                  >
                    <span className="hidden sm:inline">NEXT</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Two-Column Deep Inspection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
                
                {/* Column 1: Core Mechanics & Lunar Problem Invariance (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Summary Callout */}
                  <div className="p-4 bg-[#FAF7F2] border-2 border-black rounded-xl shadow-[3px_3px_0_#000]">
                    <span className="font-mono text-[10px] font-bold uppercase text-black/60 block mb-1">
                      CORE PIPELINE MECHANISM
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-black/90 font-semibold leading-relaxed">
                      {currentStep.deepDescription}
                    </p>
                  </div>

                  {/* Lunar Domain Adaptation Box */}
                  <div className="p-4 bg-[#ef7618]/15 border-2 border-black rounded-xl">
                    <div className="flex items-center gap-1.5 mb-1 text-black font-display font-black text-xs uppercase">
                      <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
                      <span>HOW THIS OVERCOMES LUNAR ILLUMINATION & SCALE</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-black/85 leading-relaxed font-medium">
                      {currentStep.lunarSolution}
                    </p>
                  </div>

                  {/* Mathematical Formulation */}
                  {currentStep.formula && (
                    <div className="p-3 bg-black text-white rounded-xl border-2 border-black shadow-[3px_3px_0_#000] font-mono text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#ef7618] shrink-0" />
                        <span className="font-bold text-[#ef7618] uppercase text-[10px]">
                          FORMULATION:
                        </span>
                      </div>
                      <code className="text-white/90 font-black tracking-wider overflow-x-auto text-[11px] sm:text-xs">
                        {currentStep.formula}
                      </code>
                    </div>
                  )}
                </div>

                {/* Column 2: Data Pipeline Telemetry & Sensor Links (5 Cols) */}
                <div className="lg:col-span-5 space-y-3.5">
                  {/* I/O Flow Box */}
                  <div className="p-4 bg-[#FAF7F2] border-2 border-black rounded-xl space-y-2.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase text-black/60 block mb-0.5">
                        ➔ INPUT PAYLOAD TO THIS NODE
                      </span>
                      <p className="font-sans text-xs font-bold text-black bg-white p-2 rounded border border-black/20">
                        {currentStep.inputs}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase text-[#ef7618] block mb-0.5">
                        ➔ OUTPUT DATA PASSED TO NEXT NODE
                      </span>
                      <p className="font-sans text-xs font-bold text-black bg-white p-2 rounded border border-black/20">
                        {currentStep.outputs}
                      </p>
                    </div>
                  </div>

                  {/* Supported Sensors Chips */}
                  <div className="p-3.5 bg-white border-2 border-black rounded-xl">
                    <span className="font-mono text-[10px] font-bold uppercase text-black/60 block mb-1.5">
                      PAYLOAD ARCHITECTURE MATRIX
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStep.sensors.map((sensor, sIdx) => (
                        <span
                          key={sIdx}
                          className="font-mono text-[10px] font-black px-2 py-0.5 bg-[#FAF7F2] border border-black rounded shadow-[1px_1px_0_#000]"
                        >
                          {sensor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SIH26166 Requirement Badge */}
                  <div className="p-3 bg-[#1283c8]/15 border-2 border-black rounded-xl flex items-start gap-2 text-xs font-sans font-semibold text-black">
                    <Check className="w-4 h-4 text-[#1283c8] stroke-[3] shrink-0 mt-0.5" />
                    <span>{currentStep.sihCompliance}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Quick-Jump Dot Strip */}
              <div className="pt-4 border-t-2 border-black/15 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] font-black uppercase text-black/60 mr-1">
                    FAST JUMP:
                  </span>
                  {pipelineSteps.map((step, idx) => (
                    <button
                      key={step.step}
                      onClick={() => handleStepSelect(idx)}
                      className={`font-mono text-[10px] font-bold px-2 py-1 rounded border border-black transition-all ${
                        displayedStepIndex === idx
                          ? "bg-black text-[#ef7618] shadow-[2px_2px_0_#ef7618] font-black"
                          : "bg-[#FAF7F2] text-black hover:bg-white"
                      }`}
                    >
                      {step.step}. {step.shortName}
                    </button>
                  ))}
                </div>

                <div className="font-mono text-xs font-bold text-black/70 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sub-Pixel Precision Guaranteed (&lt; 0.50 px RMSE)</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- VIEW 2: TECHNICAL DEEP-DIVE & COMPLIANCE (ANIMATED AIRCRAFT FLIGHT SCANNER) --- */}
        {activeTab === "deep-dive" && (
          <div className="space-y-6 text-left animate-card-reveal-pop">
            {/* Animated Aircraft Flight Scanner with Spatial Wireframe Map */}
            <AircraftFlightScanner />
          </div>
        )}

      </div>
    </div>
  );
}
