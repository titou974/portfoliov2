"use client";

import Image from "next/image";
import { ShareIcon } from "@heroicons/react/16/solid";
import { t } from "@/lib/strings";
import {
  PROFILE,
  BIO_STATS,
  BIO_CONTACT,
  BIO_ACTIVITIES,
  BIO_SOCIALS,
} from "@/app/constants/bio";
import LinkCard from "@/components/bio/LinkCard";
import StatCard from "@/components/bio/StatCard";
import SectionTitle from "@/components/bio/SectionTitle";

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
    <div className="min-h-screen bg-background px-4 py-8 max-w-md mx-auto">
      {/* Share */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/60 hover:text-foreground transition-colors"
        >
          <ShareIcon className="size-3.5" />
          {t("bio.share")}
        </button>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full border-2 border-accent/30 p-1">
          <Image
            src={PROFILE.avatar}
            alt={t(PROFILE.username)}
            width={96}
            height={96}
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-xl font-bold text-base-content">
          {t(PROFILE.username)}
        </h1>
        <p className="mt-1 text-sm text-foreground/70">
          {t(PROFILE.tagline)}
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mt-6">
        {BIO_STATS.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            value={t(stat.valueKey)}
            labelKey={stat.labelKey}
          />
        ))}
      </div>

      {/* Contact */}
      <div className="mt-8">
        <LinkCard
          icon={BIO_CONTACT.icon}
          titleKey={BIO_CONTACT.titleKey}
          subtitleKey={BIO_CONTACT.subtitleKey}
          href={BIO_CONTACT.href}
          primary={BIO_CONTACT.primary}
          badge={BIO_CONTACT.badge}
        />
      </div>

      {/* Activités */}
      <SectionTitle title={t("bio.sections.activities")} />
      <div className="space-y-3">
        {BIO_ACTIVITIES.map((link) => (
          <LinkCard
            key={link.id}
            icon={link.icon}
            titleKey={link.titleKey}
            subtitleKey={link.subtitleKey}
            href={link.href}
          />
        ))}
      </div>

      {/* Vidéos */}
      <SectionTitle title={t("bio.sections.videos")} />
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

      {/* Footer */}
      <p className="mt-10 text-center text-[11px] text-foreground/30">
        {t("bio.footer")} &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}
