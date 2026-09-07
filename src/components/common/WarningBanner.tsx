"use client";

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export interface WarningBannerProps {
  message: string;
  show?: boolean;
  dismissible?: boolean;
  className?: string;
}

export function WarningBanner({
  message,
  show = true,
  dismissible = true,
  className = "",
}: WarningBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!show || dismissed) return null;

  return (
    <div
      role="status"
      className={`rounded-xl border border-[#FF9B51]/50 bg-[#FF9B51]/10 px-4 py-3 sm:px-5 sm:py-3.5 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-[#FF9B51] flex-shrink-0" />
          <p className="text-sm font-medium text-[#EAEFEF] leading-snug">
            {message}
          </p>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss warning"
            className="p-1 rounded text-[#BFC9D1] hover:text-[#EAEFEF] hover:bg-[#25343F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
