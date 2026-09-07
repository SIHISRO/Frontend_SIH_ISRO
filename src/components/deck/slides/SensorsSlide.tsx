"use client";

import React, { useState } from "react";
import { soundController } from "@/utils/soundController";
import {
  Camera,
  Eye,
  Disc,
  Satellite,
  ArrowRight,
  Check,
  Layers,
  Scale,
  Sun,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface SensorsSlideProps {
  onGoToStudio: () => void;
}

export function SensorsSlide({ onGoToStudio }: SensorsSlideProps) {
  const [activeSensor, setActiveSensor] = useState<number>(0);

  const sensors = [
    {
      id: "OHRC",
      name: "Orbiter High Resolution Camera",
      mission: "Chandrayaan-2 Primary Optical",
      resolution: "0.25 m / pixel (from 100 km orbit)",
      swath: "12 km × 3 km swath strip",
      wavelength: "0.45 – 0.68 µm (Panchromatic)",
      role: "Moving Source Frame",
      highlight: "Highest resolution lunar imagery ever flown.",
      desc: "Captures minute boulders, crater rims, and lander landing hazards with unparalleled sub-meter spatial precision.",
      color: "bg-[#ef7618] text-black",
      icon: Camera,
      ratio: "0.5× to Reference",
      invariance: "Sub-meter boulder & rim geometry",
    },
    {
      id: "TMC-2",
      name: "Terrain Mapping Camera-2",
      mission: "Chandrayaan-2 Stereo Topography",
      resolution: "5 m / pixel ground sampling",
      swath: "20 km swath with triplets (Fore, Nadir, Aft)",
      wavelength: "0.5 – 0.85 µm (Visible/NIR)",
      role: "Moving Source Frame",
      highlight: "Generates high-fidelity 3D digital elevation models.",
      desc: "Stereo triplets capture elevation variations across impact craters, rilles, and lunar central peaks for 3D terrain reconstruction.",
      color: "bg-[#1283c8] text-white",
      icon: Eye,
      ratio: "10× Scale Gap to OHRC",
      invariance: "Stereo parallax & elevation robustness",
    },
    {
      id: "IIRS",
      name: "Imaging Infrared Spectrometer",
      mission: "Chandrayaan-2 Hyperspectral",
      resolution: "80 m / pixel spatial sampling",
      swath: "256 contiguous spectral bands",
      wavelength: "0.8 – 5.0 µm (Short/Mid-IR)",
      role: "Moving Source Frame",
      highlight: "Mapped hydroxyl (OH/H2O) across the south pole.",
      desc: "Detects mineral absorption features (pyroxene, olivine, plagioclase) and surface water-ice signatures under variable thermal regimes.",
      color: "bg-[#BFC9D1]",
      icon: Disc,
      ratio: "160× Scale Gap to LRO",
      invariance: "Cross-spectral morphological rims",
    },
    {
      id: "LRO-NAC",
      name: "LRO Narrow Angle Camera",
      mission: "NASA Lunar Reconnaissance Orbiter",
      resolution: "0.5 m / pixel global baseline",
      swath: "Sub-meter calibrated polar map base",
      wavelength: "Panchromatic calibrated reference",
      role: "Fixed Reference Target",
      highlight: "The gold standard lunar reference frame.",
      desc: "Provides the fixed ground truth coordinate grid against which Chandrayaan-2 images are registered and projective homography is solved.",
      color: "bg-[#EAEFEF]",
      icon: Satellite,
      ratio: "1.0× Fixed Coordinate Baseline",
      invariance: "Canonical selenographic map grid",
    },
  ];

  const crossModalStrategies = [
    {
      icon: Scale,
      title: "Scale Ratio Normalization (0.5× to 160×)",
      desc: "ResNet-FPN feature pyramid combined with coarse-to-fine windowing bridges large ground sampling disparities between OHRC, TMC-2, and IIRS without aliasing.",
    },
    {
      icon: Sun,
      title: "Spectral & Illumination Translation",
      desc: "Translates panchromatic visible light into infrared reflectance by aligning structural rim gradients rather than relying on raw intensity levels.",
    },
    {
      icon: Layers,
      title: "Projective Homography Calibration",
      desc: "RANSAC-verified correspondences solve the 3×3 matrix H, locking moving orbital swaths to LRO NAC reference grids with < 0.50 px geometric RMSE.",
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        
        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-5xl uppercase font-black tracking-tight text-black mb-2">
          Multi-Modal Sensor Suite
        </h2>
        <p className="font-mono text-xs sm:text-sm font-bold text-black/75 uppercase mb-6 tracking-wide">
          Chandrayaan-2 Optical Payloads ↔ NASA LRO NAC Reference Baseline
        </p>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {sensors.map((sensor, idx) => (
            <button
              key={sensor.id}
              onClick={() => {
                soundController.playPop();
                setActiveSensor(idx);
              }}
              className={`font-mono text-xs sm:text-sm font-bold uppercase py-2 px-4 rounded-lg border-3 border-black transition-all ${
                activeSensor === idx
                  ? "bg-[#ef7618] text-black shadow-[4px_4px_0_#000000] -translate-y-1"
                  : "bg-white hover:bg-[#BFC9D1]/30 shadow-[2px_2px_0_#000000]"
              }`}
            >
              {sensor.id}
            </button>
          ))}
        </div>

        {/* Active Sensor Display Card */}
        {(() => {
          const s = sensors[activeSensor];
          const Icon = s.icon;
          return (
            <div className="brutal-card p-6 sm:p-7 text-left relative max-w-5xl mx-auto mb-6 shadow-[6px_6px_0_0_#000000] border-3 border-black rounded-2xl bg-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-5">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl border-3 border-black flex items-center justify-center ${s.color} shadow-[3px_3px_0_#000]`}>
                    <Icon className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-2xl sm:text-3xl uppercase font-black text-black">
                        {s.id}
                      </h3>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 border border-black rounded bg-white">
                        {s.role}
                      </span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-black/75 font-semibold">
                      {s.name} · {s.mission}
                    </p>
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs font-mono font-bold block text-black/60 uppercase">Spatial Resolution</span>
                  <span className="font-mono text-sm sm:text-base font-black text-black bg-[#ef7618] px-2.5 py-1 border border-black rounded shadow-[2px_2px_0_#000] inline-block">
                    {s.resolution}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
                <div className="p-3.5 bg-[#FAF7F2] border-2 border-black rounded-lg">
                  <span className="text-[10px] font-mono uppercase font-bold text-black/60 block mb-0.5">Swath Coverage</span>
                  <span className="font-sans text-xs sm:text-sm font-black text-black">{s.swath}</span>
                </div>
                <div className="p-3.5 bg-[#FAF7F2] border-2 border-black rounded-lg">
                  <span className="text-[10px] font-mono uppercase font-bold text-black/60 block mb-0.5">Spectral Range</span>
                  <span className="font-sans text-xs sm:text-sm font-black text-black">{s.wavelength}</span>
                </div>
                <div className="p-3.5 bg-[#FAF7F2] border-2 border-black rounded-lg">
                  <span className="text-[10px] font-mono uppercase font-bold text-black/60 block mb-0.5">Scale Ratio / Target</span>
                  <span className="font-sans text-xs sm:text-sm font-black text-[#1283c8]">{s.ratio}</span>
                </div>
              </div>

              {/* Highlight callout */}
              <div className="p-4 bg-[#ef7618]/15 border-2 border-black rounded-lg mb-5 flex items-start gap-3">
                <Check className="w-5 h-5 text-black stroke-[3] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-display text-xs sm:text-sm uppercase text-black block mb-0.5">
                    {s.highlight}
                  </strong>
                  <p className="text-xs font-sans text-black/80 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Launch Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    soundController.playPop();
                    onGoToStudio();
                  }}
                  className="brutal-btn py-2 px-5 text-xs sm:text-sm flex items-center gap-2 shadow-[3px_3px_0_#000]"
                >
                  <span>REGISTER {s.id} IN STUDIO</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })()}

        {/* --- NEW FILLED SECTION: CROSS-MISSION DATASET REGISTRATION MATRIX --- */}
        <div className="brutal-card p-6 sm:p-7 bg-[#FAF7F2] border-3 border-black shadow-[6px_6px_0_#000] rounded-2xl max-w-5xl mx-auto mb-6 text-left">
          <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm uppercase px-2.5 py-0.5 bg-[#ef7618] text-black border border-black rounded shadow-[2px_2px_0_#000]">
                CROSS-MISSION DATASET MATRIX
              </span>
              <span className="font-mono text-xs font-bold text-black hidden sm:inline-block">
                Chandrayaan-2 (ISRO) ↔ LRO NAC & SELENE Reference Frames
              </span>
            </div>
            <span className="font-mono text-[10px] font-black px-2 py-0.5 bg-white border border-black rounded">
              SIH26166 COMPLIANT
            </span>
          </div>

          {/* 3 Strategy Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crossModalStrategies.map((strat, idx) => {
              const StratIcon = strat.icon;
              return (
                <div key={idx} className="p-4 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0_#000]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded bg-[#1283c8] text-white border border-black flex items-center justify-center">
                      <StratIcon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <h4 className="font-display font-black text-xs uppercase text-black leading-tight">
                      {strat.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-black/80 font-medium leading-relaxed">
                    {strat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Multi-Resolution Ground Scale Visual Bar */}
          <div className="mt-5 p-3.5 bg-white border-2 border-black rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold text-black">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef7618] border border-black" />
              <span>OHRC: 0.25m/px</span>
            </div>
            <span className="text-black/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black" />
              <span>LRO NAC: 0.5m/px (Baseline)</span>
            </div>
            <span className="text-black/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1283c8] border border-black" />
              <span>TMC-2: 5m/px (Stereo)</span>
            </div>
            <span className="text-black/30 hidden sm:inline">|</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500 border border-black" />
              <span>IIRS: 80m/px (Infrared)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
