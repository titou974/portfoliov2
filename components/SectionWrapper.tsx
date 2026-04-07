"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

const LINE =
  "before:absolute before:w-screen before:border-[0.5px] before:border-border before:inset-x-0 before:left-1/2 before:-translate-x-1/2 before:opacity-60 before:top-[-2px] after:absolute after:w-screen after:border-[0.5px] after:border-border after:inset-x-0 after:left-1/2 after:-translate-x-1/2 after:opacity-60 after:bottom-[-2px]";

export default function SectionWrapper({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section className="mt-16 md:px-6">
      <motion.div
        ref={titleRef}
        className="relative mb-10 text-center md:mb-16 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2
          className={`relative text-lg font-semibold text-base-content md:text-3xl tracking-tight ${LINE}`}
        >
          {title}
        </h2>
        <p
          className={`relative mt-2 text-sm text-foreground md:text-base ${LINE}`}
        >
          {subtitle}
        </p>
      </motion.div>
      {children}
    </section>
  );
}
