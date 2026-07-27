"use client";

import { motion, useReducedMotion } from "framer-motion";
import Leaf from "./Leaf";

type FloatingLeaf = {
  id: string;
  className: string;
  size: number;
  rotate: number;
  sway: number;
  duration: number;
  delay: number;
  opacity: number;
};

// Leaves are anchored to the edges so they frame the content without ever
// sitting behind the cards.
const LEAVES: FloatingLeaf[] = [
  {
    id: "top-left",
    className: "-left-10 top-6",
    size: 150,
    rotate: 25,
    sway: 6,
    duration: 11,
    delay: 0,
    opacity: 0.16,
  },
  {
    id: "mid-left",
    className: "-left-16 top-[45%]",
    size: 210,
    rotate: 195,
    sway: 5,
    duration: 15,
    delay: 0.6,
    opacity: 0.1,
  },
  {
    id: "mid-right",
    className: "-right-10 top-[62%]",
    size: 140,
    rotate: -35,
    sway: -6,
    duration: 12,
    delay: 2,
    opacity: 0.14,
  },
  {
    id: "bottom-left",
    className: "-left-8 bottom-10",
    size: 120,
    rotate: -70,
    sway: 7,
    duration: 10,
    delay: 1.6,
    opacity: 0.12,
  },
];

export default function NatureBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft canopy light coming from the top */}
      <div
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 50% 0%, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent 70%)",
        }}
      />

      {LEAVES.map((leaf) => (
        <motion.div
          key={leaf.id}
          className={`absolute text-accent ${leaf.className}`}
          style={{ width: leaf.size, height: leaf.size, opacity: leaf.opacity }}
          initial={{ rotate: leaf.rotate, y: 0 }}
          animate={
            reduceMotion
              ? { rotate: leaf.rotate }
              : {
                  rotate: [
                    leaf.rotate - leaf.sway,
                    leaf.rotate + leaf.sway,
                    leaf.rotate - leaf.sway,
                  ],
                  y: [0, -10, 0],
                }
          }
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf className="size-full" />
        </motion.div>
      ))}
    </div>
  );
}
