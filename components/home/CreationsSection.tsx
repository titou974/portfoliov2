"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import strings from "@/app/constants/strings.fr.json";
import { SectionHeading } from "@/components/SectionWrapper";

interface Project {
  name: string;
  role: string;
  phonePreview?: string;
  secondPhonePreview?: string;
  laptopPreview?: string;
  logo: string;
  /** Citation client, quand il y en a une. */
  testimonial?: string;
  /** Note de projet, quand la preuve est le livrable et non un témoignage. */
  note?: string;
  author: string;
  authorRole?: string;
}

const p = strings.creations.projects;

const projects: Project[] = [
  {
    name: p.codeself.name,
    role: p.codeself.role,
    laptopPreview: "/creations/codeself.png",
    logo: "/logos/codeself.svg",
    note: p.codeself.note,
    author: p.codeself.author,
    authorRole: p.codeself.authorRole,
  },
  {
    name: p.kesselMedia.name,
    role: p.kesselMedia.role,
    phonePreview: "/creations/kesselmediaphone.webp",
    laptopPreview: "/creations/kesselmedia2laptop.webp",
    logo: "/logos/logo_kessel.webp",
    testimonial: p.kesselMedia.testimonial,
    author: p.kesselMedia.author,
  },
  {
    name: p.pulseAI.name,
    role: p.pulseAI.role,
    phonePreview: "/creations/pulseai-phone.png",
    secondPhonePreview: "/creations/pulseai-phone2.png",
    logo: "/logos/logo_pulseia.png",
    testimonial: p.pulseAI.testimonial,
    author: p.pulseAI.author,
  },
  {
    name: p.nestor.name,
    role: p.nestor.role,
    phonePreview: "/creations/nestorphone.webp",
    secondPhonePreview: "/creations/nestor-phone2.png",
    logo: "/logos/logo-nestor.svg",
    testimonial: p.nestor.testimonial,
    author: p.nestor.author,
  },
  {
    name: p.bourbonAcademy.name,
    role: p.bourbonAcademy.role,
    phonePreview: "/creations/bourbonacademy-phone.png",
    laptopPreview: "/creations/bourbonacademy-desktop.png",
    logo: "/logos/logo_bourbon.jpg",
    testimonial: p.bourbonAcademy.testimonial,
    author: p.bourbonAcademy.author,
  },
  {
    name: p.weDive.name,
    role: p.weDive.role,
    laptopPreview: "/creations/wedivelaptop.webp",
    logo: "/logos/logo-wedive.png",
    testimonial: p.weDive.testimonial,
    author: p.weDive.author,
  },
];

/* ── Mockups ───────────────────────────────────────────────────────── */

function PhoneMockup({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/mockups/iphone-mockup.webp"
        alt=""
        width={200}
        height={400}
        className="relative z-20 h-auto w-full"
      />
      <Image
        src={src}
        alt=""
        width={180}
        height={380}
        className="absolute top-[3%] left-[8%] z-10 h-[94%] w-[84%] rounded-[8%] object-cover"
      />
    </div>
  );
}

function LaptopMockup({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/mockups/desktop-mockup.webp"
        alt=""
        width={500}
        height={320}
        className="relative z-20 h-auto w-full"
      />
      <Image
        src={src}
        alt=""
        width={350}
        height={200}
        className="absolute top-[7%] left-[15%] z-10 h-[62%] w-[70%] rounded-sm object-cover object-top"
      />
    </div>
  );
}

function MockupDisplay({ project }: { project: Project }) {
  const hasLaptop = !!project.laptopPreview;
  const hasPhone = !!project.phonePreview;
  const hasTwoPhones = !!project.secondPhonePreview;

  if (hasLaptop && hasPhone) {
    return (
      <div className="relative flex items-end justify-center">
        <LaptopMockup
          src={project.laptopPreview!}
          className="w-56 md:w-72 lg:w-80"
        />
        <PhoneMockup
          src={project.phonePreview!}
          className="absolute -right-2 bottom-1 z-30 w-14 md:-right-4 md:bottom-2 md:w-20 lg:w-22"
        />
      </div>
    );
  }

  if (hasTwoPhones) {
    return (
      <div className="flex items-center justify-center gap-3 md:gap-5">
        <PhoneMockup
          src={project.phonePreview!}
          className="w-20 -rotate-6 md:w-26 lg:w-28"
        />
        <PhoneMockup
          src={project.secondPhonePreview!}
          className="w-20 rotate-6 md:w-26 lg:w-28"
        />
      </div>
    );
  }

  if (hasPhone) {
    return (
      <div className="flex justify-center">
        <PhoneMockup
          src={project.phonePreview!}
          className="w-24 md:w-28 lg:w-32"
        />
      </div>
    );
  }

  if (hasLaptop) {
    return (
      <div className="flex justify-center">
        <LaptopMockup
          src={project.laptopPreview!}
          className="w-56 md:w-72 lg:w-80"
        />
      </div>
    );
  }

  return null;
}

/* ── Section ───────────────────────────────────────────────────────── */

const TRANSITION = { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } as const;

export default function CreationsSection({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const total = projects.length;
    const scaled = progress * total;
    const index = Math.min(Math.max(Math.floor(scaled), 0), total - 1);
    setActiveIndex(index);
    setSegmentProgress(Math.min(Math.max(scaled - index, 0), 1));
  });

  const project = projects[activeIndex];
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    projects.length,
  ).padStart(2, "0")}`;

  return (
    <section
      ref={containerRef}
      id="creations"
      /* Un écran de scroll par projet : la hauteur de la piste dépend du
         nombre de projets, jamais de la longueur des textes. */
      className="relative mt-20 h-[560vh] md:mt-28 md:px-6"
    >
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center px-4 md:px-0">
        <div className="mb-8 text-center md:mb-12">
          <SectionHeading title={title} subtitle={subtitle} />
        </div>

        <div className="mx-auto w-full max-w-2xl">
          {/* Scène — hauteur figée */}
          <div className="relative flex h-[300px] flex-col overflow-hidden rounded-2xl border border-border bg-surface md:h-[400px]">
            <span
              aria-hidden="true"
              className="hatch pointer-events-none absolute inset-0 opacity-50"
            />

            {/* Bandeau : identité du projet + position dans la série */}
            <div className="relative z-10 flex items-center justify-between gap-3 border-b border-border/70 bg-surface/80 px-4 py-3 backdrop-blur-sm md:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={project.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background p-1"
                  >
                    <Image
                      src={project.logo}
                      alt=""
                      width={28}
                      height={28}
                      className="h-full w-full object-contain"
                    />
                  </motion.span>
                </AnimatePresence>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-base-content">
                    {project.name}
                  </p>
                  <p className="truncate text-xs text-foreground/60">
                    {project.role}
                  </p>
                </div>
              </div>
              <span className="label-mono shrink-0 text-foreground/45">
                {counter}
              </span>
            </div>

            {/* Mockup */}
            <div className="relative z-[1] flex min-h-0 flex-1 items-center justify-center px-4 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 60, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.96 }}
                  transition={TRANSITION}
                  className="flex h-full w-full items-center justify-center"
                >
                  <MockupDisplay project={project} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progression */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 border-t border-border/70 bg-surface/80 py-3 backdrop-blur-sm">
              {projects.map((item, i) => (
                <span
                  key={item.name}
                  className={`block overflow-hidden rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "h-1.5 w-7 bg-accent/25"
                      : i < activeIndex
                        ? "h-1.5 w-1.5 bg-accent"
                        : "h-1.5 w-1.5 bg-foreground/20"
                  }`}
                >
                  {i === activeIndex && (
                    <span
                      className="block h-full rounded-full bg-accent transition-[width] duration-100"
                      style={{ width: `${segmentProgress * 100}%` }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Preuve — hauteur figée elle aussi, sinon la page ripe au scroll */}
          <div className="relative mt-3 h-[168px] overflow-hidden rounded-xl border border-border bg-surface md:h-[150px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 m-0 flex flex-col justify-center p-5"
              >
                <blockquote className="flex gap-2.5">
                  {project.testimonial && (
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none text-accent select-none"
                    >
                      &ldquo;
                    </span>
                  )}
                  <p className="line-clamp-4 text-sm leading-relaxed text-foreground">
                    {project.testimonial ?? project.note}
                  </p>
                </blockquote>
                <figcaption className="mt-3 flex items-baseline gap-2 border-t border-border/70 pt-3">
                  <span className="text-xs font-semibold text-base-content">
                    {project.author}
                  </span>
                  {project.authorRole && (
                    <span className="label-mono truncate text-foreground/45">
                      {project.authorRole}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
