"use client";

import React, { ReactNode } from "react";

export interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${className}`}>
      {children}
    </main>
  );
}
