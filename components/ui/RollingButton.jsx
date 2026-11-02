"use client";

import React from "react";
import Link from "next/link";
import { soundFx } from "@/lib/sound";

export default function RollingButton({
  children,
  href,
  onClick,
  variant = "primary", // "primary" | "ghost" | "paper" | "dark"
  size = "md", // "sm" | "md" | "lg"
  className = "",
  icon = true,
  disabled = false,
  target,
  rel,
  ...props
}) {
  // Split string children into characters for staggered rolling animation
  const renderText = () => {
    if (typeof children !== "string") {
      return children;
    }

    return (
      <span className="rl">
        {children.split("").map((char, index) => (
          <span
            key={index}
            className="c"
            style={{ "--i": index }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  const handleClick = (e) => {
    soundFx.playClick();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    soundFx.playClick();
  };

  // Base styling matching WebDrift's exact proportions
  const variantStyles = {
    primary:
      "bg-[#b0142c] text-[#f3f1ec] hover:bg-[#f3f1ec] hover:text-[#0c0b0b] border border-transparent shadow-[0_0_20px_rgba(176,20,44,0.3)]",
    ghost:
      "bg-transparent text-[#f3f1ec] border border-[#f3f1ec40] hover:border-[#d7193a] hover:bg-[#d7193a15] hover:text-[#f3f1ec]",
    paper:
      "bg-[#f3f1ec] text-[#0c0b0b] hover:bg-[#b0142c] hover:text-[#f3f1ec] border border-transparent",
    dark:
      "bg-[#151414] text-[#f3f1ec] border border-[#f3f1ec20] hover:border-[#f3f1ec80] hover:bg-[#201d1d]",
  };

  const sizeStyles = {
    sm: "h-[42px] text-xs px-4",
    md: "h-[54px] text-sm md:text-base px-6",
    lg: "h-[64px] text-base md:text-lg px-8",
  };

  const iconSizes = {
    sm: "w-[42px]",
    md: "w-[54px]",
    lg: "w-[64px]",
  };

  const baseClasses = `
    btn-roll group relative inline-flex items-center justify-between overflow-hidden font-medium tracking-tight
    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none
    ${variantStyles[variant] || variantStyles.primary}
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
    ${className}
  `;

  const content = (
    <>
      <span className={`flex items-center gap-2 whitespace-nowrap ${sizeStyles[size]}`}>
        {renderText()}
      </span>

      {icon && (
        <span
          className={`relative flex items-center justify-center border-l border-current/20 overflow-hidden self-stretch ${iconSizes[size]}`}
        >
          {/* Default Arrow */}
          <svg
            className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:-translate-y-6"
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

          {/* Incoming Arrow */}
          <svg
            className="w-4 h-4 absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0"
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
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        target={target}
        rel={rel}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
}
