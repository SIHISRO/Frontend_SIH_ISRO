"use client";

import React, { useEffect, useRef } from "react";
import { X, Download } from "lucide-react";
import { downloadBase64Image } from "@/utils/imageUtils";

export interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  title: string;
  altText: string;
  filename?: string;
  caption?: string;
}

export function ImageLightbox({
  isOpen,
  onClose,
  src,
  title,
  altText,
  filename = "lunar_registration.jpg",
  caption,
}: ImageLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={containerRef}
        className="relative max-w-6xl w-full max-h-[92vh] flex flex-col glass-panel-elevated rounded-2xl border border-[#BFC9D1]/30 overflow-hidden shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#BFC9D1]/20 bg-[#0b2545]/95">
          <h3 className="text-base sm:text-lg font-bold text-[#EAEFEF] truncate">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => downloadBase64Image(src, filename)}
              aria-label="Download high resolution output"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#ef7618] bg-[#ef7618]/15 hover:bg-[#ef7618]/25 border border-[#ef7618]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ef7618]"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close full-screen image view"
              className="p-2.5 rounded-lg text-[#BFC9D1] hover:text-[#EAEFEF] hover:bg-[#1283c8]/30 border border-transparent hover:border-[#BFC9D1]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#ef7618]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="relative flex-1 bg-[#121920] p-4 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={altText}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Caption footer */}
        {caption && (
          <div className="px-6 py-3 border-t border-[#BFC9D1]/15 bg-[#202d38]/80 text-xs text-[#BFC9D1]">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
