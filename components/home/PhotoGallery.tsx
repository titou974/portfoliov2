"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import plantAnimation from "@/assets/plant.json";
import { Photo } from "./Photo";
import {
  fadeUp,
  photoContainerVariants,
  photoItemVariants,
  HERO_DELAYS,
  PLANT_FRAMES,
} from "@/lib/animation";
import { HERO_PHOTOS } from "@/app/constants";
import { Tooltip } from "@heroui/react";
import { t } from "@/lib/strings";

type PhotoGalleryProps = {
  onPlantReady?: () => void;
};

export function PhotoGallery({ onPlantReady }: PhotoGalleryProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [lottieReady, setLottieReady] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [plantAppeared, setPlantAppeared] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const initialPlayDone = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);

    const visTimer = setTimeout(
      () => setPhotosVisible(true),
      HERO_DELAYS.GALLERY * 1000,
    );
    const loadTimer = setTimeout(
      () => setPhotosLoaded(true),
      (HERO_DELAYS.GALLERY + 0.4) * 1000,
    );
    return () => {
      mq.removeEventListener("change", handler);
      clearTimeout(visTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  const handlePlantAppeared = () => {
    setPlantAppeared(true);
    if (lottieRef.current) {
      lottieRef.current.playSegments([0, PLANT_FRAMES.IDLE], true);
    }
  };

  const handleMouseEnter = () => {
    if (lottieRef.current && lottieReady && plantAppeared) {
      lottieRef.current.setDirection(1);
      lottieRef.current.playSegments(
        [PLANT_FRAMES.IDLE, PLANT_FRAMES.HOVER],
        true,
      );
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current && lottieReady && plantAppeared) {
      lottieRef.current.setDirection(-1);
      lottieRef.current.playSegments(
        [PLANT_FRAMES.HOVER, PLANT_FRAMES.IDLE],
        true,
      );
    }
  };

  return (
    <div className="relative flex h-fit w-full items-center justify-center mt-16 mb-24">
      {/* Photos */}
      <motion.div
        className="relative flex w-full max-w-6xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: photosVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          variants={photoContainerVariants}
          initial="hidden"
          animate={photosLoaded ? "visible" : "hidden"}
        >
          <div className="relative h-[140px] w-[140px] md:h-[200px] md:w-[200px]">
            {[...HERO_PHOTOS].reverse().map((photo) => (
              <motion.div
                key={photo.id}
                className="absolute left-0 top-0 w-fit"
                style={{ zIndex: photo.zIndex }}
                variants={photoItemVariants}
                custom={{
                  x: isDesktop ? photo.x : photo.mobileX,
                  y: isDesktop ? photo.y : photo.mobileY,
                  rotate: photo.rotate,
                  order: photo.order,
                }}
              >
                <Photo src={photo.src} alt={photo.alt} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="pointer-events-auto absolute inset-0 z-50 max-h-fit flex items-end justify-center"
        {...fadeUp(HERO_DELAYS.PLANT)}
        onAnimationComplete={handlePlantAppeared}
      >
        <Tooltip delay={500}>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-[40%] md:w-[20%] md:cursor-none"
          >
            <Tooltip.Trigger className="md:cursor-none">
              <Lottie
                lottieRef={lottieRef}
                animationData={plantAnimation}
                loop={false}
                autoplay={false}
                onDOMLoaded={() => setLottieReady(true)}
                onComplete={() => {
                  if (!initialPlayDone.current) {
                    initialPlayDone.current = true;
                    onPlantReady?.();
                  }
                }}
              />
            </Tooltip.Trigger>
            <Tooltip.Content showArrow placement="right">
              <Tooltip.Arrow />
              <p>{t("hero.plantTooltip")}</p>
            </Tooltip.Content>
          </div>
        </Tooltip>
      </motion.div>
    </div>
  );
}
