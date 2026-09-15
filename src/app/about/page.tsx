"use client";

import React from "react";
import Link from "next/link";
import { soundController } from "@/utils/soundController";
import {
  Orbit,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const payloads = [
    {
      name: "OHRC",
      fullName: "Orbiter High Resolution Camera",
      resolution: "0.25 m spatial resolution",
      altitude: "~100 km orbit",
      role: "High-resolution optical mapping for landing site hazard detection and surface topography.",
      spectral: "Panchromatic (0.45 - 0.70 µm)",
      color: "bg-[#ef7618] text-black",
    },
    {
      name: "TMC-2",
      fullName: "Terrain Mapping Camera-2",
      resolution: "5 m spatial resolution",
      altitude: "~100 km orbit",
      role: "Stereo triplets (fore, nadir, aft) for generating high-accuracy 3D digital elevation models (DEM) of the Moon.",
      spectral: "Panchromatic (0.50 - 0.85 µm)",
      color: "bg-[#1283c8] text-white",
    },
    {
      name: "IIRS",
      fullName: "Imaging Infrared Spectrometer",
      resolution: "~80 m spatial resolution",
      altitude: "~100 km orbit",
      role: "Hyperspectral imaging from 0.8 to 5.0 µm for mineralogical mapping and lunar water ice detection.",
      spectral: "Short-wave to mid-wave infrared",
      color: "bg-white",
    },
    {
      name: "LRO NAC",
      fullName: "Lunar Reconnaissance Orbiter (NASA)",
      resolution: "0.5 m to 2.0 m",
      altitude: "Variable elliptical orbit",
      role: "Primary global reference baseline dataset for geo-referencing and photometric validation.",
      spectral: "Panchromatic",
      color: "bg-[#D3DCCD]",
    },
  ];

  const pipelineSteps = [
    {
      step: "01",
      title: "Contrast Equalization & Normalization",
      desc: "Images are scaled and pre-processed to enhance shadow crater rims and level sensor-specific dynamic range.",
    },
    {
      step: "02",
      title: "Lunar Feature Backbone Extraction",
      desc: "Multi-scale CNN extracts coarse and fine feature maps from Chandrayaan-2 and reference images.",
    },
    {
      step: "03",
      title: "Local Feature Transformer (Self/Cross Attention)",
      desc: "Interleaved self-attention and cross-attention transform features by conditioning both images on each other's global context.",
    },
    {
      step: "04",
      title: "Coarse Match Probability Matrix",
      desc: "Dual-softmax operator calculates mutual nearest neighbor match probabilities, filtering out low-confidence ambiguities.",
    },
    {
      step: "05",
      title: "Sub-Pixel Fine Correspondence Refinement",
      desc: "Feature patches around coarse candidates are cropped at 1/2 resolution to regress exact sub-pixel coordinates.",
    },
    {
      step: "06",
      title: "RANSAC Homography & Warp Generation",
      desc: "Geometric RANSAC estimates the robust 3×3 projective homography matrix, producing the rectified source and 50/50 overlay.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="brutal-badge brutal-badge-orange mb-4 font-mono font-bold text-xs tracking-widest shadow-[3px_3px_0_#000]">
          <Orbit className="w-4 h-4" />
          <span>ISRO · DEPARTMENT OF SPACE · SIH 2026 // PS SIH26166</span>
        </div>

        <h1 className="font-display text-3xl sm:text-6xl uppercase font-black tracking-tight text-black mb-4">
          Mission & Technology
        </h1>
        <p className="font-sans text-xs sm:text-base text-black/80 font-medium leading-relaxed max-w-2xl mx-auto">
          Solving the lunar correspondence problem across Sun angle variations and extreme scale shifts using Chandrayaan-2 payloads and detector-free Local Feature Transformers.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            onClick={() => soundController.playPop()}
            className="brutal-btn py-2 sm:py-2.5 px-4 sm:px-5 text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <span>OPEN SLIDE DECK</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Problem Statement Details Card */}
      <div className="brutal-card p-4 sm:p-8 bg-[#1283c8] text-white shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000]">
        <div className="flex items-center gap-2 border-b-2 sm:border-b-3 border-black pb-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-white stroke-[2.5]" />
          <h2 className="font-display text-lg sm:text-2xl uppercase font-black text-white">
            Official Problem Statement SIH26166
          </h2>
        </div>

        <blockquote className="bg-white p-4 border-2 border-black rounded-lg text-xs sm:text-sm font-sans font-medium text-black leading-relaxed mb-4 shadow-[2px_2px_0_#000]">
          &ldquo;Generic software solution for finding correspondence between Chandrayaan-2 acquired optical images and Lunar reference images with sub-pixel accuracy of source image maintaining uniform distribution across the images.&rdquo;
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono font-bold">
          <div className="p-3 bg-[#ef7618] text-black border-2 border-black rounded-lg">
            <span className="block text-black/70 text-[10px]">THEME</span>
            <span className="text-black">Space Technology</span>
          </div>
          <div className="p-3 bg-white text-black border-2 border-black rounded-lg">
            <span className="block text-black/60 text-[10px]">ORGANIZATION</span>
            <span className="text-black">ISRO / Dept. of Space</span>
          </div>
          <div className="p-3 bg-[#ef7618] text-black border-2 border-black rounded-lg">
            <span className="block text-black/70 text-[10px]">CATEGORY</span>
            <span className="text-black">Software & Deep Learning</span>
          </div>
        </div>
      </div>

      {/* CosmicYaan Solution Paradigm Card */}
      <div className="brutal-card p-4 sm:p-8 bg-[#FAF7F2] border-3 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000]">
        <div className="flex items-center justify-between border-b-2 sm:border-b-3 border-black pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#ef7618] text-black font-display font-black text-xs sm:text-sm uppercase rounded border border-black shadow-[2px_2px_0_#000]">
              COSMICYAAN SOLUTION
            </span>
            <span className="font-mono text-xs font-bold text-black/70">
              Deep Learning vs. Conventional SIFT
            </span>
          </div>
          <span className="px-2 py-0.5 bg-[#1283c8] text-white font-mono text-xs font-black rounded border border-black hidden sm:inline-block">
            SIH26166 ARCHITECTURE
          </span>
        </div>

        <p className="font-sans text-sm sm:text-base text-black/90 font-medium leading-relaxed mb-6">
          <strong>CosmicYaan</strong> takes two images of the same lunar region. The source can be a Chandrayaan-2 optical image (OHRC, TMC-2 or IIRS), while the reference can be a corresponding lunar image from LRO NAC or SELENE. The two images are given to a fine-tuned deep-learning correspondence model trained on lunar imagery. The model directly predicts corresponding point pairs between the source and reference images. This replaces the conventional SIFT-based correspondence stage, which can struggle with the appearance changes found in lunar imagery. The model is fine-tuned on lunar image data so that it can learn correspondences specific to the target domain. The predicted points are then passed to RANSAC to reject incorrect matches and retain geometrically consistent inliers. These reliable correspondences are used for homography estimation, after which the source image is warped and overlaid with the reference image to obtain the registered result.
        </p>

        {/* 4 Feasibility & Impact highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono font-bold">
          <div className="p-3 bg-white border-2 border-black rounded-lg">
            <span className="text-[#ef7618] block text-[11px]">01 // REGISTERED IMAGERY</span>
            <span className="text-black/80 font-sans font-medium text-xs">Aligned multi-source optical datasets with sub-pixel precision.</span>
          </div>
          <div className="p-3 bg-white border-2 border-black rounded-lg">
            <span className="text-[#1283c8] block text-[11px]">02 // BETTER MAPPING</span>
            <span className="text-black/80 font-sans font-medium text-xs">Consistent, detailed maps enabling reliable data comparison.</span>
          </div>
          <div className="p-3 bg-white border-2 border-black rounded-lg">
            <span className="text-[#ef7618] block text-[11px]">03 // BETTER ANALYSIS</span>
            <span className="text-black/80 font-sans font-medium text-xs">Automated correspondence reducing manual effort for scientists.</span>
          </div>
          <div className="p-3 bg-white border-2 border-black rounded-lg">
            <span className="text-[#1283c8] block text-[11px]">04 // MISSION SUPPORT</span>
            <span className="text-black/80 font-sans font-medium text-xs">Direct support for Chandrayaan-2 and future lunar landing missions.</span>
          </div>
        </div>
      </div>

      {/* Optical Payloads Grid */}
      <div>
        <div className="mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/60">
            HARDWARE COMPATIBILITY
          </span>
          <h2 className="font-display text-2xl sm:text-3xl uppercase font-black text-black">
            Chandrayaan-2 Optical Payloads
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payloads.map((payload) => (
            <div
              key={payload.name}
              className="brutal-card p-5 bg-white shadow-[4px_4px_0_#000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b-2 border-black/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 font-display font-black text-xs border border-black rounded ${payload.color}`}>
                      {payload.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-black">{payload.fullName}</span>
                  </div>
                  <span className="font-mono text-xs font-black text-black bg-[#ef7618]/20 px-1.5 py-0.5 border border-black rounded">
                    {payload.resolution}
                  </span>
                </div>

                <p className="text-xs font-sans text-black/80 font-medium leading-relaxed mb-3">
                  {payload.role}
                </p>
              </div>

              <div className="pt-2 border-t-2 border-dashed border-black/20 text-[11px] font-mono text-black/70 flex justify-between">
                <span>Spectral: {payload.spectral}</span>
                <span>{payload.altitude}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6-Step Pipeline Architecture */}
      <div>
        <div className="mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/60">
            ML SPECIFICATION
          </span>
          <h2 className="font-display text-2xl sm:text-3xl uppercase font-black text-black">
            6-Step LoFTR Registration Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineSteps.map((step) => (
            <div
              key={step.step}
              className="brutal-card p-4 bg-[#F3E6D6] shadow-[4px_4px_0_#000] flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-black px-2 py-0.5 bg-[#ef7618] text-black border border-black rounded inline-block mb-2">
                  PHASE {step.step}
                </span>
                <h3 className="font-display text-sm uppercase font-black text-black mb-1.5">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-black/80 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Portals Box */}
      <div className="brutal-card p-6 bg-white shadow-[6px_6px_0_#000]">
        <h3 className="font-display text-lg uppercase font-black text-black mb-4">
          External Lunar Portals & Ground Truth
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono font-bold">
          <a
            href="https://chmapbrowse.issdc.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F3E6D6] border-2 border-black rounded-lg flex items-center justify-between hover:bg-[#ef7618] transition-colors"
          >
            <span>ISSDC Chandrayaan-2 Browse</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://lroc.im-ldi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#F3E6D6] border-2 border-black rounded-lg flex items-center justify-between hover:bg-[#1283c8] hover:text-white transition-colors"
          >
            <span>NASA LROC Image Catalog</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
