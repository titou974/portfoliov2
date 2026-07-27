import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { t } from "@/lib/strings";

// The two hero CTAs share the same shape and size, only the accent color
// changes: black for CodeSelf, green for the call booking.
const HERO_STYLES = {
  codeself: {
    card: "border-black shadow-[0_4px_0_0_#000] hover:shadow-[0_6px_0_0_#000]",
    badge: "bg-black text-white",
    arrow: "bg-black text-white",
  },
  accent: {
    card: "border-accent shadow-[0_4px_0_0_var(--color-accent)] hover:shadow-[0_6px_0_0_var(--color-accent)]",
    badge: "bg-accent text-white",
    arrow: "bg-accent text-white",
  },
} as const;

export default function LinkCard({
  icon,
  titleKey,
  subtitleKey,
  href,
  variant,
  badge,
}: {
  icon: string;
  titleKey: string;
  subtitleKey: string;
  href: string;
  variant?: "codeself" | "accent";
  badge?: string;
}) {
  const hero = variant ? HERO_STYLES[variant] : null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center rounded-2xl transition-all duration-200 hover:-translate-y-0.5 ${
        hero
          ? `border-2 bg-white p-5 ${hero.card}`
          : "border border-border bg-surface p-4 hover:border-accent/40"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-2.5 left-4 rounded-full px-2 py-0.5 text-[10px] font-bold ${
            hero ? hero.badge : "bg-accent text-white"
          }`}
        >
          {t(badge)}
        </span>
      )}

      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span className="shrink-0">
          <Image
            src={icon}
            alt={t(titleKey)}
            width={hero ? 40 : 36}
            height={hero ? 40 : 36}
            className={hero ? "rounded-lg" : "drop-shadow-md"}
          />
        </span>
        <div className="min-w-0">
          <p
            className={`truncate font-semibold ${
              hero ? "text-base text-black" : "text-sm text-base-content"
            }`}
          >
            {t(titleKey)}
          </p>
          <p
            className={`truncate text-xs ${
              hero ? "text-black/60" : "text-foreground/60"
            }`}
          >
            {t(subtitleKey)}
          </p>
        </div>
      </div>

      <div
        className={`flex shrink-0 items-center justify-center rounded-full p-2 transition-all duration-300 group-hover:-translate-y-0.5 ${
          hero
            ? hero.arrow
            : "border border-border text-foreground/50 group-hover:text-foreground"
        }`}
      >
        <ArrowUpRightIcon className="size-4" />
      </div>
    </a>
  );
}
