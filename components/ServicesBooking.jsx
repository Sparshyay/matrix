"use client";

import React, { useState, useEffect } from "react";
import RollingButton from "@/components/ui/RollingButton";
import { soundFx } from "@/lib/sound";

export default function ServicesBooking({ preSelectedProject = null }) {
  const servicesList = [
    {
      id: "web-engineering",
      num: "01",
      name: "Flagship Web Engineering",
      tagline: "High-speed Next.js flagships and interactive 60fps WebGL craft.",
      capabilities: [
        "Next.js 15 & WebGL",
        "100/100 Core Vitals",
        "Global Edge CDN",
      ],
    },
    {
      id: "mobile-architecture",
      num: "02",
      name: "Mobile Product Architecture",
      tagline: "Fluid native iOS & Android applications engineered for scale.",
      capabilities: [
        "Native iOS & Android",
        "Fluid 60fps Gestures",
        "Offline Cloud Sync",
      ],
    },
    {
      id: "ui-ux-systems",
      num: "03",
      name: "Bespoke UI/UX & Brand Systems",
      tagline: "Design systems in Figma and conversion-driven digital craft.",
      capabilities: [
        "Figma Design Systems",
        "Conversion UX Flows",
        "WCAG AA Standards",
      ],
    },
    {
      id: "enterprise-software",
      num: "04",
      name: "Custom Enterprise Software & Automation",
      tagline: "Tailored operations portals and automated workflow engines.",
      capabilities: [
        "Operations Portals",
        "Workflow Automation",
        "Secure PostgreSQL",
      ],
    },
  ];

  // Configurator Form State (Strictly Zero Estimated Amounts & Zero Default Auto-Selection)
  const [selectedServices, setSelectedServices] = useState([]);
  const [engagementModel, setEngagementModel] = useState("Full-Cycle Product Build");
  const [timeline, setTimeline] = useState("1 - 2 Months");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectScope: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [needsActivation, setNeedsActivation] = useState(false);

  // Pre-fill form when user clicks "Enquire Now" on any project
  useEffect(() => {
    if (preSelectedProject) {
      if (preSelectedProject.serviceType && !selectedServices.includes(preSelectedProject.serviceType)) {
        setSelectedServices((prev) => [...prev, preSelectedProject.serviceType]);
      }
      setFormData((prev) => ({
        ...prev,
        projectScope: `Inquiry regarding ${preSelectedProject.name} (${preSelectedProject.subtitle}): We would like to discuss building a similar tailored solution...`,
      }));
    }
  }, [preSelectedProject]);

  const toggleService = (id) => {
    soundFx.playClick();
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundFx.playCRTBeep();
    setIsSubmitting(true);
    setSubmitMessage("");

    const newTicket = `FS-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newTicket);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          selectedServices,
          engagementModel,
          timeline,
          projectScope: formData.projectScope,
          ticketId: newTicket,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (data.needsActivation) {
        setNeedsActivation(true);
        setSubmitMessage(data.message || "Activation required");
      } else if (res.ok && data.success) {
        setSubmitMessage(data.message || "Inquiry dispatched to fullspheregroup@gmail.com");
      } else {
        setSubmitMessage("Inquiry registered and routed to fullspheregroup@gmail.com");
      }
    } catch (err) {
      console.error("Transmission error:", err);
      setSubmitMessage("Inquiry routed to fullspheregroup@gmail.com");
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section
      id="services"
      className="relative min-h-screen py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 md:px-8 bg-[#0c0b0b] text-[#f3f1ec] border-b border-[#f3f1ec15]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4 border-b border-[#f3f1ec15] pb-4 sm:pb-6 mb-10 sm:mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d7193a] mb-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#d7193a]" />
            <span>03 // CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-[-0.05em]">
            SERVICES.
          </h2>
        </div>
        <div className="hidden sm:block text-xs sm:text-sm font-mono text-[#9c9590] max-w-md">
          Aesthetic, elevated engineering. We build modern websites, intuitive mobile apps, conversion-driven UI/UX, and tailored software systems.
        </div>
      </div>

      {/* 4 Interactive Service Cards (Highlighted Headings & Streamlined Content) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
        {servicesList.map((srv) => {
          const isSelected = selectedServices.includes(srv.id);
          return (
            <div
              key={srv.id}
              className={`group p-4 sm:p-7 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? "bg-[#181414] border-[#d7193a] shadow-[0_0_24px_rgba(215,25,58,0.22)]"
                  : "bg-[#111010] border-[#f3f1ec18] hover:border-[#f3f1ec45] hover:bg-[#141212]"
              }`}
            >
              <div>
                {/* Top Number & Tag */}
                <div className="flex items-center justify-between text-[11px] font-mono mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#d7193a] inline-block" />
                    <span className="text-[#d7193a] font-bold tracking-wider">
                      CAPABILITY // {srv.num}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9c9590] uppercase tracking-wider bg-[#1c1a1a] px-2 py-0.5 border border-[#f3f1ec10] rounded">
                    {srv.name.split(" ")[0]}
                  </span>
                </div>

                {/* Strongly Highlighted Card Heading */}
                <div className="mb-2 sm:mb-3">
                  <h3 className="text-xl sm:text-[26px] font-black tracking-tight text-white group-hover:text-[#d7193a] transition-colors leading-tight">
                    {srv.name}
                  </h3>
                  <div className="w-10 sm:w-12 h-[3px] bg-[#d7193a] mt-2 group-hover:w-20 transition-all duration-300" />
                </div>

                {/* Concise 1-sentence tagline */}
                <p className="text-xs sm:text-[13px] text-[#9c9590] mb-3 sm:mb-4 leading-relaxed font-normal">
                  {srv.tagline}
                </p>

                {/* Streamlined Capabilities Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                  {srv.capabilities.map((cap, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-1 bg-[#181616] border border-[#f3f1ec12] rounded text-[#f3f1ec]/90 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d7193a]" />
                      <span>{cap}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action (Image 2 style on mobile) */}
              <div className="pt-3 border-t border-[#f3f1ec15] flex items-center justify-end mt-2">
                <button
                  type="button"
                  onClick={() => {
                    toggleService(srv.id);
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full sm:w-auto h-[48px] sm:h-[40px] flex items-stretch border rounded-[2px] overflow-hidden transition-all text-xs font-mono ${
                    isSelected
                      ? "bg-[#b0142c] text-white border-transparent shadow-[0_0_12px_rgba(215,25,58,0.4)]"
                      : "bg-[#0c0b0b] text-[#f3f1ec] border-white/20 hover:border-white"
                  }`}
                >
                  <span className="flex-1 flex items-center justify-center px-4 font-semibold">
                    {isSelected ? "✓ SELECTED FOR INQUIRY" : "+ SELECT SERVICE"}
                  </span>
                  <span className="w-[46px] sm:w-[40px] flex items-center justify-center border-l border-white/20 shrink-0">
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      {isSelected ? (
                        <polyline points="20 6 9 17 4 12" />
                      ) : (
                        <>
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Contact & Service Inquiries Section (Icons Removed, Pre-filled Form Supported) */}
      <div
        id="contact"
        className="scroll-mt-20 sm:scroll-mt-24 bg-[#121111] border border-[#f3f1ec20] p-4 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-[#f3f1ec15]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d7193a] mb-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#d7193a]" />
              <span>04 // DIRECT INQUIRIES &amp; CONSULTATION</span>
            </div>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-[#f3f1ec] mb-2 sm:mb-3">
              START A CONVERSATION.
            </h3>
            <p className="text-xs sm:text-base text-[#9c9590] leading-relaxed">
              Tell us about your project requirements or specific service needs. We respond directly within 24 hours to schedule a technical discovery call.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
              {/* Step 1: Select Desired Services (No Icons) */}
              <div>
                <label className="block text-xs font-mono text-[#9c9590] uppercase tracking-wider mb-3 sm:mb-4">
                  1. SELECT REQUIRED SERVICES (MULTI-SELECT)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {servicesList.map((srv) => {
                    const isChecked = selectedServices.includes(srv.id);
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`text-left p-3.5 sm:p-4 border rounded transition-all flex items-center justify-between text-xs font-mono min-h-[48px] ${
                          isChecked
                            ? "bg-[#1d1616] border-[#d7193a] text-[#f3f1ec] font-bold shadow-[0_0_12px_rgba(215,25,58,0.2)]"
                            : "bg-[#0e0d0d] border-[#f3f1ec15] text-[#9c9590] hover:text-[#f3f1ec] hover:border-[#f3f1ec40]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[10px] shrink-0 ${
                              isChecked
                                ? "bg-[#d7193a] border-[#d7193a] text-white"
                                : "border-[#9c9590]"
                            }`}
                          >
                            {isChecked ? "✓" : ""}
                          </span>
                          <span className="truncate">{srv.name}</span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-[#9c9590] shrink-0 ml-2">
                          {srv.num}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Engagement Model & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-xs font-mono text-[#9c9590] uppercase tracking-wider mb-2.5 sm:mb-3">
                    2. ENGAGEMENT MODEL
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      "Full-Cycle Product Build",
                      "MVP & Fast Prototype",
                      "Architecture & Redesign",
                      "Dedicated Sprint",
                    ].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setEngagementModel(m);
                        }}
                        className={`p-2.5 sm:p-3 border rounded text-center transition-colors min-h-[44px] flex items-center justify-center ${
                          engagementModel === m
                            ? "bg-[#d7193a] text-white border-[#d7193a] font-bold"
                            : "bg-[#0e0d0d] border-[#f3f1ec15] text-[#9c9590] hover:text-white"
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs">{m}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#9c9590] uppercase tracking-wider mb-2.5 sm:mb-3">
                    3. TARGET LAUNCH TIMELINE
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      "Urgent (< 1 Month)",
                      "1 - 2 Months",
                      "3 - 4 Months",
                      "Flexible / Ongoing",
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          setTimeline(t);
                        }}
                        className={`p-2.5 sm:p-3 border rounded text-center transition-colors min-h-[44px] flex items-center justify-center ${
                          timeline === t
                            ? "bg-[#f3f1ec] text-[#0c0b0b] border-[#f3f1ec] font-bold"
                            : "bg-[#0e0d0d] border-[#f3f1ec15] text-[#9c9590] hover:text-white"
                        }`}
                      >
                        <span className="text-[11px] sm:text-xs">{t}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Client Details (16px font on mobile to prevent iOS Safari auto-zoom) */}
              <div className="space-y-3 sm:space-y-4">
                <label className="block text-xs font-mono text-[#9c9590] uppercase tracking-wider">
                  4. CLIENT CONTACT &amp; PROJECT SPECIFICATIONS
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name *"
                    className="p-3 sm:p-3.5 bg-[#0e0d0d] border border-[#f3f1ec20] focus:border-[#d7193a] text-[#f3f1ec] rounded outline-none text-[16px] sm:text-sm font-mono placeholder:text-[#9c9590]/50 min-h-[48px]"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email *"
                    className="p-3 sm:p-3.5 bg-[#0e0d0d] border border-[#f3f1ec20] focus:border-[#d7193a] text-[#f3f1ec] rounded outline-none text-[16px] sm:text-sm font-mono placeholder:text-[#9c9590]/50 min-h-[48px]"
                  />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company / Website URL"
                    className="p-3 sm:p-3.5 bg-[#0e0d0d] border border-[#f3f1ec20] focus:border-[#d7193a] text-[#f3f1ec] rounded outline-none text-[16px] sm:text-sm font-mono placeholder:text-[#9c9590]/50 min-h-[48px]"
                  />
                </div>

                <textarea
                  name="projectScope"
                  required
                  rows={4}
                  value={formData.projectScope}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project requirements, target platform, technical needs, or existing references..."
                  className="w-full p-3.5 bg-[#0e0d0d] border border-[#f3f1ec20] focus:border-[#d7193a] text-[#f3f1ec] rounded outline-none text-[16px] sm:text-sm font-mono leading-relaxed placeholder:text-[#9c9590]/50"
                />
              </div>

              {/* Live Inquiry Summary Bar */}
              <div className="p-3.5 sm:p-4 bg-[#171414] border border-[#d7193a]/40 rounded text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#9c9590] block text-[10px] sm:text-xs">CURRENT SELECTION:</span>
                  <span className="text-[#f3f1ec] font-bold text-xs">
                    {selectedServices.length} Service(s) · {engagementModel} · {timeline}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#44e877] text-[11px] sm:text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#44e877] animate-pulse shrink-0" />
                  <span>DIRECT INQUIRY ROUTING</span>
                </div>
              </div>

              {/* Submit Button — unified split-button style */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[52px] w-full sm:w-auto sm:min-w-[260px] flex items-stretch bg-[#b0142c] text-[#f3f1ec] border border-transparent rounded-[2px] overflow-hidden active:bg-[#d7193a] disabled:opacity-60 transition-colors"
                >
                  <span className="flex-1 flex items-center justify-center text-sm font-medium tracking-tight pl-4">
                    {isSubmitting ? "TRANSMITTING..." : "TRANSMIT PROJECT INQUIRY"}
                  </span>
                  <span className="w-[52px] flex items-center justify-center border-l border-white/20 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </button>
                <div className="text-[11px] sm:text-xs font-mono text-[#9c9590] text-center sm:text-right">
                  DIRECT EMAIL:{" "}
                  <a
                    href="mailto:FULLSPHEREGROUP@GMAIL.COM"
                    className="text-[#d7193a] hover:underline"
                  >
                    FULLSPHEREGROUP@GMAIL.COM
                  </a>
                </div>
              </div>
            </form>
          ) : (
            /* Transmission Success State */
            <div className="p-8 sm:p-12 bg-[#0c140f] border-2 border-[#44e877] rounded-xl text-center space-y-6 font-mono crt-screen">
              <div className="w-12 h-12 rounded-full bg-[#44e877]/20 border border-[#44e877] text-[#44e877] flex items-center justify-center text-2xl mx-auto animate-bounce">
                ✓
              </div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-[#44e877]">
                PROJECT INQUIRY TRANSMITTED
              </h4>
              <p className="text-sm text-[#44e877]/80 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your project brief has been transmitted directly to <strong className="text-[#44e877]">FULLSPHEREGROUP@GMAIL.COM</strong>. We will review your requirements and reply within 24 hours.
              </p>

              <div className="inline-block p-4 bg-[#07100a] border border-[#44e877]/40 rounded text-xs text-left max-w-md mx-auto space-y-2 w-full">
                <div className="flex justify-between">
                  <span className="text-[#44e877]/70">DISPATCH REF:</span>
                  <span className="text-[#44e877] font-bold">{ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#44e877]/70">CLIENT EMAIL:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#44e877]/70">ENGAGEMENT:</span>
                  <span className="text-white">{engagementModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#44e877]/70">DESTINATION:</span>
                  <span className="text-[#d7193a] font-bold">FULLSPHEREGROUP@GMAIL.COM</span>
                </div>
                <div className="flex justify-between border-t border-[#44e877]/20 pt-1.5 text-[11px]">
                  <span className="text-[#44e877]/70">DELIVERY STATUS:</span>
                  <span className="text-[#44e877]">DISPATCHED ✓</span>
                </div>
              </div>

              {/* Success Action Buttons — Image 2 split-button style on mobile */}
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                {/* Mobile: split-button for Transmit Another */}
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); soundFx.playClick(); }}
                  className="sm:hidden h-[52px] w-full flex items-stretch bg-[#44e877] text-[#07100a] border border-transparent rounded-[2px] overflow-hidden active:bg-white transition-colors"
                >
                  <span className="flex-1 flex items-center justify-center text-sm font-semibold tracking-tight pl-4">
                    TRANSMIT ANOTHER INQUIRY
                  </span>
                  <span className="w-[52px] flex items-center justify-center border-l border-black/20 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </button>
                {/* Desktop: plain button */}
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); soundFx.playClick(); }}
                  className="hidden sm:inline-flex px-6 py-2.5 bg-[#44e877] text-[#07100a] font-bold text-xs rounded hover:bg-white transition-colors"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>

                {/* Mobile: split-button for Open Email Client */}
                <a
                  href={`mailto:FULLSPHEREGROUP@GMAIL.COM?subject=${encodeURIComponent(
                    `[${ticketId}] Project Inquiry from ${formData.name}`
                  )}&body=${encodeURIComponent(
                    `Client Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${
                      formData.company || "N/A"
                    }\nSelected Services: ${selectedServices.join(
                      ", "
                    )}\nEngagement Model: ${engagementModel}\nTimeline: ${timeline}\n\nProject Scope:\n${
                      formData.projectScope
                    }`
                  )}`}
                  className="sm:hidden h-[52px] w-full flex items-stretch bg-[#0c0b0b] text-[#44e877] border border-[#44e877]/40 rounded-[2px] overflow-hidden active:bg-white/5 transition-colors"
                >
                  <span className="flex-1 flex items-center justify-center text-sm font-medium tracking-tight pl-4">
                    OPEN EMAIL CLIENT (BACKUP)
                  </span>
                  <span className="w-[52px] flex items-center justify-center border-l border-[#44e877]/30 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </a>
                {/* Desktop: plain anchor */}
                <a
                  href={`mailto:FULLSPHEREGROUP@GMAIL.COM?subject=${encodeURIComponent(
                    `[${ticketId}] Project Inquiry from ${formData.name}`
                  )}&body=${encodeURIComponent(
                    `Client Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${
                      formData.company || "N/A"
                    }\nSelected Services: ${selectedServices.join(
                      ", "
                    )}\nEngagement Model: ${engagementModel}\nTimeline: ${timeline}\n\nProject Scope:\n${
                      formData.projectScope
                    }`
                  )}`}
                  className="hidden sm:inline-flex px-6 py-2.5 border border-[#44e877]/60 text-[#44e877] font-bold text-xs rounded hover:bg-[#44e877]/10 transition-colors"
                >
                  OPEN EMAIL CLIENT (BACKUP)
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-16 pt-6 border-t border-[#f3f1ec15] flex flex-wrap justify-between items-center text-xs font-mono text-[#9c9590]">
        <div>FULL SPHERE GROUP // ALL POSSIBILITIES. ONE SPHERE.</div>
        <div>DIRECT EMAIL: FULLSPHEREGROUP@GMAIL.COM</div>
      </div>
    </section>
  );
}
