"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-3",
    xl: "w-16 h-16 border-4",
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={twMerge(
        clsx(
          "inline-block rounded-full border-solid border-[#ef7618] border-r-transparent animate-spin motion-reduce:animate-none",
          sizeClasses[size],
          className
        )
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
