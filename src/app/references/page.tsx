"use client";

import React, { useState } from "react";
import Link from "next/link";
import { soundController } from "@/utils/soundController";
import { toast } from "sonner";
import {
  BookOpen,
  Database,
  ExternalLink,
  Copy,
  Check,
  FileText,
  ArrowRight,
  ShieldCheck,
  Layers,
  Orbit,
  Sparkles,
  Satellite,
  Compass,
  MoveRight,
  Pause,
  Play,
  Grid3X3,
} from "lucide-react";

export default function ReferencesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [datasetViewMode, setDatasetViewMode] = useState<"stream" | "grid">("stream");

  const researchPapers = [
    {
      id: "paper-geoloftr",
      title:
        "Vision-based Geo-Localization of Future Mars Rotorcraft in Challenging Illumination Conditions",
      shortTitle: "Geo-LoFTR: Geometry-Aided Illumination-Invariant Matching",
      authors: "S. A. Schons, et al.",
      venue: "arXiv:2502.09795v1 [cs.RO, cs.CV]",
      date: "February 2025",
      primaryUrl: "https://arxiv.org/html/2502.09795v1",
      pdfUrl: "https://arxiv.org/pdf/2502.09795v1",
      abstractUrl: "https://arxiv.org/abs/2502.09795",
      badge: "GEOMETRY-AIDED LoFTR",
      badgeColor: "bg-[#ef7618] text-black",
      coreIdea:
        "Geo-LoFTR extends detector-free transformer matching by incorporating 3D Digital Terrain Models (DTM) and multi-scale CNN backbones via cross-attention, eliminating shadow-induced degeneracy.",
      keyMetrics: [
        "Tested across 0°–360° Sun azimuth and 2°–90° elevation angles",
        "Tolerates 10× scale variations between aerial views and orbital maps",
        "Up to 31.8% accuracy gain under low solar elevation angles",
      ],
      sihSignificance:
        "Provides the theoretical and architectural proof for Cosmic Vision's LoFTR-based correspondence pipeline when registering extreme Sun-angle and multi-scale lunar images.",
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
      venue: "arXiv:2509.04775 [cs.CV] / Semantic Scholar",
      date: "September 2025",
      primaryUrl:
        "https://www.semanticscholar.org/reader/1b8d28a807cd247c0f9b3762a36366dd39a52d08",
      abstractUrl: "https://arxiv.org/abs/2509.04775",
      badge: "CHANDRAYAAN-2 BENCHMARK",
      badgeColor: "bg-[#1283c8] text-white",
      coreIdea:
        "Comprehensive benchmark testing classical algorithms (SIFT, ASIFT, AKAZE, RIFT2) versus deep learning models (SuperGlue & LoFTR) on actual ISRO Chandrayaan-2 optical, infrared, and radar imagery.",
      keyMetrics: [
        "Evaluated on Chandrayaan-2 OHRC, TMC-2, IIRS, and DFSAR radar data",
        "Proves classical SIFT degrades severely in polar craters & shadow rims",
        "Deep learning achieves lowest RMSE and highest inlier retention",
      ],
      sihSignificance:
        "Empirical proof directly addressing SIH26166: conventional keypoint detectors fail under lunar polar lighting, while deep learning delivers sub-pixel correspondence accuracy.",
      bibtex: `@article{makharia2025chandrayaan2,
  title={Comparative Evaluation of Traditional and Deep Learning Feature Matching Algorithms using Chandrayaan-2 Lunar Data},
  author={Makharia, R. and Singla, J. and Dube, N. and Sharma, H. and others},
  journal={arXiv preprint arXiv:2509.04775},
  year={2025},
  url={https://www.semanticscholar.org/reader/1b8d28a807cd247c0f9b3762a36366dd39a52d08}
}`,
    },
  ];

  const datasets = [
    {
      name: "OHRC",
      fullName: "Orbiter High Resolution Camera",
      agency: "ISRO / Chandrayaan-2",
      resolution: "0.25 m / pixel",
      wavelength: "Panchromatic (0.45 – 0.68 µm)",
      format: "PDS4 Standard (.IMG / GeoTIFF)",
      role: "Source Moving Frame",
      description:
        "Highest resolution lunar optical camera ever deployed. Used for sub-pixel boulder identification, landing site safety, and small-crater geometric correspondence.",
      portalUrl: "https://pradan.issdc.gov.in/ch2/",
      portalName: "ISSDC PRADAN Archive",
      badgeColor: "bg-[#ef7618] text-black",
    },
    {
      name: "TMC-2",
      fullName: "Terrain Mapping Camera-2",
      agency: "ISRO / Chandrayaan-2",
      resolution: "5.0 m / pixel",
      wavelength: "Panchromatic (0.50 – 0.85 µm)",
      format: "Stereo Triplets & 3D DEMs",
      role: "Stereo Topography Source",
      description:
        "Generates seamless 3D digital elevation models across impact craters, rilles, and peaks via fore (+26°), nadir, and aft (-26°) stereo triplet imaging.",
      portalUrl: "https://chmapbrowse.issdc.gov.in/",
      portalName: "Chandrayaan-2 Map Browse",
      badgeColor: "bg-[#1283c8] text-white",
    },
    {
      name: "IIRS",
      fullName: "Imaging Infrared Spectrometer",
      agency: "ISRO / Chandrayaan-2",
      resolution: "~80 m / pixel",
      wavelength: "256 Bands (0.8 – 5.0 µm)",
      format: "Calibrated Radiance & Reflectance Cubes",
      role: "Cross-Modal Source",
      description:
        "Captures hyperspectral bands to detect signature lunar hydroxyl (OH/H2O) absorption features and mineralogical structures at the South Pole.",
      portalUrl: "https://pradan.issdc.gov.in/ch2/",
      portalName: "ISSDC Planetary Repository",
      badgeColor: "bg-emerald-700 text-white",
    },
    {
      name: "ISSDC & SAC Portals",
      fullName: "ISRO Planetary Archives & Map Services",
      agency: "ISRO / DOS / SAC / NRSC",
      resolution: "Global Lunar Coverage",
      wavelength: "Multi-Sensor (Optical / IR / SAR)",
      format: "IAU 2015 Selenographic Coordinates",
      role: "Official Mission Repositories",
      description:
        "Primary portals hosting Level-1 and Level-2 calibrated Chandrayaan-2 datasets, footprint browse queries, and planetary cartographic geodetic datums.",
      portalUrl: "https://chmapbrowse.issdc.gov.in/",
      portalName: "ISSDC Geospatial Services",
      badgeColor: "bg-purple-700 text-white",
    },
  ];

  // Duplicated datasets for continuous marquee
  const marqueeDatasets = [...datasets, ...datasets, ...datasets];

  const handleCopyCitation = (paper: (typeof researchPapers)[0]) => {
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

  const renderDatasetCard = (ds: (typeof datasets)[0], key: string) => (
    <div
      key={key}
      className="brutal-card p-5 bg-white border-3 border-black shadow-[4px_4px_0_#000] flex flex-col justify-between w-[285px] sm:w-[310px] shrink-0 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all cursor-default"
    >
      <div>
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-2 mb-2.5">
          <span
            className={`font-display font-black text-xs px-2 py-0.5 rounded border border-black ${ds.badgeColor}`}
          >
            {ds.name}
          </span>
          <span className="font-mono text-[10px] font-bold text-black/70">
            {ds.role}
          </span>
        </div>

        <h4 className="font-display font-black text-base uppercase text-black mb-1 line-clamp-1">
          {ds.fullName}
        </h4>
        <p className="font-mono text-xs font-bold text-black/60 mb-2">
          {ds.agency}
        </p>

        <div className="p-2.5 bg-[#FAF7F2] border border-black rounded-lg mb-2.5 font-mono text-[11px] space-y-1 shadow-[1px_1px_0_#000]">
          <div>
            <strong className="text-[#ef7618]">Resolution:</strong>{" "}
            <span>{ds.resolution}</span>
          </div>
          <div>
            <strong className="text-[#1283c8]">Spectral:</strong>{" "}
            <span className="line-clamp-1">{ds.wavelength}</span>
          </div>
          <div>
            <strong className="text-black">Format:</strong>{" "}
            <span>{ds.format}</span>
          </div>
        </div>

        <p className="font-sans text-xs text-black/80 font-medium leading-relaxed mb-3 line-clamp-3">
          {ds.description}
        </p>
      </div>

      <div className="pt-2.5 border-t border-black/10">
        <a
          href={ds.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundController.playClick()}
          className="brutal-btn-white w-full py-1.5 px-3 text-xs font-mono font-bold flex items-center justify-between hover:bg-[#1283c8] hover:text-white transition-colors"
        >
          <span className="line-clamp-1">{ds.portalName}</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 overflow-x-hidden">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <div className="brutal-badge brutal-badge-orange mb-4 font-mono font-bold text-xs tracking-widest shadow-[3px_3px_0_#000]">
          <BookOpen className="w-4 h-4" />
          <span>SCIENTIFIC FOUNDATIONS // PS SIH26166</span>
        </div>

        <h1 className="font-display text-3xl sm:text-6xl uppercase font-black tracking-tight text-black mb-4">
          References & Datasets
        </h1>
        <p className="font-sans text-xs sm:text-base text-black/80 font-medium leading-relaxed max-w-2xl mx-auto">
          Academic literature establishing geometric deep learning under challenging
          space illumination conditions and official ISRO Chandrayaan-2 data archives.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            onClick={() => soundController.playPop()}
            className="brutal-btn py-2 sm:py-2.5 px-4 sm:px-5 text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <span>OPEN SLIDE DECK</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            onClick={() => soundController.playClick()}
            className="brutal-btn-white py-2 sm:py-2.5 px-4 sm:px-5 text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <span>ABOUT MISSION & PS</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: RESEARCH PAPERS (Paper 1 from Left, Paper 2 from Right) */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between border-b-3 border-black pb-3 gap-2">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-[#ef7618] stroke-[2.5]" />
            <h2 className="font-display text-xl sm:text-3xl uppercase font-black text-black">
              Peer-Reviewed Research Papers
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-[#FAF7F2] border border-black rounded text-black hidden sm:inline-block shadow-[1px_1px_0_#000]">
              CONVERGING INWARD (LEFT ➔ ⸱  RIGHT)
            </span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-white rounded">
              2 PUBLICATIONS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {researchPapers.map((paper, idx) => {
            const isLeft = idx === 0;
            return (
              <div
                key={paper.id}
                className={`brutal-card p-4 sm:p-6 bg-[#FAF7F2] border-3 border-black shadow-[4px_4px_0_#000] sm:shadow-[6px_6px_0_#000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[8px_8px_0_#000] transition-all duration-300 ${
                  isLeft ? "animate-paper-in-left" : "animate-paper-in-right"
                }`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between border-b-2 border-black/15 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs font-black px-2 py-0.5 rounded border border-black shadow-[1px_1px_0_#000] ${paper.badgeColor}`}
                      >
                        {paper.badge}
                      </span>
                      <span className="font-mono text-xs font-bold text-black/70">
                        {paper.date}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyCitation(paper)}
                      className="brutal-btn-white py-1 px-2.5 text-xs font-mono font-bold flex items-center gap-1 hover:bg-[#ef7618] hover:text-black transition-colors shadow-[1px_1px_0_#000]"
                      title="Copy citation to clipboard"
                    >
                      {copiedId === paper.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                          <span>COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>CITE BIBTEX</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Paper Title: Refined typography */}
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-black leading-snug tracking-tight mb-2 normal-case">
                    &ldquo;{paper.title}&rdquo;
                  </h3>

                  {/* Authors & Venue */}
                  <div className="mb-4 space-y-1">
                    <p className="font-sans text-xs font-semibold text-black/80">
                      {paper.authors}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1283c8]/10 border border-[#1283c8]/30 text-[#1283c8] font-mono text-[11px] font-bold">
                      <span>{paper.venue}</span>
                    </div>
                  </div>

                  {/* Core Idea Box */}
                  <div className="p-3.5 bg-white border-2 border-black rounded-lg mb-4 shadow-[2px_2px_0_#000]">
                    <span className="block font-mono text-[10px] font-bold uppercase text-[#ef7618] tracking-wider mb-1">
                      METHODOLOGY & CONTRIBUTIONS
                    </span>
                    <p className="font-sans text-xs sm:text-[13px] text-black/90 font-medium leading-relaxed">
                      {paper.coreIdea}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-1.5 mb-4">
                    <span className="block font-mono text-[10px] font-bold uppercase text-black/60 tracking-wider">
                      KEY FINDINGS
                    </span>
                    {paper.keyMetrics.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs font-sans text-black/85 font-normal leading-relaxed"
                      >
                        <span className="font-mono font-bold text-[#ef7618] shrink-0 mt-0.5">
                          ▶
                        </span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>

                  {/* SIH Relevance */}
                  <div className="pt-3 border-t-2 border-dashed border-black/20 text-xs font-sans">
                    <strong className="font-mono text-[10px] uppercase text-[#1283c8] block mb-0.5">
                      SIH26166 APPLICATION & BENCHMARK
                    </strong>
                    <p className="text-black/80 font-normal leading-relaxed">
                      {paper.sihSignificance}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-black/15 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={paper.primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundController.playClick()}
                      className="brutal-btn-orange text-xs font-mono font-bold py-1.5 px-3 flex items-center gap-1.5 shadow-[2px_2px_0_#000]"
                    >
                      <span>READ PAPER</span>
                      <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                    </a>

                    {paper.pdfUrl && (
                      <a
                        href={paper.pdfUrl}
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

                  {paper.abstractUrl && (
                    <a
                      href={paper.abstractUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-black/70 hover:text-black underline flex items-center gap-1"
                    >
                      <span>Abstract</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: ISRO DATASETS (Continuous Left-to-Right Moving Marquee Stream) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between border-b-3 border-black pb-3 gap-2">
          <div className="flex items-center gap-2.5">
            <Database className="w-6 h-6 text-[#1283c8] stroke-[2.5]" />
            <h2 className="font-display text-2xl sm:text-3xl uppercase font-black text-black">
              Chandrayaan-2 Payloads & ISRO Repositories
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1283c8] text-white font-mono text-xs font-bold border border-black shadow-[1px_1px_0_#000]">
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

            <button
              onClick={() => {
                soundController.playClick();
                setDatasetViewMode(datasetViewMode === "stream" ? "grid" : "stream");
              }}
              className="brutal-btn-white py-1 px-2.5 text-xs font-mono font-bold flex items-center gap-1"
              title="Toggle Stream or Grid view"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>{datasetViewMode === "stream" ? "GRID" : "STREAM"}</span>
            </button>
          </div>
        </div>

        {/* Continuous Stream Container */}
        {datasetViewMode === "stream" ? (
          <div className="relative w-full overflow-hidden pause-on-hover py-3">
            {/* Gradient Edge Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F3E6D6] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F3E6D6] to-transparent z-10 pointer-events-none" />

            {/* Left to Right Infinite Marquee */}
            <div
              className={`animate-marquee-ltr ${
                isMarqueePaused ? "animate-marquee-ltr-paused" : ""
              }`}
              style={{ gap: "1rem" }}
            >
              {marqueeDatasets.map((ds, idx) =>
                renderDatasetCard(ds, `stream-${idx}`)
              )}
            </div>

            <div className="text-center mt-2 font-mono text-[11px] text-black/60 font-bold">
              💡 Hover over any dataset card to pause the continuous orbit
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {datasets.map((ds) => renderDatasetCard(ds, `static-${ds.name}`))}
          </div>
        )}
      </div>

      {/* External Ground Truth Cross-Reference */}
      <div className="brutal-card p-6 bg-[#FAF7F2] border-3 border-black shadow-[6px_6px_0_#000]">
        <div className="flex items-center gap-3 mb-4">
          <Orbit className="w-6 h-6 text-[#1283c8] stroke-[2.5]" />
          <div>
            <h3 className="font-display text-lg sm:text-xl uppercase font-black text-black">
              Ground Truth & Planetary Reference Baselines
            </h3>
            <p className="font-sans text-xs text-black/70 font-medium">
              Registered lunar data requires rigid geodetic control and comparison
              against NASA and international orbital reference catalogs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono font-bold">
          <a
            href="https://pradan.issdc.gov.in/ch2/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border-2 border-black rounded-lg flex items-center justify-between hover:bg-[#ef7618] hover:text-black transition-colors shadow-[2px_2px_0_#000]"
          >
            <span>ISSDC PRADAN Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://chmapbrowse.issdc.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border-2 border-black rounded-lg flex items-center justify-between hover:bg-[#1283c8] hover:text-white transition-colors shadow-[2px_2px_0_#000]"
          >
            <span>Chandrayaan-2 Map Browse</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://lroc.im-ldi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white border-2 border-black rounded-lg flex items-center justify-between hover:bg-[#ef7618] hover:text-black transition-colors shadow-[2px_2px_0_#000]"
          >
            <span>NASA LROC Catalog</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
