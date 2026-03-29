type ShadowBoxProps = {
  children?: React.ReactNode;
  label?: string;
  className?: string;
};

export function ShadowBox({ children, label, className }: ShadowBoxProps) {
  return (
    <div className="group inline-block text-center">
      <div className={`aspect-square rounded-[20px] ${className ?? ""}`}>
        <div className="grid h-full place-items-center overflow-hidden rounded-xl shadow-xl">
          {children ?? null}
        </div>
      </div>
      {label ? <p className="mt-3 text-sm text-gray-500">{label}</p> : null}
    </div>
  );
}
