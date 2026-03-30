"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useMouse } from "@/lib/MouseContext";

const SCROLL_FADE_RANGE = 500;

function lerpColor(progress: number): string {
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
  const { subscribe } = useMouse();

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

    gsap.set(follower, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const unsub = subscribe((x, y) => {
      gsap.to(follower, {
        x,
        y,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(dot, { x, y, duration: 0.1, overwrite: true });
    });

    return unsub;
  }, [subscribe]);

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
