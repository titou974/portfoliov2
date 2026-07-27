"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import { motion, useReducedMotion } from "framer-motion";
import plantAnimation from "@/assets/plant.json";
import { PLANT_FRAMES } from "@/lib/animation";
import { PROFILE } from "@/app/constants/bio";
import { t } from "@/lib/strings";
import Leaf from "./Leaf";

// Leaves that sprout around the avatar on mount.
const SPROUTS = [
  { className: "-left-6 top-1 size-9", rotate: 205, delay: 0.45 },
  { className: "-right-5 -top-2 size-7", rotate: -35, delay: 0.6 },
  { className: "-left-9 bottom-6 size-6", rotate: 160, delay: 0.75 },
];

export default function BioProfile() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [lottieReady, setLottieReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const growPlant = () => {
    if (!lottieRef.current || !lottieReady) return;
    lottieRef.current.setDirection(1);
    lottieRef.current.playSegments([PLANT_FRAMES.IDLE, PLANT_FRAMES.HOVER], true);
  };

  const shrinkPlant = () => {
    if (!lottieRef.current || !lottieReady) return;
    lottieRef.current.setDirection(-1);
    lottieRef.current.playSegments([PLANT_FRAMES.HOVER, PLANT_FRAMES.IDLE], true);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        {/* Sprouting leaves */}
        {SPROUTS.map((sprout) => (
          <motion.div
            key={sprout.className}
            className={`absolute z-10 text-accent ${sprout.className}`}
            initial={{ scale: 0, rotate: sprout.rotate - 40, opacity: 0 }}
            animate={{ scale: 1, rotate: sprout.rotate, opacity: 0.75 }}
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 12,
              delay: reduceMotion ? 0 : sprout.delay,
            }}
          >
            <Leaf className="size-full" />
          </motion.div>
        ))}

        <motion.div
          className="rounded-full border-2 border-accent/30 p-1"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Image
            src={PROFILE.avatar}
            alt={t("bio.avatarAlt")}
            width={128}
            height={128}
            priority
            className="size-28 rounded-full object-cover"
          />
        </motion.div>

        {/* Signature plant */}
        <motion.div
          className="absolute -bottom-3 -right-7 w-16"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.5 }}
          onMouseEnter={growPlant}
          onMouseLeave={shrinkPlant}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={plantAnimation}
            loop={false}
            autoplay={false}
            onDOMLoaded={() => {
              setLottieReady(true);
              lottieRef.current?.playSegments([0, PLANT_FRAMES.IDLE], true);
            }}
          />
        </motion.div>
      </div>

      <h1 className="mt-5 text-xl font-bold text-base-content">
        {t(PROFILE.username)}
      </h1>
      <p className="mt-1 text-sm font-medium text-accent">
        {t(PROFILE.tagline)}
      </p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/70">
        {t(PROFILE.description)}
      </p>
    </div>
  );
}
