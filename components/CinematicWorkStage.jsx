"use client";

import React, { useState } from "react";
import RollingButton from "@/components/ui/RollingButton";
import { soundFx } from "@/lib/sound";

export default function CinematicWorkStage({ onSelectProjectForInquiry }) {
  const [currentProject, setCurrentProject] = useState(0);
  const [slitActive, setSlitActive] = useState(false);

  const projects = [
    {
      num: "01",
      name: "SPHERECONNECT CRM",
      subtitle: "WhatsApp CRM & Omnichannel Hub",
      category: "CRM & AUTOMATED MESSAGING OS",
      description:
        "Enterprise WhatsApp CRM platform featuring real-time multi-agent routing, automated conversational funnels, lead tagging, and bidirectional ERP database synchronization.",
      serviceType: "custom-software",
      deliverables: [
        "Multi-Agent Chat Routing & Unified Inbox",
        "Automated WhatsApp Bot Sequences & Drip Campaigns",
        "Live Conversation Analytics & SLA Metrics",
        "Direct Webhook & Enterprise CRM Database Sync",
      ],
      tags: ["WHATSAPP BUSINESS API", "TYPESCRIPT", "NEXT.JS 15", "WEBSOCKETS"],
      client: "Enterprise Sales & Support Networks",
      year: "2025",
      bgGradient: "radial-gradient(ellipse at 70% 30%, #301016 0%, #0c0b0b 70%)",
      asciiPreview: `
  ┌────────────────────────────────────────────────────────┐
  │ [●] SPHERECONNECT // WHATSAPP CRM PLATFORM             │
  │ ACTIVE SESSIONS: 2,480  |  ROUTING SPEED: < 120ms      │
  │                                                        │
  │   INCOMING MSG ──► AGENT QUEUE ──► BOT QUALIFICATION   │
  │   CRM AUTO-SYNC: COMPLETED  |  UPTIME: 99.99%          │
  └────────────────────────────────────────────────────────┘`,
    },
    {
      num: "02",
      name: "OMNILEAD INTELLIGENCE",
      subtitle: "Lead Management Automation Engine",
      category: "LEAD PIPELINE & WORKFLOW AUTOMATION",
      description:
        "Autonomous lead scoring and distribution engine. Captures multi-channel prospect signals, auto-enriches contact dossiers, and routes high-intent opportunities in under 2 seconds.",
      serviceType: "custom-software",
      deliverables: [
        "Real-Time Lead Scoring & Intent Evaluation",
        "Multi-Source Webhook & Landing Page Ingestion",
        "Automated SDR Assignment Logic & Notifications",
        "Conversion Telemetry & Funnel Performance",
      ],
      tags: ["WORKFLOW AUTOMATION", "DATA ENRICHMENT", "CLOUD API", "POSTGRESQL"],
      client: "High-Growth B2B & Agencies",
      year: "2025",
      bgGradient: "radial-gradient(ellipse at 30% 60%, #280e14 0%, #0c0b0b 70%)",
      asciiPreview: `
  ┌────────────────────────────────────────────────────────┐
  │ [●] OMNILEAD ENGINE // INGESTION DISPATCH              │
  │ LEADS ENRICHED TODAY: 8,920  |  INTENT ACCURACY: 98%   │
  │                                                        │
  │   RAW LEAD ──► ENRICHMENT ──► SCORING ──► INSTANT PUSH │
  │   LATENCY: 1.4s  |  ZERO MANUAL DATA ENTRY             │
  └────────────────────────────────────────────────────────┘`,
    },
    {
      num: "03",
      name: "AURA HOSPITALITY OS",
      subtitle: "Hotel Management System",
      category: "HOTEL ERP & GUEST EXPERIENCE PLATFORM",
      description:
        "Comprehensive hospitality operating system uniting autonomous guest check-in, real-time room inventory management, digital concierge, and contactless billing into one fluid interface.",
      serviceType: "custom-software",
      deliverables: [
        "Contactless Guest Check-in & Keyless Mobile Flow",
        "Dynamic Room Allocation Matrix & Channel Manager",
        "Housekeeping & Facilities Maintenance Dispatch",
        "Stripe Multi-Currency Direct Billing Engine",
      ],
      tags: ["HOSPITALITY ERP", "REACT", "NODE.JS", "STRIPE GATEWAY"],
      client: "Boutique Hotels & Luxury Resorts",
      year: "2025",
      bgGradient: "radial-gradient(ellipse at 80% 80%, #301016 0%, #0c0b0b 70%)",
      asciiPreview: `
  ┌────────────────────────────────────────────────────────┐
  │ [●] AURA HOSPITALITY // PROPERTY MANAGEMENT OS         │
  │ OCCUPANCY: 96%  |  CHECK-IN LATENCY: ZERO WAIT         │
  │                                                        │
  │   GUEST ARRIVAL ──► MOBILE CHECK-IN ──► DIGITAL KEY    │
  │   CHANNEL SYNC: AIRBNB, BOOKING.COM, DIRECT PMS        │
  └────────────────────────────────────────────────────────┘`,
    },
    {
      num: "04",
      name: "APEX BILLING ENGINE",
      subtitle: "Billing Softwares & Invoicing Suite",
      category: "ENTERPRISE BILLING & RECURRING INVOICING",
      description:
        "High-precision billing software engineered for complex subscription tiers, automated tax compliance, custom contract invoicing, and real-time revenue recognition.",
      serviceType: "custom-software",
      deliverables: [
        "Automated Recurring Invoice Generation & Reconciliation",
        "Multi-Jurisdiction Tax & VAT Calculation Engine",
        "Client Self-Serve Payment & Account Portal",
        "Financial Ledger & Audit Data Export (CSV/PDF)",
      ],
      tags: ["FINANCIAL INFRASTRUCTURE", "PDF COMPLIANCE", "REST API", "NEXT.JS"],
      client: "B2B Enterprises & SaaS Providers",
      year: "2024",
      bgGradient: "radial-gradient(ellipse at 20% 40%, #2e0e15 0%, #0c0b0b 70%)",
      asciiPreview: `
  ┌────────────────────────────────────────────────────────┐
  │ [●] APEX BILLING // REVENUE RECOGNITION PLATFORM       │
  │ INVOICES RECONCILED: 100%  |  FAILED PAYMENT RETRY: ON │
  │                                                        │
  │   USAGE TELEMETRY ──► RATED INVOICE ──► AUTO-COLLECT   │
  │   TAX COMPLIANCE: AUTOMATED MULTI-CURRENCY             │
  └────────────────────────────────────────────────────────┘`,
    },
    {
      num: "05",
      name: "CAPTABLE DYNAMICS",
      subtitle: "Equity Management & Governance",
      category: "EQUITY GOVERNANCE & SHAREHOLDER PLATFORM",
      description:
        "Bank-grade equity and stock option management platform. Models dilution scenarios, automates vesting schedules, and provides secondary transaction compliance for founders and investors.",
      serviceType: "custom-software",
      deliverables: [
        "Real-Time Cap Table & Waterfall Exit Analysis",
        "Automated Stock Option Vesting Schedules & ESOP",
        "Investor Dashboard & KPI Financial Reporting",
        "Dilution Modeling & Scenario Simulators",
      ],
      tags: ["EQUITY OS", "FINTECH", "SECURITY PROTOCOLS", "REACT 19"],
      client: "Venture Funds, Founders & Startups",
      year: "2024",
      bgGradient: "radial-gradient(ellipse at 60% 70%, #2e0f16 0%, #0c0b0b 70%)",
      asciiPreview: `
  ┌────────────────────────────────────────────────────────┐
  │ [●] CAPTABLE DYNAMICS // EQUITY GOVERNANCE             │
  │ SHARE CLASS: COMMON & PREFERRED  |  AUDIT: VERIFIED    │
  │                                                        │
  │   GRANT ISSUANCE ──► ESOP VESTING ──► WATERFALL MODEL  │
  │   DILUTION SIMULATOR: 100% MATHEMATICAL PRECISION      │
  └────────────────────────────────────────────────────────┘`,
    },
  ];

  const changeProject = (index) => {
    if (index === currentProject) return;
    soundFx.playLaser();
    setSlitActive(true);
    setTimeout(() => {
      setCurrentProject(index);
      setSlitActive(false);
    }, 280);
  };

  const project = projects[currentProject];

  const handleEnquire = () => {
    soundFx.playClick();
    if (onSelectProjectForInquiry) {
      onSelectProjectForInquiry(project);
    }
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="work"
      className="relative min-h-screen py-24 px-4 md:px-8 bg-[#0c0b0b] text-[#f3f1ec] border-b border-[#f3f1ec15] flex flex-col justify-between overflow-hidden"
      style={{ background: project.bgGradient }}
    >
      {/* Laser slit transition beam */}
      <div className={`w-slit ${slitActive ? "active" : ""}`} />

      {/* Top Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#f3f1ec15] pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d7193a] mb-2 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#d7193a]" />
            <span>02 // SELECTED ENTERPRISE SOLUTIONS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.05em]">
            PORTFOLIO.
          </h2>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
          {projects.map((p, idx) => {
            const isSelected = currentProject === idx;
            return (
              <button
                key={p.num}
                type="button"
                onClick={() => changeProject(idx)}
                className={`flex items-center gap-2 py-2 px-3 sm:px-4 text-xs font-mono border transition-all duration-300 rounded whitespace-nowrap ${
                  isSelected
                    ? "bg-[#d7193a] text-[#f3f1ec] border-[#d7193a] font-bold shadow-[0_0_15px_rgba(215,25,58,0.4)]"
                    : "border-[#f3f1ec20] text-[#9c9590] hover:text-[#f3f1ec] hover:border-[#f3f1ec60]"
                }`}
              >
                <span>{p.num}</span>
                <span>{p.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Project Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Project Identity & Specs */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-xs font-mono text-[#9c9590] mb-2">
            <span className="text-[#d7193a] font-bold">{project.num} // 05</span>
            <span>•</span>
            <span className="uppercase text-[#f3f1ec]">{project.category}</span>
            <span>•</span>
            <span>YEAR: {project.year}</span>
          </div>

          <div className="text-xs font-mono text-[#d7193a] uppercase tracking-wider mb-2">
            {project.subtitle}
          </div>

          <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-[-0.06em] text-[#f3f1ec] leading-[0.92] mb-6">
            {project.name}
          </h3>

          <p className="text-base sm:text-lg text-[#9c9590] max-w-2xl leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Deliverables List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mb-8 text-xs font-mono">
            {project.deliverables.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[#f3f1ec]/90 bg-[#161414] border border-[#f3f1ec15] p-2.5 rounded"
              >
                <span className="text-[#d7193a]">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono tracking-wider px-2 py-1 bg-[#1a1818] border border-[#f3f1ec20] text-[#9c9590] rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons: ENQUIRE NOW Button (Replaces Repository Button) */}
          <div className="flex flex-wrap items-center gap-4">
            <RollingButton
              onClick={handleEnquire}
              variant="primary"
              size="md"
            >
              ENQUIRE NOW ↗
            </RollingButton>
            <RollingButton
              href="#services"
              variant="ghost"
              size="md"
            >
              VIEW ALL CAPABILITIES
            </RollingButton>
          </div>
        </div>

        {/* Right Column: Visual Stage / Terminal Blueprint */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-[520px] bg-[#121111] border border-[#f3f1ec25] p-6 rounded-xl shadow-2xl relative overflow-hidden font-mono text-xs">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f3f1ec15] text-[#9c9590] mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d7193a]" />
                <span className="text-[#f3f1ec] font-bold">{project.name} // ARCHITECTURE</span>
              </div>
              <span className="text-[#44e877]">SYSTEM READY</span>
            </div>

            {/* ASCII / Monospace Interactive Terminal View */}
            <pre className="text-[#44e877] text-[10px] sm:text-[11px] leading-tight overflow-x-auto whitespace-pre font-mono p-3 bg-[#0a0f0c] rounded border border-[#44e877]/20 crt-screen">
              {project.asciiPreview}
            </pre>

            {/* Meta Table */}
            <div className="mt-4 pt-4 border-t border-[#f3f1ec15] grid grid-cols-2 gap-4 text-[11px]">
              <div>
                <span className="text-[#9c9590] block">AUDIENCE</span>
                <span className="text-[#f3f1ec] font-medium">{project.client}</span>
              </div>
              <div>
                <span className="text-[#9c9590] block">COMPLETION</span>
                <span className="text-[#f3f1ec] font-medium">{project.year} // PRODUCTION</span>
              </div>
              <div>
                <span className="text-[#9c9590] block">SOLUTION TYPE</span>
                <span className="text-[#d7193a] font-medium">{project.subtitle}</span>
              </div>
              <div>
                <span className="text-[#9c9590] block">RELIABILITY</span>
                <span className="text-[#44e877] font-medium">★★★★★ 99.99% UPTIME</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="mt-12 pt-6 border-t border-[#f3f1ec15] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9c9590]">
        <div>FULL SPHERE SHOWCASE // ENTERPRISE SYSTEMS</div>
        <div className="flex items-center gap-2">
          <span>PROJECT {project.num} OF 05</span>
          <div className="w-24 h-1 bg-[#f3f1ec20] rounded overflow-hidden">
            <div
              className="h-full bg-[#d7193a] transition-all duration-500"
              style={{ width: `${((currentProject + 1) / projects.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
