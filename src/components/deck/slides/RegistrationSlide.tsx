"use client";

import React, { useState } from "react";
import { soundController } from "@/utils/soundController";
import {
  UploadCloud,
  ArrowLeftRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Cpu,
  Radar,
} from "lucide-react";

interface RegistrationSlideProps {
  referenceFile: File | null;
  sourceFile: File | null;
  onReferenceSelect: (file: File) => void;
  onSourceSelect: (file: File) => void;
  onReferenceRemove: () => void;
  onSourceRemove: () => void;
  onSwap: () => void;
  onLoadSample: () => Promise<void>;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  loadingSample: boolean;
  error: string | null;
}

export function RegistrationSlide({
  referenceFile,
  sourceFile,
  onReferenceSelect,
  onSourceSelect,
  onReferenceRemove,
  onSourceRemove,
  onSwap,
  onLoadSample,
  onSubmit,
  isLoading,
  loadingSample,
  error,
}: RegistrationSlideProps) {
  const [selectedSensor, setSelectedSensor] = useState<string>("OHRC");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isRef: boolean) => {
    if (e.target.files && e.target.files[0]) {
      soundController.playPop();
      if (isRef) {
        onReferenceSelect(e.target.files[0]);
      } else {
        onSourceSelect(e.target.files[0]);
      }
    }
  };

  const isReady = !!referenceFile && !!sourceFile && !isLoading && !loadingSample;

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 sm:px-8 py-8 relative">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Headline */}
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl sm:text-5xl uppercase font-black tracking-tight text-black">
            Upload Sensor Imagery
          </h2>
          <p className="font-sans text-xs sm:text-sm text-black/75 max-w-xl mx-auto font-medium mt-1">
            Provide the reference lunar coordinate frame and moving Chandrayaan-2 optical payload image.
          </p>
        </div>

        {/* Studio Box */}
        <div className="brutal-card p-6 sm:p-8 bg-[#EAEFEF] shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
          
          {/* Top Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-black pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase text-black/70">Payload Tag:</span>
              {["OHRC", "TMC-2", "IIRS"].map((sensor) => (
                <button
                  key={sensor}
                  onClick={() => {
                    soundController.playClick();
                    setSelectedSensor(sensor);
                  }}
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded border-2 border-black transition-all ${
                    selectedSensor === sensor
                      ? "bg-[#ef7618] shadow-[2px_2px_0_#000] font-black text-black"
                      : "bg-white hover:bg-[#BFC9D1]/30"
                  }`}
                >
                  {sensor}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={async () => {
                  soundController.playClick();
                  await onLoadSample();
                }}
                disabled={loadingSample || isLoading}
                className="text-xs font-mono font-bold py-1.5 px-3 rounded-lg border-2 border-black bg-[#ef7618] text-black flex items-center gap-1.5 shadow-[2px_2px_0_#000] hover:translate-y-0.5 active:translate-y-1 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{loadingSample ? "LOADING SAMPLE..." : "LOAD SAMPLE PAIR"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundController.playPop();
                  onSwap();
                }}
                disabled={!referenceFile || !sourceFile || isLoading}
                className="brutal-btn-white text-xs font-mono font-bold py-1.5 px-3 rounded-lg border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0_#000] hover:translate-y-0.5 active:translate-y-1 transition-all disabled:opacity-40"
                title="Swap Reference and Source slots"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SWAP</span>
              </button>
            </div>
          </div>

          {/* Dual Dropzones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Slot 1: Reference (Fixed) */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#1283c8] text-white rounded">
                    SLOT A
                  </span>
                  <span className="font-display font-black text-sm uppercase text-black">
                    Reference Lunar Frame (Fixed)
                  </span>
                </div>
                {referenceFile && (
                  <button
                    onClick={() => {
                      soundController.playClick();
                      onReferenceRemove();
                    }}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-mono font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>REMOVE</span>
                  </button>
                )}
              </div>

              <div
                className={`border-3 border-dashed border-black rounded-xl p-5 flex flex-col items-center justify-center min-h-[220px] transition-all relative ${
                  referenceFile
                    ? "bg-white border-solid shadow-[3px_3px_0_#000]"
                    : "bg-[#BFC9D1]/30 hover:bg-[#BFC9D1]/60"
                }`}
              >
                {referenceFile ? (
                  <div className="text-center w-full">
                    <div className="w-12 h-12 rounded-full bg-[#1283c8] border-2 border-black flex items-center justify-center mx-auto mb-2 text-white">
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-black block truncate max-w-[240px] mx-auto">
                      {referenceFile.name}
                    </span>
                    <span className="text-[11px] font-mono text-black/60 block mt-0.5">
                      {(referenceFile.size / 1024).toFixed(1)} KB · Base Coordinate Grid
                    </span>
                    <label className="mt-3 inline-block cursor-pointer">
                      <span className="text-xs font-mono font-bold underline hover:text-[#ef7618] bg-[#1283c8] text-white px-2 py-1 rounded">
                        REPLACE FILE
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, true)}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center text-center w-full">
                    <div className="w-12 h-12 rounded-full bg-[#BFC9D1] border-2 border-black flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-black stroke-[2]" />
                    </div>
                    <span className="font-display font-black text-sm uppercase text-black block">
                      Drop Reference Image Here
                    </span>
                    <span className="text-xs font-sans text-black/60 mt-1 block">
                      LRO NAC, SELENE, or High-Altitude Baseline
                    </span>
                    <span className="mt-3 px-3 py-1 bg-[#1283c8] text-white font-mono text-xs font-bold rounded">
                      BROWSE FILES
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleFileChange(e, true)}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Slot 2: Source (Moving) */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#ef7618] text-black border border-black rounded">
                    SLOT B
                  </span>
                  <span className="font-display font-black text-sm uppercase text-black">
                    Chandrayaan-2 Payload (Moving)
                  </span>
                </div>
                {sourceFile && (
                  <button
                    onClick={() => {
                      soundController.playClick();
                      onSourceRemove();
                    }}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-mono font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>REMOVE</span>
                  </button>
                )}
              </div>

              <div
                className={`border-3 border-dashed border-black rounded-xl p-5 flex flex-col items-center justify-center min-h-[220px] transition-all relative ${
                  sourceFile
                    ? "bg-white border-solid shadow-[3px_3px_0_#000]"
                    : "bg-[#BFC9D1]/30 hover:bg-[#BFC9D1]/60"
                }`}
              >
                {sourceFile ? (
                  <div className="text-center w-full">
                    <div className="w-12 h-12 rounded-full bg-[#ef7618] border-2 border-black flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-6 h-6 text-black stroke-[2.5]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-black block truncate max-w-[240px] mx-auto">
                      {sourceFile.name}
                    </span>
                    <span className="text-[11px] font-mono text-black/60 block mt-0.5">
                      {(sourceFile.size / 1024).toFixed(1)} KB · {selectedSensor} Optical Swath
                    </span>
                    <label className="mt-3 inline-block cursor-pointer">
                      <span className="text-xs font-mono font-bold underline hover:text-[#ef7618] bg-[#1283c8] text-white px-2 py-1 rounded">
                        REPLACE FILE
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileChange(e, false)}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center text-center w-full">
                    <div className="w-12 h-12 rounded-full bg-[#BFC9D1] border-2 border-black flex items-center justify-center mb-3">
                      <UploadCloud className="w-6 h-6 text-black stroke-[2]" />
                    </div>
                    <span className="font-display font-black text-sm uppercase text-black block">
                      Drop Chandrayaan-2 Image Here
                    </span>
                    <span className="text-xs font-sans text-black/60 mt-1 block">
                      OHRC (0.25m), TMC-2 (5m), or IIRS (80m)
                    </span>
                    <span className="mt-3 px-3 py-1 bg-[#1283c8] text-white font-mono text-xs font-bold rounded">
                      BROWSE FILES
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => handleFileChange(e, false)}
                    />
                  </label>
                )}
              </div>
            </div>

          </div>

          {/* Error Banner */}
          {error && (
            <div className="mt-6 p-4 bg-red-100 border-3 border-red-600 rounded-xl flex items-center gap-3 text-red-900 shadow-[3px_3px_0_#dc2626]">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div className="text-xs font-mono">
                <span className="font-bold block uppercase">Registration Pipeline Notice:</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Big Tactile Submit Button */}
          <div className="mt-8 pt-6 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-black/70 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-black shrink-0" />
              <span>
                Backend will run detector-free LoFTR matching with RANSAC homography estimation.
              </span>
            </div>

            <button
              type="button"
              onClick={async () => {
                soundController.playPop();
                await onSubmit();
              }}
              disabled={!isReady}
              className="brutal-btn w-full sm:w-auto text-base sm:text-lg py-3.5 px-8 shadow-[6px_6px_0_0_#000000] hover:shadow-[2px_2px_0_0_#000000] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Radar className="w-5 h-5 animate-spin" />
                  <span>CALCULATING HOMOGRAPHY...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 stroke-[2.5]" />
                  <span>EXECUTE LoFTR REGISTRATION</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
