"use client";

import React from "react";
import {
  Layers,
  Map,
  BarChart3,
  Rocket,
  Compass,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { soundController } from "@/utils/soundController";

interface ImpactSlideProps {
  onGoToStudio: () => void;
}

export function ImpactSlide({ onGoToStudio }: ImpactSlideProps) {
  const pillars = [
    {
      num: "01",
      titleOrange: "Registered Lunar",
      titleBlue: "Imagery",
      subHeadline: "Aligned multi source images",
      detailTitleOrange: "Accurate Lunar",
      detailTitleBlue: "Mapping",
      description:
        "Provides geometrically aligned lunar imagery, enabling precise terrain mapping and feature localization.",
      icon: Layers,
      accentBg: "bg-[#ef7618]/10",
      iconColor: "text-[#ef7618]",
    },
    {
      num: "02",
      titleOrange: "Better",
      titleBlue: "Mapping",
      subHeadline: "Consistent and detailed maps",
      detailTitleOrange: "Reliable Data",
      detailTitleBlue: "Comparison",
      description:
        "Allows consistent comparison of images from different times, sensors, and viewpoints for change detection.",
      icon: Map,
      accentBg: "bg-[#1283c8]/10",
      iconColor: "text-[#1283c8]",
    },
    {
      num: "03",
      titleOrange: "Better",
      titleBlue: "Analysis",
      subHeadline: "Accurate change and terrain study",
      detailTitleOrange: "Faster",
      detailTitleBlue: "Analysis",
      description:
        "Automates correspondence estimation and registration, reducing manual effort and enabling quicker scientific insights.",
      icon: BarChart3,
      accentBg: "bg-[#ef7618]/10",
      iconColor: "text-[#ef7618]",
    },
    {
      num: "04",
      titleOrange: "Mission",
      titleBlue: "Support",
      subHeadline: "Enabling future lunar missions",
      detailTitleOrange: "Future Mission",
      detailTitleBlue: "Support",
      description:
        "Generates accurate, analysis-ready datasets to support Chandrayaan-2 and future lunar exploration missions.",
      icon: Rocket,
      accentBg: "bg-[#1283c8]/10",
      iconColor: "text-[#1283c8]",
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        
        {/* Main Title Banner matching user PPT */}
        <h2 className="font-display text-3xl sm:text-5xl uppercase font-black tracking-tight text-black mb-1">
          <span className="text-[#ef7618] border-b-4 border-[#ef7618] pb-0.5">Impact</span>
          <span className="text-black mx-2">&</span>
          <span className="text-[#1283c8] border-b-4 border-[#1283c8] pb-0.5">Analysis</span>
        </h2>

        {/* Brand Subtitle: CosmicYaan */}
        <div className="my-4 flex items-center justify-center gap-3">
          <span className="font-display text-2xl sm:text-3xl font-black tracking-wider uppercase">
            <span className="text-[#ef7618]">Cosmic</span>
            <span className="text-[#1283c8]">Yaan</span>
          </span>
          <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-white rounded">
            OPERATIONAL IMPACT
          </span>
        </div>

        {/* 4 Outcome Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-6">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.num}
                className="brutal-card p-5 bg-[#FAF7F2] shadow-[5px_5px_0_#000] border-3 border-black rounded-xl flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b-2 border-black/15 pb-2.5 mb-3">
                    <span className="font-mono text-xs font-black px-2 py-0.5 bg-white border border-black rounded text-black">
                      PILLAR {p.num}
                    </span>
                    <div className={`p-1.5 rounded-lg border border-black ${p.accentBg}`}>
                      <IconComponent className={`w-4 h-4 ${p.iconColor} stroke-[2.5]`} />
                    </div>
                  </div>

                  {/* Top Header */}
                  <h3 className="font-display font-black text-base uppercase leading-tight mb-1">
                    <span className="text-[#ef7618]">{p.titleOrange}</span>{" "}
                    <span className="text-[#1283c8]">{p.titleBlue}</span>
                  </h3>
                  <p className="font-mono text-xs font-bold text-black/70 italic mb-4">
                    {p.subHeadline}
                  </p>

                  {/* Detailed Description */}
                  <div className="pt-3 border-t-2 border-dashed border-black/20">
                    <h4 className="font-display text-xs font-black uppercase mb-1.5">
                      <span className="text-[#ef7618]">{p.detailTitleOrange}</span>{" "}
                      <span className="text-[#1283c8]">{p.detailTitleBlue}</span>
                    </h4>
                    <p className="font-sans text-xs text-black/85 font-medium leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Verification Indicator */}
                <div className="mt-4 pt-2.5 border-t border-black/10 flex items-center gap-1.5 text-[11px] font-mono font-bold text-black/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1283c8]" />
                  <span>Sub-pixel accuracy</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA & Mission Alignment Strip */}
        <div className="brutal-card p-4 bg-white border-2 border-black shadow-[4px_4px_0_#000] flex flex-wrap items-center justify-between gap-4 text-left max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef7618] border-2 border-black flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm uppercase text-black">
                Ready for Chandrayaan-2 & Lunar Science Operations
              </h4>
              <p className="font-sans text-xs text-black/70 font-medium">
                Direct point prediction replaces fragile SIFT matching, enabling automated pipelines.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundController.playPop();
              onGoToStudio();
            }}
            className="brutal-btn-navy text-xs font-display font-black py-2.5 px-4 shadow-[3px_3px_0_#000] hover:shadow-[1px_1px_0_#000] shrink-0"
          >
            <span>TRY IN LAB</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </div>
  );
}
