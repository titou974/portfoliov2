"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import Lottie from "lottie-react";
import orbe from "../../assets/orbe.json";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";

const problems = [
  {
    icon: "/icons/mvp.png",
    title: "Lancement MVP",
    subtitle: "Validez votre idée rapidement",
    description:
      "Développement express de votre MVP (max. 2 mois) pour tester votre marché et convaincre vos premiers utilisateurs.",
  },
  {
    icon: "/icons/build.png",
    title: "Refonte & Debug de votre app codé par l'IA",
    subtitle: "Reprenez le contrôle de votre app",
    description:
      "Votre app générée par IA bugge ou manque de solidité ? Je la restructure pour en faire un produit fiable et maintenable.",
  },
  {
    icon: "/icons/ia-avatar.webp",
    title: "Agents IA sur-mesure",
    subtitle: "Automatisez ce qui vous ralentit",
    description:
      "Création d'agents intelligents qui prennent en charge vos tâches répétitives et boostent votre productivité.",
  },
  {
    icon: "/icons/thunderbolt.webp",
    title: "App Scalable",
    subtitle: "Construisez pour des millions",
    description:
      "Architecture robuste conçue pour supporter des centaines de milliers d'utilisateurs sans compromis sur la performance.",
  },
];

/* ── Mobile card — scroll-linked activation ───────────────────────── */

function MobileCard({
  problem,
  index,
  scrollYProgress,
  isLast,
}: {
  problem: (typeof problems)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  isLast: boolean;
}) {
  const segment = 1 / problems.length;
  const start = index * segment;
  const activationEnd = start + segment * 0.45;

  // Card activation progress (0 → 1)
  const progress = useTransform(
    scrollYProgress,
    [start, activationEnd],
    [0, 1],
  );

  // Connector line fill between cards
  const lineProgress = useTransform(
    scrollYProgress,
    [activationEnd, activationEnd + segment * 0.35],
    [0, 1],
  );

  return (
    <>
      <div className="relative z-[2]">
        {/* Base card */}
        <div className="rounded-xl border border-neutral bg-[var(--background)] p-5">
          {/* Arrow button top-right */}
          <div className="absolute top-4 right-4 bg-accent/20 text-accent rounded-full p-2">
            <ArrowUpRightIcon className="size-5" />
          </div>

          {/* Icon with accent overlay + circle bg transition */}
          <span className="relative inline-flex items-center justify-center rounded-full w-10 h-10">
            <span className="absolute inset-0 rounded-full bg-muted/20" />
            <motion.span
              className="absolute inset-0 rounded-full bg-accent"
              style={{ opacity: progress }}
            />
            <Image
              src={problem.icon}
              alt={problem.title}
              width={24}
              height={24}
              className="relative z-[1]"
            />
          </span>

          <h3 className="mt-2 text-base font-semibold text-base-content">
            {problem.title}
          </h3>
          <div className="relative">
            <motion.p
              className="absolute mt-0.5 text-xs font-medium text-accent"
              style={{ opacity: progress }}
            >
              {problem.subtitle}
            </motion.p>
            <p className="absolute mt-0.5 text-xs font-medium text-accent/40">
              {problem.subtitle}
            </p>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-foreground">
            {problem.description}
          </p>
        </div>

        {/* Active accent border overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl border-2 border-accent"
          style={{ opacity: progress }}
        />
      </div>

      {/* Connector line to next card */}
      {!isLast && (
        <div className="relative mx-auto h-16 w-px bg-neutral">
          <motion.div
            className="absolute inset-0 origin-top bg-accent"
            style={{ scaleY: lineProgress }}
          />
        </div>
      )}
    </>
  );
}

/* ── Desktop card — with connecting line via group-hover ───────────── */

const LINE_CONFIGS = [
  // Card 0 (top-left): line from right edge → down-right toward center
  "bottom-0 left-full origin-left rotate-[45deg] lg:rotate-[17deg] bg-gradient-to-r",
  // Card 1 (top-right): line from left edge → down-left toward center
  "bottom-0 right-full origin-right -rotate-[45deg] lg:-rotate-[17deg] bg-gradient-to-l",
  // Card 2 (bottom-left): line from right edge → up-right toward center
  "top-0 left-full origin-left -rotate-[45deg] lg:-rotate-[17deg] bg-gradient-to-r",
  // Card 3 (bottom-right): line from left edge → up-left toward center
  "top-0 right-full origin-right rotate-[45deg] lg:rotate-[17deg] bg-gradient-to-l",
];

function DesktopCard({
  problem,
  delay,
  inView,
  index,
}: {
  problem: (typeof problems)[number];
  delay: number;
  inView: boolean;
  index: number;
}) {
  return (
    <motion.div
      className="relative z-[1] overflow-visible rounded-xl border border-neutral bg-[var(--background)] p-6 group h-full"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {/* Connecting line to center Lottie */}
      <div
        className={`pointer-events-none absolute h-px w-20 lg:w-52 ${LINE_CONFIGS[index]}`}
      >
        {/* Base (border color) */}
        <div className="absolute inset-0 bg-inherit from-[var(--border)] to-transparent group-hover:opacity-0 transition-opacity duration-300" />
        {/* Accent (on hover) */}
        <div className="absolute inset-0 bg-inherit from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Border pulse on entry */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl border-2 border-accent/40"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.7, 0] } : {}}
        transition={{ duration: 1.8, delay: delay + 1.2, ease: "easeInOut" }}
      />

      <div className="absolute top-4 right-4 bg-accent/20 border-border text-accent group-hover:bg-accent group-hover:text-background group-hover:translate-y-[-2px] transition-all duration-300 rounded-full p-2">
        <ArrowUpRightIcon className="size-6" />
      </div>

      {/* Icon with accent flash */}
      <span className="relative inline-flex items-center justify-center bg-muted/20 rounded-full w-12 h-12">
        <Image
          src={problem.icon}
          alt={problem.title}
          width={30}
          height={30}
          className="relative z-[1]"
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-accent/20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.8, delay: delay + 1.2, ease: "easeInOut" }}
        />
      </span>

      <h3 className="mt-3 text-lg font-semibold text-base-content">
        {problem.title}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{problem.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-foreground">
        {problem.description}
      </p>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */

export default function ProblemsSection() {
  // Mobile: scroll-linked animation
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileRef,
    offset: ["start 0.75", "end 0.3"],
  });

  // Desktop: viewport trigger
  const desktopRef = useRef<HTMLDivElement>(null);
  const desktopInView = useInView(desktopRef, { once: true, margin: "-80px" });

  // Mobile: avatar follows the connecting line
  const avatarTop = useTransform(scrollYProgress, [0, 1], ["2%", "95%"]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  return (
    <>
      {/* ── Mobile layout ── */}
      <div ref={mobileRef} className="relative px-4 md:hidden">
        {/* Avatar following the line */}
        <motion.div
          className="absolute left-1/2 z-[1] -translate-x-1/2"
          style={{ top: avatarTop, opacity: avatarOpacity }}
        >
          <img
            src="/titou.jpeg"
            alt=""
            className="size-8 rounded-full border-2 border-accent object-cover shadow-sm"
          />
        </motion.div>

        {problems.map((problem, i) => (
          <MobileCard
            key={problem.title}
            problem={problem}
            index={i}
            scrollYProgress={scrollYProgress}
            isLast={i === problems.length - 1}
          />
        ))}
      </div>
      {/* ── Desktop layout ── */}
      <div ref={desktopRef} className="relative hidden md:block">
        {/* Lottie at center */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Lottie animationData={orbe} className="w-24 h-24 xl:w-36 xl:h-36" />
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-2 gap-10 lg:gap-40">
          <div className="flex flex-col gap-10 lg:gap-12">
            <DesktopCard
              problem={problems[0]}
              delay={0.15}
              inView={desktopInView}
              index={0}
            />
            <DesktopCard
              problem={problems[2]}
              delay={0.45}
              inView={desktopInView}
              index={2}
            />
          </div>
          <div className="flex flex-col gap-10 lg:gap-12">
            <DesktopCard
              problem={problems[1]}
              delay={0.3}
              inView={desktopInView}
              index={1}
            />
            <DesktopCard
              problem={problems[3]}
              delay={0.6}
              inView={desktopInView}
              index={3}
            />
          </div>
        </div>
      </div>
    </>
  );
}
