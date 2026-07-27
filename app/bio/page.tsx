"use client";

import { motion } from "framer-motion";
import { ShareIcon } from "@heroicons/react/16/solid";
import { t } from "@/lib/strings";
import { fadeUp } from "@/lib/animation";
import { PROFILE, BIO_CODESELF, BIO_CONTACT, BIO_SOCIALS } from "@/app/constants/bio";
import LinkCard from "@/components/bio/LinkCard";
import SectionTitle from "@/components/bio/SectionTitle";
import NatureBackdrop from "@/components/bio/NatureBackdrop";
import BioProfile from "@/components/bio/BioProfile";

export default function BioPage() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: t(PROFILE.username),
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <NatureBackdrop />

      <div className="relative mx-auto max-w-md px-4 py-8">
        {/* Share */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground/60 backdrop-blur-sm transition-colors hover:text-foreground"
          >
            <ShareIcon className="size-3.5" />
            {t("bio.share")}
          </button>
        </div>

        {/* Photo + description */}
        <BioProfile />

        {/* CodeSelf */}
        <motion.div className="mt-9" {...fadeUp(0.15)}>
          <LinkCard
            icon={BIO_CODESELF.icon}
            titleKey={BIO_CODESELF.titleKey}
            subtitleKey={BIO_CODESELF.subtitleKey}
            href={BIO_CODESELF.href}
            variant={BIO_CODESELF.variant}
            badge={BIO_CODESELF.badge}
          />
        </motion.div>

        {/* Réserver un appel */}
        <motion.div className="mt-5" {...fadeUp(0.25)}>
          <LinkCard
            icon={BIO_CONTACT.icon}
            titleKey={BIO_CONTACT.titleKey}
            subtitleKey={BIO_CONTACT.subtitleKey}
            href={BIO_CONTACT.href}
            variant={BIO_CONTACT.variant}
            badge={BIO_CONTACT.badge}
          />
        </motion.div>

        {/* Réseaux */}
        <motion.div {...fadeUp(0.35)}>
          <SectionTitle title={t("bio.sections.socials")} />
          <div className="space-y-3">
            {BIO_SOCIALS.map((link) => (
              <LinkCard
                key={link.id}
                icon={link.icon}
                titleKey={link.titleKey}
                subtitleKey={link.subtitleKey}
                href={link.href}
              />
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <p className="mt-10 text-center text-[11px] text-foreground/30">
          {t("bio.footer")} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
