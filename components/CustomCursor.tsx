"use client";

import gsap from "gsap";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursorCustom = document.querySelector(
      ".cursorCustom",
    ) as HTMLDivElement | null;
    const cursorFollower = document.querySelector(
      ".follower",
    ) as HTMLDivElement | null;

    const moveCursor = (e: MouseEvent): void => {
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(cursorCustom, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    gsap.set(cursorFollower, {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(cursorCustom, {
      xPercent: -50,
      yPercent: -50,
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="max-lg:hidden z-10">
      <div className="follower w-12.5 h-12.5 rounded-full bg-transparent border-background/80 border-2 border-solid fixed z-50  pointer-events-none"></div>
      <div className="cursorCustom w-2.5 h-2.5 rounded-full bg-background/80 fixed z-50  pointer-events-none"></div>
    </div>
  );
}
