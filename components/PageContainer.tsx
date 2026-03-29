"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomCursor from "./CustomCursor";

const SCROLL_FADE_RANGE = [0, 500] as const;

export default function PageContainer({ children }: { children: ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  const { scrollY } = useScroll();
  const gradientOpacity = useTransform(scrollY, [...SCROLL_FADE_RANGE], [1, 0]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    target.addEventListener("mousemove", handleMouseMove);
    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <CustomCursor scrollY={scrollY} />
      </div>
      <div
        ref={targetRef}
        className="lg:cursor-none overflow-hidden"
        style={
          {
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      >
        <motion.div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            opacity: gradientOpacity,
            backgroundImage: `radial-gradient(
            200px circle at var(--mouse-x) var(--mouse-y),
            var(--color-accent) 0,
            transparent 100%
          )`,
          }}
        />
        {/* Contenu principal */}
        <div className="w-full md:max-w-7xl lg:mx-auto min-h-screen h-full relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}
