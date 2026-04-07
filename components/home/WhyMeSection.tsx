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
      className="relative rounded-2xl p-6 md:p-8 flex-1 overflow-hidden bg-surface"
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
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
          <Image
            width={40}
            height={40}
            src="/titou.jpeg"
            alt="bobo"
            className="rounded-full border-accent border-2"
          />
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/15 px-2 py-0.5 rounded-full">
              {strings.whyMe.premium.badge}
            </span>
            <h3 className="text-base md:text-lg font-bold text-accent mt-1">
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
              className="py-5 border-b border-accent/10 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="size-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-base-content">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-base-content/70">
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
      className="rounded-2xl border border-neutral bg-surface/20 p-6 md:p-8 flex-1 opacity-40"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/40 text-lg">&#9632;</span>
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50 bg-foreground/5 px-2 py-0.5 rounded-full">
            {strings.whyMe.classic.badge}
          </span>
          <h3 className="text-base md:text-lg font-bold text-base-content opacity-60 mt-1">
            {strings.whyMe.classic.title}
          </h3>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-0">
        {classicItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            className="py-5 border-b border-neutral last:border-b-0"
          >
            <div className="flex items-start gap-3">
              <MinusIcon className="size-5 text-foreground/30 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-base-content/60 opacity-60">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/50">
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <PremiumColumn inView={inView} />
        <ClassicColumn inView={inView} />
      </div>
    </div>
  );
}
