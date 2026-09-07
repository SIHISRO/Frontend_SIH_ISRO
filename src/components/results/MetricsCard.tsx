"use client";

import React, { ReactNode } from "react";
import { Tooltip } from "../common/Tooltip";
import { HelpCircle } from "lucide-react";

export interface MetricsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "neutral" | "brand";
  tooltip?: string;
  unit?: string;
  subtitle?: string;
  className?: string;
}

export function MetricsCard({
  label,
  value,
  icon,
  variant = "default",
  tooltip,
  unit,
  subtitle,
  className = "",
}: MetricsCardProps) {
  const variantStyles = {
    default: "border-[#BFC9D1]/20 bg-[#0b2545]/80 text-[#EAEFEF]",
    brand: "border-[#ef7618]/40 bg-[#0b2545]/90 text-[#EAEFEF] shadow-lg shadow-[#ef7618]/10",
    success: "border-emerald-500/40 bg-[#0b2545]/90 text-[#EAEFEF] shadow-lg shadow-emerald-500/10",
    warning: "border-amber-500/40 bg-[#0b2545]/90 text-[#EAEFEF] shadow-lg shadow-amber-500/10",
    error: "border-rose-500/40 bg-[#0b2545]/90 text-[#EAEFEF] shadow-lg shadow-rose-500/10",
    neutral: "border-[#BFC9D1]/20 bg-[#0b2545]/70 text-[#EAEFEF]",
  };

  const valueColors = {
    default: "text-[#EAEFEF]",
    brand: "text-[#ef7618]",
    success: "text-emerald-400",
    warning: "text-[#ef7618]",
    error: "text-rose-400",
    neutral: "text-[#EAEFEF]",
  };

  return (
    <div
      className={`relative rounded-2xl border p-5 backdrop-blur-md transition-all duration-200 hover:scale-[1.01] ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#BFC9D1] flex items-center gap-1.5">
          {label}
          {tooltip && (
            <Tooltip content={tooltip}>
              <HelpCircle className="w-3.5 h-3.5 text-[#BFC9D1]/60 hover:text-[#EAEFEF] cursor-help" />
            </Tooltip>
          )}
        </span>
        {icon && (
          <div className="p-2 rounded-lg bg-[#1283c8]/30 text-[#ef7618] border border-[#1283c8]/40">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${valueColors[variant]}`}>
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono font-medium text-[#BFC9D1]">
            {unit}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-[11px] text-[#BFC9D1]/70 font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
