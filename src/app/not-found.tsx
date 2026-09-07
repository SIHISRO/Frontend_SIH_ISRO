"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/common/Button";
import { Orbit, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <PageLayout className="flex items-center justify-center min-h-[60vh]">
      <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-[#BFC9D1]/25 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#ef7618]/15 text-[#ef7618] flex items-center justify-center mx-auto mb-6 border border-[#ef7618]/30">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono uppercase text-[#ef7618] tracking-widest font-semibold">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#EAEFEF] mt-2 mb-3">
          Coordinates Not Found
        </h1>

        <p className="text-sm text-[#BFC9D1] mb-8 leading-relaxed">
          The requested orbital waypoint does not exist in the lunar cartographic database. Return to the registration pipeline to analyze Chandrayaan-2 imagery.
        </p>

        <Link href="/">
          <Button
            variant="primary"
            size="lg"
            icon={<Orbit className="w-4 h-4" />}
          >
            Go to Registration Tool
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
}
