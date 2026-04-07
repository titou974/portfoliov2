"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import strings from "@/app/constants/strings.fr.json";

interface Project {
  name: string;
  phonePreview?: string;
  secondPhonePreview?: string;
  laptopPreview?: string;
  logo: string;
  testimonial: { text: string; author: string; role: string };
}

const projects: Project[] = [
  {
    name: strings.creations.projects.kesselMedia.name,
    phonePreview: "/creations/kesselmediaphone.webp",
    laptopPreview: "/creations/kesselmedia2laptop.webp",
    logo: "/logos/logo_kessel.webp",
    testimonial: {
      text: strings.creations.projects.kesselMedia.testimonial,
      author: strings.creations.projects.kesselMedia.author,
      role: strings.creations.projects.kesselMedia.role,
    },
  },
  {
    name: strings.creations.projects.pulseAI.name,
    phonePreview: "/creations/pulseai-phone.png",
    secondPhonePreview: "/creations/pulseai-phone2.png",
    logo: "/logos/logo_pulseia.png",
    testimonial: {
      text: strings.creations.projects.pulseAI.testimonial,
      author: strings.creations.projects.pulseAI.author,
      role: strings.creations.projects.pulseAI.role,
    },
  },
  {
    name: strings.creations.projects.nestor.name,
    phonePreview: "/creations/nestorphone.webp",
    secondPhonePreview: "/creations/nestor-phone2.png",
    logo: "/logos/logo-nestor.svg",
    testimonial: {
      text: strings.creations.projects.nestor.testimonial,
      author: strings.creations.projects.nestor.author,
      role: strings.creations.projects.nestor.role,
    },
  },
  {
    name: strings.creations.projects.bourbonAcademy.name,
    phonePreview: "/creations/bourbonacademy-phone.png",
    laptopPreview: "/creations/bourbonacademy-desktop.png",
    logo: "/logos/logo_bourbon.jpg",
    testimonial: {
      text: strings.creations.projects.bourbonAcademy.testimonial,
      author: strings.creations.projects.bourbonAcademy.author,
      role: strings.creations.projects.bourbonAcademy.role,
    },
  },
  {
    name: strings.creations.projects.weDive.name,
    laptopPreview: "/creations/wedivelaptop.webp",
    logo: "/logos/logo-wedive.png",
    testimonial: {
      text: strings.creations.projects.weDive.testimonial,
      author: strings.creations.projects.weDive.author,
      role: strings.creations.projects.weDive.role,
    },
  },
];

/* ── Mockup components ─────────────────────────────────────────────── */

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
        className="relative z-20 w-full h-auto"
        priority
      />
      <Image
        src={src}
        alt=""
        width={180}
        height={380}
        className="absolute top-[3%] left-[8%] w-[84%] h-[94%] object-cover rounded-[8%] z-10"
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
        className="relative z-20 w-full h-auto"
        priority
      />
      <Image
        src={src}
        alt=""
        width={350}
        height={200}
        className="absolute top-[7%] left-[15%] w-[70%] h-[62%] object-cover rounded-sm z-10"
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
          className="w-52 md:w-72 lg:w-80"
        />
        <PhoneMockup
          src={project.phonePreview!}
          className="w-14 md:w-20 lg:w-22 absolute -right-2 md:-right-4 bottom-1 md:bottom-2 z-30"
        />
      </div>
    );
  }

  if (hasTwoPhones) {
    return (
      <div className="flex items-center justify-center gap-2 md:gap-5">
        <PhoneMockup
          src={project.phonePreview!}
          className="w-20 md:w-26 lg:w-28 -rotate-6"
        />
        <PhoneMockup
          src={project.secondPhonePreview!}
          className="w-20 md:w-26 lg:w-28 rotate-6"
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
          className="w-52 md:w-72 lg:w-80"
        />
      </div>
    );
  }

  return null;
}

/* ── Main section ──────────────────────────────────────────────────── */

const LINE =
  "before:absolute before:w-screen before:border-[0.5px] before:border-border before:inset-x-0 before:left-1/2 before:-translate-x-1/2 before:opacity-60 before:top-[-2px] after:absolute after:w-screen after:border-[0.5px] after:border-border after:inset-x-0 after:left-1/2 after:-translate-x-1/2 after:opacity-60 after:bottom-[-2px]";

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
    const index = Math.min(Math.floor(scaled), total - 1);
    setActiveIndex(index);
    setSegmentProgress(Math.min(scaled - index, 1));
  });

  const project = projects[activeIndex];

  return (
    <section ref={containerRef} className="relative mt-16 h-[400vh] md:px-6">
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center">
        {/* Section title — same style as SectionWrapper */}
        <div className="mb-10 md:mb-16 text-center space-y-4">
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
        </div>

        <div className="w-full max-w-2xl mx-auto px-4 md:px-0">
          <div className="group relative overflow-hidden rounded-2xl border border-neutral bg-surface p-6 pt-14 md:p-10 md:pt-16 min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center">
            <div className="absolute top-4 right-4 bg-accent/20 border-border text-accent group-hover:bg-accent group-hover:text-background group-hover:translate-y-[-2px] transition-all duration-300 rounded-full p-2">
              <ArrowUpRightIcon className="size-6" />
            </div>
            <AnimatePresence mode="wait">
              <motion.img
                key={project.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-4 md:top-6 md:left-6 border border-border text-foreground text-xs font-semibold p-1 rounded-lg"
                src={project.logo}
                alt={project.name + " Logo"}
                width={40}
                height={40}
              />
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-1 flex items-center justify-center"
              >
                <MockupDisplay project={project} />
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-6">
              {projects.map((_, i) => (
                <div key={i} className="p-1">
                  <span
                    className={`block rounded-full transition-all duration-300 overflow-hidden ${
                      i === activeIndex
                        ? "w-6 h-2 bg-accent/30"
                        : i < activeIndex
                          ? "w-2 h-2 bg-accent"
                          : "w-2 h-2 bg-foreground/20"
                    }`}
                  >
                    {i === activeIndex && (
                      <span
                        className="block h-full bg-accent rounded-full transition-[width] duration-100"
                        style={{ width: `${segmentProgress * 100}%` }}
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-4 p-5 rounded-xl border border-neutral bg-surface"
            >
              <div className="flex items-start gap-3">
                <span className="text-accent text-2xl leading-none select-none">
                  &ldquo;
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-foreground">
                    {project.testimonial.text}
                  </p>
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-base-content">
                      {project.testimonial.author}
                    </p>
                    <p className="text-xs text-foreground/50">
                      {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
