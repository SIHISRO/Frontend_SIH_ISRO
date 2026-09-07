"use client";

import React, { useState, useEffect } from "react";
import { useLoadingMessages } from "@/hooks/useLoadingMessages";
import { soundController } from "@/utils/soundController";
import { Radar, Sparkles } from "lucide-react";

export interface LoadingOverlayProps {
  isVisible: boolean;
  customMessage?: string;
}

export function LoadingOverlay({ isVisible, customMessage }: LoadingOverlayProps) {
  const { currentMessage, currentIndex, allMessages } = useLoadingMessages(isVisible);
  const [rubOffset, setRubOffset] = useState(0);

  // Rubbing oscillation animation
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setRubOffset((prev) => (prev + 1) % 100);
    }, 25);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const rubX = Math.sin(rubOffset * 0.15) * 60; // sweeps left to right
  const rubAngle = Math.cos(rubOffset * 0.15) * 18;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Registration in progress"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs transition-all animate-in fade-in duration-200 p-4 select-none"
    >
      <div className="relative max-w-lg w-full brutal-card p-8 bg-[#EAEFEF] shadow-[8px_8px_0_0_#000000] flex flex-col items-center text-center overflow-hidden">
        
        {/* Eyebrow */}
        <div className="brutal-badge brutal-badge-orange mb-3 font-mono text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0_#000]">
          <span>ISRO CHANDRAYAAN-2 OPTICAL ALIGNMENT</span>
        </div>

        {/* BOLD LETTERS: PS SIH26166 */}
        <div className="relative my-2">
          <h2 className="font-display text-5xl sm:text-6xl uppercase font-black tracking-tight text-black leading-none drop-shadow-[3px_3px_0_#000000]">
            PS SIH<span className="text-[#FF9B51]">26166</span>
          </h2>

          {/* Animated Rubbing Eraser Prop */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none transition-transform duration-75 z-20"
            style={{
              transform: `translate(calc(-50% + ${rubX}px), -50%) rotate(${rubAngle}deg)`,
            }}
          >
            <div className="w-16 h-8 bg-[#FF9B51] border-2 border-black rounded shadow-[2px_2px_0_#000] flex overflow-hidden">
              <div className="w-2/3 h-full bg-[#FF9B51] flex items-center justify-center border-r border-black">
                <span className="text-[8px] font-mono font-black text-black uppercase">
                  RUB
                </span>
              </div>
              <div className="w-1/3 h-full bg-[#EAEFEF] flex items-center justify-center">
                <span className="text-[7px] font-mono font-bold text-black/60">
                  SIH
                </span>
              </div>
            </div>
            {/* Crumbs */}
            <div className="absolute -bottom-1 left-1/2 flex gap-1">
              <div className="w-1 h-1 rounded-full bg-[#FF9B51]" />
              <div className="w-1.5 h-1 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/* Dynamic status message */}
        <div className="mt-4 p-3 bg-white border-2 border-black rounded-lg w-full max-w-sm shadow-[2px_2px_0_#000]">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-black">
            <Radar className="w-4 h-4 text-[#FF9B51] animate-spin" />
            <span aria-live="polite">{customMessage || currentMessage}</span>
          </div>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2 mt-5">
          {allMessages.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full border border-black transition-all duration-300 ${
                idx === currentIndex
                  ? "w-8 bg-[#FF9B51] shadow-[1px_1px_0_#000]"
                  : idx < currentIndex
                  ? "w-2.5 bg-black"
                  : "w-2.5 bg-[#BFC9D1]"
              }`}
            />
          ))}
        </div>

        <p className="text-[11px] font-mono text-black/70 mt-4 leading-snug">
          LoFTR matches optical lunar surface features and estimates 3×3 projective homography.
        </p>

      </div>
    </div>
  );
}
