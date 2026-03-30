"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import Image from "next/image";

interface Project {
  name: string;
  phonePreview?: string;
  secondPhonePreview?: string;
  laptopPreview?: string;
  testimonial: { text: string; author: string; role: string };
}

const projects: Project[] = [
  {
    name: "Kessel Media",
    phonePreview: "/creations/kesselmediaphone.webp",
    laptopPreview: "/creations/kesselmedia2laptop.webp",
    testimonial: {
      text: "Titou a transformé notre vision en une plateforme média performante et intuitive. Son approche technique et sa réactivité ont été remarquables du début à la fin.",
      author: "Kessel Media",
      role: "Plateforme média",
    },
  },
  {
    name: "PulseAI",
    phonePreview: "/creations/pulseai-phone.png",
    secondPhonePreview: "/creations/pulseai-phone2.png",
    testimonial: {
      text: "L'intégration de l'IA dans notre app de nutrition est bluffante. Nos utilisateurs adorent l'expérience personnalisée, +40% d'engagement dès le lancement.",
      author: "PulseAI",
      role: "Coach nutrition IA",
    },
  },
  {
    name: "Nestor",
    phonePreview: "/creations/nestorphone.webp",
    secondPhonePreview: "/creations/nestor-phone2.png",
    testimonial: {
      text: "De l'idée au store en 6 semaines. L'app de voiturier qu'il a développée tourne sans accroc depuis le premier jour.",
      author: "Nestor Valet",
      role: "App voiturier",
    },
  },
  {
    name: "Bourbon Academy",
    phonePreview: "/creations/bourbonacademy-phone.png",
    laptopPreview: "/creations/bourbonacademy-desktop.png",
    testimonial: {
      text: "La plateforme d'orientation a déjà aidé des centaines d'étudiants ultramarins à trouver leur voie. Un projet qui a du sens.",
      author: "Bourbon Academy",
      role: "Orientation scolaire",
    },
  },
  {
    name: "WeDive",
    laptopPreview: "/creations/wedivelaptop.webp",
    testimonial: {
      text: "WeDive est devenu la référence des spots de plongée à La Réunion. Titou a su capturer l'essence du projet dans chaque détail.",
      author: "WeDive",
      role: "Spots de plongée",
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
          className="w-60 md:w-80 lg:w-96"
        />
      </div>
    );
  }

  return null;
}

/* ── Main section ──────────────────────────────────────────────────── */

export default function CreationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasAutoplayedRef = useRef(false);

  const inView = useInView(sectionRef, { margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.15"],
  });

  // Phase 1: scroll-linked — advance through items 0 & 1
  // Phase 2: after idle, autoplay takes over
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!inView) return;

    if (!hasAutoplayedRef.current) {
      const index = progress < 0.5 ? 0 : 1;
      setActiveIndex(index);
    }

    clearTimeout(scrollTimeoutRef.current);
    setAutoplay(false);
    scrollTimeoutRef.current = setTimeout(() => {
      setAutoplay(true);
      hasAutoplayedRef.current = true;
    }, 1200);
  });

  // Autoplay loop
  useEffect(() => {
    if (!autoplay || !inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoplay, inView]);

  useEffect(() => {
    return () => clearTimeout(scrollTimeoutRef.current);
  }, []);

  const project = projects[activeIndex];

  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    setAutoplay(false);
    hasAutoplayedRef.current = true;
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => setAutoplay(true), 4000);
  };

  return (
    <div ref={sectionRef} className="px-4 md:px-0">
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-2xl border border-neutral bg-[var(--background)] p-6 pt-14 md:p-10 md:pt-16 min-h-[340px] md:min-h-[420px] flex flex-col items-center justify-center">
        {/* Project name pill */}
        <AnimatePresence mode="wait">
          <motion.span
            key={project.name}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="absolute top-4 left-4 md:top-6 md:left-6 bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            {project.name}
          </motion.span>
        </AnimatePresence>

        {/* Slide counter */}
        <span className="absolute top-4 right-4 md:top-6 md:right-6 text-xs text-foreground/40 font-mono tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>

        {/* Mockup display */}
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

        {/* Dot navigation */}
        <div className="flex items-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Voir projet ${i + 1}`}
              className="relative p-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-2 bg-accent"
                    : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            </button>
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
          className="mt-4 p-5 rounded-xl border border-neutral bg-[var(--background)]"
        >
          <div className="flex items-start gap-3">
            <span className="text-accent text-2xl leading-none select-none">
              &ldquo;
            </span>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-foreground">
                {project.testimonial.text}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-base-content">
                    {project.testimonial.author}
                  </p>
                  <p className="text-xs text-foreground/50">
                    {project.testimonial.role}
                  </p>
                </div>
                {autoplay && (
                  <motion.div
                    className="h-0.5 bg-accent/30 rounded-full overflow-hidden w-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                      key={`progress-${activeIndex}`}
                    />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
