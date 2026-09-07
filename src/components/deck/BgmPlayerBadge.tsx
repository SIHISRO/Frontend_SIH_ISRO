"use client";

import React, { useEffect, useState } from "react";
import { bgmController } from "@/utils/bgmController";
import { soundController } from "@/utils/soundController";
import { Music, Disc3, VolumeX } from "lucide-react";

interface BgmPlayerBadgeProps {
  compact?: boolean;
}

export function BgmPlayerBadge({ compact = false }: BgmPlayerBadgeProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = bgmController.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    soundController.playClick();
    bgmController.toggle();
  };

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        className={`brutal-btn-round w-9 h-9 sm:w-10 sm:h-10 transition-all ${
          isPlaying
            ? "bg-[#FF9B51] border-3 border-black shadow-[2px_2px_0_#000]"
            : "bg-[#EAEFEF] border-3 border-black text-black/60"
        }`}
        title={
          isPlaying
            ? "Pause BGM: meditativetiger-retro-color-moon"
            : "Play BGM: meditativetiger-retro-color-moon"
        }
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <Disc3 className="w-4 h-4 text-black animate-spin [animation-duration:3s]" />
        ) : (
          <Music className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`brutal-badge py-1 px-2.5 sm:px-3 flex items-center gap-2 transition-all cursor-pointer select-none ${
        isPlaying
          ? "bg-[#FF9B51] text-black border-2 border-black shadow-[2px_2px_0_#000]"
          : "bg-[#EAEFEF] text-black/80 hover:bg-white border-2 border-black"
      }`}
      title={
        isPlaying
          ? "Pause BGM: meditativetiger-retro-color-moon"
          : "Play BGM: meditativetiger-retro-color-moon"
      }
    >
      {isPlaying ? (
        <Disc3 className="w-3.5 h-3.5 text-black animate-spin [animation-duration:3s]" />
      ) : (
        <Music className="w-3.5 h-3.5 text-black" />
      )}

      {/* Mini Equalizer Bars */}
      <div className="flex items-end gap-0.5 h-3.5 w-3.5">
        <span
          className={`w-1 rounded-sm bg-black transition-all ${
            isPlaying ? "animate-pulse h-3" : "h-1 opacity-50"
          }`}
        />
        <span
          className={`w-1 rounded-sm bg-black transition-all ${
            isPlaying ? "animate-pulse h-2 [animation-delay:150ms]" : "h-1.5 opacity-50"
          }`}
        />
        <span
          className={`w-1 rounded-sm bg-black transition-all ${
            isPlaying ? "animate-pulse h-3.5 [animation-delay:300ms]" : "h-1 opacity-50"
          }`}
        />
      </div>

      <span className="font-mono text-[11px] font-black uppercase tracking-tight">
        {isPlaying ? "RETRO MOON BGM" : "PLAY BGM"}
      </span>
    </button>
  );
}
