"use client";

import React, { useState } from "react";
import { soundController } from "@/utils/soundController";
import { X, Sparkles, ShieldCheck } from "lucide-react";

interface StickyNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StickyNotesModal({ isOpen, onClose }: StickyNoteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="sticky-note max-w-md w-full p-6 text-black rounded-lg relative"
        style={{ transform: "rotate(-1deg)" }}
      >
        <button
          onClick={() => {
            soundController.playClick();
            onClose();
          }}
          className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold hover:scale-110 active:scale-95 transition-transform"
          aria-label="Close notes"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3 border-b-2 border-black/20 pb-2">
          <Sparkles className="w-5 h-5 text-black" />
          <h3 className="font-display text-lg uppercase tracking-wider font-extrabold">
            Mission Field Notes
          </h3>
        </div>

        <div className="space-y-3 text-xs sm:text-sm font-sans leading-relaxed text-black/90">
          <p>
            <strong>Problem Statement SIH26166:</strong> Chandrayaan-2 lunar optical images (OHRC, TMC-2, IIRS) suffer severe illumination shifts and altitude scaling differences.
          </p>
          <div className="p-2.5 bg-white/70 border-2 border-black rounded-md font-mono text-xs">
            <span className="font-bold text-black uppercase">Deck Shortcuts:</span>
            <ul className="mt-1 list-disc list-inside space-y-0.5">
              <li><kbd className="px-1 bg-black text-white rounded text-[10px]">←</kbd> / <kbd className="px-1 bg-black text-white rounded text-[10px]">→</kbd> : Navigate slides</li>
              <li><kbd className="px-1 bg-black text-white rounded text-[10px]">G</kbd> : View all slides grid</li>
              <li><kbd className="px-1 bg-black text-white rounded text-[10px]">N</kbd> : Toggle field notes</li>
            </ul>
          </div>
          <p className="text-xs text-black/75">
            Tip: On <strong>Slide 05 (Registration Lab)</strong>, click <em>&ldquo;Load Sample Chandrayaan-2 Pair&rdquo;</em> to run instant sub-pixel LoFTR homography without searching for files!
          </p>
        </div>

        <div className="mt-4 pt-3 border-t-2 border-dashed border-black/30 flex justify-between items-center text-[11px] font-mono text-black/70">
          <span>ISRO Space Applications Centre</span>
          <span className="font-bold">CONFIDENTIAL // SIH26166</span>
        </div>
      </div>
    </div>
  );
}

export function StampBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#EAEFEF] border-[2.5px] sm:border-[3px] border-dashed border-black rounded-xl shadow-[4px_4px_0_#000000] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 select-none ${className}`}
      onClick={() => soundController.playPop()}
      title="ISRO Problem Statement SIH26166"
    >
      <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-black stroke-[2.5]" />
      <span className="font-display font-black text-xs sm:text-sm tracking-wide text-black uppercase">
        {text}
      </span>
    </div>
  );
}

export function FloatingHighlighter() {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => {
        soundController.playPop();
        setActive(!active);
      }}
      title="Click highlighter pen!"
      className={`cursor-pointer transition-all duration-300 select-none filter drop-shadow-[5px_5px_0_#000000] ${
        active ? "rotate-45 scale-110" : "rotate-[15deg] hover:rotate-[8deg] active:scale-95"
      }`}
    >
      <div className="w-12 sm:w-15 flex flex-col items-center">
        {/* Cap / Tip */}
        <div className="w-full h-8 sm:h-9 bg-[#ef7618] border-[3.5px] border-black rounded-t-xl relative flex justify-center items-start pt-1.5">
          <div className="w-7 sm:w-9 h-2 bg-[#c85a06] border border-black/20 rounded-full" />
        </div>
        {/* Body */}
        <div className="w-full h-24 sm:h-28 bg-white border-x-[3.5px] border-black relative flex justify-center items-center">
          <div className="w-3 sm:w-3.5 h-full bg-[#ef7618] border-x-2 border-black" />
          <span className="absolute font-mono font-black text-[8px] sm:text-[9.5px] tracking-[0.2em] uppercase rotate-90 text-black whitespace-nowrap">
            LUNAR-LoFTR
          </span>
        </div>
        {/* Base */}
        <div className="w-full h-4 sm:h-5 bg-[#1283c8] border-[3.5px] border-t-0 border-black rounded-b-lg" />
      </div>
    </div>
  );
}
