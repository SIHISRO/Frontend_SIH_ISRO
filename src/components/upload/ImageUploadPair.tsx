"use client";

import React, { useState } from "react";
import { ImageDropzone } from "./ImageDropzone";
import { ImagePreview } from "./ImagePreview";
import { SensorBadge } from "./SensorBadge";
import { Layers, ArrowRightLeft, Sparkles } from "lucide-react";

export interface ImageUploadPairProps {
  referenceFile: File | null;
  sourceFile: File | null;
  onReferenceSelect: (file: File) => void;
  onSourceSelect: (file: File) => void;
  onReferenceRemove: () => void;
  onSourceRemove: () => void;
  onSwap?: () => void;
  onLoadSample?: () => void;
  disabled?: boolean;
}

export function ImageUploadPair({
  referenceFile,
  sourceFile,
  onReferenceSelect,
  onSourceSelect,
  onReferenceRemove,
  onSourceRemove,
  onSwap,
  onLoadSample,
  disabled = false,
}: ImageUploadPairProps) {
  const [refSensorHint, setRefSensorHint] = useState<string>("LRO-NAC");
  const [srcSensorHint, setSrcSensorHint] = useState<string>("OHRC");

  const referenceSensorOptions = [
    { id: "LRO-NAC", label: "LRO NAC", detail: "Lunar Reconnaissance Orbiter Narrow Angle Camera (Reference)" },
    { id: "SELENE", label: "SELENE", detail: "Kaguya Terrain Camera (Reference)" },
    { id: "C2-TMC2", label: "TMC-2 Base", detail: "Prior Chandrayaan-2 reference pass" },
  ];

  const sourceSensorOptions = [
    { id: "OHRC", label: "OHRC", detail: "Orbiter High Resolution Camera (0.25m high-res source)" },
    { id: "TMC-2", label: "TMC-2", detail: "Terrain Mapping Camera-2 (5m stereo source)" },
    { id: "IIRS", label: "IIRS", detail: "Imaging Infrared Spectrometer (spectral source)" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Quick Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FF9B51]" />
          <span className="text-xs font-semibold text-[#EAEFEF] uppercase tracking-wider font-mono">
            Sensor Image Pair Selection
          </span>
        </div>

        <div className="flex items-center gap-2">
          {referenceFile && sourceFile && onSwap && (
            <button
              type="button"
              onClick={onSwap}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[#BFC9D1] bg-[#25343F] border border-[#BFC9D1]/30 hover:text-[#EAEFEF] hover:border-[#FF9B51]/50 transition-colors disabled:opacity-50"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#FF9B51]" />
              <span>Swap Slots</span>
            </button>
          )}

          {onLoadSample && (
            <button
              type="button"
              onClick={onLoadSample}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-[#18232c] bg-gradient-to-r from-[#FF9B51] to-[#ffa96b] hover:brightness-105 shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Load Sample Lunar Pair</span>
            </button>
          )}
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Slot 1: Reference Image (image1) */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#BFC9D1] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              Target Coordinate System (image1)
            </span>
          </div>

          {referenceFile ? (
            <ImagePreview
              file={referenceFile}
              label="Reference Image"
              slotBadge="Fixed Reference"
              onRemove={onReferenceRemove}
              disabled={disabled}
            />
          ) : (
            <ImageDropzone
              label="Reference Image (Fixed Target)"
              sublabel="LRO NAC · SELENE · Base Lunar Map"
              slotBadge="image1"
              onFileSelect={onReferenceSelect}
              disabled={disabled}
            />
          )}

          <SensorBadge
            options={referenceSensorOptions}
            selected={refSensorHint}
            onSelect={setRefSensorHint}
            label="Reference type:"
          />
        </div>

        {/* Slot 2: Source Image (image2) */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#BFC9D1] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF9B51]" />
              Moving Source to Register (image2)
            </span>
          </div>

          {sourceFile ? (
            <ImagePreview
              file={sourceFile}
              label="Chandrayaan-2 Source Image"
              slotBadge="Moving Source"
              onRemove={onSourceRemove}
              disabled={disabled}
            />
          ) : (
            <ImageDropzone
              label="Source Image (Chandrayaan-2)"
              sublabel="OHRC (0.25m) · TMC-2 (5m) · IIRS"
              slotBadge="image2"
              onFileSelect={onSourceSelect}
              disabled={disabled}
            />
          )}

          <SensorBadge
            options={sourceSensorOptions}
            selected={srcSensorHint}
            onSelect={setSrcSensorHint}
            label="Payload sensor:"
          />
        </div>
      </div>
    </div>
  );
}
