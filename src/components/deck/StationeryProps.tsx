"use client";

import React, { useState } from "react";
import { soundController } from "@/utils/soundController";
import { X, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";

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
            Tip: On <strong>Slide 04 (Studio)</strong>, click <em>&ldquo;Load Sample Chandrayaan-2 Pair&rdquo;</em> to run instant sub-pixel LoFTR homography without searching for files!
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
      className={`rubber-stamp cursor-default hover:scale-105 transition-transform ${className}`}
      onClick={() => soundController.playPop()}
    >
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-black stroke-[3]" />
        <span>{text}</span>
      </div>
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
      className={`cursor-pointer transition-all duration-300 select-none ${
        active ? "rotate-45 scale-110" : "rotate-12 hover:rotate-6"
      }`}
    >
      <div className="w-10 sm:w-14 h-32 sm:h-40 relative filter drop-shadow-[4px_4px_0_#000000]">
        {/* Cap / Tip */}
        <div className="w-full h-8 bg-[#FF9B51] border-3 border-black rounded-t-lg relative">
          <div className="absolute top-1 left-2 right-2 h-2 bg-black/15 rounded-sm" />
        </div>
        {/* Body */}
        <div className="w-full h-24 sm:h-28 bg-[#EAEFEF] border-3 border-t-0 border-black flex flex-col justify-center items-center">
          <div className="w-2.5 h-full bg-[#FF9B51] border-x-2 border-black" />
          <span className="absolute text-[8px] sm:text-[9px] font-mono font-bold tracking-widest uppercase rotate-90 text-black">
            LUNAR-LoFTR
          </span>
        </div>
        {/* Base */}
        <div className="w-full h-4 bg-[#25343F] border-3 border-black rounded-b-md" />
      </div>
    </div>
  );
}
