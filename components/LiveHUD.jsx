"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import RollingButton from "@/components/ui/RollingButton";
import { soundFx } from "@/lib/sound";

export default function LiveHUD({ activeSection = "01", progress = 0 }) {
  const [timeStr, setTimeStr] = useState("00:00:00");
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [retroMode, setRetroMode] = useState(false);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState(0);

  // Live Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeStr(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Back to 1984 Retro Mode Toggle
  const toggleRetroMode = () => {
    soundFx.playCRTBeep();
    const next = !retroMode;
    setRetroMode(next);
    if (typeof document !== "undefined") {
      if (next) {
        document.documentElement.classList.add("retro-1984");
      } else {
        document.documentElement.classList.remove("retro-1984");
      }
    }
  };

  // Toggle Sound FX
  const toggleSound = () => {
    const enabled = soundFx.toggle();
    setSoundEnabled(enabled);
  };

  const navLinks = [
    { num: "01", label: "STUDIO", href: "#studio", desc: "Full Sphere Studio — India & Global, established in 2025" },
    { num: "02", label: "APPROACH", href: "#approach", desc: "Our 4-phase sequential execution: Discovery, Design, Build & Launch" },
    { num: "03", label: "PORTFOLIO", href: "#work", desc: "Enterprise CRM, Lead Automation, Hotel OS, Billing & Equity Systems" },
    { num: "04", label: "SERVICES", href: "#services", desc: "Flagship Web, Mobile Apps, UI/UX Systems & Enterprise Software" },
    { num: "05", label: "CONNECT", href: "#contact", desc: "Direct project consultation with lead partners" },
  ];

  return (
    <>
      {/* Sticky Top HUD Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[54px] sm:h-[68px] lg:h-[78px] bg-[#0c0b0b]/96 backdrop-blur-md border-b border-[#f3f1ec12] px-4 sm:px-6 md:px-8 flex items-center justify-between text-[#f3f1ec]">
        {/* MOBILE VIEW NAVIGATION (Image 1 Style: Logo + Back to 1984 Pill + Menu) */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Left: Clean Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[#f3f1ec] hover:text-[#d7193a] transition-colors"
          >
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <Image
                src="/images/fullsphere-logo-white.png"
                alt="Full Sphere Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <span className="tracking-tight font-black text-[16px] text-[#f3f1ec]">
              FullSphere
            </span>
          </Link>

          {/* Center / Right: Back to 1984 Pill + Menu Button (Image 1) */}
          <div className="flex items-center gap-3">
            {/* Pill: Back to 1984 with Retro Mac Icon */}
            <button
              type="button"
              onClick={toggleRetroMode}
              className={`rounded-full border border-white/20 px-3 py-1 flex items-center gap-1.5 text-[11px] font-mono tracking-tight transition-all active:scale-95 ${
                retroMode
                  ? "bg-[#44e877] text-[#07120a] border-[#44e877] font-bold"
                  : "bg-black/40 text-[#f3f1ec] hover:border-white/40"
              }`}
              title="Toggle Retro CRT 1984 Mode"
            >
              <svg
                className="w-3.5 h-3.5 text-current shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="3" width="16" height="13" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="16" x2="12" y2="21" />
                <circle cx="8" cy="7" r="0.5" fill="currentColor" />
              </svg>
              <span>{retroMode ? "1984 Active" : "Back to 1984"}</span>
            </button>

            {/* Menu Button with 2 lines */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setMenuOpen(!menuOpen);
              }}
              aria-label="Toggle navigation menu"
              className="flex items-center gap-2 text-xs font-mono text-[#f3f1ec] hover:text-[#d7193a] transition-colors py-1 pl-1"
            >
              <span>{menuOpen ? "Close" : "Menu"}</span>
              <div className="w-4 h-2 flex flex-col justify-between">
                <span
                  className={`w-full h-[1.5px] bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-current transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW NAVIGATION (Hidden on mobile, 100% desktop fidelity preserved) */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left: White Logo matched 1:1 in height with the FULL SPHERE and All Possibilities text */}
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="group flex items-center gap-3.5 text-[#f3f1ec] hover:text-[#d7193a] transition-colors"
            >
              <div className="w-[48px] h-[48px] flex items-center justify-center shrink-0">
                <Image
                  src="/images/fullsphere-logo-white.png"
                  alt="Full Sphere Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="tracking-tight font-black text-[18px] leading-tight text-[#f3f1ec]">
                  FULL SPHERE
                </span>
                <span className="text-[9.5px] font-mono tracking-widest text-[#9c9590] uppercase leading-tight mt-0.5">
                  All Possibilities. One Sphere.
                </span>
              </div>
            </Link>

            {/* Section Tracker (Desktop Only) */}
            <div className="flex items-center gap-4 pl-6 border-l border-[#f3f1ec20] text-xs font-mono">
              <span className="text-[#d7193a] font-semibold">{activeSection}</span>
              <div className="relative w-16 h-[2px] bg-[#f3f1ec25] overflow-hidden">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#d7193a] transition-all duration-300"
                  style={{ width: `${Math.max(8, progress * 100)}%` }}
                />
              </div>
              <span className="text-[#9c9590] uppercase tracking-wider text-[11px]">
                {navLinks.find((l) => l.num === activeSection)?.label || "INDEX"}
              </span>
            </div>
          </div>

          {/* Center / Right: Live Time + Retro 1984 + Sound FX + Direct Consultation CTA */}
          <div className="flex items-center gap-5">
            {/* Live Clock */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#9c9590]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#44e877] animate-pulse" />
              <span>GLOBAL HQ</span>
              <span className="text-[#f3f1ec] font-medium tracking-wider">{timeStr}</span>
            </div>

            {/* Retro 1984 Era Toggle */}
            <button
              type="button"
              onClick={toggleRetroMode}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono tracking-wider border rounded transition-colors ${
                retroMode
                  ? "bg-[#44e877] text-[#07120a] border-[#44e877] font-bold"
                  : "border-[#f3f1ec30] text-[#9c9590] hover:text-[#f3f1ec] hover:border-[#f3f1ec60]"
              }`}
              title="Toggle Retro CRT 1984 Mode"
            >
              <span>{retroMode ? "1984: ON" : "1984"}</span>
            </button>

            {/* Audio FX Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono tracking-wider border rounded transition-colors ${
                soundEnabled
                  ? "border-[#d7193a] text-[#d7193a] bg-[#d7193a15]"
                  : "border-[#f3f1ec25] text-[#9c9590] hover:text-[#f3f1ec]"
              }`}
              title="Toggle procedural UI sound effects"
            >
              <span>SFX</span>
              <span>{soundEnabled ? "ON" : "OFF"}</span>
            </button>

            {/* Direct Consultation CTA */}
            <RollingButton
              href="#contact"
              variant="primary"
              size="sm"
            >
              START A PROJECT
            </RollingButton>

            {/* Menu Drawer Toggle */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setMenuOpen(!menuOpen);
              }}
              aria-label="Toggle navigation menu"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f3f1ec] hover:text-[#d7193a] transition-colors py-2 px-3 border border-[#f3f1ec25] hover:border-[#f3f1ec60] active:scale-95"
            >
              <span>{menuOpen ? "CLOSE" : "MENU"}</span>
              <div className="w-4 h-2.5 flex flex-col justify-between">
                <span
                  className={`w-full h-[1.5px] bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`w-full h-[1.5px] bg-current transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0c0b0b] text-[#f3f1ec] pt-[66px] sm:pt-[84px] pb-6 sm:pb-8 px-4 sm:px-8 md:px-16 flex flex-col justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-16px]"
        }`}
        style={{ paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* DESKTOP MENU LAYOUT (lg and above) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 my-auto">
          {/* Main Huge Links */}
          <nav className="col-span-8 flex flex-col justify-center gap-1 md:gap-3">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMenuOpen(false);
                }}
                onMouseEnter={() => {
                  soundFx.playClick();
                  setHoveredMenuIndex(idx);
                }}
                className="group flex items-baseline gap-4 md:gap-8 text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#9c9590] hover:text-[#f3f1ec] transition-colors"
              >
                <span className="text-xs md:text-sm font-mono text-[#d7193a] tracking-normal">
                  {link.num}
                </span>
                <span className="group-hover:translate-x-3 transition-transform duration-300">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Right Preview Card */}
          <div className="col-span-4 flex flex-col justify-center border-l border-[#f3f1ec20] pl-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/images/fullsphere-logo-white.png"
                  alt="Full Sphere"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight block text-[#f3f1ec]">FULL SPHERE</span>
                <span className="text-[10px] font-mono text-[#9c9590] block">ALL POSSIBILITIES. ONE SPHERE.</span>
              </div>
            </div>

            <div className="text-xs font-mono text-[#d7193a] mb-2 tracking-wider">
              BRIEF // {navLinks[hoveredMenuIndex]?.num}
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#f3f1ec] mb-3">
              {navLinks[hoveredMenuIndex]?.label}
            </h3>
            <p className="text-sm text-[#9c9590] leading-relaxed mb-6">
              {navLinks[hoveredMenuIndex]?.desc}
            </p>

            <div className="p-4 bg-[#141212] border border-[#f3f1ec20] rounded text-xs font-mono">
              <div className="flex justify-between items-center text-[#9c9590] pb-2 border-b border-[#f3f1ec10] mb-2">
                <span>COMMUNICATIONS</span>
                <span className="text-[#44e877]">ACTIVE</span>
              </div>
              <div className="text-[#f3f1ec] space-y-1 text-[11px]">
                <p>&gt; Inquiries: FULLSPHEREGROUP@GMAIL.COM</p>
                <p>&gt; Custom Solutions: Web, Mobile, UI/UX, Software</p>
                <p>&gt; Direct Partner Consultations: OPEN</p>
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED SEPARATE MOBILE MENU LAYOUT (< lg) matching webdrift.be */}
        <div className="lg:hidden flex flex-col justify-between flex-1 py-4 space-y-8">
          {/* Mobile Navigation Links with webdrift style huge scale */}
          <nav className="flex flex-col gap-3 sm:gap-4 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  soundFx.playClick();
                  setMenuOpen(false);
                }}
                className="group flex items-baseline gap-3 text-[38px] sm:text-[50px] font-black tracking-[-0.05em] text-[#9c9590] active:text-[#d7193a] hover:text-[#f3f1ec] transition-colors border-b border-[#f3f1ec10] pb-2"
              >
                <span className="text-xs font-mono text-[#d7193a] tracking-normal font-bold">
                  {link.num}
                </span>
                <span className="group-active:translate-x-2 transition-transform duration-200">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Mobile Quick Action Buttons & Toggles (Image 2 button style) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={() => {
                  soundFx.playClick();
                  setMenuOpen(false);
                }}
                className="flex-1 h-[52px] bg-[#b0142c] text-[#f3f1ec] flex items-stretch border border-transparent rounded-[2px] overflow-hidden transition-colors active:bg-[#d7193a]"
              >
                <span className="flex-1 flex items-center justify-center text-sm font-medium tracking-tight pl-3">
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

              <button
                type="button"
                onClick={() => {
                  toggleSound();
                  soundFx.playClick();
                }}
                className={`h-[52px] px-3.5 border rounded-[2px] text-xs font-mono tracking-wider transition-colors shrink-0 ${
                  soundEnabled
                    ? "border-[#d7193a] text-[#d7193a] bg-[#d7193a15]"
                    : "border-white/25 text-[#9c9590]"
                }`}
              >
                SFX: {soundEnabled ? "ON" : "OFF"}
              </button>
            </div>

            <div className="p-3.5 bg-[#141212] border border-[#f3f1ec15] rounded text-xs font-mono space-y-1">
              <div className="text-[#9c9590] flex justify-between">
                <span>INQUIRIES</span>
                <span className="text-[#44e877]">DIRECT 24H</span>
              </div>
              <a
                href="mailto:FULLSPHEREGROUP@GMAIL.COM"
                className="text-[#f3f1ec] hover:text-[#d7193a] font-semibold text-[13px] block break-all pt-0.5"
              >
                FULLSPHEREGROUP@GMAIL.COM
              </a>
            </div>
          </div>
        </div>

        {/* Footer HUD info */}
        <div className="border-t border-[#f3f1ec20] pt-4 sm:pt-6 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-[#9c9590] shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#d7193a]">EST:</span>
            <span className="text-[#f3f1ec]">2025 · INDIA &amp; GLOBAL</span>
          </div>
          <div className="flex items-center gap-4">
            <span>FULL SPHERE GROUP © {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
