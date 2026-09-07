"use client";

import React, { ReactNode } from "react";
import { Telescope } from "lucide-react";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`glass-panel rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#384d5d]/40 flex items-center justify-center text-[#FF9B51] mb-4 border border-[#BFC9D1]/20">
        {icon || <Telescope className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-[#EAEFEF] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#BFC9D1] mb-6 max-w-md leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
