"use client";

import React, { useState, useRef, DragEvent, ChangeEvent, KeyboardEvent } from "react";
import { UploadCloud, Image as ImageIcon, AlertCircle } from "lucide-react";
import { validateImageFile } from "@/utils/imageUtils";

export interface ImageDropzoneProps {
  label: string;
  sublabel?: string;
  slotBadge?: string;
  accept?: string;
  onFileSelect: (file: File) => void;
  error?: string;
  disabled?: boolean;
}

export function ImageDropzone({
  label,
  sublabel,
  slotBadge,
  accept = "image/jpeg,image/png,image/jpg",
  onFileSelect,
  error: externalError,
  disabled = false,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayError = externalError || localError;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    setLocalError(null);
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setLocalError(validation.error || "Invalid file format.");
      return;
    }
    onFileSelect(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
      // Reset input value so same file can be re-selected if removed
      e.target.value = "";
    }
  };

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Upload ${label}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none text-center min-h-[260px] ${
          isDragging
            ? "border-[#ef7618] bg-[#ef7618]/15 scale-[1.01] shadow-lg shadow-[#ef7618]/20"
            : displayError
            ? "border-rose-500/50 bg-rose-950/20 hover:border-rose-500"
            : "border-[#BFC9D1]/30 bg-[#0b2545]/60 hover:bg-[#0b2545]/90 hover:border-[#ef7618]/60"
        } ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "focus:outline-none focus:ring-2 focus:ring-[#ef7618]"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
        />

        {/* Slot Category Badge */}
        {slotBadge && (
          <span className="absolute top-4 left-4 px-2.5 py-0.5 text-[11px] font-mono uppercase font-semibold rounded-full bg-[#1283c8]/40 text-[#BFC9D1] border border-[#1283c8]/40">
            {slotBadge}
          </span>
        )}

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
            isDragging
              ? "bg-[#ef7618] text-black shadow-lg shadow-[#ef7618]/30 scale-110"
              : "bg-[#1283c8]/20 text-[#ef7618] border border-[#1283c8]/40"
          }`}
        >
          {isDragging ? (
            <UploadCloud className="w-7 h-7 stroke-[2.2]" />
          ) : (
            <ImageIcon className="w-7 h-7 stroke-[2]" />
          )}
        </div>

        {/* Labels */}
        <h4 className="text-base font-bold text-[#EAEFEF] mb-1">
          {label}
        </h4>
        {sublabel && (
          <p className="text-xs text-[#BFC9D1] font-mono mb-3">
            {sublabel}
          </p>
        )}

        <p className="text-xs text-[#BFC9D1]/70 max-w-xs">
          Drag & drop lunar image here, or{" "}
          <span className="text-[#ef7618] font-semibold underline underline-offset-2">
            browse file
          </span>
        </p>

        <span className="mt-3 text-[10px] uppercase font-mono text-[#BFC9D1]/50 tracking-wider">
          JPEG or PNG · Max 25MB
        </span>
      </div>

      {/* Error display */}
      {displayError && (
        <div
          role="alert"
          className="mt-2.5 flex items-center gap-2 text-xs text-rose-400 font-medium px-2"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
