"use client";

import React, { useState, useEffect } from "react";
import { soundController } from "@/utils/soundController";
import { bgmController } from "@/utils/bgmController";
import { Sparkles, Orbit, ShieldCheck } from "lucide-react";

interface IntroRubLoaderProps {
  onComplete?: () => void;
}

export function IntroRubLoader({ onComplete }: IntroRubLoaderProps) {
  const [phase, setPhase] = useState<"appear" | "rubbing" | "revealing" | "done">("appear");
  const [rubProgress, setRubProgress] = useState(0);

  useEffect(() => {
    // Stage 1: Appear
    const t1 = setTimeout(() => {
      setPhase("rubbing");
      soundController.playPop();
    }, 500);

    // Stage 2: Rubbing animation progress
    let startTimestamp: number | null = null;
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / 1600, 1);
      setRubProgress(progress);

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setPhase("revealing");
        soundController.playSuccess();
        setTimeout(() => {
          setPhase("done");
          bgmController.play();
          if (onComplete) onComplete();
        }, 600);
      }
    };

    const t2 = setTimeout(() => {
      animFrame = requestAnimationFrame(step);
    }, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(animFrame);
    };
  }, [onComplete]);

  const handleSkip = () => {
    soundController.playPop();
    bgmController.play();
    setPhase("done");
    if (onComplete) onComplete();
  };

  if (phase === "done") return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#25343F] select-none transition-opacity duration-500 overflow-hidden cursor-pointer ${
        phase === "revealing" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#EAEFEF_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Banner */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono font-bold text-[#EAEFEF]">
        <div className="flex items-center gap-2 brutal-badge brutal-badge-orange">
          <Orbit className="w-3.5 h-3.5 animate-spin" />
          <span>ISRO CHANDRAYAAN-2 OPTICAL</span>
        </div>
        <button
          onClick={handleSkip}
          className="px-3 py-1 bg-[#EAEFEF] text-black border-2 border-black rounded shadow-[2px_2px_0_#000] hover:bg-[#FF9B51] transition-colors"
        >
          SKIP [CLICK / SPACE]
        </button>
      </div>

      {/* Center Rubbing Stage */}
      <div className="relative max-w-4xl w-full px-6 flex flex-col items-center text-center">
        
        {/* Eyebrow */}
        <div className="inline-block mb-3 px-3 py-1 bg-[#FF9B51] text-black font-mono text-xs sm:text-sm font-black border-2 border-black rounded shadow-[3px_3px_0_#000] tracking-widest uppercase">
          SMART INDIA HACKATHON 2026
        </div>

        {/* BOLD LETTERS: PS SIH26166 */}
        <div className="relative my-4">
          <h1 className="font-display text-6xl sm:text-8xl md:text-9xl uppercase font-black tracking-tight leading-none text-[#EAEFEF] select-none drop-shadow-[6px_6px_0_#000000]">
            PS SIH<span className="text-[#FF9B51]">26166</span>
          </h1>

          {/* Rub Stroke Mask / Revealer effect */}
          <div
            className="absolute inset-0 pointer-events-none border-b-6 border-[#FF9B51] transition-all duration-75"
            style={{
              clipPath: `inset(0 ${100 - rubProgress * 100}% 0 0)`,
              background: "linear-gradient(90deg, transparent 0%, rgba(255, 155, 81, 0.3) 100%)",
            }}
          />
        </div>

        {/* Tagline / Subtitle */}
        <div className="mt-4 flex items-center gap-2 font-mono text-xs sm:text-base font-bold text-[#BFC9D1]">
          <ShieldCheck className="w-4 h-4 text-[#FF9B51]" />
          <span>MULTI-MODAL LUNAR IMAGE CORRESPONDENCE ENGINE</span>
        </div>

        {/* Progress Bar & Rub Counter */}
        <div className="mt-8 max-w-xs w-full">
          <div className="w-full h-4 bg-[#EAEFEF] border-3 border-black rounded-full overflow-hidden p-0.5 shadow-[3px_3px_0_#000]">
            <div
              className="h-full bg-[#FF9B51] rounded-full transition-all duration-75 border border-black"
              style={{ width: `${Math.round(rubProgress * 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 font-mono text-[11px] font-bold text-[#EAEFEF]/80">
            <span>RUBBING REVEAL...</span>
            <span>{Math.round(rubProgress * 100)}%</span>
          </div>
        </div>

        {/* Animated Retro Eraser Prop that rubs across */}
        {phase === "rubbing" && (
          <div
            className="absolute pointer-events-none z-20 transition-transform duration-75"
            style={{
              left: `clamp(10%, ${rubProgress * 85}%, 85%)`,
              top: `${45 + Math.sin(rubProgress * 30) * 8}%`,
              transform: `translate(-50%, -50%) rotate(${Math.sin(rubProgress * 25) * 20}deg)`,
            }}
          >
            {/* The Eraser Block (Nodeck style) */}
            <div className="w-20 sm:w-28 h-10 sm:h-14 bg-[#FF9B51] border-3 border-black rounded-lg shadow-[4px_4px_0_#000] flex overflow-hidden">
              <div className="w-2/3 h-full bg-[#FF9B51] flex items-center justify-center border-r-2 border-black">
                <span className="text-[9px] sm:text-[10px] font-mono font-black text-black uppercase tracking-tighter">
                  ISRO RUB
                </span>
              </div>
              <div className="w-1/3 h-full bg-[#EAEFEF] flex items-center justify-center">
                <span className="text-[8px] font-mono font-bold text-black/60">
                  SIH
                </span>
              </div>
            </div>

            {/* Eraser Crumbs / Particles */}
            <div className="absolute -bottom-2 -left-2 flex gap-1 animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF9B51] border border-black" />
              <div className="w-1 h-1 rounded-full bg-[#EAEFEF] border border-black" />
              <div className="w-2 h-1 rounded-full bg-white border border-black" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
