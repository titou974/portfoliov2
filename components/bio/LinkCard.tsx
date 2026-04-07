import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { t } from "@/lib/strings";

export default function LinkCard({
  icon,
  titleKey,
  subtitleKey,
  href,
  primary = false,
  badge,
}: {
  icon: string;
  titleKey: string;
  subtitleKey: string;
  href: string;
  primary?: boolean;
  badge?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-4 rounded-xl p-4 transition-all duration-200 hover:translate-y-[-1px] ${
        primary
          ? "border border-transparent bg-surface"
          : "border border-border bg-surface"
      }`}
      style={
        primary
          ? {
              backgroundImage: `linear-gradient(var(--color-surface), var(--color-surface)), linear-gradient(135deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 40%, transparent), var(--color-accent))`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "1px solid transparent",
            }
          : undefined
      }
    >
      {badge && (
        <span className="absolute -top-2.5 left-4 bg-accent text-background text-[10px] font-bold px-2 py-0.5 rounded-full">
          {t(badge)}
        </span>
      )}

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="shrink-0">
          <Image
            src={icon}
            alt={t(titleKey)}
            width={36}
            height={36}
            className="drop-shadow-md"
          />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-base-content truncate">
            {t(titleKey)}
          </p>
          <p className="text-xs text-foreground/60 truncate">
            {t(subtitleKey)}
          </p>
        </div>
      </div>

      <div
        className={`shrink-0 rounded-full p-2 transition-all duration-300 group-hover:translate-y-[-2px] ${
          primary
            ? "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-background"
            : "border border-border text-foreground/50 group-hover:text-foreground"
        }`}
      >
        <ArrowUpRightIcon className="size-4" />
      </div>
    </a>
  );
}
