"use client";

import React, { useState, useEffect, useCallback } from "react";
import { soundController } from "@/utils/soundController";
import { useImageUpload } from "@/hooks/useImageUpload";
import { usePrediction } from "@/hooks/usePrediction";
import { usePredictionContext } from "@/context/PredictionContext";
import { toast } from "sonner";

import { DeckStatusBar } from "./DeckStatusBar";
import { DeckNavDrawer } from "./DeckNavDrawer";
import { StickyNotesModal } from "./StationeryProps";

import { CoverSlide } from "./slides/CoverSlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { SensorsSlide } from "./slides/SensorsSlide";
import { RegistrationSlide } from "./slides/RegistrationSlide";
import { ResultsSlide } from "./slides/ResultsSlide";
import { ArchitectureSlide } from "./slides/ArchitectureSlide";
import { FeasibilitySlide } from "./slides/FeasibilitySlide";
import { ImpactSlide } from "./slides/ImpactSlide";
import { IntroRubLoader } from "./IntroRubLoader";
import { bgmController } from "@/utils/bgmController";
import { ProblemStatementModal } from "@/components/common/ProblemStatementModal";

export function DeckContainer() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev">("next");
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(!bgmController.getIsPlaying());
  const [loadingSample, setLoadingSample] = useState<boolean>(false);
  const [isPSModalOpen, setIsPSModalOpen] = useState<boolean>(false);

  // Synchronize audio mute state with BGM playback
  useEffect(() => {
    const unsubscribe = bgmController.subscribe((playing) => {
      setIsMuted(!playing);
      soundController.setMuted(!playing);
    });
    return () => unsubscribe();
  }, []);

  const {
    referenceFile,
    sourceFile,
    setReferenceFile,
    setSourceFile,
    clearReference,
    clearSource,
  } = useImageUpload();

  const { predict, isLoading, error } = usePrediction();
  const { result, meta, updateResult } = usePredictionContext();

  const slideData = [
    {
      title: "COSMIC VISION",
      subtitle: "Multi-modal lunar correspondence engine for Chandrayaan-2 & ISRO.",
      tag: "OVERVIEW",
      color: "#1283c8",
    },
    {
      title: "THE PROBLEM",
      subtitle: "Sun angle shifts, shadow inversions, and 10× scale variations.",
      tag: "CHALLENGE",
      color: "#ef7618",
    },
    {
      title: "PAYLOAD SUITE",
      subtitle: "OHRC (0.25m), TMC-2 (stereo 5m), IIRS (80m IR), & LRO NAC baseline.",
      tag: "SENSORS",
      color: "#EAEFEF",
    },
    {
      title: "FEASIBILITY & VIABILITY",
      subtitle: "Can we build it? Can it work? Can it scale? Technical & deployment viability.",
      tag: "FEASIBILITY",
      color: "#F3E6D6",
    },
    {
      title: "ML ARCHITECTURE",
      subtitle: "Fine-tuned LoFTR, RANSAC inliers, and SIH26166 compliance.",
      tag: "TECHNICAL",
      color: "#1283c8",
    },
    {
      title: "REGISTRATION LAB",
      subtitle: "Interactive dual dropzones, 1-click sample pair, and LoFTR execution.",
      tag: "STUDIO",
      color: "#BFC9D1",
    },
    {
      title: "CORRESPONDENCE & METRICS",
      subtitle: "Keypoint lines, warped overlays, RMSE, and 3×3 projective homography.",
      tag: "TELEMETRY",
      color: "#EAEFEF",
    },
    {
      title: "IMPACT & ANALYSIS",
      subtitle: "CosmicYaan: Registered lunar imagery, better mapping, analysis, & mission support.",
      tag: "IMPACT",
      color: "#F3E6D6",
    },
  ];

  const totalSlides = slideData.length;
  const slideTitles = slideData.map((s) => s.title);

  // Background color changes based on active slide (exact Nodeck pattern)
  const activeBgColor = slideData[currentSlide]?.color || "#1283c8";

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || isTransitioning) return;
    if (index >= 0 && index < totalSlides) {
      const direction = index > currentSlide ? "next" : "prev";
      setPrevSlide(currentSlide);
      setCurrentSlide(index);
      setTransitionDirection(direction);
      setIsTransitioning(true);

      setTimeout(() => {
        setIsTransitioning(false);
        setPrevSlide(null);
      }, 650);
    }
  }, [currentSlide, isTransitioning, totalSlides]);

  const handlePrev = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  // Audio toggle controller (mutes or starts both BGM and SFX)
  const handleToggleAudio = useCallback(() => {
    const isPlaying = bgmController.getIsPlaying();
    if (isPlaying) {
      bgmController.pause();
      soundController.setMuted(true);
      setIsMuted(true);
      toast("Audio Muted", {
        duration: 1500,
      });
    } else {
      bgmController.play();
      soundController.setMuted(false);
      soundController.playPop();
      setIsMuted(false);
      toast("Audio Started", {
        duration: 1500,
      });
    }
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        soundController.playPop();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        soundController.playPop();
        handlePrev();
      } else if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        soundController.playClick();
        setIsGridOpen((prev) => !prev);
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        soundController.playClick();
        setIsNotesOpen((prev) => !prev);
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        handleToggleAudio();
      } else if (e.key === "Escape") {
        setIsNotesOpen(false);
        setIsGridOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, handleToggleAudio]);

  // Swap slots
  const handleSwap = () => {
    if (referenceFile && sourceFile) {
      const tempRef = referenceFile;
      setReferenceFile(sourceFile);
      setSourceFile(tempRef);
      toast.info("Swapped Reference and Source slots.");
    }
  };

  // Load sample pair from /samples/
  const handleLoadSample = async () => {
    try {
      setLoadingSample(true);
      const [resRef, resSrc] = await Promise.all([
        fetch("/samples/reference_sample.png"),
        fetch("/samples/source_sample.png"),
      ]);

      if (!resRef.ok || !resSrc.ok) {
        throw new Error("Could not load sample lunar images from public folder.");
      }

      const [blobRef, blobSrc] = await Promise.all([
        resRef.blob(),
        resSrc.blob(),
      ]);

      const refFile = new File([blobRef], "chandrayaan2_ref_lunar.png", {
        type: "image/png",
      });
      const srcFile = new File([blobSrc], "chandrayaan2_src_crop.png", {
        type: "image/png",
      });

      setReferenceFile(refFile);
      setSourceFile(srcFile);
      toast.success("Loaded sample Chandrayaan-2 lunar image pair.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load sample.";
      toast.error(msg);
    } finally {
      setLoadingSample(false);
    }
  };

  // Run registration pipeline
  const handleSubmit = async () => {
    if (!referenceFile || !sourceFile) {
      toast.error("Please upload both Reference and Source images.");
      return;
    }

    const res = await predict(referenceFile, sourceFile);

    if (res) {
      soundController.playSuccess();
      toast.success("Registration complete! Displaying sub-pixel telemetry.");

      updateResult(res, {
        referenceName: referenceFile.name,
        sourceName: sourceFile.name,
        referencePreview: URL.createObjectURL(referenceFile),
        sourcePreview: URL.createObjectURL(sourceFile),
      });

      // Automatically advance to Results Slide (Slide index 6)
      goToSlide(6);
    } else {
      toast.error("Registration pipeline encountered an error.");
    }
  };

  const renderSlideContent = (slideIndex: number) => {
    switch (slideIndex) {
      case 0:
        return (
          <CoverSlide
            onGoToStudio={() => goToSlide(5)}
            onGoToProblem={() => goToSlide(1)}
          />
        );
      case 1:
        return (
          <ProblemSlide
            onNext={() => goToSlide(2)}
          />
        );
      case 2:
        return (
          <SensorsSlide
            onGoToStudio={() => goToSlide(5)}
          />
        );
      case 3:
        return <FeasibilitySlide />;
      case 4:
        return <ArchitectureSlide />;
      case 5:
        return (
          <RegistrationSlide
            referenceFile={referenceFile}
            sourceFile={sourceFile}
            onReferenceSelect={setReferenceFile}
            onSourceSelect={setSourceFile}
            onReferenceRemove={clearReference}
            onSourceRemove={clearSource}
            onSwap={handleSwap}
            onLoadSample={handleLoadSample}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            loadingSample={loadingSample}
            error={error}
          />
        );
      case 6:
        return (
          <ResultsSlide
            result={result}
            meta={meta}
            onGoToStudio={() => goToSlide(5)}
          />
        );
      case 7:
        return (
          <ImpactSlide
            onGoToStudio={() => goToSlide(5)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 relative flex flex-col justify-between overflow-x-hidden"
      style={{ backgroundColor: activeBgColor }}
    >
      {/* Drifting Geometric Background Pattern */}
      <div className="background-pattern-wrapper">
        <div className="background-pattern--checker" />
      </div>

      {/* Top Floating Logo / Home Button */}
      <header className="fixed top-3 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => {
            soundController.playPop();
            goToSlide(0);
          }}
          className="pointer-events-auto brutal-card-white py-1.5 px-3 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
        >
          <div className="w-5 h-5 rounded-full bg-[#ef7618] border-2 border-black flex items-center justify-center font-display font-black text-[10px] text-black">
            CV
          </div>
          <span className="font-display font-black text-sm uppercase tracking-tight text-black">
            COSMIC VISION
          </span>
          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ef7618] border border-black text-black">
            ISRO
          </span>
        </button>

        {/* Rub Intro Replay & Mission Badge */}
        <div className="pointer-events-auto flex items-center gap-2 font-mono text-xs font-bold">
          <button
            onClick={() => {
              soundController.playPop();
              setShowIntro(true);
            }}
            className="brutal-badge brutal-badge-white py-1 px-2.5 hover:bg-[#ef7618] transition-colors cursor-pointer"
            title="Replay PS SIH26166 rub intro animation"
          >
            <span>RUB INTRO</span>
          </button>
          <button
            onClick={() => {
              soundController.playPop();
              setIsPSModalOpen(true);
            }}
            className="brutal-badge brutal-badge-navy py-1 px-2.5 hover:bg-[#ef7618] hover:text-black hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0_#000] hidden sm:inline-flex items-center gap-1.5"
            title="Click to view official Problem Statement SIH26166 details"
          >
            <span>PS SIH26166</span>
          </button>
        </div>
      </header>

      {/* Main Slide Stage with 3D Cube Rotation Transition */}
      <main className="cube-viewport flex-1 flex flex-col justify-center items-center pt-14 pb-24 relative z-10 w-full min-h-[calc(100vh-6rem)]">
        <div className="cube-wrapper w-full flex-1 flex items-center justify-center relative">
          {/* Outgoing Slide Face during 3D Cube Rotation */}
          {isTransitioning && prevSlide !== null && (
            <div
              key={`prev-slide-${prevSlide}`}
              className={`cube-face absolute inset-0 w-full h-full flex flex-col items-center justify-center ${
                transitionDirection === "next"
                  ? "cube-animate-out-left"
                  : "cube-animate-out-right"
              }`}
              style={{
                backgroundColor: slideData[prevSlide]?.color || "#ef7618",
              }}
            >
              {renderSlideContent(prevSlide)}
            </div>
          )}

          {/* Incoming / Active Slide Face */}
          <div
            key={`curr-slide-${currentSlide}`}
            className={`cube-face w-full flex-1 flex flex-col items-center justify-center ${
              isTransitioning
                ? transitionDirection === "next"
                  ? "cube-animate-in-right"
                  : "cube-animate-in-left"
                : ""
            }`}
            style={{
              backgroundColor: isTransitioning
                ? slideData[currentSlide]?.color || "#ef7618"
                : "transparent",
            }}
          >
            {renderSlideContent(currentSlide)}
          </div>
        </div>
      </main>

      {/* Bottom Sticky Status Bar */}
      <DeckStatusBar
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelectSlide={goToSlide}
        onToggleNotes={() => setIsNotesOpen(!isNotesOpen)}
        onToggleGrid={() => setIsGridOpen(!isGridOpen)}
        isMuted={isMuted}
        onToggleMute={handleToggleAudio}
        slideTitles={slideTitles}
      />

      {/* Field Notes Modal */}
      <StickyNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />

      {/* Slide Navigation Drawer Grid */}
      <DeckNavDrawer
        isOpen={isGridOpen}
        onClose={() => setIsGridOpen(false)}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
        slideData={slideData}
      />

      {/* Intro Eraser Rub Loading Screen */}
      {showIntro && (
        <IntroRubLoader onComplete={() => setShowIntro(false)} />
      )}

      {/* Official Problem Statement Details Modal (Apple Open Animation) */}
      <ProblemStatementModal
        isOpen={isPSModalOpen}
        onClose={() => setIsPSModalOpen(false)}
      />
    </div>
  );
}
