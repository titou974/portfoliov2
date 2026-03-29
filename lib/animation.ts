import type { Variants } from "framer-motion";

// Shared fade-up animation props
export const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.4, ease: "easeOut" as const, delay },
});

// Hero sequential delays
export const HERO_DELAYS = {
  AVATAR: 0,
  HEADING: 0.2,
  PARAGRAPH: 0.35,
  GALLERY: 0.5,
  PLANT: 1.8,
} as const;

// Lottie plant keyframes
export const PLANT_FRAMES = {
  IDLE: 50,
  HOVER: 100,
} as const;

// Photo gallery spring animation
export const photoContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const photoItemVariants: Variants = {
  hidden: { x: 0, y: 0, rotate: 0 },
  visible: (custom: {
    x: string;
    y: string;
    rotate: number;
    order: number;
  }) => ({
    x: custom.x,
    y: custom.y,
    rotate: custom.rotate,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 12,
      mass: 1,
      delay: custom.order * 0.15,
    },
  }),
};
