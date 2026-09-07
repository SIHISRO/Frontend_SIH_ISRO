"use client";

import React from "react";
import { soundController } from "@/utils/soundController";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  FileText,
  LayoutGrid,
} from "lucide-react";

interface DeckStatusBarProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectSlide: (index: number) => void;
  onToggleNotes: () => void;
  onToggleGrid: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  slideTitles: string[];
}

export function DeckStatusBar({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSelectSlide,
  onToggleNotes,
  onToggleGrid,
  isMuted,
  onToggleMute,
  slideTitles,
}: DeckStatusBarProps) {
  const currentTitle = slideTitles[currentSlide] || "SLIDE";

  return (
    <div className="statusbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Side: Slide Number & Notes Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="brutal-badge brutal-badge-orange py-1.5 px-3 border-2 border-black font-mono font-bold text-xs tracking-wider">
            <span>{String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}</span>
            <span className="hidden md:inline-block border-l-2 border-black pl-2 ml-1 text-[11px] font-sans">
              {currentTitle}
            </span>
          </div>

          <button
            onClick={() => {
              soundController.playClick();
              onToggleNotes();
            }}
            className="brutal-btn-white py-1.5 px-3 text-xs flex items-center gap-1.5 hover:bg-[#BFC9D1]"
            title="Toggle Mission Field Notes (Shortcut: N)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="font-bold">NOTES</span>
            <kbd className="hidden md:inline px-1 py-0.5 bg-black/10 rounded text-[9px]">N</kbd>
          </button>
        </div>

        {/* Center: Tactile Navigation Pill */}
        <div className="brutal-card-white py-1.5 px-2 sm:px-3 flex items-center gap-1.5 sm:gap-2 shadow-[4px_4px_0_0_#000000]">
          <button
            onClick={() => {
              soundController.playClick();
              onPrev();
            }}
            disabled={currentSlide === 0}
            className="brutal-btn py-1 px-2 sm:px-3 text-xs flex items-center gap-1 disabled:opacity-40"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline font-black">PREV</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundController.playPop();
                  onSelectSlide(idx);
                }}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-black transition-all ${
                  idx === currentSlide
                    ? "bg-[#ef7618] scale-125 shadow-[1px_1px_0_#000]"
                    : "bg-[#EAEFEF] hover:bg-[#BFC9D1]"
                }`}
                title={`Go to slide ${idx + 1}: ${slideTitles[idx]}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              soundController.playClick();
              onNext();
            }}
            disabled={currentSlide === totalSlides - 1}
            className="brutal-btn py-1 px-2 sm:px-3 text-xs flex items-center gap-1 disabled:opacity-40"
            aria-label="Next Slide"
          >
            <span className="hidden sm:inline font-black">NEXT</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Right Side: Sound Toggle & Grid Drawer */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Audio Toggle (Start audio / Mute audio) */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className={`brutal-btn-round w-9 h-9 sm:w-10 sm:h-10 transition-all ${
              isMuted
                ? "bg-white text-black/60 hover:bg-[#EAEFEF]"
                : "bg-[#ef7618] text-black shadow-[2px_2px_0_#000]"
            }`}
            title={isMuted ? "Start audio (Shortcut: M)" : "Mute audio (Shortcut: M)"}
            aria-label={isMuted ? "Start audio" : "Mute audio"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-black" />
            )}
          </button>

          <button
            onClick={() => {
              soundController.playClick();
              onToggleGrid();
            }}
            className="brutal-btn-white py-1.5 px-3 text-xs flex items-center gap-1.5"
            title="View All Slides Grid (Shortcut: G)"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="font-bold">GRID</span>
            <kbd className="hidden md:inline px-1 py-0.5 bg-black/10 rounded text-[9px]">G</kbd>
          </button>
        </div>

      </div>
    </div>
  );
}
