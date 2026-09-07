"use client";

import React from "react";
import Link from "next/link";
import { soundController } from "@/utils/soundController";
import { ExternalLink, ShieldCheck } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="w-full border-t-3 border-black bg-[#F3E6D6] text-black text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Col 1: Brand & PS */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-2 text-black">
              <div className="w-5 h-5 rounded-full bg-[#ef7618] border border-black flex items-center justify-center font-display font-black text-[10px] text-white">
                CV
              </div>
              <span className="font-display font-black text-sm uppercase tracking-wide">
                COSMIC VISION — SIH26166
              </span>
            </div>
            <p className="text-black/75 text-xs leading-relaxed max-w-md font-sans font-medium">
              Developed for <strong>Smart India Hackathon 2026</strong> under Problem Statement <strong>SIH26166</strong> issued by the <strong>Indian Space Research Organisation (ISRO)</strong>. Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical payloads (OHRC, TMC-2, IIRS).
            </p>
          </div>

          {/* Col 2: Payloads Supported */}
          <div>
            <h4 className="text-xs font-display font-black uppercase tracking-wider text-black mb-2.5">
              Optical Payloads
            </h4>
            <ul className="space-y-1.5 font-mono text-xs text-black/80">
              <li>
                <span className="font-bold bg-[#ef7618] text-black px-1 border border-black rounded text-[10px]">OHRC</span> — 0.25m High-Res
              </li>
              <li>
                <span className="font-bold bg-[#1283c8] text-white px-1 border border-black rounded text-[10px]">TMC-2</span> — 5m Stereo DEM
              </li>
              <li>
                <span className="font-bold bg-white px-1 border border-black rounded text-[10px]">IIRS</span> — 80m Hyperspectral
              </li>
              <li>
                <span className="font-bold bg-[#D3DCCD] px-1 border border-black rounded text-[10px]">LRO</span> — Fixed Reference Target
              </li>
            </ul>
          </div>

          {/* Col 3: Data & Documentation */}
          <div>
            <h4 className="text-xs font-display font-black uppercase tracking-wider text-black mb-2.5">
              Mission Portals
            </h4>
            <ul className="space-y-1.5 font-sans font-medium text-xs">
              <li>
                <a
                  href="https://chmapbrowse.issdc.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 font-bold"
                >
                  ISSDC Chandrayaan-2 Browse
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://lroc.im-ldi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1 font-bold"
                >
                  NASA LRO NAC Baseline
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => soundController.playClick()}
                  className="hover:underline font-bold"
                >
                  Mission Technical Architecture
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t-2 border-dashed border-black/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-black/70">
          <p>
            © 2026 Cosmic Vision Team · ISRO PS SIH26166 · Smart India Hackathon
          </p>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span className="font-bold uppercase">SUB-PIXEL LoFTR TRANSFORMATION PIPELINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
