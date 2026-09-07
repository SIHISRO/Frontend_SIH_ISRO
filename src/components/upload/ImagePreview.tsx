"use client";

import React, { useEffect, useState } from "react";
import { X, FileImage, CheckCircle2 } from "lucide-react";
import { formatFileSize } from "@/utils/imageUtils";

export interface ImagePreviewProps {
  file: File;
  label: string;
  slotBadge?: string;
  onRemove: () => void;
  disabled?: boolean;
}

export function ImagePreview({
  file,
  label,
  slotBadge,
  onRemove,
  disabled = false,
}: ImagePreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(
    null
  );

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Calculate dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <div className="relative w-full rounded-2xl glass-panel-elevated border border-[#BFC9D1]/30 p-4 overflow-hidden flex flex-col group transition-all duration-200 hover:border-[#FF9B51]/50">
      {/* Top Header info */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          {slotBadge && (
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded bg-[#FF9B51]/20 text-[#FF9B51] border border-[#FF9B51]/40 flex-shrink-0">
              {slotBadge}
            </span>
          )}
          <span className="text-xs font-semibold text-[#EAEFEF] truncate">
            {label}
          </span>
        </div>

        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label={`Remove ${label} image`}
          className="p-1.5 rounded-lg text-[#BFC9D1] hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image Preview Window */}
      <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[#151d24] border border-[#BFC9D1]/20 flex items-center justify-center">
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={`Preview of uploaded ${label}`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[#BFC9D1]/60">
            <FileImage className="w-8 h-8 mb-1" />
            <span className="text-xs">Loading thumbnail...</span>
          </div>
        )}

        {/* Selected badge overlay */}
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-[#18232c]/85 border border-[#BFC9D1]/30 text-[11px] text-[#EAEFEF] font-mono flex items-center gap-1.5 backdrop-blur-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Ready</span>
        </div>
      </div>

      {/* File details footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-[#BFC9D1] font-mono">
        <span className="truncate max-w-[200px] text-[#EAEFEF]" title={file.name}>
          {file.name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0 text-[11px]">
          {dimensions && (
            <span>
              {dimensions.width}×{dimensions.height}
            </span>
          )}
          <span>•</span>
          <span>{formatFileSize(file.size)}</span>
        </div>
      </div>
    </div>
  );
}
