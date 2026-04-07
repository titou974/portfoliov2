"use client";

import { ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import CustomCursor from "./CustomCursor";
import { useMouse } from "@/lib/MouseContext";

const SCROLL_FADE_RANGE = [0, 500] as const;

export default function PageContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [...SCROLL_FADE_RANGE], [1, 0]);

  // Mouse presence: 0 = outside, 1 = inside (animated via spring)
  const presence = useMotionValue(0);
  const combinedOpacity = useTransform(
    [scrollOpacity, presence],
    ([s, p]: number[]) => s * p,
  );

  const { subscribe } = useMouse();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onEnter = () => animate(presence, 1, { duration: 0.35, ease: "easeOut" });
    const onLeave = () => animate(presence, 0, { duration: 0.3, ease: "easeIn" });

    container.addEventListener("mouseenter", onEnter, { passive: true });
    container.addEventListener("mouseleave", onLeave, { passive: true });

    const unsub = subscribe((clientX, clientY) => {
      container.style.setProperty("--mouse-x", `${clientX}px`);
      container.style.setProperty("--mouse-y", `${clientY}px`);
    });

    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      unsub();
    };
  }, [subscribe, presence]);

  return (
    <>
      <div className="hidden lg:block">
        <CustomCursor scrollY={scrollY} />
      </div>
      <div ref={containerRef} className="lg:cursor-none overflow-clip">
        <motion.div
          className="fixed inset-0 pointer-events-none hidden lg:block"
          style={{
            opacity: combinedOpacity,
            backgroundImage: `radial-gradient(
            200px circle at var(--mouse-x) var(--mouse-y),
            var(--color-accent) 0,
            transparent 100%
          )`,
          }}
        />
        <div className="w-full md:max-w-7xl lg:mx-auto min-h-screen h-full relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}
