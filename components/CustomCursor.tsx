"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const SCROLL_FADE_RANGE = 500;

function lerpColor(progress: number): string {
  // background/80 (#f7f7f8 at 0.8 alpha) → black/80
  const r = Math.round(247 * (1 - progress));
  const g = Math.round(247 * (1 - progress));
  const b = Math.round(248 * (1 - progress));
  return `rgba(${r},${g},${b},0.8)`;
}

export default function CustomCursor({
  scrollY,
}: {
  scrollY: MotionValue<number>;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const progress = Math.min(Math.max(latest / SCROLL_FADE_RANGE, 0), 1);
    const color = lerpColor(progress);

    if (dotRef.current) {
      dotRef.current.style.backgroundColor = color;
    }
    if (followerRef.current) {
      followerRef.current.style.borderColor = color;
    }
  });

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    const moveCursor = (e: MouseEvent): void => {
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    gsap.set(follower, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="max-lg:hidden z-10">
      <div
        ref={followerRef}
        className="w-12.5 h-12.5 rounded-full bg-transparent border-2 border-solid fixed z-50 pointer-events-none"
        style={{ borderColor: "#fff" }}
      />
      <div
        ref={dotRef}
        className="w-2.5 h-2.5 rounded-full fixed z-50 pointer-events-none"
        style={{ backgroundColor: "#fff" }}
      />
    </div>
  );
}
