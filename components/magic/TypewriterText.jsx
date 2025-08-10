"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function TypewriterText({
  words = [],
  typingMs = 60,
  deletingMs = 40,
  pauseMs = 1200,
  className,
}) {
  const safeWords = useMemo(() => (Array.isArray(words) ? words.filter(Boolean) : []), [words]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (safeWords.length === 0) return;
    const current = safeWords[index % safeWords.length];
    const step = () => {
      setText((prev) => {
        if (isDeleting) {
          const next = prev.slice(0, -1);
          if (next.length === 0) {
            setIsDeleting(false);
            setIndex((i) => (i + 1) % safeWords.length);
          }
          return next;
        }
        const next = current.slice(0, prev.length + 1);
        if (next.length === current.length) {
          // pause then start deleting
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setIsDeleting(true), pauseMs);
        }
        return next;
      });
    };
    const delay = isDeleting ? deletingMs : typingMs;
    timer.current = setTimeout(step, delay);
    return () => clearTimeout(timer.current);
  }, [safeWords, index, isDeleting, typingMs, deletingMs, pauseMs]);

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span>{text}</span>
      <span className="inline-block h-[1em] w-[2px] bg-current animate-pulse" />
    </span>
  );
}


