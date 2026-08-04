"use client";

import { useState } from "react";
import { Avatar, Tooltip, Button } from "@heroui/react";
import {
  ArrowUpRightIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import { fadeUp, HERO_DELAYS } from "@/lib/animation";
import { t } from "@/lib/strings";
import strings from "@/app/constants/strings.fr.json";
import { PhotoGallery } from "./PhotoGallery";
import { Typewriter } from "./Typewriter";
import Link from "next/link";
import { BIO_CONTACT } from "@/app/constants";

const TYPEWRITER_WORDS = strings.hero.typewriter;

export default function Hero() {
  const [typewriterStarted, setTypewriterStarted] = useState(false);

  return (
    <>
      {/* Avatar */}
      <motion.div {...fadeUp(HERO_DELAYS.AVATAR)}>
        <Tooltip delay={500}>
          <div className="mx-auto mt-2 w-fit rounded-full border-[0.5px] border-border p-2 md:mt-6">
            <div className="w-fit rounded-full border-[0.5px] border-border p-1">
              <Tooltip.Trigger
                aria-label="Titouan Hirsch Avatar"
                className="md:cursor-none"
              >
                <Avatar className="size-20 md:size-24">
                  <Avatar.Image alt="Titouan Hirsch" src="titou-bio.jpg" />
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
          <h1 className="relative text-center text-xl leading-tight font-semibold tracking-tighter text-base-content md:text-4xl before:absolute before:inset-x-0 before:top-[-14px] before:left-1/2 before:w-screen before:-translate-x-1/2 before:border-[0.5px] before:border-border before:opacity-60 after:absolute after:inset-x-0 after:bottom-[-14px] after:left-1/2 after:w-screen after:-translate-x-1/2 after:border-[0.5px] after:border-border after:opacity-60">
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
            <span className="bg-gradient-to-r from-base-content via-accent to-accent bg-clip-text text-transparent">
              {t("hero.helpsGrow")}
            </span>
          </h1>
        </motion.div>

        <motion.div
          {...fadeUp(HERO_DELAYS.PARAGRAPH)}
          className="flex flex-col md:flex-row-reverse items-center justify-center gap-3 mt-2"
        >
          <Button variant="primary" className="w-60 md:w-auto">
            <Link
              href={BIO_CONTACT.href}
              target="_blank"
              className="flex items-center gap-2"
            >
              {t("hero.ctaPrimary")}
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
          <Button
            onClick={() => {
              document
                .getElementById("problems")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            variant="secondary"
            className="w-60 md:w-auto bg-transparent hover:bg-accent hover:text-white border-accent border-2"
          >
            {t("hero.ctaSecondary")}
            <ChevronDoubleDownIcon className="size-4" />
          </Button>
        </motion.div>
      </div>

      {/* Photos + Plant */}
      <PhotoGallery onPlantReady={() => setTypewriterStarted(true)} />
    </>
  );
}
