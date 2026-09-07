"use client";

import React, { useEffect, useState, useRef } from "react";
import { soundController } from "@/utils/soundController";

interface SlideCurtainTransitionProps {
  isActive: boolean;
  targetSlideNumber: number; // 1-indexed (e.g. 1, 2, 3...)
  targetSlideTitle: string;  // e.g. "THE PROBLEM"
  onHoldStart?: () => void;  // Triggered when curtain is fully covering screen (safe to swap background slide)
  onComplete: () => void;    // Triggered when breakout finishes
}

type CurtainPhase = "idle" | "sliding-in" | "holding" | "breaking-out";

export function SlideCurtainTransition({
  isActive,
  targetSlideNumber,
  targetSlideTitle,
  onHoldStart,
  onComplete,
}: SlideCurtainTransitionProps) {
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    if (!isActive) {
      clearAllTimers();
      return;
    }

    clearAllTimers();
    // Phase 1: Slide up from bottom via RAF
    const animId = requestAnimationFrame(() => {
      setPhase("sliding-in");
      soundController.playSwoosh();
    });

    // After slide-in animation finishes (~380ms)
    const t1 = setTimeout(() => {
      setPhase("holding");
      onHoldStart?.();

      // Hold for 1 second (1000ms), then break out!
      const t2 = setTimeout(() => {
        setPhase("breaking-out");
        soundController.playPop();

        // Breakout animation completes (~420ms)
        const t3 = setTimeout(() => {
          setPhase("idle");
          onComplete();
        }, 420);
        timersRef.current.push(t3);
      }, 1000);
      timersRef.current.push(t2);
    }, 380);
    timersRef.current.push(t1);

    return () => {
      cancelAnimationFrame(animId);
      clearAllTimers();
    };
  }, [isActive, targetSlideNumber, onHoldStart, onComplete]);

  // Allow clicking to immediately trigger breakout if user doesn't want to wait full 1s
  const handleSkipHold = () => {
    if (phase === "holding") {
      clearAllTimers();
      setPhase("breaking-out");
      soundController.playPop();
      const t = setTimeout(() => {
        setPhase("idle");
        onComplete();
      }, 420);
      timersRef.current.push(t);
    }
  };

  if (phase === "idle" || !isActive) return null;

  return (
    <div
      onClick={handleSkipHold}
      className={`curtain-overlay cursor-pointer ${
        phase === "sliding-in"
          ? "curtain-slide-up"
          : phase === "breaking-out"
          ? "curtain-break-out"
          : ""
      }`}
      style={{
        backgroundColor: "#F4EBE1",
      }}
      aria-live="polite"
      role="status"
    >
      {/* Centered Content matching user screenshot */}
      <div className="flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto curtain-text-in">
        {/* Top small tracking tag: "SLIDE {N}" */}
        <span className="text-xs sm:text-sm md:text-base font-sans font-bold uppercase tracking-[0.25em] text-black/75 mb-3 sm:mb-4 select-none">
          SLIDE {targetSlideNumber}
        </span>

        {/* Large bold black title: "THE PROBLEM", "COSMIC VISION", etc. */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase tracking-tight text-black leading-none select-none">
          {targetSlideTitle}
        </h1>

        {/* Subtle touch/click hint during 1s hold */}
        {phase === "holding" && (
          <span className="mt-8 text-[11px] font-mono font-medium text-black/40 uppercase tracking-wider animate-pulse select-none">
            Hold 1s · Click to reveal immediately
          </span>
        )}
      </div>
    </div>
  );
}
