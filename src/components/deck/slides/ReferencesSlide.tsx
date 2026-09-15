"use client";

import React, { useState, useEffect } from "react";
import { soundController } from "@/utils/soundController";
import { toast } from "sonner";
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Search,
  Orbit,
  Cpu,
  Globe,
  Satellite,
  Flame,
  Pause,
  Play,
  Grid3X3,
  MoveRight,
} from "lucide-react";

interface ReferencesSlideProps {
  onGoToStudio: () => void;
  isActive?: boolean;
}

type FilterCategory = "all" | "papers" | "datasets";

interface ResearchPaper {
  id: string;
  title: string;
  shortTitle: string;
  authors: string;
  venue: string;
  year: string;
  arxivId?: string;
  doi?: string;
  primaryLink: string;
  pdfLink?: string;
  secondaryLink?: string;
  secondaryLabel?: string;
  badge: string;
  badgeColor: string;
  coreInnovation: string;
  keyFindings: string[];
  relevanceToSIH: string;
  bibtex: string;
}

interface DatasetReference {
  id: string;
  name: string;
  fullName: string;
  agency: string;
  resolution: string;
  spectralRange: string;
  format: string;
  description: string;
  keyHighlights: string[];
  portalUrl: string;
  portalLabel: string;
  badgeColor: string;
  tag: string;
}

export function ReferencesSlide({
  onGoToStudio,
  isActive = true,
}: ReferencesSlideProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [datasetViewMode, setDatasetViewMode] = useState<"stream" | "grid">("stream");

  // Re-trigger entrance animation whenever slide becomes active or category changes
  useEffect(() => {
    if (isActive) {
      setAnimKey((prev) => prev + 1);
    }
  }, [isActive, activeCategory]);

  const researchPapers: ResearchPaper[] = [
    {
      id: "paper-geoloftr",
      title:
        "Vision-based Geo-Localization of Future Mars Rotorcraft in Challenging Illumination Conditions",
      shortTitle: "Geo-LoFTR: Geometry-Aided Illumination-Invariant Matching",
      authors: "S. A. Schons, et al. (Robotics & Planetary Exploration)",
      venue: "arXiv preprint (Computer Vision & Robotics)",
      year: "Feb 2025",
      arxivId: "arXiv:2502.09795v1",
      primaryLink: "https://arxiv.org/html/2502.09795v1",
      pdfLink: "https://arxiv.org/pdf/2502.09795v1",
      secondaryLink: "https://arxiv.org/abs/2502.09795",
      secondaryLabel: "arXiv Abstract",
      badge: "GEOMETRY-AIDED LoFTR",
      badgeColor: "bg-[#ef7618] text-black",
      coreInnovation:
        "Geo-LoFTR deep learning model merging multi-scale CNN feature representations with 3D digital elevation models (DTM) and cross-attention.",
      keyFindings: [
        "Eliminates shadow inversion failures across 0°–360° Sun azimuth & 2°–90° Sun elevation angles.",
        "Demonstrates robustness to extreme 10× scale shifts between aerial observations and orbital maps.",
        "Delivers up to 31.8% improvement in localization accuracy under low Sun elevation illumination compared to baseline methods.",
      ],
      relevanceToSIH:
        "Validates the detector-free Transformer (LoFTR) architecture used in Cosmic Vision for Chandrayaan-2 lunar correspondence under severe Sun-angle disparity.",
      bibtex: `@article{schons2025geoloftr,
  title={Vision-based Geo-Localization of Future Mars Rotorcraft in Challenging Illumination Conditions},
  author={Schons, S. A. and others},
  journal={arXiv preprint arXiv:2502.09795},
  year={2025},
  url={https://arxiv.org/html/2502.09795v1}
}`,
    },
    {
      id: "paper-chandrayaan2",
      title:
        "Comparative Evaluation of Traditional and Deep Learning Feature Matching Algorithms using Chandrayaan-2 Lunar Data",
      shortTitle: "Chandrayaan-2 Feature Matching: Classical vs Deep Learning",
      authors: "R. Makharia, J. Singla, N. Dube, H. Sharma, et al.",
      venue: "arXiv preprint / Semantic Scholar Reader",
      year: "Sep 2025",
      arxivId: "arXiv:2509.04775",
      doi: "10.48550/arXiv.2509.04775",
      primaryLink:
        "https://www.semanticscholar.org/reader/1b8d28a807cd247c0f9b3762a36366dd39a52d08",
      secondaryLink: "https://arxiv.org/abs/2509.04775",
      secondaryLabel: "arXiv Abstract",
      badge: "CHANDRAYAAN-2 BENCHMARK",
      badgeColor: "bg-[#1283c8] text-white",
      coreInnovation:
        "Comprehensive empirical evaluation comparing SIFT, ASIFT, AKAZE, and RIFT2 against Deep Learning (SuperGlue & LoFTR) on real Chandrayaan-2 payloads.",
      keyFindings: [
        "Evaluated on Chandrayaan-2 optical (OHRC), hyperspectral (IIRS), and synthetic aperture radar (DFSAR) datasets.",
        "Proves classical detectors (SIFT/AKAZE) severely degrade under extreme solar incidence angles and polar crater shadows.",
        "Deep learning achieves lowest Root Mean Square Error (RMSE), superior inlier retention, and sub-pixel correspondence accuracy.",
      ],
      relevanceToSIH:
        "Direct empirical evidence proving that deep learning correspondence engines decisively outperform legacy SIFT pipelines on actual ISRO Chandrayaan-2 lunar imagery.",
      bibtex: `@article{makharia2025chandrayaan2,
  title={Comparative Evaluation of Traditional and Deep Learning Feature Matching Algorithms using Chandrayaan-2 Lunar Data},
  author={Makharia, R. and Singla, J. and Dube, N. and Sharma, H. and others},
  journal={arXiv preprint arXiv:2509.04775},
  year={2025},
  url={https://www.semanticscholar.org/reader/1b8d28a807cd247c0f9b3762a36366dd39a52d08}
}`,
    },
  ];

  const datasets: DatasetReference[] = [
    {
      id: "ds-ohrc",
      name: "OHRC",
      fullName: "Orbiter High Resolution Camera",
      agency: "ISRO · Chandrayaan-2",
      resolution: "0.25 m / pixel (from 100 km orbit)",
      spectralRange: "Panchromatic (0.45 – 0.68 µm)",
      format: "PDS4 Standard (.IMG / GeoTIFF)",
      description:
        "Highest resolution optical imagery ever flown to the Moon. Captures ultra-fine boulder fields, crater rims, and potential landing hazard zones.",
      keyHighlights: [
        "12 km × 3 km swath strip per orbital track",
        "Sub-meter resolution for ground hazard identification",
        "Primary moving source frame in Cosmic Vision pipeline",
      ],
      portalUrl: "https://pradan.issdc.gov.in/ch2/",
      portalLabel: "ISSDC PRADAN Portal",
      badgeColor: "bg-[#ef7618] text-black",
      tag: "OPTICAL 0.25m",
    },
    {
      id: "ds-tmc2",
      name: "TMC-2",
      fullName: "Terrain Mapping Camera-2",
      agency: "ISRO · Chandrayaan-2",
      resolution: "5 m / pixel ground sampling distance",
      spectralRange: "Visible / NIR (0.50 – 0.85 µm)",
      format: "PDS4 Stereo Triplets & 3D DEMs",
      description:
        "Stereo triplets (Fore +26°, Nadir, Aft -26°) providing continuous high-precision 3D digital elevation models (DEM) of lunar morphology.",
      keyHighlights: [
        "20 km swath coverage per strip",
        "Stereo elevation generation across lunar rilles & craters",
        "Essential for 3D terrain rectification & relief alignment",
      ],
      portalUrl: "https://chmapbrowse.issdc.gov.in/",
      portalLabel: "Chandrayaan-2 Map Browse",
      badgeColor: "bg-[#1283c8] text-white",
      tag: "STEREO DEM 5m",
    },
    {
      id: "ds-iirs",
      name: "IIRS",
      fullName: "Imaging Infrared Spectrometer",
      agency: "ISRO · Chandrayaan-2",
      resolution: "~80 m / pixel spatial resolution",
      spectralRange: "256 Contiguous Bands (0.8 – 5.0 µm)",
      format: "Calibrated Radiance & Reflectance Cubes",
      description:
        "Hyperspectral sensor mapping lunar mineralogy (pyroxene, olivine, plagioclase) and surface hydroxyl/water-ice absorption features at 2.8–3.0 µm.",
      keyHighlights: [
        "Full NIR to MWIR lunar coverage",
        "Cross-modal correspondence validation with optical frames",
        "Enables multi-sensor spectral-to-optical registration",
      ],
      portalUrl: "https://pradan.issdc.gov.in/ch2/",
      portalLabel: "ISSDC Planetary Archive",
      badgeColor: "bg-emerald-700 text-white",
      tag: "HYPERSPECTRAL 80m",
    },
    {
      id: "ds-portals",
      name: "ISRO Portals",
      fullName: "ISSDC PRADAN & SAC Geospatial Services",
      agency: "ISRO / DOS / SAC / NRSC",
      resolution: "Global Lunar & Polar Coverage",
      spectralRange: "Optical, Hyperspectral, Radar (DFSAR)",
      format: "IAU 2015 Lunar Selenographic Coordinates",
      description:
        "Official Indian Space Science Data Centre (ISSDC) PRADAN portal and Space Applications Centre (SAC) geodetic baselines for Chandrayaan missions.",
      keyHighlights: [
        "Peer-validated scientific data products (Level-1 to Level-2)",
        "Searchable via Chandrayaan-2 Map Browse footprint viewer",
        "Cross-referenced against NASA LRO NAC (0.5m) baseline maps",
      ],
      portalUrl: "https://chmapbrowse.issdc.gov.in/",
      portalLabel: "Explore ISSDC Map Browse",
      badgeColor: "bg-purple-700 text-white",
      tag: "OFFICIAL ARCHIVE",
    },
  ];

  // Duplicated datasets for seamless infinite left-to-right looping marquee
  const marqueeDatasets = [...datasets, ...datasets, ...datasets];

  const handleCopyCitation = (paper: ResearchPaper) => {
    soundController.playPop();
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedId(paper.id);
    toast.success(`Copied BibTeX citation for "${paper.shortTitle}"!`, {
      duration: 2500,
    });
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const filteredPapers =
    activeCategory === "all" || activeCategory === "papers"
      ? researchPapers
      : [];
  const showDatasets =
    activeCategory === "all" || activeCategory === "datasets";

  const renderDatasetCard = (ds: DatasetReference, uniqueKey: string) => (
    <div
      key={uniqueKey}
      className="brutal-card p-3.5 sm:p-4 bg-[#FAF7F2] shadow-[3px_3px_0_#000] sm:shadow-[4px_4px_0_#000] border-3 border-black rounded-xl flex flex-col justify-between w-[265px] xs:w-[285px] sm:w-[310px] shrink-0 text-left hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all cursor-default"
    >
      <div>
        {/* Top Tag & Mission */}
        <div className="flex items-center justify-between border-b-2 border-black/15 pb-2 mb-2.5">
          <span
            className={`font-mono text-[10px] font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0_#000] ${ds.badgeColor}`}
          >
            {ds.tag}
          </span>
          <span className="font-mono text-[10px] font-bold text-black/60">
            {ds.agency}
          </span>
        </div>

        {/* Sensor / Dataset Name */}
        <h4 className="font-display font-black text-base sm:text-lg uppercase text-black leading-tight mb-0.5">
          {ds.name}
        </h4>
        <p className="font-mono text-[10px] sm:text-[11px] font-bold text-black/70 mb-2 line-clamp-1">
          {ds.fullName}
        </p>

        {/* Specs badge pill */}
        <div className="p-2 bg-white border border-black rounded-md mb-2 text-[10px] font-mono space-y-0.5 shadow-[1px_1px_0_#000]">
          <div>
            <strong className="text-[#ef7618]">Res:</strong>{" "}
            <span>{ds.resolution}</span>
          </div>
          <div>
            <strong className="text-[#1283c8]">Spectral:</strong>{" "}
            <span className="line-clamp-1">{ds.spectralRange}</span>
          </div>
          <div>
            <strong className="text-black">Format:</strong>{" "}
            <span>{ds.format}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-[11px] text-black/85 font-medium leading-snug mb-2 line-clamp-3">
          {ds.description}
        </p>
      </div>

      {/* Portal Button */}
      <div className="mt-2 pt-2 border-t border-black/10">
        <a
          href={ds.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundController.playClick()}
          className="brutal-btn-white w-full py-1.5 px-2.5 text-[11px] font-mono font-bold flex items-center justify-between hover:bg-[#1283c8] hover:text-white transition-colors"
        >
          <span className="line-clamp-1">{ds.portalLabel}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col justify-start items-center px-4 sm:px-8 py-6 relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        {/* Title Header with Split Color Underline */}
        <h2 className="font-display text-2xl xs:text-3xl sm:text-5xl uppercase font-black tracking-tight text-black mb-1">
          <span className="text-[#ef7618] border-b-4 border-[#ef7618] pb-0.5">
            References
          </span>
          <span className="text-black mx-2">&</span>
          <span className="text-[#1283c8] border-b-4 border-[#1283c8] pb-0.5">
            Datasets
          </span>
        </h2>

        {/* Subtitle Badge: Cosmic Vision */}
        <div className="my-2 sm:my-2.5 flex items-center justify-center gap-2 sm:gap-3">
          <span className="font-display text-lg xs:text-xl sm:text-2xl font-black tracking-wider uppercase">
            <span className="text-[#ef7618]">Cosmic</span>
            <span className="text-[#1283c8]">Vision</span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 bg-black text-white rounded shadow-[1px_1px_0_#000]">
            PEER-REVIEWED & ISRO
          </span>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 mt-2">
          <button
            onClick={() => {
              soundController.playClick();
              setActiveCategory("all");
            }}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] xs:text-xs font-mono font-black border-2 border-black transition-all ${
              activeCategory === "all"
                ? "bg-black text-white shadow-[2px_2px_0_#ef7618] sm:shadow-[3px_3px_0_#ef7618] -translate-y-0.5"
                : "bg-white text-black hover:bg-[#BFC9D1]/30 shadow-[2px_2px_0_#000]"
            }`}
          >
            ALL ({researchPapers.length + datasets.length})
          </button>
          <button
            onClick={() => {
              soundController.playClick();
              setActiveCategory("papers");
            }}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] xs:text-xs font-mono font-black border-2 border-black transition-all ${
              activeCategory === "papers"
                ? "bg-[#ef7618] text-black shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] -translate-y-0.5"
                : "bg-white text-black hover:bg-[#ef7618]/20 shadow-[2px_2px_0_#000]"
            }`}
          >
            PAPERS ({researchPapers.length})
          </button>
          <button
            onClick={() => {
              soundController.playClick();
              setActiveCategory("datasets");
            }}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[10px] xs:text-xs font-mono font-black border-2 border-black transition-all ${
              activeCategory === "datasets"
                ? "bg-[#1283c8] text-white shadow-[2px_2px_0_#000] sm:shadow-[3px_3px_0_#000] -translate-y-0.5"
                : "bg-white text-black hover:bg-[#1283c8]/20 shadow-[2px_2px_0_#000]"
            }`}
          >
            DATASETS ({datasets.length})
          </button>
        </div>

        {/* SECTION 1: RESEARCH PAPERS (Enters with smooth motion from the opposite right side) */}
        {filteredPapers.length > 0 && (
          <div className="text-left mb-8">
            <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-2 mb-4 gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#ef7618] stroke-[2.5]" />
                <h3 className="font-display text-lg sm:text-xl font-black uppercase text-black">
                  Foundational Peer-Reviewed Research Papers
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#FAF7F2] border border-black rounded text-black hidden sm:inline-block shadow-[1px_1px_0_#000]">
                  CONVERGING INWARD (LEFT ➔ ⸱  RIGHT)
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-white rounded">
                  2 PAPERS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredPapers.map((paper, idx) => {
                const isLeft = idx === 0;
                return (
                  <div
                    key={`paper-${animKey}-${paper.id}`}
                    className={`brutal-card p-4 sm:p-5 bg-[#FAF7F2] shadow-[4px_4px_0_#000] sm:shadow-[5px_5px_0_#000] border-3 border-black rounded-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_#000] ${
                      isLeft ? "animate-paper-in-left" : "animate-paper-in-right"
                    }`}
                  >
                    <div>
                      {/* Card Top Metadata Bar */}
                      <div className="flex items-center justify-between border-b-2 border-black/15 pb-2.5 mb-3 gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[11px] font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0_#000] ${paper.badgeColor}`}
                          >
                            {paper.badge}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-black/70">
                            {paper.year}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopyCitation(paper)}
                          className="brutal-btn-white py-1 px-2.5 text-[11px] font-mono font-bold flex items-center gap-1 hover:bg-[#ef7618] hover:text-black transition-colors shadow-[1px_1px_0_#000]"
                          title="Copy BibTeX citation to clipboard"
                        >
                          {copiedId === paper.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                              <span>COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>CITE BIBTEX</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Paper Title: Clean readable title-case styling with refined display font */}
                      <h4 className="font-display font-extrabold text-sm xs:text-base sm:text-lg text-black leading-snug tracking-tight mb-2 normal-case">
                        &ldquo;{paper.title}&rdquo;
                      </h4>

                      {/* Authors & Venue */}
                      <div className="mb-3 space-y-1">
                        <p className="font-sans text-xs font-semibold text-black/80">
                          {paper.authors}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1283c8]/10 border border-[#1283c8]/30 text-[#1283c8] font-mono text-[11px] font-bold">
                          <span>{paper.venue}</span>
                        </div>
                      </div>

                      {/* Core Innovation Box */}
                      <div className="p-3 bg-white border-2 border-black rounded-lg mb-3 shadow-[2px_2px_0_#000]">
                        <span className="block font-mono text-[10px] font-bold uppercase text-[#ef7618] tracking-wider mb-1">
                          CORE INNOVATION & ARCHITECTURE
                        </span>
                        <p className="font-sans text-xs sm:text-[13px] text-black/90 font-medium leading-relaxed">
                          {paper.coreInnovation}
                        </p>
                      </div>

                      {/* Key Findings Bullet Points */}
                      <div className="space-y-1.5 mb-3">
                        <span className="block font-mono text-[10px] font-bold uppercase text-black/60 tracking-wider">
                          KEY EMPIRICAL FINDINGS
                        </span>
                        {paper.keyFindings.map((finding, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs font-sans text-black/85 font-normal leading-relaxed"
                          >
                            <span className="font-mono font-bold text-[#ef7618] shrink-0 mt-0.5">
                              ▶
                            </span>
                            <span>{finding}</span>
                          </div>
                        ))}
                      </div>

                      {/* Direct Relevance to SIH26166 */}
                      <div className="pt-2.5 border-t-2 border-dashed border-black/20 text-xs font-sans">
                        <span className="font-mono text-[10px] font-bold uppercase text-[#1283c8] block mb-0.5">
                          SIH26166 APPLICATION & BENCHMARK
                        </span>
                        <p className="text-black/80 font-normal leading-relaxed">
                          {paper.relevanceToSIH}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="mt-4 pt-3 border-t border-black/15 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <a
                          href={paper.primaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundController.playClick()}
                          className="brutal-btn-orange text-xs font-mono font-bold py-1.5 px-3 flex items-center gap-1.5 shadow-[2px_2px_0_#000] hover:scale-105 transition-transform"
                        >
                          <span>READ PAPER</span>
                          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                        </a>

                        {paper.pdfLink && (
                          <a
                            href={paper.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => soundController.playClick()}
                            className="brutal-btn-white text-xs font-mono font-bold py-1.5 px-2.5 flex items-center gap-1 hover:bg-[#ef7618] transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </a>
                        )}
                      </div>

                      {paper.secondaryLink && (
                        <a
                          href={paper.secondaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundController.playClick()}
                          className="text-[11px] font-mono font-bold text-black/70 hover:text-black underline flex items-center gap-1"
                        >
                          <span>{paper.secondaryLabel || "Abstract"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 2: ISRO DATASETS (Continuous Left-to-Right Moving Stream) */}
        {showDatasets && (
          <div className="text-left mb-6">
            <div className="flex flex-wrap items-center justify-between border-b-2 border-black pb-2 mb-3 gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#1283c8] stroke-[2.5]" />
                <h3 className="font-display text-lg sm:text-xl font-black uppercase text-black">
                  Official ISRO Chandrayaan-2 Datasets & Planetary Archives
                </h3>
              </div>

              {/* Ticker Controls: Left-to-Right stream badge + Pause/Resume & View mode */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1283c8] text-white font-mono text-[11px] font-bold border border-black shadow-[1px_1px_0_#000]">
                  <MoveRight className="w-3.5 h-3.5 animate-pulse text-[#ef7618]" />
                  <span>ORBITING: LEFT ➔ RIGHT</span>
                </div>

                <button
                  onClick={() => {
                    soundController.playPop();
                    setIsMarqueePaused(!isMarqueePaused);
                  }}
                  className="brutal-btn-white py-1 px-2.5 text-xs font-mono font-bold flex items-center gap-1 hover:bg-[#ef7618]"
                  title={isMarqueePaused ? "Resume continuous movement" : "Pause continuous movement"}
                >
                  {isMarqueePaused ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>RESUME</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>PAUSE</span>
                    </>
                  )}
                </button>

                {activeCategory === "datasets" && (
                  <button
                    onClick={() => {
                      soundController.playClick();
                      setDatasetViewMode(datasetViewMode === "stream" ? "grid" : "stream");
                    }}
                    className="brutal-btn-white py-1 px-2 text-xs font-mono font-bold flex items-center gap-1"
                    title="Toggle Stream or Grid view"
                  >
                    <Grid3X3 className="w-3.5 h-3.5" />
                    <span>{datasetViewMode === "stream" ? "GRID" : "STREAM"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Continuous Left-to-Right Scrolling Marquee Container */}
            {datasetViewMode === "stream" ? (
              <div className="relative w-full overflow-hidden pause-on-hover py-2 px-1">
                {/* Edge fade gradient masks */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F3E6D6] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F3E6D6] to-transparent z-10 pointer-events-none" />

                {/* The continuous left-to-right track */}
                <div
                  className={`animate-marquee-ltr ${
                    isMarqueePaused ? "animate-marquee-ltr-paused" : ""
                  }`}
                  style={{ gap: "1rem" }}
                >
                  {marqueeDatasets.map((ds, idx) =>
                    renderDatasetCard(ds, `marquee-${idx}`)
                  )}
                </div>

                <div className="text-center mt-2 font-mono text-[10px] text-black/60 font-bold flex items-center justify-center gap-1.5">
                  <span>💡 Tip: Hover anywhere over the cards to pause the stream</span>
                </div>
              </div>
            ) : (
              /* Stationary Grid View */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {datasets.map((ds) => renderDatasetCard(ds, `grid-${ds.id}`))}
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA & Mission Alignment Strip */}
        <div className="brutal-card p-4 bg-white border-2 border-black shadow-[4px_4px_0_#000] flex flex-wrap items-center justify-between gap-4 text-left max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ef7618] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0_#000]">
              <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <h4 className="font-display font-black text-sm uppercase text-black">
                Grounded in Peer-Reviewed Science & Official ISRO Missions
              </h4>
              <p className="font-sans text-xs text-black/70 font-medium">
                Combining Geo-LoFTR geometry-aided transformer matching with real
                Chandrayaan-2 lunar imagery.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundController.playPop();
                onGoToStudio();
              }}
              className="brutal-btn-orange text-xs font-display font-black py-2.5 px-4 shadow-[3px_3px_0_#000] hover:shadow-[1px_1px_0_#000] flex items-center gap-1.5 shrink-0"
            >
              <span>RUN IN LAB</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
