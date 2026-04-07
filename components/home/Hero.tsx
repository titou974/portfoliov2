"use client";

import { useState } from "react";
import { Avatar, Tooltip, Button } from "@heroui/react";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { fadeUp, HERO_DELAYS } from "@/lib/animation";
import { t } from "@/lib/strings";
import strings from "@/app/constants/strings.fr.json";
import { PhotoGallery } from "./PhotoGallery";
import { Typewriter } from "./Typewriter";

const TYPEWRITER_WORDS = strings.hero.typewriter;

export default function Hero() {
  const [typewriterStarted, setTypewriterStarted] = useState(false);

  return (
    <>
      {/* Avatar */}
      <motion.div {...fadeUp(HERO_DELAYS.AVATAR)}>
        <Tooltip delay={500}>
          <div className="w-fit p-2 rounded-full border-[0.5px] border-neutral mx-auto mt-6 md:mt-10">
            <div className="w-fit border-[0.5px] border-neutral rounded-full p-1">
              <Tooltip.Trigger
                aria-label="Titouan Hirsch Avatar"
                className="md:cursor-none"
              >
                <Avatar className="size-20 md:size-24">
                  <Avatar.Image alt="Titouan Hirsch" src="titou.jpeg" />
                </Avatar>
              </Tooltip.Trigger>
            </div>
          </div>
          <Tooltip.Content showArrow placement="right">
            <Tooltip.Arrow />
            <p>{t("hero.tooltip")}</p>
          </Tooltip.Content>
        </Tooltip>
      </motion.div>

      <div className="space-y-4">
        {/* Heading */}
        <motion.div
          {...fadeUp(HERO_DELAYS.HEADING)}
          className="mb-10 mt-6 md:mt-10 mx-auto relative"
        >
          <h1 className="font-semibold text-xl md:text-4xl leading-tight tracking-tighter text-base-content text-center text-muted before:absolute before:w-screen before:border-[0.5px] before:border-border before:inset-x-0 before:top-[-4] after:absolute after:w-screen after:border-[0.5px] after:border-border after:inset-x-0 after:bottom-[-6] after:left-1/2 after:-translate-x-1/2 after:opacity-60 before:opacity-60 before:-translate-x-1/2 before:-translate-y-1/2 before:top-1/2 before:left-1/2">
            {t("hero.greeting")}
            <br />
            {t("hero.givesLife")}{" "}
            <Typewriter
              words={TYPEWRITER_WORDS}
              started={typewriterStarted}
              className="text-accent"
            />
            <br />
            {t("hero.andI")}{" "}
            <span className="text-transparent bg-gradient-to-r from-muted via-accenta to-a  to-accent bg-clip-text">
              {t("hero.helpsGrow")}
            </span>
          </h1>
        </motion.div>

        <motion.div
          {...fadeUp(HERO_DELAYS.PARAGRAPH)}
          className="flex flex-col md:flex-row-reverse items-center justify-center gap-3 mt-2"
        >
          <Button variant="primary" onPress={() => {}}>
            {t("hero.ctaPrimary")}
            <ArrowUpRightIcon className="size-4" />
          </Button>
          <Button variant="secondary" onPress={() => {}}>
            {t("hero.ctaSecondary")}
          </Button>
        </motion.div>
      </div>

      {/* Photos + Plant */}
      <PhotoGallery onPlantReady={() => setTypewriterStarted(true)} />
    </>
  );
}
