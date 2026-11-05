"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import RollingButton from "@/components/ui/RollingButton";
import Keypad3D from "@/components/Keypad3D";
import { soundFx } from "@/lib/sound";

export default function HeroWebDrift() {
  const [slitActive, setSlitActive] = useState(false);

  useEffect(() => {
    // Signature crimson laser slit reveal
    const timer = setTimeout(() => {
      setSlitActive(true);
      soundFx.playLaser();
      setTimeout(() => setSlitActive(false), 900);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen pt-[68px] sm:pt-[84px] pb-6 px-3.5 sm:px-6 md:px-8 flex flex-col justify-between overflow-hidden border-b border-[#f3f1ec15]">
      {/* Background radial crimson floor glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 sm:left-1/4 right-0 sm:right-1/4 h-[260px] sm:h-[380px] opacity-20 sm:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 100%, #d7193a 0%, transparent 70%)",
        }}
      />

      {/* Laser slit sweep animation */}
      <div className={`w-slit ${slitActive ? "active" : ""}`} />

      {/* Main Grid: Heading Centered in Middle Left, 3D Keypad + Description on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center flex-1 my-auto w-full py-2 sm:py-6">
        {/* Left Col: Giant Typography on Middle Left */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center items-start pr-0 lg:pr-4">
          <h1 className="text-[40px] leading-[0.92] sm:text-6xl md:text-8xl lg:text-[76px] xl:text-[104px] 2xl:text-[124px] font-extrabold tracking-[-0.065em] text-[#f3f1ec] select-none">
            <span className="block overflow-hidden">
              <span className="inline-block animate-[fadeInUp_0.8s_cubic-bezier(0.16,1,0.3,1)]">
                Pixels change.
              </span>
            </span>
            <span className="block overflow-hidden pl-2 sm:pl-6 text-[#f3f1ec]">
              <span className="inline-block animate-[fadeInUp_1s_0.15s_cubic-bezier(0.16,1,0.3,1)_both]">
                Taste stays.
              </span>
            </span>
          </h1>
        </div>

        {/* Right Col: 3D Keypad + Concise Description & Buttons */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-start w-full lg:pl-2 space-y-4 sm:space-y-6">
          {/* Exact 3D Macro Keyboard Device */}
          <Keypad3D className="w-full" />

          {/* Concise Business Description */}
          <div className="max-w-md text-xs sm:text-base text-[#9c9590] leading-relaxed font-normal">
            <p>
              A design and development studio. We build custom websites, mobile apps, and tailored software systems.
            </p>
          </div>

          {/* Dual Action Buttons: Dedicated Mobile Layout (Image 2 style) */}
          <div className="flex sm:hidden flex-col gap-2.5 w-full">
            {/* View our projects button */}
            <a
              href="#work"
              onClick={() => soundFx.playClick()}
              className="w-full h-[52px] bg-[#b0142c] text-[#f3f1ec] flex items-stretch border border-transparent rounded-[2px] overflow-hidden transition-colors active:bg-[#d7193a]"
            >
              <span className="flex-1 flex items-center justify-center text-sm font-medium tracking-tight pl-4">
                View our projects
              </span>
              <span className="w-[52px] flex items-center justify-center border-l border-white/20 shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>

            {/* Start a project button */}
            <a
              href="#contact"
              onClick={() => soundFx.playClick()}
              className="w-full h-[52px] bg-[#0c0b0b] text-[#f3f1ec] flex items-stretch border border-white/25 rounded-[2px] overflow-hidden transition-colors active:bg-white/10"
            >
              <span className="flex-1 flex items-center justify-center text-sm font-medium tracking-tight pl-4">
                Start a project
              </span>
              <span className="w-[52px] flex items-center justify-center border-l border-white/20 shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>
          </div>

          {/* Desktop Action Buttons (Preserved 100% for desktop) */}
          <div className="hidden sm:flex items-center gap-3 w-auto">
            <RollingButton href="#work" variant="primary" size="md">
              View our projects
            </RollingButton>
            <RollingButton href="#contact" variant="ghost" size="md">
              Start a project
            </RollingButton>
          </div>
        </div>
      </div>

      {/* Hero Foot telemetry (FULL SPHERE hidden on mobile per request) */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#f3f1ec18] flex items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono text-[#9c9590]">
        <div className="hidden sm:flex items-center gap-2 sm:gap-4">
          <span className="text-[#f3f1ec] font-medium">FULL SPHERE STUDIO</span>
          <span>// WEB · MOBILE · UI/UX · CUSTOM SOFTWARE</span>
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <a
            href="#studio"
            className="text-[#d7193a] sm:text-[#9c9590] hover:text-[#f3f1ec] flex items-center gap-1 transition-colors font-semibold sm:font-normal"
          >
            SCROLL DOWN ↓
          </a>
        </div>
      </div>
    </section>
  );
}
