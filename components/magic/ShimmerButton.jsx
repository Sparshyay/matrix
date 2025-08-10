"use client";

import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ShimmerButton = forwardRef(function ShimmerButton(
  { className, children, variant, size, asChild, ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      asChild={asChild}
      className={cn(
        "relative overflow-hidden group border border-white/10",
        "bg-gradient-to-br from-primary/80 to-primary text-primary-foreground",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        // Pseudo-element shimmer so we don't add extra children when asChild is used
        "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.25),transparent)]",
        "before:animate-[shimmer_2.2s_infinite] group-hover:before:duration-700",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
});

export default ShimmerButton;


