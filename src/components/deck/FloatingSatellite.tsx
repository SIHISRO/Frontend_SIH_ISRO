"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { soundController } from "@/utils/soundController";

interface FloatingSatelliteProps {
  className?: string;
}

export function FloatingSatellite({ className = "" }: FloatingSatelliteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const floatLayerRef = useRef<HTMLDivElement>(null);
  const thrusterRef = useRef<HTMLDivElement>(null);

  const wanderTweenRef = useRef<gsap.core.Tween | null>(null);
  const isEvadingRef = useRef(false);
  const lastEvadeTimeRef = useRef(0);

  // Position state relative to container
  const currentPosRef = useRef({ x: 0, y: 0 });

  // Get current bounds for the satellite inside parent container
  const getBounds = useCallback(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return { minX: 30, maxX: 500, minY: 30, maxY: 400 };

    const rect = container.getBoundingClientRect();
    const satWidth = Math.min(340, Math.max(220, rect.width * 0.32));
    const satHeight = satWidth * 0.72;
    const padding = 30;

    return {
      minX: padding,
      maxX: Math.max(padding + 50, rect.width - satWidth - padding),
      minY: padding,
      maxY: Math.max(padding + 50, rect.height - satHeight - padding),
      satWidth,
      satHeight,
    };
  }, []);

  // Continuous autonomous random wandering loop across the hero canvas
  const wanderToNextWaypoint = useCallback(() => {
    if (!outerRef.current || isEvadingRef.current) return;

    const { minX, maxX, minY, maxY } = getBounds();
    const currentX = currentPosRef.current.x;
    const currentY = currentPosRef.current.y;

    // Pick a truly random destination across the space canvas that is at least 180px away
    let targetX = minX + Math.random() * (maxX - minX);
    let targetY = minY + Math.random() * (maxY - minY);
    let attempts = 0;

    while (Math.hypot(targetX - currentX, targetY - currentY) < 180 && attempts < 8) {
      targetX = minX + Math.random() * (maxX - minX);
      targetY = minY + Math.random() * (maxY - minY);
      attempts++;
    }

    // Varied, slow, organic flight duration (5.0s to 7.5s)
    const distance = Math.hypot(targetX - currentX, targetY - currentY);
    const speedFactor = Math.max(5.0, Math.min(7.5, (distance / 120) * 1.5 + 4.2));

    // Subtle natural banking tilt based on direction of movement
    const moveDx = targetX - currentX;
    const bankAngle = Math.min(Math.max(moveDx * 0.045, -15), 15);

    wanderTweenRef.current = gsap.to(outerRef.current, {
      x: targetX,
      y: targetY,
      duration: speedFactor,
      ease: "sine.inOut",
      onUpdate: () => {
        if (outerRef.current) {
          currentPosRef.current.x = gsap.getProperty(outerRef.current, "x") as number;
          currentPosRef.current.y = gsap.getProperty(outerRef.current, "y") as number;
        }
      },
      onComplete: () => {
        // Continuous, uninterrupted orbital drift
        wanderToNextWaypoint();
      },
    });

    // Slow banking tilt and natural re-alignment
    if (innerRef.current) {
      gsap.to(innerRef.current, {
        rotation: bankAngle,
        duration: speedFactor * 0.4,
        ease: "sine.out",
        onComplete: () => {
          gsap.to(innerRef.current, {
            rotation: (Math.random() * 6 - 3),
            duration: speedFactor * 0.6,
            ease: "sine.inOut",
          });
        },
      });
    }
  }, [getBounds]);

  // Proximity evasion: veers away from cursor smoothly then continues wandering
  const evadeFromCursor = useCallback(
    (cursorX: number, cursorY: number) => {
      if (!outerRef.current) return;

      const now = Date.now();
      // Debounce slightly to let current evasive glide finish gracefully
      if (now - lastEvadeTimeRef.current < 1400 && isEvadingRef.current) return;

      lastEvadeTimeRef.current = now;
      isEvadingRef.current = true;

      // Cancel current gentle wandering tween immediately
      wanderTweenRef.current?.kill();

      const { minX, maxX, minY, maxY } = getBounds();
      const currentX = currentPosRef.current.x;
      const currentY = currentPosRef.current.y;

      // Satellite center
      const satCenterX = currentX + 140;
      const satCenterY = currentY + 105;

      // Vector directly away from cursor
      const awayX = satCenterX - cursorX;
      const awayY = satCenterY - cursorY;
      const length = Math.hypot(awayX, awayY) || 1;

      // Push distance with random variation
      const pushDistance = 260 + Math.random() * 200;
      let targetX = currentX + (awayX / length) * pushDistance;
      let targetY = currentY + (awayY / length) * pushDistance;

      // Clamp within bounds, reflecting inward if hitting perimeter
      if (targetX < minX || targetX > maxX) {
        targetX = targetX < minX ? minX + 60 + Math.random() * 120 : maxX - 60 - Math.random() * 120;
      }
      if (targetY < minY || targetY > maxY) {
        targetY = targetY < minY ? minY + 50 + Math.random() * 100 : maxY - 50 - Math.random() * 100;
      }

      // Bank tilt towards escape vector
      const moveDx = targetX - currentX;
      const bankTilt = Math.min(Math.max(moveDx * 0.06, -20), 20);

      // Plasma thruster burst
      if (thrusterRef.current) {
        gsap.fromTo(
          thrusterRef.current,
          { opacity: 0.85, scale: 0.5 },
          { opacity: 0, scale: 2.8, duration: 1.6, ease: "power2.out" }
        );
      }

      soundController.playPop();

      // Smooth, slow evasive glide over 2.4s
      gsap.to(outerRef.current, {
        x: targetX,
        y: targetY,
        duration: 2.4,
        ease: "power2.out",
        onUpdate: () => {
          if (outerRef.current) {
            currentPosRef.current.x = gsap.getProperty(outerRef.current, "x") as number;
            currentPosRef.current.y = gsap.getProperty(outerRef.current, "y") as number;
          }
        },
        onComplete: () => {
          isEvadingRef.current = false;
          // Seamlessly resume autonomous wandering from new location
          wanderToNextWaypoint();
        },
      });

      if (innerRef.current) {
        gsap.to(innerRef.current, {
          rotation: bankTilt,
          duration: 0.8,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(innerRef.current, {
              rotation: 0,
              duration: 1.6,
              ease: "sine.inOut",
            });
          },
        });
      }
    },
    [getBounds, wanderToNextWaypoint]
  );

  // Initialize satellite position and start continuous wandering
  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container || !outerRef.current || !floatLayerRef.current) return;

    const rect = container.getBoundingClientRect();
    const initX = Math.max(30, rect.width * 0.65);
    const initY = Math.max(30, rect.height * 0.15);

    currentPosRef.current = { x: initX, y: initY };
    gsap.set(outerRef.current, { x: initX, y: initY, opacity: 1 });

    // Ongoing micro zero-gravity bobbing on the satellite float layer
    const microFloat = gsap.to(floatLayerRef.current, {
      y: "+=15",
      x: "+=8",
      rotation: "+=2.5",
      duration: 4.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Start continuous roaming across the hero section
    const startTimer = setTimeout(() => {
      wanderToNextWaypoint();
    }, 400);

    const handleResize = () => {
      const { minX, maxX, minY, maxY } = getBounds();
      const clampedX = Math.min(Math.max(minX, currentPosRef.current.x), maxX);
      const clampedY = Math.min(Math.max(minY, currentPosRef.current.y), maxY);
      currentPosRef.current = { x: clampedX, y: clampedY };
      gsap.to(outerRef.current, {
        x: clampedX,
        y: clampedY,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(startTimer);
      wanderTweenRef.current?.kill();
      microFloat.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [getBounds, wanderToNextWaypoint]);

  // Cursor proximity listener
  useEffect(() => {
    const container = containerRef.current?.parentElement;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();

      // Viewport bounds
      if (
        e.clientX < containerRect.left - 40 ||
        e.clientX > containerRect.right + 40 ||
        e.clientY < containerRect.top - 40 ||
        e.clientY > containerRect.bottom + 40
      ) {
        return;
      }

      const cursorX = e.clientX - containerRect.left;
      const cursorY = e.clientY - containerRect.top;

      const satCenterX = currentPosRef.current.x + 140;
      const satCenterY = currentPosRef.current.y + 105;

      const dist = Math.hypot(cursorX - satCenterX, cursorY - satCenterY);
      const proximityThreshold = 220;

      if (dist < proximityThreshold) {
        evadeFromCursor(cursorX, cursorY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [evadeFromCursor]);

  // Click handler: 360-degree orbital barrel roll and jump to new area
  const handleClick = () => {
    soundController.playPop();

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        rotation: "+=360",
        duration: 1.4,
        ease: "power2.inOut",
      });
    }

    const { minX, maxX, minY, maxY } = getBounds();
    evadeFromCursor(
      minX + Math.random() * (maxX - minX),
      minY + Math.random() * (maxY - minY)
    );
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Outer wrapper controls X/Y translation smoothly across hero section */}
      <div
        ref={outerRef}
        className="absolute top-0 left-0 pointer-events-auto cursor-pointer select-none opacity-0 z-20"
        style={{ willChange: "transform" }}
        onClick={handleClick}
        title="Chandrayaan-2 Satellite: Constantly floating in orbit across lunar space!"
      >
        {/* Inner element handles banking rotation */}
        <div ref={innerRef} className="relative group p-2">
          {/* Animated Thruster Plasma Glow */}
          <div
            ref={thrusterRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-radial from-[#1283c8]/80 via-[#ef7618]/30 to-transparent pointer-events-none opacity-0"
          />

          {/* Micro zero-g float layer */}
          <div ref={floatLayerRef} className="relative">
            {/* Majestic Large Satellite Image */}
            <div className="relative w-52 sm:w-64 md:w-80 lg:w-96 aspect-[4/3] filter drop-shadow-[6px_8px_0_#000000] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/landing-page-assets/Satellite.png"
                alt="Chandrayaan-2 Satellite"
                fill
                priority
                sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
