"use client";

import React, { ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "brand";
  size?: "sm" | "md";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "neutral",
  size = "md",
  icon,
  children,
  className,
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-xs font-medium gap-1.5",
  };

  const variantStyles = {
    brand: "bg-[#ef7618]/15 text-[#ef7618] border border-[#ef7618]/40",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40",
    warning: "bg-amber-500/15 text-amber-300 border border-amber-500/40",
    error: "bg-rose-500/15 text-rose-300 border border-rose-500/40",
    info: "bg-sky-500/15 text-sky-300 border border-sky-500/40",
    neutral: "bg-[#1283c8]/15 text-[#1283c8] border border-[#1283c8]/30",
  };

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center rounded-full tracking-wide uppercase font-mono",
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
    >
      {icon && <span className="flex-shrink-0 text-current">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
