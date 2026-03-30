"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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

export default function VideosSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    loadScript("https://www.tiktok.com/embed.js");
    loadScript("//www.instagram.com/embed.js");

    // Re-render embeds if scripts already loaded
    window.tiktokEmbed?.lib.render(document.querySelectorAll(".tiktok-embed"));
    window.instgrm?.Embeds.process();
  }, []);

  return (
    <div ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm text-foreground text-center mb-10 md:mb-14 max-w-lg mx-auto"
      >
        Pendant que l&apos;IA génère du code jetable, j&apos;enseigne les
        fondamentaux qui font la différence entre un développeur et un prompt
        engineer.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0">
        {/* TikTok */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-neutral max-h-100"
        >
          <blockquote
            className="tiktok-embed !m-0 !rounded-2xl"
            cite="https://www.tiktok.com/@bobodigital_"
            data-unique-id="bobodigital_"
            data-embed-type="creator"
            style={{ maxWidth: "100%" }}
          >
            <section>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.tiktok.com/@bobodigital_?refer=creator_embed"
              >
                @bobodigital_
              </a>
            </section>
          </blockquote>
        </motion.div>

        {/* YouTube */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="overflow-hidden rounded-2xl border border-neutral max-h-100"
        >
          <iframe
            title="YouTube — bobodigital_"
            className="w-full rounded-2xl"
            height="390"
            src="https://www.youtube.com/embed/36Ym36JvfhU?si=sHcLhmOCJnp4dYS2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </motion.div>

        {/* Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="overflow-hidden rounded-2xl border border-neutral max-h-100"
        >
          <blockquote
            className="instagram-media !m-0 !rounded-2xl !border-0 !shadow-none w-full"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DRsermnkjSn/?utm_source=ig_embed&utm_campaign=loading"
            data-instgrm-version="14"
            style={{ maxWidth: "100%", padding: 0 }}
          >
            <div style={{ padding: "16px" }}>
              <a
                href="https://www.instagram.com/reel/DRsermnkjSn/?utm_source=ig_embed&utm_campaign=loading"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-foreground/50 py-12"
              >
                Voir cette publication sur Instagram
              </a>
            </div>
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
}
