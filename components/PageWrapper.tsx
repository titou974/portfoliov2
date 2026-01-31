import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-[32px_1fr_32px] min-h-screen">
      <div className="hidden w-full border-r border-border-muted opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-muted)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-muted)_50%,theme(colors.border-muted)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] lg:block"></div>
      <div className="relative col-span-1 px-3 lg:px-0">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full mdw-210 -translate-x-1/2 overflow-visible blur-3xl gradient-container "></div>
        {children}
      </div>
      <div className="hidden w-full border-l border-border-muted opacity-75 [background-image:linear-gradient(45deg,theme(colors.border-muted)_12.50%,transparent_12.50%,transparent_50%,theme(colors.border-muted)_50%,theme(colors.border-muted)_62.50%,transparent_62.50%,transparent_100%)] bg-size-[5px_5px] lg:block"></div>
    </div>
  );
}
