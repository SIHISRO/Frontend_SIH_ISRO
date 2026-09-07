"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppFooter } from "@/components/layout/AppFooter";

export function NavigationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDeckPage = pathname === "/";

  if (isDeckPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3E6D6] text-black">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
