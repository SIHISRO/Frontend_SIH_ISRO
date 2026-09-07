"use client";

import React from "react";

export interface SensorBadgeProps {
  options: Array<{ id: string; label: string; detail?: string }>;
  selected?: string;
  onSelect?: (id: string) => void;
  label?: string;
}

export function SensorBadge({
  options,
  selected,
  onSelect,
  label = "Sensor hint:",
}: SensorBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
      <span className="text-[11px] text-[#BFC9D1]/70 font-mono mr-1">
        {label}
      </span>
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect?.(opt.id)}
            title={opt.detail || opt.label}
            className={`px-2 py-0.5 text-[11px] font-mono rounded transition-all cursor-pointer ${
              isSelected
                ? "bg-[#ef7618] text-black font-bold shadow-sm shadow-[#ef7618]/30"
                : "bg-[#1283c8]/30 text-[#BFC9D1] border border-[#1283c8]/40 hover:border-[#ef7618]/50 hover:text-white"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
