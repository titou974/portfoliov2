"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
 * Filets pleine largeur cadrant le titre : ils prolongent visuellement les
 * gouttières hachurées de la page et découpent le contenu en bandes.
 */
export const LINE =
  "before:absolute before:w-screen before:border-[0.5px] before:border-border before:inset-x-0 before:left-1/2 before:-translate-x-1/2 before:opacity-60 before:top-[-2px] after:absolute after:w-screen after:border-[0.5px] after:border-border after:inset-x-0 after:left-1/2 after:-translate-x-1/2 after:opacity-60 after:bottom-[-2px]";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-4">
      {eyebrow && (
        <p className="label-mono flex items-center justify-center gap-2 text-accent">
          <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
          {eyebrow}
          <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
        </p>
      )}
      <h2
        className={`relative text-balance text-xl font-semibold tracking-tight text-base-content md:text-3xl ${LINE}`}
      >
        {title}
      </h2>
      <p
        className={`relative mx-auto mt-2 max-w-2xl text-pretty text-sm text-foreground md:text-base ${LINE}`}
      >
        {subtitle}
      </p>
    </div>
  );
}

export default function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section id={id} className="mt-20 scroll-mt-20 md:mt-28 md:px-6">
      <motion.div
        ref={titleRef}
        className="relative mb-10 text-center md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
      </motion.div>
      {children}
    </section>
  );
}
