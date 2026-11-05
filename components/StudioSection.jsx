"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import RollingButton from "@/components/ui/RollingButton";

export default function StudioSection() {
  const [timeStr, setTimeStr] = useState("08:20");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const facts = [
    {
      num: "01",
      label: "INVOLVED AT EVERY STEP",
      desc: "One dedicated partner for your entire digital flagship. Zero account managers, zero telephone games.",
    },
    {
      num: "02",
      label: "HIGH-CONVICTION FIDELITY",
      desc: "Every pixel, transition, and shader is crafted bespoke. We develop modern websites, mobile apps, UI/UX, and custom software systems.",
    },
    {
      num: "03",
      label: "SUB-SECOND PERFORMANCE",
      desc: "We pair maximalist visual design with minimalist bundle weight. 100/100 Core Web Vitals standard.",
    },
  ];

  return (
    <section
      id="footer"
      className="relative bg-[#0c0b0b] text-[#f3f1ec] border-b border-[#f3f1ec15] overflow-hidden"
    >
      {/* =========================================================================
          1. DEDICATED SEPARATE MOBILE FOOTER (Image 3 exact 1:1 match)
          Rendered on mobile view only (block lg:hidden)
          ========================================================================= */}
      <div
        className="block lg:hidden relative py-12 px-5 min-h-screen flex flex-col justify-between"
        style={{
          background:
            "radial-gradient(ellipse 90% 45% at 50% 0%, #3e0b14 0%, #0c0b0b 70%)",
        }}
      >
        <div>
          {/* Top telemetry bar: ■ Contact ... Antwerp 08:20 */}
          <div className="flex items-center justify-between text-xs font-mono text-[#e65063] uppercase tracking-wider mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#e65063] inline-block shrink-0" />
              <span className="font-semibold">Contact</span>
            </div>
            <div>
              <span>India {timeStr}</span>
            </div>
          </div>

          {/* Giant Coral/Crimson Heading: A project in mind? */}
          <h2 className="text-[44px] font-black tracking-[-0.05em] leading-[0.95] text-[#e65063] mb-6">
            A project<br />
            in mind?
          </h2>

          {/* Thin Divider Line */}
          <div className="border-b border-[#e65063]/30 my-6" />

          {/* Big Underlined Email Link */}
          <a
            href="mailto:fullspheregroup@gmail.com"
            className="text-[23px] font-bold text-[#e65063] underline underline-offset-4 block mb-2 break-all"
          >
            fullspheregroup@gmail.com
          </a>

          {/* Direct Action Link */}
          <a
            href="#contact"
            className="text-sm font-mono text-[#e65063] inline-flex items-center gap-1 mb-8 hover:underline"
          >
            Start a project ↗
          </a>

          {/* Two-Column Grid: Nav Links on Left, Studio Metadata on Right */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e65063]/20">
            {/* Left Column: Navigation links */}
            <div className="space-y-2.5 text-base font-semibold text-[#e65063]">
              <a href="#top" className="block hover:opacity-80 transition-opacity">
                Home
              </a>
              <a href="#work" className="block hover:opacity-80 transition-opacity">
                Work
              </a>
              <a href="#approach" className="block hover:opacity-80 transition-opacity">
                Approach
              </a>
              <a href="#studio" className="block hover:opacity-80 transition-opacity">
                Studio
              </a>
              <a href="#contact" className="block hover:opacity-80 transition-opacity">
                Contact
              </a>
            </div>

            {/* Right Column: Studio metadata */}
            <div className="space-y-2 text-xs font-mono text-[#e65063]/90 pt-0.5">
              <p>India &amp; Global</p>
              <p>Est. in 2025</p>
              <p>FS0785.607.750</p>
              <div className="pt-2 space-y-1 text-[#e65063]/75 text-[11px]">
                <p>Privacy</p>
                <p>Cookies</p>
                <p>Cookie settings</p>
                <p className="pt-1 text-[#e65063] font-semibold">EN / GLOBAL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Back to top + Ciao. */}
        <div className="pt-12">
          {/* Back to top & copyright line */}
          <div className="flex items-center justify-between text-xs font-mono text-[#e65063]/85 pb-4 border-t border-[#e65063]/20 pt-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:underline flex items-center gap-1 font-semibold"
            >
              Back to top ↑
            </button>
            <span>© {new Date().getFullYear()} Full Sphere</span>
          </div>

          {/* Giant Ciao Sign-off matching Image 3 */}
          <div className="text-[78px] font-black tracking-tight leading-none text-[#e65063] select-none mt-2">
            Ciao.
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. DEDICATED DESKTOP FOOTER (lg:block)
          Preserved 100% for desktop with watermark logo, facts, and rolling button
          ========================================================================= */}
      <div className="hidden lg:block relative py-28 px-8">
        {/* Aesthetic Giant Watermark Logo on Right */}
        <div className="pointer-events-none absolute -right-64 top-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-[0.035] select-none z-0">
          <Image
            src="/images/fullsphere-logo-white.png"
            alt="Full Sphere Emblem Watermark"
            fill
            className="object-contain"
          />
        </div>

        <div className="grid grid-cols-12 gap-12 items-start relative z-10">
          {/* Left Col: Full Sphere White Logo & Identity */}
          <div className="col-span-4 space-y-6">
            <div className="flex items-center gap-5">
              <div className="w-36 h-36 flex items-center justify-center shrink-0">
                <Image
                  src="/images/fullsphere-logo-white.png"
                  alt="Full Sphere Logo"
                  width={144}
                  height={144}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-4xl font-black tracking-tight text-[#f3f1ec]">FULL SPHERE</h3>
                <span className="text-xs font-mono text-[#d7193a] tracking-widest block uppercase mt-1">
                  All Possibilities. One Sphere.
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#9c9590] leading-relaxed space-y-1.5 pt-2">
              <p className="text-[#f3f1ec] font-semibold text-sm">FULL SPHERE GROUP</p>
              <p>WEBSITE · MOBILE · UI/UX · CUSTOM SOFTWARE</p>
              <p className="pt-2">
                DIRECT INQUIRIES:<br />
                <a
                  href="mailto:FULLSPHEREGROUP@GMAIL.COM"
                  className="text-[#d7193a] hover:underline text-sm font-semibold"
                >
                  FULLSPHEREGROUP@GMAIL.COM
                </a>
              </p>
            </div>
          </div>

          {/* Right Col: Clean 4-Word Conclusion Line & Facts */}
          <div className="col-span-8">
            <h2 className="text-7xl font-extrabold tracking-[-0.05em] leading-[1.0] text-[#f3f1ec] mb-12">
              All possibilities. One sphere.
            </h2>

            {/* Key Facts Grid */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#f3f1ec20]">
              {facts.map((fact) => (
                <div key={fact.num} className="space-y-3">
                  <span className="text-xs font-mono text-[#d7193a] block">
                    FACT // {fact.num}
                  </span>
                  <h4 className="text-lg font-bold tracking-tight text-[#f3f1ec]">
                    {fact.label}
                  </h4>
                  <p className="text-sm text-[#9c9590] leading-relaxed">
                    {fact.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Giant Ciao sign-off */}
            <div className="mt-20 pt-12 border-t border-[#f3f1ec15] flex items-baseline justify-between gap-6">
              <div className="text-[140px] font-black tracking-[-0.07em] leading-none text-[#181616] hover:text-[#d7193a] transition-colors select-none">
                CIAO.
              </div>
              <RollingButton href="#contact" variant="primary" size="lg">
                START A PROJECT
              </RollingButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
