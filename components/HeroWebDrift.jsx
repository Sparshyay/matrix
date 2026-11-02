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
    <section className="relative min-h-screen pt-[80px] pb-6 px-4 md:px-8 flex flex-col justify-between overflow-hidden border-b border-[#f3f1ec15]">
      {/* Background radial crimson floor glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 right-1/4 h-[380px] opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 100%, #d7193a 0%, transparent 70%)",
        }}
      />

      {/* Laser slit sweep animation */}
      <div className={`w-slit ${slitActive ? "active" : ""}`} />

      {/* Top Tagline with Full White Logo */}
      <div className="flex items-center justify-between text-xs font-mono text-[#9c9590] uppercase tracking-wider shrink-0 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <Image
              src="/images/fullsphere-logo-white.png"
              alt="Full Sphere Logo"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-[#f3f1ec] font-semibold">FULL SPHERE</span>
          <span className="hidden sm:inline text-[#d7193a]">// ALL POSSIBILITIES. ONE SPHERE.</span>
        </div>
        <div className="hidden sm:block text-[11px]">INDIA &amp; GLOBAL</div>
      </div>

      {/* Main Grid: Heading Centered in Middle Left, 3D Keypad + Description on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center flex-1 my-auto w-full py-4 sm:py-6">
        {/* Left Col: Giant Typography on Middle Left */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center items-start pr-0 lg:pr-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[76px] xl:text-[104px] 2xl:text-[124px] font-extrabold tracking-[-0.065em] leading-[0.88] text-[#f3f1ec] select-none">
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

        {/* Right Col: 3D Keypad + Concise Description & Buttons (Matching Image 1) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-start w-full lg:pl-2 space-y-6">
          {/* Exact 3D Macro Keyboard Device */}
          <Keypad3D className="w-full" />

          {/* Concise Business Description */}
          <div className="max-w-md text-sm sm:text-base text-[#9c9590] leading-relaxed font-normal">
            <p>
              Full Sphere is a design and development studio. We build custom websites, mobile apps, and tailored software systems.
            </p>
          </div>

          {/* Dual Action Buttons matching reference */}
          <div className="flex flex-wrap items-center gap-3 w-full">
            <RollingButton href="#work" variant="primary" size="md">
              View our projects
            </RollingButton>
            <RollingButton href="#contact" variant="ghost" size="md">
              Start a project
            </RollingButton>
          </div>
        </div>
      </div>

      {/* Hero Foot telemetry */}
      <div className="mt-4 pt-4 border-t border-[#f3f1ec18] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9c9590]">
        <div className="flex items-center gap-4">
          <span className="text-[#f3f1ec]">FULL SPHERE STUDIO</span>
          <span>// WEB · MOBILE · UI/UX · CUSTOM SOFTWARE</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#studio"
            className="hover:text-[#f3f1ec] flex items-center gap-1 transition-colors"
          >
            SCROLL DOWN ↓
          </a>
        </div>
      </div>
    </section>
  );
}
