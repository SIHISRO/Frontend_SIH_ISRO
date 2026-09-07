"use client";

import React, { ReactNode } from "react";

export interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function Section({
  id,
  title,
  subtitle,
  badge,
  children,
  className = "",
  headerAction,
}: SectionProps) {
  return (
    <section id={id} className={`my-8 sm:my-12 ${className}`}>
      {(title || subtitle || badge || headerAction) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-[#BFC9D1]/15">
          <div>
            <div className="flex items-center gap-3 mb-1">
              {badge}
              {title && (
                <h2 className="text-xl sm:text-2xl font-bold text-[#EAEFEF] tracking-tight">
                  {title}
                </h2>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-[#BFC9D1] max-w-2xl">{subtitle}</p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
