"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CpuChipIcon,
  NoSymbolIcon,
} from "@heroicons/react/16/solid";
import strings from "@/app/constants/strings.fr.json";
import { BIO_CONTACT } from "@/app/constants";

const s = strings.sovereignty;
const heading = strings.sections.sovereignty;
const pillars = [s.pillars.private, s.pillars.geo, s.pillars.custom];

/*
 * Le périmètre.
 *
 * Signature de la section : un cadre hachuré qui contient physiquement le
 * modèle, et au-dessus, hors du cadre, les données qui partiraient ailleurs.
 * Le trait qui les relie est interrompu — c'est tout l'argument, dessiné.
 */
function PerimeterDiagram({ inView }: { inView: boolean }) {
  const d = s.diagram;

  return (
    <figure className="m-0">
      {/* Hors périmètre */}
      <div className="rounded-xl border border-dashed border-white/20 p-4">
        <p className="label-mono text-white/40">{d.outsideLabel}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {d.outsideItems.map((item) => (
            <li
              key={item}
              className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/45 line-through decoration-white/25"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Liaison coupée */}
      <div className="relative flex h-16 items-center justify-center">
        <motion.span
          aria-hidden="true"
          className="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-white/20"
          initial={{ height: 0 }}
          animate={inView ? { height: 20 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 bg-accent/50"
          initial={{ height: 0 }}
          animate={inView ? { height: 20 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
        <motion.span
          className="relative z-[1] inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-[#0f172a] px-3 py-1 text-[11px] font-medium text-accent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.6 }}
        >
          <NoSymbolIcon className="size-3.5" />
          {d.cut}
        </motion.span>
      </div>

      {/* Dans le périmètre */}
      <div className="relative overflow-hidden rounded-xl border border-accent/40 p-4">
        <span
          aria-hidden="true"
          className="hatch hatch-accent pointer-events-none absolute inset-0 opacity-70"
        />
        <p className="label-mono relative text-accent">{d.perimeterLabel}</p>
        <div className="relative mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-[#0f172a] p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent">
            <CpuChipIcon className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">{d.insideTitle}</p>
            <p className="text-xs text-white/50">{d.insideSubtitle}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}

function Pillar({
  pillar,
  inView,
  delay,
}: {
  pillar: (typeof pillars)[number];
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/30"
    >
      <p className="label-mono text-accent">{pillar.index}</p>
      <h3 className="mt-3 text-base font-semibold text-balance text-white md:text-lg">
        {pillar.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">
        {pillar.lead}
      </p>

      <ul className="mt-5 space-y-2.5">
        {pillar.points.map((point) => (
          <li key={point} className="flex gap-2.5 text-sm text-white/75">
            <span aria-hidden="true" className="mt-0.5 text-accent">
              &rarr;
            </span>
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="border-l-2 border-accent/40 pl-4">
          <p className="label-mono text-white/35">{pillar.proofLabel}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/70 italic">
            {pillar.proof}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function SovereigntySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  /*
   * Bascule du fond de page.
   *
   * On observe un tracker plutôt que la section : la marge réduit la zone de
   * détection à une bande étroite vers le milieu du viewport, et le tracker
   * s'arrête 25vh avant le bas de la section. Le fond bascule donc au sombre
   * quand le haut de la section franchit la bande, et redevient clair 25vh
   * plus tôt qu'il ne le ferait autrement — soit avant que le titre suivant
   * n'entre à l'écran, où il serait illisible à mi-fondu.
   *
   * Un seuil plutôt qu'une piste de scroll : le fondu dure toujours 700 ms,
   * que la section fasse un écran et demi en desktop ou quatre en mobile.
   */
  const trackerRef = useRef<HTMLDivElement>(null);
  const backdropActive = useInView(trackerRef, {
    margin: "-55% 0px -40% 0px",
  });

  return (
    <section
      id="ia-privee"
      className="relative mt-20 scroll-mt-6 px-4 md:mt-28 md:px-6"
      aria-labelledby="ia-privee-titre"
    >
      <div
        ref={trackerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 bottom-[25vh]"
      />

      {/* Le fond de page prend la couleur de la carte : elle cesse d'être une
          carte posée sur la page, la page devient la section. À partir de `md`
          seulement — sur téléphone la carte occupe déjà toute la largeur, le
          basculement n'ajoutait rien et alourdissait le scroll. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 -z-10 hidden bg-base-content transition-opacity duration-700 ease-out md:block ${
          backdropActive ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl bg-base-content px-5 py-12 text-white md:px-10 md:py-16 lg:px-14"
      >
        {/* Gouttières hachurées, reprises de la page mais inversées */}
        <span
          aria-hidden="true"
          className="hatch hatch-invert pointer-events-none absolute inset-y-0 left-0 hidden w-10 border-r border-white/10 md:block"
        />
        <span
          aria-hidden="true"
          className="hatch hatch-invert pointer-events-none absolute inset-y-0 right-0 hidden w-10 border-l border-white/10 md:block"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="label-mono flex items-center gap-2 text-accent">
              <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
              {s.eyebrow}
            </p>
            <h2
              id="ia-privee-titre"
              className="mt-4 text-2xl font-semibold tracking-tight text-balance md:text-4xl"
            >
              <span aria-hidden="true">🌳 </span>
              {heading.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
              {heading.subtitle}
            </p>
          </motion.div>

          {/* Citation + diagramme */}
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2 md:items-center md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <blockquote className="border-l-2 border-accent pl-5">
                <p className="text-lg leading-snug font-medium text-balance text-white md:text-2xl">
                  &laquo;&nbsp;{s.quote}&nbsp;&raquo;
                </p>
              </blockquote>
              <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
                {s.context}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PerimeterDiagram inView={inView} />
            </motion.div>
          </div>

          {/* Les trois piliers */}
          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
            {pillars.map((pillar, i) => (
              <Pillar
                key={pillar.index}
                pillar={pillar}
                inView={inView}
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>

          {/* Références + appel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 border-t border-white/10 pt-8 md:mt-16"
          >
            <p className="label-mono text-white/35">{s.trackRecord.label}</p>
            <ul className="mt-4 grid gap-4 md:grid-cols-2">
              {s.trackRecord.items.map((item) => (
                <li key={item.name} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
                  <p className="text-sm leading-relaxed text-white/60">
                    <span className="font-semibold text-white">
                      {item.name}
                    </span>{" "}
                    — {item.detail}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-start gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-sm text-white/70 md:text-base">
                {s.cta.text}
              </p>
              <Link
                href={BIO_CONTACT.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:w-auto md:cursor-none"
              >
                {s.cta.button}
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
