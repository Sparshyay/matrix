"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import RollingButton from "@/components/ui/RollingButton";

function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { href: "/#studio", label: "STUDIO", num: "01" },
    { href: "/#approach", label: "APPROACH", num: "02" },
    { href: "/#work", label: "PORTFOLIO", num: "03" },
    { href: "/projects", label: "ALL PROJECTS", num: "04" },
    { href: "/#services", label: "SERVICES", num: "05" },
    { href: "/#contact", label: "CONTACT", num: "06" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-[58px] sm:h-[68px] lg:h-[74px] border-b border-[#f3f1ec18] bg-[#0c0b0b]/95 backdrop-blur-md text-[#f3f1ec]">
        <div className="container mx-auto max-w-7xl px-3.5 sm:px-6 md:px-8 h-full flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 text-[#f3f1ec] hover:text-[#d7193a] transition-colors">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <Image
                src="/images/fullsphere-logo-white.png"
                alt="Full Sphere Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="tracking-tight font-black text-sm sm:text-base leading-tight text-[#f3f1ec]">
                FULL SPHERE
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-wider sm:tracking-widest text-[#9c9590] uppercase leading-tight mt-0.5">
                All Possibilities. One Sphere.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[#9c9590] hover:text-[#f3f1ec] transition-colors flex items-center gap-1.5"
              >
                <span className="text-[#d7193a]">{l.num}</span>
                <span>{l.label}</span>
              </Link>
            ))}
            <RollingButton href="/#contact" variant="primary" size="sm">
              START A PROJECT
            </RollingButton>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#f3f1ec] py-1.5 px-2.5 border border-[#f3f1ec25] rounded"
            >
              <span>{open ? "CLOSE" : "MENU"}</span>
              <div className="w-3.5 h-2 flex flex-col justify-between">
                <span className={`w-full h-[1.5px] bg-current transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`w-full h-[1.5px] bg-current transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#0c0b0b] text-[#f3f1ec] pt-[72px] pb-8 px-5 flex flex-col justify-between transition-all duration-500 overflow-y-auto lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <nav className="flex flex-col gap-3 my-auto">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 text-3xl font-black text-[#9c9590] hover:text-[#f3f1ec] border-b border-[#f3f1ec10] pb-2 transition-colors"
            >
              <span className="text-xs font-mono text-[#d7193a]">{l.num}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="pt-6 space-y-4">
          <RollingButton
            href="/#contact"
            variant="primary"
            size="md"
            onClick={() => setOpen(false)}
            className="w-full justify-center text-center py-3"
          >
            START A PROJECT
          </RollingButton>
          <div className="text-center text-xs font-mono text-[#9c9590]">
            EMAIL: <a href="mailto:FULLSPHEREGROUP@GMAIL.COM" className="text-[#d7193a]">FULLSPHEREGROUP@GMAIL.COM</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;


