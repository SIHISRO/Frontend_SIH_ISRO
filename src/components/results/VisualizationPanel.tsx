"use client";

import React from "react";
import { Download, Maximize2, Image as ImageIcon } from "lucide-react";
import { downloadBase64Image } from "@/utils/imageUtils";

export interface VisualizationPanelProps {
  title: string;
  caption: string;
  src: string;
  filename: string;
  altText: string;
  badge?: string;
  onExpand: () => void;
  className?: string;
}

export function VisualizationPanel({
  title,
  caption,
  src,
  filename,
  altText,
  badge,
  onExpand,
  className = "",
}: VisualizationPanelProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!src) return;
    downloadBase64Image(src, filename);
  };

  return (
    <div
      className={`group rounded-2xl glass-panel-elevated border border-[#BFC9D1]/25 overflow-hidden flex flex-col transition-all duration-200 hover:border-[#FF9B51]/60 hover:shadow-xl hover:shadow-[#FF9B51]/10 ${className}`}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#BFC9D1]/15 bg-[#25343F]/90">
        <div className="flex items-center gap-2 min-w-0">
          {badge && (
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-[#FF9B51]/20 text-[#FF9B51] border border-[#FF9B51]/30 flex-shrink-0">
              {badge}
            </span>
          )}
          <h3 className="text-sm font-bold text-[#EAEFEF] truncate tracking-wide">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={onExpand}
            aria-label={`Expand ${title}`}
            className="p-1.5 rounded-lg text-[#BFC9D1] hover:text-[#EAEFEF] hover:bg-[#384d5d]/60 border border-transparent hover:border-[#BFC9D1]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9B51]"
            title="Full screen view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label={`Download ${filename}`}
            className="p-1.5 rounded-lg text-[#FF9B51] hover:text-[#ffaa69] hover:bg-[#FF9B51]/15 border border-transparent hover:border-[#FF9B51]/40 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF9B51]"
            title="Download image"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Preview Container */}
      <div
        onClick={onExpand}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onExpand();
          }
        }}
        aria-label={`Click to expand ${title}`}
        className="relative w-full aspect-video bg-[#151d24] flex items-center justify-center overflow-hidden cursor-zoom-in group/img focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF9B51]"
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={altText}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-102"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#BFC9D1]/50 p-6 text-center">
            <ImageIcon className="w-8 h-8 mb-2" />
            <span className="text-xs font-mono">Visualization not generated</span>
          </div>
        )}

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#151d24]/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-lg bg-[#25343F]/90 border border-[#FF9B51]/40 text-xs text-[#EAEFEF] font-mono shadow-lg flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-[#FF9B51]" />
            Click to expand
          </span>
        </div>
      </div>

      {/* Caption footer */}
      <div className="p-3.5 bg-[#202d38]/60 flex-1 border-t border-[#BFC9D1]/10 flex flex-col justify-between">
        <p className="text-xs text-[#BFC9D1] leading-relaxed">
          {caption}
        </p>
      </div>
    </div>
  );
}
