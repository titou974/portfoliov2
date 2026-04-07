export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mt-8 mb-4">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
        {title}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
