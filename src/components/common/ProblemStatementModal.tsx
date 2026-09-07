"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X, ExternalLink, ShieldCheck, Database, Building2 } from "lucide-react";
import { soundController } from "@/utils/soundController";

interface ProblemStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProblemStatementModal({ isOpen, onClose }: ProblemStatementModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    soundController.playClick();
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm transition-opacity duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Apple App Opening Animated Container */}
      <div
        className={`relative w-full max-w-5xl bg-white rounded-2xl border-3 border-black shadow-[10px_10px_0_#000000] overflow-hidden flex flex-col max-h-[92vh] ${
          isClosing ? "animate-apple-close" : "animate-apple-open"
        }`}
      >
        {/* Top Header Strip with SIH 2026 Logo & Title */}
        <div className="p-4 sm:p-6 border-b-2 border-black/15 bg-[#FAF7F2] flex items-center justify-between relative shrink-0">
          
          {/* SIH Logo & Header */}
          <div className="flex items-center gap-4">
            {/* SIH 2026 Badge Icon */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center p-1 shadow-[2px_2px_0_#000]">
                {/* Circuit Brain Lightbulb Icon */}
                <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                  <path
                    d="M24 4C15.163 4 8 11.163 8 20C8 25.5 11.5 30.5 16 33.5V38C16 39.1 16.9 40 18 40H30C31.1 40 32 39.1 32 38V33.5C36.5 30.5 40 25.5 40 20C40 11.163 32.837 4 24 4Z"
                    fill="#ef7618"
                    fillOpacity="0.15"
                    stroke="#000"
                    strokeWidth="2.5"
                  />
                  <path d="M18 40H30M20 44H28" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M20 20L24 16L28 20M24 16V28" stroke="#ef7618" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="16" cy="20" r="2" fill="#1283c8" />
                  <circle cx="32" cy="20" r="2" fill="#1283c8" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="font-display font-black text-[11px] tracking-wider text-[#ef7618] block uppercase">
                  SMART INDIA
                </span>
                <span className="font-display font-black text-xs tracking-tight text-[#1283c8] block uppercase">
                  HACKATHON 2026
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-black/20 hidden sm:block" />

            <div className="hidden sm:block">
              <span className="font-mono text-[10px] font-bold text-black/60 uppercase block">
                MINISTRY OF EDUCATION & ISRO
              </span>
              <span className="font-mono text-xs font-black text-black">
                PROBLEM STATEMENT DETAILS
              </span>
            </div>
          </div>

          {/* User's Distinctive Orange Cross Closing Button (Top Right) */}
          <button
            onClick={handleClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ef7618] hover:bg-[#f38d38] active:scale-95 border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0_#000] hover:shadow-[1px_1px_0_#000] transition-all cursor-pointer group"
            aria-label="Close Problem Statement Details Modal"
            title="Close (Esc)"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] text-white group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Section Heading matching the user's screenshot */}
        <div className="px-4 sm:px-6 pt-4 pb-2 bg-white">
          <h2 className="font-display text-lg sm:text-xl font-black uppercase text-[#1283c8] tracking-tight">
            PROBLEM STATEMENT DETAILS
          </h2>
        </div>

        {/* Table Body Content matching user screenshot */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-0 text-xs sm:text-sm">
          <div className="border-2 border-black/25 rounded-lg overflow-hidden divide-y-2 divide-black/15 font-sans">
            
            {/* Row 1: Problem Statement ID */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Problem Statement ID
              </div>
              <div className="sm:col-span-9 p-3.5 font-mono font-black text-black text-sm sm:text-base flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#1283c8] text-white rounded border border-black shadow-[2px_2px_0_#000]">
                  26166
                </span>
                <span className="text-xs font-mono font-bold text-black/60">
                  {"// PS SIH26166"}
                </span>
              </div>
            </div>

            {/* Row 2: Problem Statement Title */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Problem Statement Title
              </div>
              <div className="sm:col-span-9 p-3.5 font-sans font-bold text-black text-xs sm:text-sm leading-relaxed">
                Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical images (OHRC, TMC and IIRS)
              </div>
            </div>

            {/* Row 3: Description with inner scrollbar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Description
              </div>
              <div className="sm:col-span-9 p-3.5 text-black/90 font-sans leading-relaxed space-y-3.5 max-h-72 overflow-y-auto pr-2 text-xs sm:text-sm">
                <p>
                  Background Image Registration is the process of aligning two or more images of the same scene taken at different times, from different viewpoints, or by different sensors into a common coordinate system.
                </p>

                <div className="p-3 bg-[#FAF7F2] rounded-lg border border-black/20 space-y-1.5 font-medium text-xs">
                  <span className="font-bold text-black block uppercase font-mono text-[11px] text-[#ef7618]">
                    It has two main components:
                  </span>
                  <p className="leading-relaxed">
                    • <strong>Source Image (Moving):</strong> The image that is to be geometrically transformed to align with the reference image.
                  </p>
                  <p className="leading-relaxed">
                    • <strong>Reference Image (Fixed):</strong> The target image about which source image is to be geometrically transformed.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-black">
                    The process of lunar images registration involves finding match points between source and reference image and then aligning the source image with the reference image. The key challenges involved in this process are as follows:
                  </p>
                  <ul className="space-y-1.5 text-xs text-black/85 pl-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#ef7618] font-black">•</span>
                      <span>
                        <strong>Illumination variation:</strong> Illumination variation refers to changes in sun azimuth and elevation effect on the surface lighting conditions that affect the appearance of the lunar surface features which is hard to correlate.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#1283c8] font-black">•</span>
                      <span>
                        <strong>Viewpoint variation:</strong> It refers to geometric distortions caused by different camera positions/orientations capturing the same scene. Objects appear shifted, scaled, rotated, or perspective-distorted depending on observing angle.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#ef7618] font-black">•</span>
                      <span>
                        <strong>Scale Variation:</strong> Lunar imaging missions operate at vastly different altitudes and at different spatial resolutions. This creates scale ratios.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-3 bg-[#1283c8]/10 rounded-lg border-2 border-[#1283c8]/30 space-y-1.5 text-xs">
                  <span className="font-bold text-[#1283c8] block uppercase font-mono text-[11px]">
                    Expected Solution
                  </span>
                  <p className="font-medium leading-relaxed">
                    Generic software solution for finding correspondence between Chandrayaan-2 acquired optical images and Lunar reference images with a sub-pixel accuracy of source image maintaining uniform distribution across the images.
                  </p>
                  <ul className="list-disc list-inside space-y-0.5 text-black/80 font-medium pt-1">
                    <li>Software and registered product with corresponding match points.</li>
                    <li>Evaluation metric (eg. RMSE, inlier match count, inlier ratio, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Row 4: Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Organization
              </div>
              <div className="sm:col-span-9 p-3.5 font-sans font-bold text-black flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#ef7618]" />
                <span>Indian Space Research Organisation (ISRO)</span>
              </div>
            </div>

            {/* Row 5: Department */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Department
              </div>
              <div className="sm:col-span-9 p-3.5 font-sans font-medium text-black/90">
                Department of Space / Indian Space Research Organisation
              </div>
            </div>

            {/* Row 6: Category */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Category
              </div>
              <div className="sm:col-span-9 p-3.5 font-mono font-bold text-black">
                <span className="px-2 py-0.5 rounded bg-[#ef7618]/15 border border-black/30">
                  Software
                </span>
              </div>
            </div>

            {/* Row 7: Theme */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Theme
              </div>
              <div className="sm:col-span-9 p-3.5 font-mono font-bold text-black">
                <span className="px-2 py-0.5 rounded bg-[#1283c8]/15 text-[#1283c8] border border-black/30">
                  Space Technology
                </span>
              </div>
            </div>

            {/* Row 8: Youtube Link */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Youtube Link
              </div>
              <div className="sm:col-span-9 p-3.5 font-mono text-black/50 text-xs italic">
                —
              </div>
            </div>

            {/* Row 9: Dataset Link */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Dataset Link
              </div>
              <div className="sm:col-span-9 p-3.5 font-sans text-xs sm:text-sm text-black/90 leading-relaxed space-y-2">
                <p>
                  Specific datasets link will be provided - TBD · Chandrayaan-2 orbiter optical payload: OHRC, TMC-2, IIRS lunar Images.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href="https://chmapbrowse.issdc.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-[#ef7618] text-black border border-black rounded font-mono text-xs font-bold transition-colors shadow-[1px_1px_0_#000]"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>ISSDC Chandrayaan-2 Browse</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://lroc.im-ldi.com/images/downloads/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-[#1283c8] hover:text-white text-black border border-black rounded font-mono text-xs font-bold transition-colors shadow-[1px_1px_0_#000]"
                  >
                    <span>NASA LROC Downloads</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://quickmap.lroc.im-ldi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-[#1283c8] hover:text-white text-black border border-black rounded font-mono text-xs font-bold transition-colors shadow-[1px_1px_0_#000]"
                  >
                    <span>LROC QuickMap</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Row 10: Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 bg-white">
              <div className="sm:col-span-3 p-3.5 bg-[#FAF7F2] font-mono font-bold text-black border-b sm:border-b-0 sm:border-r-2 border-black/15">
                Contact info
              </div>
              <div className="sm:col-span-9 p-3.5 font-mono text-xs text-black/80 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ef7618]" />
                <span>ISRO Space Applications Centre · Smart India Hackathon 2026</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 bg-[#FAF7F2] border-t-2 border-black/15 flex items-center justify-between shrink-0 font-mono text-xs">
          <span className="text-black/60 hidden sm:inline">
            Smart India Hackathon 2026 // Problem Statement 26166
          </span>
          <button
            onClick={handleClose}
            className="ml-auto brutal-btn py-1.5 px-4 text-xs font-bold"
          >
            <span>CLOSE DETAILS</span>
          </button>
        </div>

      </div>
    </div>
  );
}
