"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { t } from "@/lib/strings";

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="mt-16 px-4 md:px-6 pb-16">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-border bg-surface max-w-2xl mx-auto"
      >
        {/* Tech grid background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--color-border) 1px, transparent 1px),
                linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Corner gradient accents */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
          {/* Horizontal accent lines */}
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          {/* Vertical accent lines */}
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
          <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent" />
        </div>

        {/* Content - mobile: centered column / desktop: text left, icon right */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between p-8 md:p-12 gap-6">
          {/* Text + CTA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Calendar icon - mobile only */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="md:hidden"
            >
              <Image
                src="/creations/calendar.png"
                alt={t("booking.calendarAlt")}
                width={80}
                height={80}
                className="drop-shadow-lg"
              />
            </motion.div>

            <h2 className="mt-5 md:mt-0 text-lg md:text-2xl font-semibold text-base-content tracking-tight">
              {t("booking.title")}
            </h2>
            <p className="mt-3 text-sm md:text-base text-foreground max-w-md">
              {t("booking.description")}
            </p>
            <div className="mt-6">
              <Button variant="primary" size="lg" onPress={() => {}}>
                {t("booking.cta")}
                <ArrowUpRightIcon className="size-4" />
              </Button>
            </div>
          </div>

          {/* Calendar icon - desktop only, right side, bigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="hidden md:block shrink-0"
          >
            <Image
              src="/creations/calendar.png"
              alt={t("booking.calendarAlt")}
              width={140}
              height={140}
              className="drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Bottom border accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </motion.div>
    </section>
  );
}
