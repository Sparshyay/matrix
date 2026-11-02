"use client";

import React from "react";
import Image from "next/image";
import RollingButton from "@/components/ui/RollingButton";

export default function StudioSection() {
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
      className="relative py-28 px-4 md:px-8 bg-[#0c0b0b] text-[#f3f1ec] border-b border-[#f3f1ec15] overflow-hidden"
    >
      {/* Aesthetic Giant Watermark Logo on Right: Same size as footer, half cut off-screen with low opacity */}
      <div className="pointer-events-none absolute -right-32 sm:-right-48 md:-right-64 top-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] md:w-[850px] h-[550px] sm:h-[700px] md:h-[850px] opacity-[0.035] select-none z-0">
        <Image
          src="/images/fullsphere-logo-white.png"
          alt="Full Sphere Emblem Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        {/* Left Col: Bigger Full Sphere White Logo & Identity */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-5">
            <div className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
              <Image
                src="/images/fullsphere-logo-white.png"
                alt="Full Sphere Logo"
                width={144}
                height={144}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#f3f1ec]">FULL SPHERE</h3>
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
        <div className="lg:col-span-8">
          {/* Smaller, Classy 4-Word Headline (replaces the long paragraph) */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.05em] leading-[1.0] text-[#f3f1ec] mb-12">
            All possibilities. One sphere.
          </h2>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#f3f1ec20]">
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
          <div className="mt-20 pt-12 border-t border-[#f3f1ec15] flex flex-wrap items-baseline justify-between gap-6">
            <div className="text-6xl sm:text-9xl md:text-[140px] font-black tracking-[-0.07em] leading-none text-[#181616] hover:text-[#d7193a] transition-colors select-none">
              CIAO.
            </div>
            <RollingButton href="#contact" variant="primary" size="lg">
              START A PROJECT
            </RollingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
