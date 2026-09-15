"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { soundController } from "@/utils/soundController";
import {
  ShieldCheck,
  Check,
  Cpu,
  ArrowRight,
  ArrowLeft,
  Crosshair,
  Sparkles,
  Plane,
  Radar,
  Activity,
  Layers,
  Zap,
  Compass,
  Radio,
  Scan,
  MapPin,
  Lock,
  Unlock,
  RotateCcw,
} from "lucide-react";

export interface MapDestination {
  id: number;
  stepNumber: string;
  callsign: string;
  name: string;
  shortTitle: string;
  tag: string;
  desc: string;
  notation: string;
  formula: string;
  color: string;
  accentHex: string;
  // Spatial coordinates on the map (%)
  pointCoords: {
    x: number; // percentage of map width
    y: number; // percentage of map height
  };
  // Spatially anchored card position on the map (%)
  cardCoords: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    width: string;
  };
  cardPointerLine: {
    // Relative line from point to card
    direction: "bottom-left" | "top-left" | "top-right" | "bottom-right";
  };
  hoverHeading: number; // degrees
  targetSite: string;
  altitude: string;
  speed: string;
  keyMetric: string;
  metricLabel: string;
}

const mapDestinationsData: MapDestination[] = [
  {
    id: 1,
    stepNumber: "01",
    callsign: "RECON-ALPHA",
    name: "Local Feature CNN Backbone",
    shortTitle: "CNN BACKBONE",
    tag: "Shared Weights (Siamese)",
    // Point 1 in wireframe: Bottom-left
    pointCoords: { x: 15, y: 70 },
    // Card 1 in wireframe: Directly beside / below Point 1
    cardCoords: {
      left: "17%",
      top: "60%",
      width: "29%",
    },
    cardPointerLine: { direction: "bottom-left" },
    hoverHeading: 45,
    targetSite: "Shackleton Crater Rim (89.9°S)",
    altitude: "100 KM POLAR",
    speed: "MACH 4.8",
    desc: "Extracts multi-scale features from lunar surface structures (crater rims, boundaries, ejecta rays, and regolith textures). Yields 1/8 coarse maps and 1/2 fine maps.",
    notation: "F̃^A, F̃^B (1/8) & F̂^A, F̂^B (1/2)",
    formula: "F = ResNet_FPN(I) ↓ 8 & ↓ 2",
    color: "bg-[#ef7618] text-black",
    accentHex: "#ef7618",
    keyMetric: "160× Multi-Scale Range",
    metricLabel: "OHRC 0.25m / TMC-2 5m Invariant",
  },
  {
    id: 2,
    stepNumber: "02",
    callsign: "RECON-BRAVO",
    name: "Coarse Feature Transformer",
    shortTitle: "LoFTR TRANSFORMER",
    tag: "LoFTR Core (×Nc)",
    // Point 2 in wireframe: Right edge of Card 2, top-left
    pointCoords: { x: 38, y: 38 },
    // Card 2 in wireframe: Top-left corner
    cardCoords: {
      left: "3.5%",
      top: "10%",
      width: "32%",
    },
    cardPointerLine: { direction: "top-left" },
    hoverHeading: 112,
    targetSite: "Malapert Ridge (85.9°S)",
    altitude: "115 KM APOGEE",
    speed: "MACH 4.9",
    desc: "Flattens coarse maps with 2D sinusoidal positional encoding. Interleaved Self & Cross-Attention layers model long-range regolith context across orbital swath boundaries.",
    notation: "F̃_tr^A, F̃_tr^B (256-D Tensors)",
    formula: "Attention(Q,K,V) = softmax(QKᵀ/√d)V + PE",
    color: "bg-[#1283c8] text-white",
    accentHex: "#1283c8",
    keyMetric: "180° Shadow Invariant",
    metricLabel: "45° Sun Azimuth Shift Immune",
  },
  {
    id: 3,
    stepNumber: "03",
    callsign: "RECON-CHARLIE",
    name: "Differentiable Matching Module",
    shortTitle: "DUAL-SOFTMAX MATCHING",
    tag: "Dual-Softmax & MNN",
    // Point 3 in wireframe: Top edge of Card 3, center-right lower
    pointCoords: { x: 64, y: 52 },
    // Card 3 in wireframe: Below Point 3, center-right
    cardCoords: {
      left: "54%",
      top: "56%",
      width: "30%",
    },
    cardPointerLine: { direction: "bottom-right" },
    hoverHeading: 42,
    targetSite: "South Pole-Aitken (70.2°S)",
    altitude: "95 KM PERIGEE",
    speed: "MACH 5.0",
    desc: "Computes optimal transport score matrix Pc between all coarse feature pairs. Mutual nearest neighbor (MNN) criterion eliminates ambiguous crater shadows and repetitive ejecta.",
    notation: "Confidence Matrix P_c ∈ [0, 1]",
    formula: "P_c(i,j) = softmax(S) · MNN(i,j)",
    color: "bg-emerald-600 text-white",
    accentHex: "#059669",
    keyMetric: "1,200+ Dense Match Pairs",
    metricLabel: "Mutual Nearest Neighbor Filter",
  },
  {
    id: 4,
    stepNumber: "04",
    callsign: "RECON-DELTA",
    name: "Sub-Pixel Fine Refinement",
    shortTitle: "SUB-PIXEL REFINEMENT",
    tag: "Expectation Regressor",
    // Point 4 in wireframe: Top-right corner
    pointCoords: { x: 88, y: 15 },
    // Card 4 in wireframe: Below Point 4, right edge
    cardCoords: {
      left: "71%",
      top: "21%",
      width: "27%",
    },
    cardPointerLine: { direction: "top-right" },
    hoverHeading: 68,
    targetSite: "Chandrayaan-3 Site (69.37°S)",
    altitude: "92 KM TARGET",
    speed: "MACH 5.1",
    desc: "Crops w×w fine-scale patches around coarse matches. Correlation heatmap expectation yields continuous sub-pixel coordinates meeting ISRO sub-pixel precision requirements.",
    notation: "M_f = {(î, ĵ')}, RMSE < 0.50 px",
    formula: "ĵ' = ∑ (x · exp(S_fine(x)/τ)) / ∑ exp(S/τ)",
    color: "bg-purple-600 text-white",
    accentHex: "#9333ea",
    keyMetric: "RMSE < 0.50 px ISRO Metric",
    metricLabel: "Sub-Pixel Pinpoint Registration",
  },
];

export function AircraftFlightScanner() {
  // Currently targeted destination point (where airplane is)
  const [activeDestination, setActiveDestination] = useState<number>(0);
  // Maximum unlocked destination index (starts at 0, permanently accumulates as plane flies)
  const [unlockedMax, setUnlockedMax] = useState<number>(0);
  const [isFlying, setIsFlying] = useState<boolean>(false);
  const [airplaneHeading, setAirplaneHeading] = useState<number>(mapDestinationsData[0].hoverHeading);
  const [scanPulse, setScanPulse] = useState<number>(0);

  const calculateHeading = (fromIdx: number, toIdx: number) => {
    const from = mapDestinationsData[fromIdx].pointCoords;
    const to = mapDestinationsData[toIdx].pointCoords;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const rad = Math.atan2(dy, dx);
    return Math.round((rad * 180) / Math.PI) + 90;
  };

  const flyToDestination = useCallback(
    (targetIdx: number) => {
      if (targetIdx === activeDestination) {
        soundController.playPop();
        setScanPulse((p) => p + 1);
        return;
      }

      soundController.playSwoosh();
      setIsFlying(true);

      // Rotate plane towards direction of flight
      const heading = calculateHeading(activeDestination, targetIdx);
      setAirplaneHeading(heading);

      setActiveDestination(targetIdx);

      // Settle at target waypoint
      setTimeout(() => {
        setIsFlying(false);
        setAirplaneHeading(mapDestinationsData[targetIdx].hoverHeading);
        soundController.playPop();
        setScanPulse((p) => p + 1);

        // Permanently unlock: previous cards stay open, never close or replace!
        setUnlockedMax((prev) => Math.max(prev, targetIdx));
      }, 850);
    },
    [activeDestination]
  );

  const nextDestinationIdx = (activeDestination + 1) % mapDestinationsData.length;
  const isMissionCompleted = unlockedMax === mapDestinationsData.length - 1;
  const nextTarget = mapDestinationsData[nextDestinationIdx];

  const handleNextDestination = useCallback(() => {
    flyToDestination(nextDestinationIdx);
  }, [flyToDestination, nextDestinationIdx]);

  const handleResetMission = useCallback(() => {
    soundController.playPop();
    setActiveDestination(0);
    setUnlockedMax(0);
    setAirplaneHeading(mapDestinationsData[0].hoverHeading);
  }, []);

  const currentStation = mapDestinationsData[activeDestination];

  return (
    <div className="w-full space-y-4 text-left select-none">
      {/* ========================================================================= */}
      {/* TOP MISSION COMMAND BAR */}
      {/* ========================================================================= */}
      <div className="brutal-card p-3 sm:p-4 bg-[#FAF7F2] border-3 border-black shadow-[5px_5px_0_#000] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Mission Identification */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black text-[#ef7618] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000] shrink-0">
            <Plane className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] sm:text-xs font-black px-2 py-0.5 bg-[#ef7618] text-black border border-black rounded shadow-[1px_1px_0_#000]">
                INTERACTIVE MISSION MAP
              </span>
              <span className="font-mono text-[10px] font-bold text-black/70 flex items-center gap-1">
                <Radar className="w-3 h-3 text-[#1283c8] animate-spin" />
                ROUTE: 01 ALPHA → 02 BRAVO → 03 CHARLIE → 04 DELTA
              </span>
            </div>
            <h3 className="font-display font-black text-xs sm:text-base uppercase text-black mt-0.5">
              LUNAR RECONNAISSANCE FLIGHT PATH // {unlockedMax + 1} OF 4 CARDS UNLOCKED
            </h3>
          </div>
        </div>

        {/* Top Bar Quick Controls */}
        <div className="flex items-center gap-2">
          {unlockedMax > 0 && (
            <button
              onClick={handleResetMission}
              className="brutal-btn-white py-1.5 px-3 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
              title="Reset mission path back to 01"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET ROUTE</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THE MAIN HERO ELEMENT: ONE LARGE CONTINUOUS INTERACTIVE FLIGHT MAP */}
      {/* (BASED EXACTLY ON THE UPLOADED WIREFRAME) */}
      {/* ========================================================================= */}
      <div className="brutal-card p-3 sm:p-5 bg-[#FAF7F2] border-3 border-black shadow-[8px_8px_0_#000] rounded-2xl relative overflow-hidden">
        
        {/* Radar Map Canvas Container (Fixed Aspect / Dominant Screen) */}
        <div className="relative w-full h-[580px] sm:h-[640px] md:h-[680px] bg-[#FAF7F2] rounded-xl border-2 border-black overflow-hidden shadow-[inset_0_2px_12px_rgba(0,0,0,0.06)]">
          
          {/* Floating In-Map NEXT DESTINATION Action Button (Placed directly on the map) */}
          <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleNextDestination}
              className="brutal-btn py-2 px-4 sm:px-6 text-xs sm:text-sm font-mono font-black flex items-center gap-2.5 cursor-pointer shadow-[4px_4px_0_#000] hover:scale-105 active:scale-95 transition-all bg-[#ef7618] hover:bg-[#f38d38] text-black border-3 border-black rounded-xl"
              title={`Fly airplane to Destination 0${nextTarget.id}: ${nextTarget.callsign}`}
            >
              <Plane className="w-4 h-4 text-black animate-pulse" />
              <span>
                {isMissionCompleted
                  ? `REPLAY PATROL → 0${nextTarget.id}`
                  : `NEXT DESTINATION: 0${nextTarget.id} [${nextTarget.callsign.split("-")[1]}]`}
              </span>
              <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
            </button>
          </div>

          {/* Subtle Lunar Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage: `radial-gradient(#000000 1.5px, transparent 1.5px)`,
              backgroundSize: "28px 28px",
            }}
          />

          {/* Lunar Radar Distance Circles & Geographic Contours */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
            <circle cx="50%" cy="50%" r="130" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="50%" cy="50%" r="240" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="5 7" />
            <circle cx="50%" cy="50%" r="360" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="6 8" />

            {/* Crater Contours matching locations */}
            <ellipse cx="16%" cy="72%" rx="70" ry="38" fill="none" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="38%" cy="38%" rx="65" ry="35" fill="none" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="64%" cy="52%" rx="75" ry="40" fill="none" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="88%" cy="16%" rx="60" ry="30" fill="none" stroke="#000000" strokeWidth="1.5" />
          </svg>

          {/* ===================================================================== */}
          {/* CONTINUOUS FLIGHT PATH (EXACT WEAVE FROM WIREFRAME) */}
          {/* Connects: Point 1 (15, 70) -> Point 2 (38, 38) -> Point 3 (64, 52) -> Point 4 (88, 15) */}
          {/* ===================================================================== */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wireframeFlightGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef7618" />
                <stop offset="35%" stopColor="#1283c8" />
                <stop offset="68%" stopColor="#059669" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>

            {/* Base Black Architectural Path (Thick Solid) */}
            <path
              d="M 150 490 C 200 480, 280 430, 380 266 C 450 180, 520 370, 640 364 C 730 360, 800 170, 880 105"
              fill="none"
              stroke="#000000"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* Animated Colorful Circuit Trail over path */}
            <path
              d="M 150 490 C 200 480, 280 430, 380 266 C 450 180, 520 370, 640 364 C 730 360, 800 170, 880 105"
              fill="none"
              stroke="url(#wireframeFlightGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="14 10"
              className="animate-circuit-flow opacity-95"
            />
          </svg>

          {/* ===================================================================== */}
          {/* SPATIALLY ANCHORED DESTINATION CARDS (APPEAR ACCORDING TO WIREFRAME) */}
          {/* Cards never close, never replace, and remain anchored around destinations! */}
          {/* ===================================================================== */}
          {mapDestinationsData.map((dest, idx) => {
            const isUnlocked = idx <= unlockedMax;
            const isCurrent = activeDestination === idx;

            if (!isUnlocked) {
              // Sleek subtle radar waypoint silhouette when not unlocked yet
              return (
                <div
                  key={`pending-slot-${dest.id}`}
                  className="absolute z-10 pointer-events-none hidden sm:flex items-center gap-1.5 font-mono text-[9px] font-bold text-black/40 bg-white/40 px-2 py-1 rounded border border-dashed border-black/30"
                  style={{
                    left: dest.cardCoords.left,
                    top: dest.cardCoords.top,
                    width: dest.cardCoords.width,
                  }}
                >
                  <Lock className="w-3 h-3" />
                  <span>DESTINATION 0{dest.id} [{dest.callsign}] — AWAITING ARRIVAL</span>
                </div>
              );
            }

            return (
              <div
                key={`anchored-card-${dest.id}`}
                className={`absolute z-20 brutal-card p-3 sm:p-4 bg-white border-3 border-black rounded-xl text-left transition-all duration-300 animate-banner-unfold flex flex-col justify-between ${
                  isCurrent
                    ? "ring-4 ring-[#ef7618]/30 shadow-[8px_8px_0_#000] -translate-y-1"
                    : "shadow-[5px_5px_0_#000]"
                }`}
                style={{
                  left: dest.cardCoords.left,
                  top: dest.cardCoords.top,
                  width: dest.cardCoords.width,
                  minWidth: "250px",
                  maxWidth: "360px",
                }}
              >
                <div>
                  {/* Card Header Strip */}
                  <div className="flex items-center justify-between border-b-2 border-black/15 pb-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full border border-black ${dest.color}`} />
                      <span className="font-mono text-[10px] sm:text-xs font-black px-1.5 py-0.5 bg-black text-white rounded">
                        0{dest.id} {dest.callsign.split("-")[1]}
                      </span>
                      <span className="font-mono text-[9px] font-bold text-black/60 hidden sm:inline">
                        {dest.tag}
                      </span>
                    </div>

                    <span
                      className={`font-mono text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded border border-black ${
                        isCurrent
                          ? "bg-[#ef7618] text-black animate-pulse"
                          : "bg-emerald-100 text-emerald-900 border-emerald-500"
                      }`}
                    >
                      {isCurrent ? "● ACTIVE" : "LOGGED ✓"}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h4 className="font-display text-xs sm:text-sm uppercase font-black text-black leading-tight mb-1">
                    {dest.name}
                  </h4>

                  {/* Description */}
                  <p className="font-sans text-[10px] sm:text-[11px] text-black/85 leading-relaxed mb-2 line-clamp-3">
                    {dest.desc}
                  </p>

                  {/* Formula Pill */}
                  <div className="p-1.5 bg-black text-white rounded-lg font-mono text-[9px] sm:text-[10px] flex items-center justify-between gap-1 mb-2">
                    <span className="text-[#ef7618] font-bold truncate">{dest.formula}</span>
                    <span className="text-white/60 text-[8px] shrink-0">{dest.notation}</span>
                  </div>
                </div>

                {/* Key Metric Bottom Pill */}
                <div className="pt-2 border-t border-black/15 flex items-center justify-between font-mono text-[9px]">
                  <span className="text-black/70 font-bold truncate">{dest.metricLabel}</span>
                  <span className="font-black text-black bg-[#FAF7F2] px-1.5 py-0.5 rounded border border-black shrink-0">
                    {dest.keyMetric}
                  </span>
                </div>

                {/* Active Card Direct Next Destination Button */}
                {isCurrent && (
                  <button
                    onClick={handleNextDestination}
                    className="w-full mt-2.5 py-1.5 px-2.5 brutal-btn text-[10px] sm:text-[11px] font-mono font-black flex items-center justify-center gap-1.5 shadow-[2px_2px_0_#000] bg-[#ef7618] hover:bg-[#f38d38] text-black border-2 border-black rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>
                      {isMissionCompleted
                        ? `REPLAY PATROL → 0${nextTarget.id}`
                        : `FLY TO NEXT: 0${nextTarget.id} [${nextTarget.callsign.split("-")[1]}] →`}
                    </span>
                  </button>
                )}
              </div>
            );
          })}

          {/* ===================================================================== */}
          {/* THE 4 DESTINATION MARKERS (PLOTTED DIRECTLY ON THE PATH) */}
          {/* ===================================================================== */}
          {mapDestinationsData.map((dest, idx) => {
            const isCurrent = activeDestination === idx;
            const isUnlocked = idx <= unlockedMax;

            return (
              <div
                key={`point-${dest.id}`}
                className="absolute z-20 cursor-pointer"
                style={{
                  left: `${dest.pointCoords.x}%`,
                  top: `${dest.pointCoords.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => flyToDestination(idx)}
              >
                {/* Active Concentric Ping Rings */}
                {isCurrent && (
                  <>
                    <div
                      key={`ping-${scanPulse}`}
                      className="absolute -inset-4 rounded-full border-2 border-[#ef7618] animate-target-ping pointer-events-none"
                    />
                    <div className="absolute -inset-2 rounded-full border-2 border-black animate-dot-pulse-ring pointer-events-none" />
                  </>
                )}

                {/* Point Button Node */}
                <button
                  type="button"
                  aria-label={`Fly airplane to Destination 0${dest.id}: ${dest.name}`}
                  className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border-3 border-black flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? `${dest.color} scale-110 shadow-[0_0_0_3px_#000,4px_4px_0_3px_#000] -translate-y-1`
                      : isUnlocked
                      ? "bg-[#1283c8] text-white shadow-[3px_3px_0_#000] hover:scale-105"
                      : "bg-white text-black/70 shadow-[3px_3px_0_#000] hover:scale-105"
                  }`}
                >
                  {isCurrent ? (
                    <Crosshair className="w-6 h-6 stroke-[2.5] animate-spin" style={{ animationDuration: "8s" }} />
                  ) : isUnlocked ? (
                    <Check className="w-6 h-6 stroke-[3]" />
                  ) : (
                    <span className="font-mono text-xs sm:text-sm font-black">0{dest.id}</span>
                  )}

                  {/* Corner Mini Pip */}
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center font-mono text-[8px] font-black shadow-[1px_1px_0_#000] ${
                      isCurrent
                        ? "bg-black text-[#ef7618]"
                        : isUnlocked
                        ? "bg-black text-white"
                        : "bg-[#EAEFEF] text-black"
                    }`}
                  >
                    {dest.id}
                  </span>
                </button>

                {/* Station Label under marker */}
                <div className="mt-1 px-1.5 py-0.5 rounded bg-white border border-black font-mono text-[8px] sm:text-[9px] font-black uppercase text-center shadow-[1px_1px_0_#000] whitespace-nowrap">
                  {dest.callsign.split("-")[1]}
                </div>
              </div>
            );
          })}

          {/* ===================================================================== */}
          {/* THE ANIMATED AIRPLANE (TRAVELLING ALONG THE EXACT CONTINUOUS ROUTE) */}
          {/* ===================================================================== */}
          <div
            className="absolute z-30 pointer-events-none transition-all duration-850 ease-out flex flex-col items-center justify-center"
            style={{
              left: `${currentStation.pointCoords.x}%`,
              top: `${currentStation.pointCoords.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Downward Radar Scan Cone Projection */}
            <div className="absolute -bottom-16 w-28 h-20 pointer-events-none z-0 flex flex-col items-center">
              <div
                className="w-full h-full animate-radar-sweep-cone"
                style={{
                  background: `linear-gradient(to bottom, ${currentStation.accentHex}99 0%, ${currentStation.accentHex}20 75%, transparent 100%)`,
                  clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
                }}
              />
            </div>

            {/* Airplane SVG with Dynamic Heading */}
            <div
              className={`relative transition-transform duration-800 ease-out ${
                !isFlying ? "animate-aircraft-float" : ""
              }`}
              style={{ transform: `rotate(${airplaneHeading}deg)` }}
            >
              <svg
                width="82"
                height="74"
                viewBox="0 0 100 90"
                className="overflow-visible drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]"
              >
                {/* Twin Jet Afterburner Exhaust Flames */}
                <g className="animate-thruster-flame origin-top" transform="translate(41, 71)">
                  <polygon points="4,0 8,24 4,28 0,24" fill="#ef7618" opacity="0.9" filter="drop-shadow(0 0 6px #ef7618)" />
                  <polygon points="3,0 5,16 3,18 1,16" fill="#ffffff" opacity="0.95" />
                </g>
                <g className="animate-thruster-flame origin-top" transform="translate(51, 71)">
                  <polygon points="4,0 8,24 4,28 0,24" fill="#ef7618" opacity="0.9" filter="drop-shadow(0 0 6px #ef7618)" />
                  <polygon points="3,0 5,16 3,18 1,16" fill="#ffffff" opacity="0.95" />
                </g>

                {/* Swept Delta Wings */}
                <path
                  d="M 50 14 L 88 64 L 62 64 L 50 72 L 38 64 L 12 64 Z"
                  fill="#1e293b"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Orange Wing Accents */}
                <path d="M 24 64 L 12 64 L 28 42 Z" fill="#ef7618" stroke="#000000" strokeWidth="1.5" />
                <path d="M 76 64 L 88 64 L 72 42 Z" fill="#ef7618" stroke="#000000" strokeWidth="1.5" />

                {/* Navigation Lights */}
                <circle cx="13" cy="64" r="3.5" fill="#ef4444" className="animate-pulse" />
                <circle cx="87" cy="64" r="3.5" fill="#10b981" className="animate-pulse" />

                {/* Canards */}
                <path d="M 50 26 L 68 36 L 50 38 L 32 36 Z" fill="#334155" stroke="#000000" strokeWidth="2" />

                {/* Fuselage */}
                <path
                  d="M 50 4 L 57 28 L 56 68 L 50 74 L 44 68 L 43 28 Z"
                  fill="#0f172a"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Cockpit Canopy */}
                <path
                  d="M 50 12 Q 53 22 53 30 Q 50 32 47 30 Q 47 22 50 12 Z"
                  fill="#38bdf8"
                  stroke="#000000"
                  strokeWidth="1.5"
                />
                <path d="M 49 15 L 48 27" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />

                {/* Optical Nose Turret */}
                <circle cx="50" cy="8" r="3.5" fill="#ef7618" stroke="#000000" strokeWidth="1.5" />
                <circle cx="50" cy="8" r="1.5" fill="#ffffff" />

                {/* Tail Fins */}
                <path d="M 44 60 L 41 72 L 45 70 Z" fill="#475569" stroke="#000000" strokeWidth="1.5" />
                <path d="M 56 60 L 59 72 L 55 70 Z" fill="#475569" stroke="#000000" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Airborne Callsign Badge */}
            <div className="absolute -top-7 bg-black text-[#ef7618] px-2 py-0.5 rounded border border-[#ef7618] font-mono text-[8px] font-black uppercase whitespace-nowrap shadow-[2px_2px_0_#ef7618]">
              ✈ {currentStation.callsign}
            </div>
          </div>

        </div>

        {/* Map Bottom Telemetry Strip */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-black/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>ACTIVE STATION: <strong className="text-black uppercase">{currentStation.targetSite}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-black/60">ALT: {currentStation.altitude} | VEL: {currentStation.speed}</span>
            <span className="text-black/40">|</span>
            <button
              onClick={handleNextDestination}
              className="text-[#1283c8] font-black underline hover:text-[#ef7618] transition-colors cursor-pointer"
            >
              FLY TO 0{nextTarget.id} [{nextTarget.callsign.split("-")[1]}] →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
