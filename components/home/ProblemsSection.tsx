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
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import orbe from "../../assets/orbe.json";
import { ArrowDownIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import strings from "@/app/constants/strings.fr.json";

const problems = [
  {
    icon: "/icons/mvp.png",
    title: strings.problems.mvp.title,
    subtitle: strings.problems.mvp.subtitle,
    description: strings.problems.mvp.description,
  },
  {
    icon: "/icons/build.png",
    title: strings.problems.refonte.title,
    subtitle: strings.problems.refonte.subtitle,
    description: strings.problems.refonte.description,
  },
  {
    icon: "/icons/ia-avatar.webp",
    title: strings.problems.agents.title,
    subtitle: strings.problems.agents.subtitle,
    description: strings.problems.agents.description,
  },
  {
    icon: "/icons/thunderbolt.webp",
    title: strings.problems.scalable.title,
    subtitle: strings.problems.scalable.subtitle,
    description: strings.problems.scalable.description,
  },
];

const privateAi = strings.problems.privateAi;

/* ── Carte phare : l'IA privée ─────────────────────────────────────── */

function PrivateAiCard() {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href="#ia-privee"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative mb-8 flex flex-col gap-5 overflow-hidden rounded-2xl border border-accent/30 bg-surface p-5 pr-14 transition-colors hover:border-accent/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mb-12 md:flex-row md:items-center md:gap-8 md:p-8 md:pr-20"
    >
      {/* Bande hachurée : la marge du périmètre */}
      <span
        aria-hidden="true"
        className="hatch hatch-accent pointer-events-none absolute inset-y-0 right-0 w-10 border-l border-accent/25 md:w-12"
      />

      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/25">
        <LockClosedIcon className="size-5" />
      </span>

      <div className="relative flex-1">
        <p className="label-mono text-accent">{privateAi.subtitle}</p>
        <h3 className="mt-1.5 text-lg font-semibold text-base-content md:text-xl">
          {privateAi.title}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground">
          {privateAi.description}
        </p>
      </div>

      <span className="relative flex items-center gap-2 text-sm font-medium text-accent md:shrink-0">
        {privateAi.cta}
        <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
      </span>
    </motion.a>
  );
}

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
    [activationEnd, activationEnd + segment * 0.65],
    [0, 1],
  );

  return (
    <>
      <div className="relative z-[2]">
        {/* Base card */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-5">
          <span
            aria-hidden="true"
            className="hatch pointer-events-none absolute -top-6 -right-6 size-16 rotate-12 opacity-40"
          />
          {/* Icon with accent overlay + circle bg transition */}
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full">
            <span className="absolute inset-0 rounded-full bg-muted/20" />
            <motion.span
              className="absolute inset-0 rounded-full bg-accent"
              style={{ opacity: progress }}
            />
            <Image
              src={problem.icon}
              alt=""
              width={24}
              height={24}
              className="relative z-[1]"
            />
          </span>

          <h3 className="mt-3 text-base font-semibold text-base-content">
            {problem.title}
          </h3>
          <div className="relative mt-1 h-4">
            <motion.p
              className="absolute text-xs font-medium text-accent"
              style={{ opacity: progress }}
            >
              {problem.subtitle}
            </motion.p>
            <p className="absolute text-xs font-medium text-accent/40">
              {problem.subtitle}
            </p>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground">
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
        <div className="relative mx-auto h-16 w-px bg-border">
          <motion.div
            className="absolute inset-0 origin-top bg-accent"
            style={{ scaleY: lineProgress }}
          />
        </div>
      )}
    </>
  );
}

/* ── Desktop card ─────────────────────────────────────────────────── */

function DesktopCard({
  problem,
  delay,
  inView,
  onHover,
}: {
  problem: (typeof problems)[number];
  delay: number;
  inView: boolean;
  onHover: (hovered: boolean) => void;
}) {
  return (
    <motion.div
      className="group relative z-[1] h-full overflow-hidden rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
    >
      <span
        aria-hidden="true"
        className="hatch pointer-events-none absolute -top-8 -right-8 size-24 rotate-12 opacity-40 transition-opacity duration-300 group-hover:opacity-70"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl border-2 border-accent/40"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.7, 0] } : {}}
        transition={{ duration: 1.8, delay: delay + 1.2, ease: "easeInOut" }}
      />
      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted/20">
        <Image
          src={problem.icon}
          alt=""
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

      <h3 className="relative mt-3 text-lg font-semibold text-base-content">
        {problem.title}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-accent">
        {problem.subtitle}
      </p>
      <p className="relative mt-3 text-sm leading-relaxed text-foreground">
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

  // Lottie: play only when hovering a card
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const handleCardHover = (hovered: boolean) => {
    if (hovered) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.pause();
    }
  };

  // Mobile: avatar follows the connecting line
  const avatarTop = useTransform(scrollYProgress, [0, 1], ["2%", "95%"]);
  const avatarOpacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  return (
    <div className="px-4 md:px-0">
      <PrivateAiCard />

      {/* ── Mobile layout ── */}
      <div ref={mobileRef} className="relative md:hidden">
        {/* Avatar following the line */}
        <motion.div
          className="absolute left-1/2 z-[1] -translate-x-1/2"
          style={{ top: avatarTop, opacity: avatarOpacity }}
        >
          <Image
            src="/titou-bio.jpg"
            alt=""
            width={32}
            height={32}
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
          <Lottie
            lottieRef={lottieRef}
            animationData={orbe}
            autoplay={false}
            className="h-24 w-24 xl:h-36 xl:w-36"
          />
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-2 gap-10 lg:gap-40">
          <div className="flex flex-col gap-10 lg:gap-12">
            <DesktopCard
              problem={problems[0]}
              delay={0.15}
              inView={desktopInView}
              onHover={handleCardHover}
            />
            <DesktopCard
              problem={problems[2]}
              delay={0.45}
              inView={desktopInView}
              onHover={handleCardHover}
            />
          </div>
          <div className="flex flex-col gap-10 lg:gap-12">
            <DesktopCard
              problem={problems[1]}
              delay={0.3}
              inView={desktopInView}
              onHover={handleCardHover}
            />
            <DesktopCard
              problem={problems[3]}
              delay={0.6}
              inView={desktopInView}
              onHover={handleCardHover}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
