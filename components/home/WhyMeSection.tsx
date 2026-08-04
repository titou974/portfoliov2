"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircleIcon, MinusIcon } from "@heroicons/react/16/solid";
import strings from "@/app/constants/strings.fr.json";
import Image from "next/image";

const premiumItems = Object.values(strings.whyMe.premium.items);
const classicItems = Object.values(strings.whyMe.classic.items);

function PremiumColumn({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative flex-1 overflow-hidden rounded-2xl bg-surface p-6 md:p-8"
    >
      {/* Gradient border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          background: `
            radial-gradient(ellipse 80% 50% at 20% 0%, var(--color-accent) 0%, transparent 60%),
            linear-gradient(to bottom, color-mix(in srgb, var(--color-accent) 25%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))
          `,
        }}
      />
      {/* Inner soft glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 0%, var(--color-accent), transparent 70%)",
        }}
      />
      {/* Content */}
      <div className="relative z-[1]">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 md:mb-8">
          <Image
            width={44}
            height={44}
            src="/titou-bio.jpg"
            alt=""
            className="size-11 rounded-full border-2 border-accent object-cover"
          />
          <div>
            <span className="label-mono rounded-full bg-accent/15 px-2 py-0.5 text-accent">
              {strings.whyMe.premium.badge}
            </span>
            <h3 className="mt-1.5 text-base font-bold text-accent md:text-lg">
              {strings.whyMe.premium.title}
            </h3>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-0">
          {premiumItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="border-b border-accent/10 py-5 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-base-content">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground md:text-[13px]">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ClassicColumn({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative flex-1 overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 md:p-8"
    >
      <span
        aria-hidden="true"
        className="hatch pointer-events-none absolute inset-0 opacity-60"
      />

      {/* Header */}
      <div className="relative mb-6 flex items-center gap-3 md:mb-8">
        <div className="flex size-11 items-center justify-center rounded-full border border-border bg-background">
          <MinusIcon className="size-5 text-foreground/30" />
        </div>
        <div>
          <span className="label-mono rounded-full bg-foreground/5 px-2 py-0.5 text-foreground/50">
            {strings.whyMe.classic.badge}
          </span>
          <h3 className="mt-1.5 text-base font-bold text-foreground/70 md:text-lg">
            {strings.whyMe.classic.title}
          </h3>
        </div>
      </div>

      {/* Items */}
      <div className="relative space-y-0">
        {classicItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            className="border-b border-border py-5 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start gap-3">
              <MinusIcon className="mt-0.5 size-5 shrink-0 text-foreground/30" />
              <div>
                <p className="text-sm font-semibold text-foreground/70">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/55 md:text-[13px]">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WhyMeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="px-4 md:px-0">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <PremiumColumn inView={inView} />
        <ClassicColumn inView={inView} />
      </div>
    </div>
  );
}
