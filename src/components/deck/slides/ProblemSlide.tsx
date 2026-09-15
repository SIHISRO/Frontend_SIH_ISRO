"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
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
  ChevronLeft,
  ChevronRight,
  ArrowDown,
} from "lucide-react";

interface ProblemSlideProps {
  onNext: () => void;
}

export function ProblemSlide({ onNext }: ProblemSlideProps) {
  // Center card (CARD 3, index 2) is focused by default
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const activeIndexRef = useRef<number>(2);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const headingFloatRef = useRef<HTMLDivElement>(null);

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

  // Calculate slot offset relative to activeIndex in range [-2, 2]
  const getSlot = (index: number, active: number) => {
    let diff = (index - active) % 5;
    if (diff > 2) diff -= 5;
    if (diff < -2) diff += 5;
    return diff;
  };

  // Compute position, scale, tilt, opacity and depth along the upper semi-circle arc
  const getCardTransform = (slot: number, containerWidth: number) => {
    const isMobile = containerWidth < 640;
    const isTablet = containerWidth >= 640 && containerWidth < 1024;

    let xRadius = 380;
    let yRadius = 85;
    let baseScale = 1.05;
    let scaleDrop = 0.13;
    let maxRotate = 8;

    if (isMobile) {
      xRadius = Math.min(containerWidth * 0.34, 120);
      yRadius = 40;
      baseScale = 0.96;
      scaleDrop = 0.12;
      maxRotate = 4;
    } else if (isTablet) {
      xRadius = Math.min(containerWidth * 0.40, 260);
      yRadius = 70;
      baseScale = 1.03;
      scaleDrop = 0.12;
      maxRotate = 7;
    } else {
      xRadius = Math.min(containerWidth * 0.42, 380);
      yRadius = 85;
    }

    const t = slot / 2; // -1, -0.5, 0, 0.5, 1
    const absT = Math.abs(t);

    // Upper semi-circle curve: peak is at center (y = 0), outer cards drop down (+y)
    const x = t * xRadius;
    const y = t * t * yRadius;
    const scale = baseScale - absT * scaleDrop * 2;
    const rotation = t * maxRotate;
    const opacity = slot === 0 ? 1.0 : Math.max(0.68, 1.0 - absT * 0.36);
    const zIndex = 30 - Math.abs(slot) * 10;

    return { x, y, scale, rotation, opacity, zIndex };
  };

  const animateCards = (newActive: number, oldActive: number) => {
    const containerW = containerRef.current?.offsetWidth || 900;

    whyCosmicYaanPoints.forEach((_, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;

      const oldSlot = getSlot(idx, oldActive);
      const newSlot = getSlot(idx, newActive);
      const target = getCardTransform(newSlot, containerW);

      // Instantly elevate zIndex if moving closer to center
      if (Math.abs(newSlot) < Math.abs(oldSlot)) {
        gsap.set(cardEl, { zIndex: target.zIndex });
      }

      // Check if wrapping around back of axis (e.g. slot 2 -> -2 or -2 -> 2)
      const isWrapping = Math.abs(newSlot - oldSlot) > 2;

      if (isWrapping) {
        const exitDirection = oldSlot > 0 ? 1 : -1;
        const enterDirection = -exitDirection;
        const exitX = exitDirection * (Math.abs(target.x) > 0 ? Math.abs(target.x) * 1.15 : 420);
        const enterX = enterDirection * (Math.abs(target.x) > 0 ? Math.abs(target.x) * 1.15 : 420);

        const tl = gsap.timeline();
        tl.to(cardEl, {
          x: exitX,
          y: target.y + 35,
          scale: 0.65,
          opacity: 0,
          rotation: exitDirection * 12,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(cardEl, {
              x: enterX,
              y: target.y + 35,
              scale: 0.65,
              opacity: 0,
              rotation: enterDirection * 12,
              zIndex: target.zIndex,
            });
          },
        });
        tl.to(cardEl, {
          x: target.x,
          y: target.y,
          scale: target.scale,
          opacity: target.opacity,
          rotation: target.rotation,
          duration: 0.28,
          ease: "back.out(1.15)",
        });
      } else {
        gsap.to(cardEl, {
          x: target.x,
          y: target.y,
          scale: target.scale,
          rotation: target.rotation,
          opacity: target.opacity,
          duration: 0.45,
          ease: "back.out(1.15)",
          onComplete: () => {
            gsap.set(cardEl, { zIndex: target.zIndex });
          },
        });
      }
    });
  };

  const positionCardsImmediately = () => {
    const containerW = containerRef.current?.offsetWidth || 900;
    const active = activeIndexRef.current;

    whyCosmicYaanPoints.forEach((_, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;
      const slot = getSlot(idx, active);
      const target = getCardTransform(slot, containerW);

      gsap.set(cardEl, {
        x: target.x,
        y: target.y,
        scale: target.scale,
        rotation: target.rotation,
        opacity: target.opacity,
        zIndex: target.zIndex,
      });
    });
  };

  const goToCard = useCallback((targetIndex: number) => {
    const prev = activeIndexRef.current;
    if (targetIndex === prev) return;

    soundController.playPop();
    const nextIdx = ((targetIndex % 5) + 5) % 5;
    activeIndexRef.current = nextIdx;
    setActiveIndex(nextIdx);
    animateCards(nextIdx, prev);
  }, []);

  const handleNext = useCallback(() => {
    goToCard(activeIndexRef.current + 1);
  }, [goToCard]);

  const handlePrev = useCallback(() => {
    goToCard(activeIndexRef.current - 1);
  }, [goToCard]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    pointerStartRef.current = null;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    positionCardsImmediately();
    const timer = setTimeout(() => {
      positionCardsImmediately();
    }, 40);

    const handleResize = () => {
      positionCardsImmediately();
    };

    window.addEventListener("resize", handleResize);

    // Subtle entrance animation + continuous floating pulse for WHY COSMICYAAN heading
    let floatTween: gsap.core.Tween | null = null;
    if (headingFloatRef.current) {
      gsap.fromTo(
        headingFloatRef.current,
        { opacity: 0, y: 22, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          delay: 0.15,
          onComplete: () => {
            if (headingFloatRef.current) {
              floatTween = gsap.to(headingFloatRef.current, {
                y: -4,
                duration: 2.3,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
          },
        }
      );
    }

    return () => {
      clearTimeout(timer);
      floatTween?.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        
        {/* Big Headline with Angled Neo-Brutalist Badges */}
        <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl uppercase font-black tracking-tight leading-[1.14] text-black mb-6 sm:mb-8">
          Every orbit, sun angles shift by 45°, crater shadows{" "}
          <span className="bg-white text-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border-2 sm:border-3 border-black inline-block -rotate-2 sm:-rotate-3 shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] hover:rotate-0 transition-transform select-none">
            invert 180°,
          </span>{" "}
          and scale scales 10×.{" "}
          <span className="bg-[#1283c8] text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md inline-block mt-2 border-2 sm:border-3 border-black shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] -rotate-1 sm:-rotate-1.5 hover:rotate-0 transition-transform select-none">
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

        {/* ========================================================================= */}
        {/* --- UNMISSABLE FOCAL HEADER: WHY COSMICYAAN? --- */}
        {/* ========================================================================= */}
        <div className="mt-14 sm:mt-18 mb-6 sm:mb-8 text-center flex flex-col items-center">
          
          {/* Top Overline Kicker Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="px-3 py-1 bg-black text-white font-mono text-[11px] font-black uppercase rounded-lg border-2 border-black shadow-[2px_2px_0_#000] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ef7618] animate-pulse" />
              <span>SIH26166 SOLUTION ARCHITECTURE</span>
            </span>
            <span className="px-3 py-1 bg-white text-black font-mono text-[11px] font-black uppercase rounded-lg border-2 border-black shadow-[2px_2px_0_#000]">
              PLANETARY CORRESPONDENCE ENGINE
            </span>
          </div>

          {/* Monumental Hero Heading with subtle float & hover lift */}
          <div ref={headingFloatRef} className="my-1 w-full flex justify-center">
            <div className="group inline-flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3.5 bg-white px-3.5 xs:px-6 sm:px-10 py-2.5 xs:py-3.5 sm:py-5 rounded-xl sm:rounded-3xl border-3 sm:border-4 border-black shadow-[5px_5px_0_#000] sm:shadow-[9px_9px_0_#000] hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[11px_11px_0_#000] transition-all duration-200 cursor-default select-none">
              <span className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black">
                WHY
              </span>
              <span className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white bg-[#1283c8] px-2 xs:px-3 sm:px-4 py-0.5 sm:py-1 rounded-lg sm:rounded-2xl border-2 sm:border-3 border-black shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] group-hover:bg-[#1696e5] transition-colors">
                COSMIC
              </span>
              <span className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black bg-[#ef7618] px-2 xs:px-3 sm:px-4 py-0.5 sm:py-1 rounded-lg sm:rounded-2xl border-2 sm:border-3 border-black shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] group-hover:bg-[#f38d38] transition-colors">
                YAAN?
              </span>
            </div>
          </div>

          {/* Subtitle explaining why our solution is better */}
          <p className="font-mono text-xs sm:text-sm font-bold text-black uppercase tracking-wide max-w-2xl mx-auto mt-3.5 mb-1 px-4">
            The 5 core architectural pillars explaining why our detector-free, cross-modal transformer outperforms classical vision
          </p>

          {/* Animated bouncing arrow indicator pointing toward section content */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-6 h-6 rounded-full bg-white border-2 border-black shadow-[2px_2px_0_#000] flex items-center justify-center animate-bounce text-[#ef7618]">
              <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black/80 bg-white/90 px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0_#000]">
              EXPLORE 5 SOLUTION PILLARS
            </span>
            <span className="w-6 h-6 rounded-full bg-white border-2 border-black shadow-[2px_2px_0_#000] flex items-center justify-center animate-bounce text-[#1283c8]">
              <ArrowDown className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>
        </div>

        {/* --- 5-PILLAR REVOLVING ARCHITECTURE MATRIX CARD --- */}
        <div className="brutal-card p-4 xs:p-6 sm:p-7 bg-[#FAF7F2] border-3 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] rounded-2xl mb-8 text-left">
          
          {/* Header row with status badge & synchronized carousel controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-4 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1 bg-[#1283c8] text-white font-display font-black text-xs sm:text-sm uppercase rounded-lg border-2 border-black shadow-[2px_2px_0_#000] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ef7618] border border-black animate-pulse" />
                <span>5-PILLAR ARCHITECTURE MATRIX</span>
              </div>
              <span className="font-mono text-xs font-bold text-black uppercase tracking-wider hidden sm:inline-block">
                Interactive Semi-Circle Arc
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="font-mono text-[11px] font-black px-2.5 py-1 bg-[#ef7618] text-black rounded border border-black shadow-[2px_2px_0_#000] hidden md:inline-block">
                REPLACES SIFT / ORB PIPELINES
              </span>

              {/* Synchronized Carousel PREV / NEXT Controls */}
              <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
                <button
                  onClick={handlePrev}
                  className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] text-black font-mono text-xs font-black uppercase rounded-lg border-2 border-black shadow-[2px_2px_0_#000] flex items-center gap-1 active:translate-y-0.5 cursor-pointer transition-all"
                  aria-label="Previous card in carousel"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
                  <span>PREV</span>
                </button>
                <span className="font-mono text-xs font-black px-2.5 py-1 bg-white rounded-lg border-2 border-black text-black shadow-[1px_1px_0_#000]">
                  0{activeIndex + 1} / 05
                </span>
                <button
                  onClick={handleNext}
                  className="px-2.5 py-1 bg-[#ef7618] hover:bg-[#f38d38] text-black font-mono text-xs font-black uppercase rounded-lg border-2 border-black shadow-[2px_2px_0_#000] flex items-center gap-1 active:translate-y-0.5 cursor-pointer transition-all"
                  aria-label="Next card in carousel"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>

          {/* --- DYNAMIC SEMI-CIRCLE CAROUSEL STAGE --- */}
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative w-full h-[330px] sm:h-[350px] md:h-[370px] flex items-center justify-center select-none my-2 overflow-hidden sm:overflow-visible touch-pan-y"
          >
            {/* Background semi-circle dashed orbital guide arc */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-25"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
            >
              <path
                d="M 60 260 Q 500 40 940 260"
                fill="none"
                stroke="#000000"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
            </svg>

            {/* Stage Flanking Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous card"
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#ef7618] hover:text-black border-2 sm:border-3 border-black shadow-[3px_3px_0_#000] flex items-center justify-center transition-all hover:scale-105 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[3] text-black" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next card"
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#ef7618] hover:text-black border-2 sm:border-3 border-black shadow-[3px_3px_0_#000] flex items-center justify-center transition-all hover:scale-105 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[3] text-black" />
            </button>

            {/* The 5 Cards revolving along the semi-circle */}
            {whyCosmicYaanPoints.map((item, idx) => {
              const IconComp = item.icon;
              const isCenter = activeIndex === idx;

              return (
                <div
                  key={idx}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => goToCard(idx)}
                  className={`absolute left-1/2 top-4 -translate-x-1/2 w-[195px] xs:w-[220px] sm:w-[245px] md:w-[260px] min-h-[200px] sm:min-h-[220px] p-3 sm:p-4 bg-white rounded-xl transition-shadow flex flex-col justify-between cursor-pointer ${
                    isCenter
                      ? "border-3 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] ring-2 ring-[#ef7618]/60"
                      : "border-2 border-black shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] hover:shadow-[4px_4px_0_#000]"
                  }`}
                  style={{
                    transformOrigin: "50% 120%",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Focus pill badge on center card */}
                  {isCenter && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black text-[#ef7618] font-mono text-[9px] font-black uppercase rounded shadow-[1px_1px_0_#ef7618] flex items-center gap-1 z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ef7618] animate-pulse" />
                      <span>PRIMARY FOCUS</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center ${item.color} shadow-[2px_2px_0_#000]`}>
                        <IconComp className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span
                        className={`text-[9px] font-mono font-black uppercase px-1.5 py-0.5 border border-black rounded ${
                          isCenter ? "bg-[#ef7618] text-black" : "bg-[#EAEFEF] text-black"
                        }`}
                      >
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
                        <span
                          key={sIdx}
                          className="text-[9px] font-mono font-bold bg-[#EAEFEF] px-1 rounded border border-black/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick-select Pillar Dots / Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-5">
            {whyCosmicYaanPoints.map((item, idx) => {
              const isCenter = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToCard(idx)}
                  className={`font-mono text-[10px] sm:text-xs font-bold uppercase py-1 px-2.5 sm:px-3 rounded-lg border-2 border-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCenter
                      ? "bg-[#ef7618] text-black shadow-[2px_2px_0_#000] -translate-y-0.5 font-black"
                      : "bg-white text-black/75 hover:bg-[#FAF7F2] hover:text-black shadow-[1px_1px_0_#000]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full border border-black ${isCenter ? "bg-black" : item.color}`} />
                  <span>{item.badge}</span>
                </button>
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
