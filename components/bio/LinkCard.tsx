import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { t } from "@/lib/strings";

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
  variant?: "codeself" | "primary";
  badge?: string;
}) {
  const isCodeself = variant === "codeself";
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center rounded-2xl transition-all duration-200 hover:-translate-y-0.5 ${
        isCodeself
          ? "border-2 border-black bg-white p-5 shadow-[0_4px_0_0_#000] hover:shadow-[0_6px_0_0_#000]"
          : isPrimary
            ? "p-4"
            : "border border-border bg-surface p-4 hover:border-accent/40"
      }`}
      style={
        isPrimary
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
        <span
          className={`absolute -top-2.5 left-4 rounded-full px-2 py-0.5 text-[10px] font-bold ${
            isCodeself ? "bg-black text-white" : "bg-accent text-background"
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
            width={isCodeself ? 40 : 36}
            height={isCodeself ? 40 : 36}
            className={isCodeself ? "" : "drop-shadow-md"}
          />
        </span>
        <div className="min-w-0">
          <p
            className={`truncate font-semibold ${
              isCodeself ? "text-base text-black" : "text-sm text-base-content"
            }`}
          >
            {t(titleKey)}
          </p>
          <p
            className={`truncate text-xs ${
              isCodeself ? "text-black/60" : "text-foreground/60"
            }`}
          >
            {t(subtitleKey)}
          </p>
        </div>
      </div>

      <div
        className={`flex shrink-0 items-center justify-center rounded-full p-2 transition-all duration-300 group-hover:-translate-y-0.5 ${
          isCodeself
            ? "bg-black text-white"
            : isPrimary
              ? "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-background"
              : "border border-border text-foreground/50 group-hover:text-foreground"
        }`}
      >
        <ArrowUpRightIcon className="size-4" />
      </div>
    </a>
  );
}
