"use client";

export default function BackgroundGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.12] dark:opacity-[0.12]"
      style={{
        // Use theme-aware color so it shows nicely on light theme as well
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--grid-dot, rgba(0,0,0,0.35)) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        animation: "grid-pan 20s linear infinite",
      }}
    />
  );
}


