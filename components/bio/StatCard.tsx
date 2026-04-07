import Image from "next/image";
import { t } from "@/lib/strings";

export default function StatCard({
  icon,
  value,
  labelKey,
}: {
  icon: string;
  value: string;
  labelKey: string;
}) {
  const label = t(labelKey);

  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-4 gap-1 flex-1">
      <Image src={icon} alt={label} width={40} height={40} />
      <div className="space-y-px text-center">
        <p className="text-xl font-bold text-base-content tabular-nums">
          {value}
        </p>
        <p className="text-xs text-foreground/60">{label}</p>
      </div>
    </div>
  );
}
