"use client";

import React from "react";
import { soundController } from "@/utils/soundController";
import { X, Sparkles, ArrowRight } from "lucide-react";

interface DeckNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSelectSlide: (index: number) => void;
  slideData: Array<{
    title: string;
    subtitle: string;
    tag: string;
    color: string;
  }>;
}

export function DeckNavDrawer({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide,
  slideData,
}: DeckNavDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="brutal-card max-w-4xl w-full p-6 sm:p-8 bg-[#EAEFEF] max-h-[90vh] overflow-y-auto relative shadow-[8px_8px_0_0_#000000]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-3 border-black pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef7618] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl uppercase font-black tracking-tight text-black">
                Mission Slide Deck Map
              </h2>
              <p className="text-xs sm:text-sm font-sans text-black/70 font-medium">
                Jump directly to any section of the ISRO SIH26166 correspondence platform.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundController.playClick();
              onClose();
            }}
            className="brutal-btn-round w-10 h-10 hover:bg-[#ef7618]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {slideData.map((item, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  soundController.playPop();
                  onSelectSlide(idx);
                  onClose();
                }}
                className={`text-left p-4 sm:p-5 rounded-xl border-3 border-black transition-all group flex flex-col justify-between h-44 ${
                  isActive
                    ? "bg-[#ef7618] shadow-[6px_6px_0_#000000] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white hover:bg-[#BFC9D1]/30 shadow-[3px_3px_0_#000000] hover:shadow-[5px_5px_0_#000000] hover:-translate-y-0.5"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-white rounded">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 border border-black rounded-full bg-[#BFC9D1]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-black uppercase text-black line-clamp-1 mt-1">
                    {item.title}
                  </h3>

                  <p className="text-xs font-sans text-black/75 line-clamp-2 mt-1.5 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t-2 border-black/10 flex items-center justify-between text-xs font-bold font-mono">
                  <span>{isActive ? "ACTIVE SLIDE" : "CLICK TO VIEW"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-black/30 flex flex-col sm:flex-row items-center justify-between text-xs text-black/60 font-mono gap-2">
          <span>Keyboard: Use [←] and [→] arrow keys anytime to transition.</span>
          <span className="font-bold">PRESS [ESC] OR [G] TO CLOSE</span>
        </div>

      </div>
    </div>
  );
}
