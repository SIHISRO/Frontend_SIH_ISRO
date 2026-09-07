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
                ? "bg-[#FF9B51] text-[#18232c] font-bold shadow-sm shadow-[#FF9B51]/30"
                : "bg-[#25343F] text-[#BFC9D1] border border-[#BFC9D1]/30 hover:border-[#FF9B51]/50 hover:text-[#EAEFEF]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
