"use client";

import { useState } from "react";
import { Avatar, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { fadeUp, HERO_DELAYS } from "@/lib/animation";
import { PhotoGallery } from "./PhotoGallery";
import { Typewriter } from "./Typewriter";

const TYPEWRITER_WORDS = [
  "Application,",
  "Site Web,",
  "MVP,",
  "Design,",
  "Parcours utilisateur,",
  "Automatisation,",
  "Agent IA,",
  "Projet tech,",
];

export default function Hero() {
  const [typewriterStarted, setTypewriterStarted] = useState(false);

  return (
    <>
      {/* Avatar */}
      <motion.div {...fadeUp(HERO_DELAYS.AVATAR)}>
        <Tooltip delay={500}>
          <div className="w-fit p-4 rounded-full border-[0.5px] border-neutral mx-auto mt-6 md:mt-10">
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
            <p>Salut !</p>
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
            Bienvenue ! Je suis Titouan/@bobodigital.
            <br />
            Je donne vie à votre{" "}
            <Typewriter
              words={TYPEWRITER_WORDS}
              started={typewriterStarted}
              className="text-accent"
            />
            <br />
            et je{" "}
            <span className="text-transparent bg-gradient-to-r from-muted via-accent/90 to-accent bg-clip-text">
              l&apos;aide à Grandir.
            </span>
          </h1>
        </motion.div>

        {/* Paragraph */}
        <motion.div {...fadeUp(HERO_DELAYS.PARAGRAPH)} className="relative">
          <p className="relative text-sm md:text-base w-full text-center text-foreground mx-auto leading-8 text-balance max-w-3xl before:absolute before:w-screen before:border-[0.5px] before:border-neutral before:inset-x-0 before:top-[-4] before:left-1/2 before:-translate-x-1/2 after:absolute after:w-screen after:border-[0.5px] after:border-neutral after:inset-x-0 after:bottom-[-6] after:left-1/2 after:-translate-x-1/2 after:opacity-90 before:opacity-90">
            Du MVP au réseau social qui peut tenir un gros trafic. De
            l&apos;application mobile, jusqu&apos;au site internet, je donne vie
            à vos idées avec 2 ans d&apos;expertises
          </p>
        </motion.div>
      </div>

      {/* Photos + Plant */}
      <PhotoGallery onPlantReady={() => setTypewriterStarted(true)} />
    </>
  );
}
