"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { soundController } from "@/utils/soundController";
import { Menu, X } from "lucide-react";
import { ProblemStatementModal } from "@/components/common/ProblemStatementModal";

export function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPSModalOpen, setIsPSModalOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "SLIDE DECK" },
    { href: "/references", label: "REFERENCES & PAPERS" },
    { href: "/about", label: "ABOUT MISSION & PS" },
    { href: "/results", label: "TELEMETRY RESULTS" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F3E6D6] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            onClick={() => soundController.playPop()}
            className="flex items-center gap-2.5 brutal-card-white py-1.5 px-3 hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden border-2 border-black shadow-[1px_1px_0_#000] flex-shrink-0 bg-black">
              <Image
                src="/favicon.png"
                alt="Cosmic Vision Logo"
                width={28}
                height={28}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-base uppercase tracking-tight text-black">
                COSMIC<span className="text-[#1283c8]">·VISION</span>
              </span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#1283c8] text-white border border-black">
                ISRO
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => soundController.playClick()}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all ${
                    active
                      ? "bg-[#ef7618] text-black border-2 border-black shadow-[2px_2px_0_#000]"
                      : "text-black hover:bg-white border-2 border-transparent hover:border-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="ml-3 pl-3 border-l-2 border-black/20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundController.playPop();
                  setIsPSModalOpen(true);
                }}
                className="brutal-badge brutal-badge-orange text-[11px] font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0_#000]"
                title="View Problem Statement Details"
              >
                SIH26166 READY
              </button>
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => {
                soundController.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="brutal-btn-round w-9 h-9"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-black space-y-2 bg-[#F3E6D6]">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    soundController.playClick();
                    setMobileMenuOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase ${
                    active
                      ? "bg-[#ef7618] text-black border-2 border-black shadow-[2px_2px_0_#000]"
                      : "text-black hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-black/20">
              <button
                type="button"
                onClick={() => {
                  soundController.playPop();
                  setMobileMenuOpen(false);
                  setIsPSModalOpen(true);
                }}
                className="w-full text-left brutal-badge brutal-badge-orange text-xs font-bold py-2 px-3"
              >
                VIEW PS SIH26166 DETAILS
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Official Problem Statement Details Modal (Apple Open Animation) */}
      <ProblemStatementModal
        isOpen={isPSModalOpen}
        onClose={() => setIsPSModalOpen(false)}
      />
    </header>
  );
}
