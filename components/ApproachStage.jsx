"use client";

import React, { useState, useEffect, useRef } from "react";
import RollingButton from "@/components/ui/RollingButton";
import { soundFx } from "@/lib/sound";

export default function ApproachStage() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const steps = [
    {
      num: "01",
      phaseName: "PHASE 01",
      title: "DISCOVERY & STRATEGY",
      subtitle: "DEFINING ARCHITECTURE & CORE GOALS",
      summary:
        "Every engagement begins with radical clarity. We conduct technical discovery, define core business requirements, map user journeys, and establish non-negotiable performance benchmarks before engineering.",
      tag: "PHASE 01 // STRATEGY",
      deliverable: "Technical Blueprint & Architecture Spec",
      codeSnippet: `// 01. FULL SPHERE // SYSTEM BLUEPRINT
const projectArchitecture = {
  client: "Enterprise Partner",
  scope: ["Website Dev", "Mobile App", "UI/UX", "Custom Software"],
  discoveryStatus: "COMPLETE & ALIGNED",
  performanceTargets: {
    firstContentfulPaint: "< 0.4s",
    coreWebVitals: "100/100",
    uptimeSLA: "99.99%"
  },
  nextPhase: "DESIGN & PROTOTYPING"
};`,
    },
    {
      num: "02",
      phaseName: "PHASE 02",
      title: "UI/UX & DESIGN SYSTEMS",
      subtitle: "CONVERSION-FOCUSED DIGITAL CRAFT",
      summary:
        "We craft bespoke design systems tailored to your brand identity. Zero generic templates. Every typographic scale, micro-interaction, responsive layout, and contrast token is meticulously engineered.",
      tag: "PHASE 02 // CRAFT",
      deliverable: "Figma Component System & Motion Guidelines",
      codeSnippet: `/* 02. FULL SPHERE DESIGN TOKENS */
:root {
  --ink: #0c0b0b;          /* Void Ink */
  --paper: #f3f1ec;        /* Warm Paper */
  --crimson: #b0142c;      /* Pure Crimson */
  --crimson-lit: #d7193a;  /* Laser Crimson */
  --typography-sans: 'Host Grotesk', sans-serif;
  --typography-mono: 'Geist Mono', monospace;
  --transition-bezier: cubic-bezier(0.16, 1, 0.3, 1);
  --state: "HIGH-CONVICTION AESTHETIC";
}`,
    },
    {
      num: "03",
      phaseName: "PHASE 03",
      title: "CUSTOM ENGINEERING & BUILD",
      subtitle: "HIGH-PERFORMANCE FULL-STACK DEVELOPMENT",
      summary:
        "Production-grade engineering across Next.js 15, TypeScript, mobile apps, and robust backend APIs. Scalable database schemas, real-time data streaming, and bulletproof security protocols.",
      tag: "PHASE 03 // ENGINEERING",
      deliverable: "Production Codebase & CI/CD Pipeline",
      codeSnippet: `// 03. FULL SPHERE HIGH-SPEED RUNTIME
import { initializeApp } from '@/lib/core';

export async function bootstrapSystem() {
  const engine = await initializeApp({
    runtime: 'Next.js 15 Turbopack',
    backend: 'TypeScript + Cloud APIs',
    database: 'Real-time Distributed',
    caching: 'Edge Multi-Region'
  });
  return engine.verify(); // 0 Latency
}`,
    },
    {
      num: "04",
      phaseName: "PHASE 04",
      title: "QUALITY ASSURANCE & LAUNCH",
      subtitle: "TESTED, OPTIMIZED & DEPLOYED GLOBALLY",
      summary:
        "Comprehensive cross-device stress testing, accessibility auditing, automated CI/CD deployments, and technical SEO optimization. Your product goes live with enterprise-grade reliability.",
      tag: "PHASE 04 // DEPLOYMENT",
      deliverable: "Live Global Production & Analytics Telemetry",
      codeSnippet: `✓ Automated Test Suite: 100% PASSED (0 defects)
✓ Security Audit: PASSED (OWASP Top 10 Compliant)
✓ Google Lighthouse: 100 Performance | 100 SEO
✓ Global Edge CDN: PROPAGATED ACROSS 320 POPS
>>> STATUS: LIVE IN PRODUCTION
>>> ALL PHASES COMPLETE · ENTERING WORK...`,
    },
  ];

  // Pinned Scrollytelling Listener:
  // Section stays 100% STILL while sticky, advances Phase 1 -> 2 -> 3 -> 4, then releases
  useEffect(() => {
    let lastStep = 0;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const topOffset = typeof window !== "undefined" && window.innerWidth >= 640 ? 78 : 74;
      // Scrolled distance within the pinned container relative to navbar offset
      const scrolled = topOffset - rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
      setScrollProgress(progress);

      let stepIndex = 0;
      if (progress < 0.25) {
        stepIndex = 0;
      } else if (progress < 0.50) {
        stepIndex = 1;
      } else if (progress < 0.75) {
        stepIndex = 2;
      } else {
        stepIndex = 3;
      }

      if (stepIndex !== lastStep) {
        lastStep = stepIndex;
        setActiveStep(stepIndex);
        soundFx.playCRTBeep();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectStep = (idx) => {
    soundFx.playCRTBeep();
    setActiveStep(idx);

    // Scroll to the corresponding point in the pinned container
    const container = containerRef.current;
    if (!container) return;

    const topOffset = typeof window !== "undefined" && window.innerWidth >= 640 ? 78 : 74;
    const totalScrollable = container.clientHeight - window.innerHeight;
    const targetScrollY =
      window.scrollY + container.getBoundingClientRect().top - topOffset + (idx / 3.2) * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const current = steps[activeStep];

  return (
    <section id="approach" className="relative bg-[#100f0f] text-[#f3f1ec] border-b border-[#f3f1ec15]">
      {/* =========================================================================
          1. DEDICATED SEPARATE MOBILE UI (< lg)
          Does NOT trap the user in 320vh pinned scroll. Perfectly scaled for touch.
          ========================================================================= */}
      <div className="block lg:hidden py-12 px-3.5 sm:px-6">
        {/* Mobile Header */}
        <div className="border-b border-[#f3f1ec15] pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d7193a] mb-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#d7193a]" />
            <span>01 // EXECUTION METHODOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.05em] text-[#f3f1ec]">
            THE APPROACH.
          </h2>
          <p className="text-xs font-mono text-[#9c9590] mt-1">
            4-Phase Sequential Engineering Protocol
          </p>
        </div>

        {/* Mobile Phase Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  soundFx.playCRTBeep();
                  setActiveStep(idx);
                }}
                className={`flex items-center gap-1.5 py-2 px-3 text-xs font-mono border rounded transition-all shrink-0 ${
                  isActive
                    ? "bg-[#d7193a] text-white border-[#d7193a] font-bold shadow-[0_0_12px_rgba(215,25,58,0.4)]"
                    : "bg-[#161414] border-[#f3f1ec18] text-[#9c9590]"
                }`}
              >
                <span>{s.num}</span>
                <span>{s.phaseName}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Active Phase Content Card */}
        <div className="bg-[#141212] border border-[#f3f1ec20] p-4 sm:p-5 rounded-xl mb-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#d7193a] font-bold">{current.tag}</span>
            <span className="text-[10px] text-[#44e877] font-semibold bg-[#44e877]/10 px-2 py-0.5 rounded border border-[#44e877]/30">
              ACTIVE PHASE
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#f3f1ec]">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#9c9590] leading-relaxed">
            {current.summary}
          </p>

          <div className="pt-2 pb-1 border-t border-[#f3f1ec10] flex items-center gap-2 text-[11px] font-mono text-[#f3f1ec]">
            <span className="text-[#d7193a] font-bold">DELIVERABLE:</span>
            <span>{current.deliverable}</span>
          </div>

          {/* Mobile CRT Terminal Window */}
          <div className="relative rounded-lg overflow-hidden bg-[#0a120e] border-2 border-[#333] shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] crt-screen p-3 font-mono text-[11px] text-[#44e877]">
            <div className="flex justify-between items-center pb-1.5 border-b border-[#44e877]/30 text-[10px] text-[#44e877]/80">
              <span className="bg-[#44e877] text-[#0a120e] px-1 font-bold">
                FULLSPHERE-OS // {current.num}
              </span>
              <span>60 FPS</span>
            </div>
            <pre className="py-2 overflow-x-auto text-[10px] sm:text-[11px] leading-relaxed text-[#58ff8c] whitespace-pre font-mono">
              {current.codeSnippet}
            </pre>
            <div className="pt-1.5 border-t border-[#44e877]/30 flex items-center justify-between text-[9px] text-[#44e877]/80">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-2.5 bg-[#44e877] animate-[blink_1s_step-end_infinite]" />
                <span>TERMINAL ACTIVE</span>
              </span>
              <span>PHASE {current.num} / 04</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Between Steps */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex gap-2">
            <button
              type="button"
              disabled={activeStep === 0}
              onClick={() => {
                soundFx.playCRTBeep();
                setActiveStep((prev) => Math.max(0, prev - 1));
              }}
              className="px-3 py-2 text-xs font-mono border border-[#f3f1ec20] text-[#9c9590] rounded disabled:opacity-30 disabled:pointer-events-none"
            >
              ← PREV
            </button>
            <button
              type="button"
              disabled={activeStep === steps.length - 1}
              onClick={() => {
                soundFx.playCRTBeep();
                setActiveStep((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              className="px-3 py-2 text-xs font-mono border border-[#f3f1ec20] text-[#9c9590] rounded disabled:opacity-30 disabled:pointer-events-none"
            >
              NEXT →
            </button>
          </div>

          {/* Mobile: Image 2 split-button for Kick Off */}
          <a
            href="#contact"
            className="h-[52px] flex items-stretch bg-[#b0142c] text-[#f3f1ec] border border-transparent rounded-[2px] overflow-hidden active:bg-[#d7193a] transition-colors"
          >
            <span className="flex-1 flex items-center justify-center text-sm font-medium tracking-tight pl-4 whitespace-nowrap">
              KICK OFF IN THIS PHASING
            </span>
            <span className="w-[52px] flex items-center justify-center border-l border-white/20 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          2. DEDICATED SEPARATE DESKTOP UI (lg:block)
          Retains 100% of the desktop pinned scrollytelling + Macintosh CRT computer.
          Zero interference with mobile layout.
          ========================================================================= */}
      <div ref={containerRef} className="hidden lg:block relative min-h-[320vh]">
        {/* Pinned Sticky Viewport: Anchors directly below navbar */}
        <div className="sticky top-[78px] h-[calc(100vh-78px)] w-full flex flex-col justify-between py-5 px-8 overflow-hidden z-20 bg-[#100f0f]">
          {/* Top Header Row */}
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#f3f1ec15] pb-3 shrink-0">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#d7193a] mb-0.5 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#d7193a]" />
                <span>01 // EXECUTION METHODOLOGY</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.05em] text-[#f3f1ec]">
                THE APPROACH.
              </h2>
            </div>

            {/* Phase Indicators */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => selectStep(idx)}
                    className={`flex items-center gap-1.5 py-1 px-2.5 text-xs font-mono border transition-all duration-300 rounded whitespace-nowrap ${
                      isActive
                        ? "bg-[#d7193a] text-white border-[#d7193a] font-bold shadow-[0_0_15px_rgba(215,25,58,0.4)]"
                        : "border-[#f3f1ec20] text-[#9c9590] hover:text-[#f3f1ec] hover:border-[#f3f1ec50]"
                    }`}
                  >
                    <span>{s.num}</span>
                    <span>{s.phaseName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Main Stage: Left Cards + Right Retro Macintosh CRT */}
          <div className="grid grid-cols-12 gap-8 items-center flex-1 my-auto w-full py-2">
            {/* Left Column: 4 Interactive Phase Cards */}
            <div className="col-span-5 flex flex-col gap-2">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => selectStep(idx)}
                    className={`text-left p-3 border transition-all duration-300 rounded ${
                      isActive
                        ? "bg-[#181616] border-[#d7193a] shadow-[0_0_15px_rgba(215,25,58,0.2)]"
                        : "bg-transparent border-[#f3f1ec15] hover:border-[#f3f1ec40] text-[#9c9590]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-0.5">
                      <span className={`font-bold ${isActive ? "text-[#d7193a]" : "text-[#9c9590]"}`}>
                        {s.num} // {s.tag}
                      </span>
                      {isActive && (
                        <span className="text-[10px] text-[#44e877] tracking-wider font-semibold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base sm:text-lg font-bold tracking-tight ${isActive ? "text-[#f3f1ec]" : "text-[#9c9590]"}`}>
                      {s.title}
                    </h3>
                    {isActive && (
                      <p className="mt-1 text-xs text-[#f3f1ec]/80 leading-relaxed font-normal animate-[fadeIn_0.35s_ease-out]">
                        {s.summary}
                      </p>
                    )}
                  </button>
                );
              })}

              <div className="pt-1 flex items-center gap-4">
                <RollingButton href="#contact" variant="primary" size="sm">
                  KICK OFF IN THIS PHASING
                </RollingButton>
              </div>
            </div>

            {/* Right Column: Retro Macintosh 128K CRT Terminal Screen */}
            <div className="col-span-7 flex justify-center items-center">
              <div className="relative w-full max-w-[480px] bg-[#d9d4c7] text-[#111] p-5 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.7)] border-4 border-[#b8b1a2]">
                {/* Chassis Header */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#a8a192]">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#111] flex items-center justify-center text-[8px] text-[#d9d4c7] font-bold">
                      
                    </div>
                    <span className="font-mono text-[11px] font-bold tracking-widest text-[#333]">
                      FULL SPHERE MACINTOSH // SYSTEM 1.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#555]">
                    <span>SCROLL PROGRESS: {Math.round(scrollProgress * 100)}%</span>
                    <span className="w-2 h-2 rounded-full bg-[#44e877] animate-pulse" />
                  </div>
                </div>

                {/* CRT Screen */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0a120e] border-4 border-[#25221f] shadow-[inset_0_0_35px_rgba(0,0,0,0.95)] crt-screen p-5 flex flex-col justify-between font-mono text-xs text-[#44e877]">
                  {/* CRT Screen Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-[#44e877]/30 text-[11px] tracking-wider">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#44e877] text-[#0a120e] px-1 font-bold">
                        FULLSPHERE-OS
                      </span>
                      <span>{current.tag}</span>
                    </div>
                    <span className="text-[#44e877]/80">60 FPS // LOCKED</span>
                  </div>

                  {/* CRT Screen Code Body */}
                  <div className="my-auto py-2 overflow-x-auto">
                    <div className="text-xs leading-relaxed whitespace-pre-wrap font-mono text-[#58ff8c]">
                      {current.codeSnippet}
                    </div>
                  </div>

                  {/* CRT Screen Footer */}
                  <div className="pt-2 border-t border-[#44e877]/30 flex justify-between items-center text-[10px] text-[#44e877]/80">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-3 bg-[#44e877] animate-[blink_1s_step-end_infinite]" />
                      <span>PINNED SCROLLING ACTIVE</span>
                    </div>
                    <div>
                      {activeStep === 3 ? (
                        <span className="text-[#f3f1ec] font-bold bg-[#d7193a] px-1.5 py-0.5 rounded text-[9px]">
                          RELEASE SCROLL TO WORK ↓
                        </span>
                      ) : (
                        <span>KEEP SCROLLING ↓</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chassis Bottom Floppy Drive & Vents */}
                <div className="mt-3 flex items-center justify-between pt-1">
                  <div className="w-40 h-2 bg-[#222] rounded-sm shadow-inner relative flex items-center justify-center">
                    <div className="w-10 h-1 bg-[#111]" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1 h-3 bg-[#9e9686] rounded-xs" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pinned Progress Bar */}
          <div className="pt-3 border-t border-[#f3f1ec15] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9c9590]">
            <div className="flex items-center gap-3">
              <span className="text-[#d7193a] font-bold">PHASE {current.num} / 04</span>
              <div className="w-48 h-1 bg-[#f3f1ec20] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d7193a] transition-all duration-300"
                  style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                />
              </div>
            </div>

            <div>
              {scrollProgress > 0.88 ? (
                <span className="text-[#44e877] font-semibold animate-pulse">
                  PHASES COMPLETE · RESUMING NORMAL SCROLL ↓
                </span>
              ) : (
                <span>SCROLL TO CYCLE ALL PHASES BEFORE ADVANCING</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
