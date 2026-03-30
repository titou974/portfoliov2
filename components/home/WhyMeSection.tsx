"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircleIcon, MinusIcon } from "@heroicons/react/16/solid";

const myApproach = [
  {
    title: "Partenariat personnalisé",
    description:
      "Je collabore étroitement avec vous pour traduire votre vision en réalité digitale, de la conception jusqu'au lancement.",
  },
  {
    title: "Développement full-code",
    description:
      "Solutions sur-mesure sans compromis techniques, conçues pour la performance et l'évolutivité à long terme.",
  },
  {
    title: "Stratégie marketing intégrée",
    description:
      "SEO et conversion pilotent chaque décision technique pour maximiser votre retour sur investissement.",
  },
  {
    title: "Excellence technique",
    description:
      "Développement de haute qualité garantissant vitesse, sécurité et expérience utilisateur optimale.",
  },
  {
    title: "Innovation créative",
    description:
      "Technologies modernes et design avant-gardiste pour créer des expériences web mémorables qui vous démarquent.",
  },
];

const classicApproach = [
  {
    title: "Approche générique",
    description:
      "Sites préconçus avec personnalisation limitée qui contraignent votre marque à s'adapter à l'outil.",
  },
  {
    title: "Sites basés sur templates",
    description:
      "Designs similaires à la concurrence et performance technique compromise par les plugins superflus.",
  },
  {
    title: "Développement standardisé",
    description:
      "Priorité à la rapidité d'exécution plutôt qu'à la qualité technique et à la pérennité de la solution.",
  },
  {
    title: "Marketing secondaire",
    description:
      "SEO et conversion considérés comme des options additionnelles plutôt qu'intégrés à la conception.",
  },
  {
    title: "Innovation limitée",
    description:
      "Solutions figées qui freinent l'implémentation des tendances web et des expériences utilisateur avancées.",
  },
];

function PremiumColumn({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative rounded-2xl p-6 md:p-8 flex-1 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 20% 0%, color-mix(in srgb, var(--color-accent) 25%, transparent) 0%, transparent 70%),
          color-mix(in srgb, var(--color-accent) 8%, var(--background))
        `,
      }}
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
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
            <span className="text-accent text-lg">&#9670;</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/15 px-2 py-0.5 rounded-full">
              Premium
            </span>
            <h3 className="text-lg font-bold text-accent mt-1">
              Mon approche
            </h3>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-0">
          {myApproach.map((item, i) => (
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
      className="rounded-2xl border border-neutral bg-[var(--background)] p-6 md:p-8 flex-1 opacity-70"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/40 text-lg">&#9632;</span>
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50 bg-foreground/5 px-2 py-0.5 rounded-full">
            Standard
          </span>
          <h3 className="text-lg font-bold text-base-content/60 mt-1">
            Solutions classiques
          </h3>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-0">
        {classicApproach.map((item, i) => (
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
                <p className="text-sm font-semibold text-base-content/60">
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
