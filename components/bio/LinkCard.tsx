import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid";
import { t } from "@/lib/strings";

export default function LinkCard({
  icon,
  titleKey,
  subtitleKey,
  href,
  primary = false,
  codeself = false,
  badge,
  image,
}: {
  icon: string;
  titleKey: string;
  subtitleKey: string;
  href: string;
  primary?: boolean;
  codeself?: boolean;
  badge?: string;
  image?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center ${image ? "flex-col" : ""} rounded-xl p-4 transition-all duration-200 hover:translate-y-[-1px] ${
        codeself
          ? "bg-[#010001] shadow-xl shadow-[#010001]/40 hover:shadow-[#010001]/60"
          : primary
            ? "border border-transparent bg-surface"
            : "border border-border bg-surface"
      }`}
      style={
        primary && !codeself
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
          className={`absolute -top-2.5 left-4 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            codeself ? "bg-background text-accent" : "bg-accent text-background"
          }`}
        >
          {t(badge)}
        </span>
      )}
      {image ? (
        <>
          <div className="w-full flex items-center">
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
                <p
                  className={`text-sm font-semibold truncate ${
                    codeself ? "text-background" : "text-base-content"
                  }`}
                >
                  {t(titleKey)}
                </p>
                <p
                  className={`text-xs truncate ${
                    codeself ? "text-background/80" : "text-foreground/60"
                  }`}
                >
                  {t(subtitleKey)}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center justify-center shrink-0 rounded-full p-2 transition-all duration-300 group-hover:translate-y-[-2px] ${
                codeself
                  ? "bg-surface text-[#010001] group-hover:bg-accent group-hover:text-surface"
                  : primary
                    ? "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-background"
                    : "border border-border text-foreground/50 group-hover:text-foreground"
              }`}
            >
              <ArrowUpRightIcon className="size-4" />
            </div>
          </div>
          <div className="p-1 border border-border mt-4 rounded-xl">
            <Image
              src={image}
              alt={t(titleKey)}
              width={400}
              height={400}
              className="w-full rounded-xl"
            />
          </div>
        </>
      ) : (
        <>
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
              <p
                className={`text-sm font-semibold truncate ${
                  codeself ? "text-background" : "text-base-content"
                }`}
              >
                {t(titleKey)}
              </p>
              <p
                className={`text-xs truncate ${
                  codeself ? "text-background/80" : "text-foreground/60"
                }`}
              >
                {t(subtitleKey)}
              </p>
            </div>
          </div>
          <div
            className={`flex items-center justify-center shrink-0 rounded-full p-2 transition-all duration-300 group-hover:translate-y-[-2px] ${
              codeself
                ? "bg-background/20 text-background group-hover:bg-background group-hover:text-accent"
                : primary
                  ? "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-background"
                  : "border border-border text-foreground/50 group-hover:text-foreground"
            }`}
          >
            <ArrowUpRightIcon className="size-4" />
          </div>
        </>
      )}
    </a>
  );
}
