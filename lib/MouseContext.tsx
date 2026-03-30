"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

interface MouseCtx {
  /** Live x/y — updated via rAF, never triggers re-renders */
  posRef: RefObject<{ x: number; y: number }>;
  /** Subscribe to position updates (called inside rAF) */
  subscribe: (cb: (x: number, y: number) => void) => () => void;
}

const MouseContext = createContext<MouseCtx | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const posRef = useRef({ x: -1000, y: -1000 });
  const subscribers = useRef<Set<(x: number, y: number) => void>>(new Set());
  const rafId = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (rafId.current) return; // already scheduled
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        const { x, y } = posRef.current;
        subscribers.current.forEach((cb) => cb(x, y));
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const subscribe = useRef((cb: (x: number, y: number) => void) => {
    subscribers.current.add(cb);
    return () => {
      subscribers.current.delete(cb);
    };
  }).current;

  return (
    <MouseContext.Provider value={{ posRef, subscribe }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error("useMouse must be used within MouseProvider");
  return ctx;
}
