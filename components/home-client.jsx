"use client";

import React, { useState, useEffect } from "react";
import LiveHUD from "@/components/LiveHUD";
import HeroWebDrift from "@/components/HeroWebDrift";
import StudioAboutStage from "@/components/StudioAboutStage";
import ApproachStage from "@/components/ApproachStage";
import CinematicWorkStage from "@/components/CinematicWorkStage";
import ServicesBooking from "@/components/ServicesBooking";
import StudioSection from "@/components/StudioSection";

export default function HomeClient() {
  const [activeSection, setActiveSection] = useState("01");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProjectForInquiry, setSelectedProjectForInquiry] = useState(null);

  // Scroll spy to track active section and scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);

      const sections = [
        { id: "hero", num: "00", top: 0 },
        { id: "studio", num: "01", el: document.getElementById("studio") },
        { id: "approach", num: "02", el: document.getElementById("approach") },
        { id: "work", num: "03", el: document.getElementById("work") },
        { id: "services", num: "04", el: document.getElementById("services") },
        { id: "contact", num: "05", el: document.getElementById("contact") },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s.el) {
          const rect = s.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(s.num);
            break;
          }
        } else if (i === 0 && scrollY < 400) {
          setActiveSection("01");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectProjectForInquiry = (project) => {
    setSelectedProjectForInquiry(project);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#0c0b0b] text-[#f3f1ec] overflow-x-clip selection:bg-[#d7193a] selection:text-white">
      {/* 1. Live HUD Navigation Header (Email removed from navbar, Image 2 logo) */}
      <LiveHUD activeSection={activeSection} progress={scrollProgress} />

      {/* 2. Hero Section: Exact 3D Macro Keyboard (Image 1), concise description */}
      <HeroWebDrift />

      {/* 3. Studio Section (About): Matching Image 2 with progressive scroll text animation & established in 2025 */}
      <StudioAboutStage />

      {/* 4. The Approach: Single cohesive section where tabs switch on scroll/click */}
      <ApproachStage />

      {/* 4. Cinematic Work Stage: WhatsApp CRM, Lead Automation, Hotel OS, Billing & Equity Systems */}
      <CinematicWorkStage onSelectProjectForInquiry={handleSelectProjectForInquiry} />

      {/* 5. Services Catalog & Direct Consultation Configurator (Upgraded names, no icons, pre-filled inquiry) */}
      <ServicesBooking preSelectedProject={selectedProjectForInquiry} />

      {/* 6. Studio Section: 4-word conclusion, bigger logo, facts & Ciao */}
      <StudioSection />
    </div>
  );
}
