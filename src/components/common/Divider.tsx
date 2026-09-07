"use client";

import React from "react";

export interface DividerProps {
  className?: string;
  label?: string;
}

export function Divider({ className = "", label }: DividerProps) {
  if (label) {
    return (
      <div className={`relative flex py-4 items-center ${className}`}>
        <div className="flex-grow border-t border-[#BFC9D1]/20"></div>
        <span className="flex-shrink mx-4 text-xs font-mono uppercase tracking-widest text-[#BFC9D1]/60">
          {label}
        </span>
        <div className="flex-grow border-t border-[#BFC9D1]/20"></div>
      </div>
    );
  }

  return <hr className={`border-t border-[#BFC9D1]/20 my-6 ${className}`} />;
}
