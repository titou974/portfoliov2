"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useMouse } from "@/lib/MouseContext";

const SCROLL_FADE_RANGE = 500;
const NAVBAR_HEIGHT = 48;

function lerpColor(progress: number): string {
  const c = Math.round(255 * (1 - progress));
  return `rgba(${c},${c},${c},0.8)`;
}

const BLACK = "rgba(0,0,0,0.8)";

export default function CustomCursor({
  scrollY,
}: {
  scrollY: MotionValue<number>;
}) {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouseYRef = useRef(0);
  const { subscribe } = useMouse();

  const applyColor = (scroll: number) => {
    const inNavbar = mouseYRef.current < NAVBAR_HEIGHT;
    const progress = Math.min(Math.max(scroll / SCROLL_FADE_RANGE, 0), 1);
    const color = inNavbar ? BLACK : lerpColor(progress);

    if (dotRef.current) dotRef.current.style.backgroundColor = color;
    if (followerRef.current) followerRef.current.style.borderColor = color;
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    applyColor(latest);
  });

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return;

    gsap.set(follower, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const unsub = subscribe((x, y) => {
      mouseYRef.current = y;
      applyColor(scrollY.get());

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
  }, [subscribe, scrollY]);

  return (
    <div className="max-lg:hidden z-10">
      <div
        ref={followerRef}
        className="w-12.5 h-12.5 rounded-full bg-transparent border-2 border-solid fixed top-0 left-0 z-50 pointer-events-none"
        style={{ borderColor: "rgba(255,255,255,0.8)" }}
      />
      <div
        ref={dotRef}
        className="w-2.5 h-2.5 rounded-full fixed top-0 left-0 z-50 pointer-events-none"
        style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
      />
    </div>
  );
}
