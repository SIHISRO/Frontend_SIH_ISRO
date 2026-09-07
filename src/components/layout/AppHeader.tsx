"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { soundController } from "@/utils/soundController";
import { Menu, X, Orbit, ArrowLeft, Layers, Info } from "lucide-react";

export function AppHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "SLIDE DECK" },
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
            <div className="w-6 h-6 rounded-full bg-[#DEF915] border-2 border-black flex items-center justify-center font-display font-black text-xs text-black">
              L
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-base uppercase tracking-tight text-black">
                LUNAR<span className="text-[#FF5A87]">·REG</span>
              </span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#DEF915] border border-black text-black">
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
                      ? "bg-[#DEF915] text-black border-2 border-black shadow-[2px_2px_0_#000]"
                      : "text-black hover:bg-white border-2 border-transparent hover:border-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="ml-3 pl-3 border-l-2 border-black/20 flex items-center gap-2">
              <span className="brutal-badge brutal-badge-yellow text-[11px] font-bold">
                SIH26166 READY
              </span>
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
                      ? "bg-[#DEF915] text-black border-2 border-black shadow-[2px_2px_0_#000]"
                      : "text-black hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
