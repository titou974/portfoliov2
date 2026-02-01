"use client";

import { Avatar, Tooltip } from "@heroui/react";
import Lottie from "lottie-react";
import { useRef, useState } from "react";
import plantAnimation from "@/assets/plant.json";

export default function Hero() {
  const lottieRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const STOP_FRAME = 50;
  const STOP_FRAME_2 = 100;

  const handleDOMLoaded = () => {
    setIsReady(true);
    if (lottieRef.current) {
      lottieRef.current.playSegments([0, STOP_FRAME], true);
    }
  };

  const handleMouseEnter = () => {
    if (lottieRef.current && isReady) {
      lottieRef.current.setDirection(1);
      lottieRef.current.playSegments([STOP_FRAME, STOP_FRAME_2], true);
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current && isReady) {
      lottieRef.current.setDirection(-1);
      lottieRef.current.playSegments([STOP_FRAME_2, STOP_FRAME], true);

      // Use playSegments to go // Adjust timing based on animation speed
    }
  };

  return (
    <>
      <Tooltip delay={500}>
        <div className="w-fit p-4 rounded-full border border-neutral mx-auto mt-6 md:mt-20">
          <div className="w-fit border-2 border-neutral rounded-full p-1">
            <Tooltip.Trigger
              aria-label="Titouan Hirsch Avatar"
              className="md:cursor-none"
            >
              <Avatar className="size-24 md:size-30">
                <Avatar.Image alt="Titouan Hirsch" src="titou.jpeg" />
              </Avatar>
            </Tooltip.Trigger>
          </div>
        </div>
        <Tooltip.Content showArrow placement="right">
          <Tooltip.Arrow />

          <p>Salut !</p>
        </Tooltip.Content>
      </Tooltip>
      <div className="space-y-4 md:space-y-8">
        <div className="mb-10 mt-6 md:mt-20 mx-auto relative">
          <h1 className="font-semibold text-2xl md:text-4xl leading-tight tracking-tighter text-base-content text-center text-muted opacity-98 before:absolute before:w-full before:border before:border-neutral before:inset-x-0 before:top-[-4] after:absolute after:w-full after:border after:border-neutral after:inset-x-0 after:bottom-[-6] after:opacity-90 before:opacity-90">
            Bonjour ! Je suis Titouan/@bobodigital
            <br />
            Je Code ce que l&apos;IA ne sait pas Coder...
          </h1>
        </div>
        <div className="relative">
          <p className="text-sm md:text-base w-full text-center text-foreground mx-auto leading-8 text-balance max-w-3xl before:absolute before:w-full before:border before:border-neutral before:inset-x-0 before:top-[-4] after:absolute after:w-full after:border after:border-neutral after:inset-x-0 after:bottom-[-6] after:opacity-90 before:opacity-90">
            Du MVP au réseau social qui peut tenir un gros trafic. De
            l&apos;application mobile, jusqu&apos;au site internet, je donne vie
            à vos idées avec 2 ans d&apos;expertises
          </p>
        </div>
      </div>
      <Tooltip delay={500}>
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="mx-auto w-[50%] md:w-[25%] mt-10"
        >
          <Tooltip.Trigger
            aria-label="My little plant"
            className="md:cursor-none"
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={plantAnimation}
              loop={false}
              autoplay={false}
              onDOMLoaded={handleDOMLoaded}
            />
          </Tooltip.Trigger>
        </div>
        <Tooltip.Content showArrow placement="right">
          <Tooltip.Arrow />

          <p>Voici ma jolie petite plante</p>
        </Tooltip.Content>
      </Tooltip>
    </>
  );
}
