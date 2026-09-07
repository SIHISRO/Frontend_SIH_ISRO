"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  dx: number;
  dy: number;
  symbol: string;
  size: number;
  color: string;
}

interface ComicBurst {
  id: number;
  x: number;
  y: number;
  word: string;
  color: string;
  rotation: number;
  particles: Particle[];
}

const COMIC_WORDS = ["SIH", "PS26166"];
const COMIC_COLORS = ["#ef7618", "#1283c8", "#ffc107", "#ef7618", "#1283c8"];
const PARTICLE_SYMBOLS = ["★", "✦", "●", "◆", "▲"];

export function ComicClickEffect() {
  const [bursts, setBursts] = useState<ComicBurst[]>([]);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clickWord, setClickWord] = useState<string>("SIH");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let nextId = 0;
    let clickIndex = 0;
    let clickTimeout: NodeJS.Timeout | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'button, a, [role="button"], input, select, summary, label, .cursor-pointer'
      );
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovering(false);
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Don't trigger on right clicks
      if (e.button !== 0) return;

      const chosenWord = COMIC_WORDS[clickIndex % COMIC_WORDS.length];
      clickIndex++;
      setClickWord(chosenWord);

      // Animate the cursor itself into the active clicked state for 380ms
      setIsClicking(true);
      if (clickTimeout) clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => {
        setIsClicking(false);
      }, 380);

      const randomColor = COMIC_COLORS[Math.floor(Math.random() * COMIC_COLORS.length)];
      const randomRotation = Math.floor(Math.random() * 30) - 15; // -15deg to +15deg

      // Generate 6 outward flying comic particles
      const particles: Particle[] = Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * 60 + Math.random() * 30) * (Math.PI / 180);
        const distance = 35 + Math.random() * 25;
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          symbol: PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)],
          size: 10 + Math.floor(Math.random() * 8),
          color: i % 2 === 0 ? "#ef7618" : "#1283c8",
        };
      });

      const newBurst: ComicBurst = {
        id: ++nextId,
        x: e.clientX,
        y: e.clientY,
        word: chosenWord,
        color: randomColor,
        rotation: randomRotation,
        particles,
      };

      setBursts((prev) => [...prev.slice(-6), newBurst]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
      }, 550);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handlePointerDown, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (clickTimeout) clearTimeout(clickTimeout);
    };
  }, [isVisible]);

  return (
    <>
      {/* 1. Custom Comic Animated Cursor */}
      {isVisible && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9999999] select-none will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: isHovering || isClicking
              ? `translate3d(${mousePos.x - 14}px, ${mousePos.y - 2}px, 0)`
              : `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          }}
          aria-hidden="true"
        >
          <div
            className={`relative transition-all duration-150 ${
              isClicking
                ? "scale-90 rotate-[-10deg]"
                : isHovering
                ? "scale-110 rotate-[-3deg]"
                : "scale-100 rotate-0"
            }`}
          >
            {/* If Hovering or Clicking: Black Pointing Hand Cursor 👆 */}
            {isHovering || isClicking ? (
              <div className="relative">
                {/* Pulsing Comic Ring when clicking */}
                {isClicking && (
                  <div className="absolute -top-3 -left-3 w-10 h-10 animate-ping rounded-full border-2 border-black bg-black/20" />
                )}

                {/* Black Comic Pointing Hand 👆 SVG */}
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 38 42"
                  className="filter drop-shadow-[3px_3px_0_#000000]"
                >
                  {/* Black Hand Silhouette 👆 */}
                  <path
                    d="M14 2 C12.5 2 11 3.5 11 5 L11 18 C10 17 8.5 17 7.5 18 C6.5 19 6.5 20.5 7.5 21.8 L10.5 26 C11.5 29.5 13.5 35 18 36 L25 36 C29.5 35 31 30 31 25 L31 20 C31 18.5 29.8 17.5 28.5 17.5 C27.8 17.5 27.2 17.8 26.8 18.3 C26.3 17.2 25.2 16.5 24 16.5 C23.4 16.5 22.8 16.7 22.4 17.1 C21.8 16.1 20.8 15.5 19.5 15.5 L17.5 15.5 L17.5 5 C17.5 3.5 16 2 14 2 Z"
                    fill="#000000"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* White Knuckle Creases and Finger Separation Lines */}
                  <line x1="19.5" y1="16" x2="19.5" y2="24" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="24" y1="17" x2="24" y2="25" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="28.5" y1="18" x2="28.5" y2="26" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="12.5" y1="8" x2="16" y2="8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="12.5" y1="12" x2="16" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 8 22 C 10.5 24, 14 25, 16 23" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Subtle ISRO Orange Wrist Accent */}
                  <rect x="15" y="34.5" width="10" height="2.5" rx="1.2" fill="#ef7618" stroke="#ffffff" strokeWidth="1" />

                  {/* Comic Action Rays at Fingertip when clicking */}
                  {isClicking && (
                    <g strokeLinecap="round">
                      <line x1="14" y1="-2" x2="14" y2="-6" stroke="#ffffff" strokeWidth="3.5" />
                      <line x1="14" y1="-2" x2="14" y2="-6" stroke="#000000" strokeWidth="2" />
                      <line x1="10" y1="-1" x2="6" y2="-4" stroke="#ffffff" strokeWidth="3.5" />
                      <line x1="10" y1="-1" x2="6" y2="-4" stroke="#000000" strokeWidth="2" />
                      <line x1="18" y1="-1" x2="22" y2="-4" stroke="#ffffff" strokeWidth="3.5" />
                      <line x1="18" y1="-1" x2="22" y2="-4" stroke="#000000" strokeWidth="2" />
                    </g>
                  )}
                </svg>

                {/* Interactive Comic Button Badge next to Hand */}
                <div
                  className={`absolute top-3 left-8 px-1.5 py-0.5 rounded border-2 border-black font-display font-black text-[9px] uppercase tracking-wider shadow-[2px_2px_0_#000000] whitespace-nowrap transition-transform ${
                    isClicking
                      ? "bg-black text-white scale-110 rotate-12"
                      : "bg-[#ef7618] text-black scale-100 rotate-6"
                  }`}
                >
                  {isClicking ? clickWord : "CLICK"}
                </div>
              </div>
            ) : (
              /* Idle Comic Arrow SVG */
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                className="filter drop-shadow-[3px_3px_0_#000000]"
              >
                {/* Outer Bold Comic Border */}
                <polygon
                  points="3,2 3,28 10,21 16,33 22,30 16,19 26,19"
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Inner Core Fill */}
                <polygon
                  points="5,6 5,23 10.5,18 15,28 17.5,27 13.5,17 21,17"
                  fill="#ef7618"
                />
                {/* Comic Specular Glint */}
                <polygon points="6,8 6,15 9,12" fill="#ffffff" opacity="0.9" />
                <circle cx="7.5" cy="8" r="1.3" fill="#ffffff" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* 2. Global Comic Click Starburst Burst & Particle Effects */}
      <div
        className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none"
        aria-hidden="true"
      >
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute comic-burst-container"
            style={{
              left: burst.x,
              top: burst.y,
            }}
          >
            {/* Outward flying comic particles */}
            {burst.particles.map((p, idx) => (
              <span
                key={idx}
                className="absolute font-black comic-particle animate-comic-particle text-black"
                style={
                  {
                    "--dx": `${p.dx}px`,
                    "--dy": `${p.dy}px`,
                    fontSize: `${p.size}px`,
                    color: p.color,
                    WebkitTextStroke: "1px #000000",
                    filter: "drop-shadow(1px 1px 0 #000000)",
                  } as React.CSSProperties
                }
              >
                {p.symbol}
              </span>
            ))}

            {/* Central Comic Starburst Boom Shape */}
            <div
              className="comic-star-burst animate-comic-pop flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${burst.rotation}deg)`,
              }}
            >
              {/* SVG Jagged 12-point Comic Blast Star */}
              <svg
                className="w-14 h-14 sm:w-16 sm:h-16 filter drop-shadow-[3px_3px_0_#000000]"
                viewBox="0 0 100 100"
              >
                <polygon
                  points="50,0 64,25 93,12 80,38 100,56 73,65 74,95 48,78 26,98 25,68 0,55 24,36 10,12 39,24"
                  fill={burst.color}
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <polygon
                  points="50,10 60,28 82,18 72,38 88,52 68,59 69,82 48,70 30,84 29,61 10,51 28,37 17,18 40,27"
                  fill="#ffffff"
                  opacity="0.35"
                />
              </svg>

              {/* Comic Word in Center (SIH / PS26166) */}
              <span
                className={`absolute font-display font-black ${
                  burst.word.length > 4 ? "text-[9px] sm:text-[10px]" : "text-[11px] sm:text-xs"
                } text-white uppercase tracking-wider select-none px-1`}
                style={{
                  textShadow:
                    "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
              >
                {burst.word}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
