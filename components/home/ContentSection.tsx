"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import strings from "@/app/constants/strings.fr.json";

const c = strings.content;

declare global {
  interface Window {
    tiktokEmbed?: { lib: { render: (els: NodeListOf<Element>) => void } };
    instgrm?: { Embeds: { process: () => void } };
  }
}

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.body.appendChild(s);
}

/*
 * Cadre commun aux deux plateformes : bandeau d'en-tête, puis une fenêtre de
 * hauteur fixe. Les embeds tiers rendent des blocs de hauteur imprévisible —
 * la fenêtre les recadre pour que la grille ne bouge jamais.
 */
function FeedFrame({
  platform,
  handle,
  href,
  delay,
  inView,
  align = "start",
  children,
}: {
  platform: string;
  handle: string;
  href: string;
  delay: number;
  inView: boolean;
  /** `center` pour les embeds plus courts que la fenêtre, `start` sinon. */
  align?: "start" | "center";
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="label-mono text-foreground/50">{platform}</p>
          <p className="truncate text-sm font-semibold text-base-content">
            {handle}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:cursor-none"
          aria-label={`Ouvrir ${platform} ${handle}`}
        >
          <ArrowUpRightIcon className="size-4" />
        </a>
      </div>

      {/* Fenêtre à hauteur fixe : les embeds tiers ne dictent pas la grille */}
      <div className="relative h-[460px] overflow-hidden bg-background md:h-[500px]">
        <span
          aria-hidden="true"
          className="hatch pointer-events-none absolute inset-0 opacity-50"
        />
        <div
          className={`relative flex h-full w-full overflow-hidden ${
            align === "center" ? "items-center" : "items-start"
          }`}
        >
          <div className="w-full">{children}</div>
        </div>
        {/* Le fondu bas rend la coupure volontaire */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-surface to-surface/0"
        />
      </div>
    </motion.div>
  );
}

export default function ContentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    loadScript("https://www.tiktok.com/embed.js");
    loadScript("https://www.instagram.com/embed.js");

    // Les scripts déjà chargés ne rescannent pas le DOM tout seuls.
    window.tiktokEmbed?.lib.render(document.querySelectorAll(".tiktok-embed"));
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <div ref={ref} className="px-4 md:px-0">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Bloc éditorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 md:col-span-2 md:p-8 lg:col-span-1"
        >
          <span
            aria-hidden="true"
            className="hatch pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-50"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface/0 to-surface"
          />

          <div className="relative">
            <p className="label-mono text-foreground/45">{c.mottoLabel}</p>
            <p className="mt-5 text-2xl leading-[1.15] font-semibold tracking-tight text-balance text-base-content md:text-3xl">
              &laquo;&nbsp;{c.motto}&nbsp;&raquo;
            </p>
            <p className="mt-5 text-sm leading-relaxed text-foreground">
              {c.description}
            </p>

            <p className="label-mono mt-8 text-foreground/45">
              {c.topicsLabel}
            </p>
            <ul className="mt-3 border-t border-border">
              {c.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex gap-2.5 border-b border-border py-2.5 text-sm text-base-content"
                >
                  <span aria-hidden="true" className="text-accent">
                    &rarr;
                  </span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-8">
            <dl className="flex divide-x divide-border border-y border-border">
              {c.stats.map((stat) => (
                <div key={stat.label} className="flex-1 px-3 py-3 first:pl-0">
                  <dt className="label-mono text-foreground/50">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-base-content">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={c.youtubeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:cursor-none"
            >
              {c.youtubeCta}
              <ArrowUpRightIcon className="size-4" />
            </a>
          </div>
        </motion.div>

        {/* TikTok */}
        <FeedFrame
          platform={c.cards.tiktok.platform}
          handle={c.cards.tiktok.handle}
          href={c.cards.tiktok.href}
          delay={0.1}
          inView={inView}
          align="center"
        >
          <blockquote
            className="tiktok-embed !m-0 !min-w-0 !max-w-full"
            cite="https://www.tiktok.com/@bobodigital_"
            data-unique-id="bobodigital_"
            data-embed-type="creator"
            style={{ maxWidth: "100%", minWidth: 0 }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@bobodigital_?refer=creator_embed"
                className="block p-6 text-sm text-foreground/60"
              >
                @bobodigital_ sur TikTok
              </a>
            </section>
          </blockquote>
        </FeedFrame>

        {/* Instagram */}
        <FeedFrame
          platform={c.cards.instagram.platform}
          handle={c.cards.instagram.handle}
          href={c.cards.instagram.href}
          delay={0.2}
          inView={inView}
        >
          <blockquote
            className="instagram-media !m-0 !w-full !min-w-0 !max-w-full !rounded-none !border-0 !shadow-none"
            data-instgrm-permalink="https://www.instagram.com/p/DavYl2mNZY2/?utm_source=ig_embed&utm_campaign=loading"
            data-instgrm-version="14"
            style={{ maxWidth: "100%", minWidth: 0, padding: 0 }}
          >
            <div style={{ padding: "24px" }}>
              <a
                href="https://www.instagram.com/reel/DRsermnkjSn/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-foreground/60"
              >
                {strings.videos.viewPost}
              </a>
            </div>
          </blockquote>
        </FeedFrame>
      </div>
    </div>
  );
}
