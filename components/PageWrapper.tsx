import { ReactNode } from "react";
import Navbar from "./Navbar";

/*
 * Gouttières : deux filets encadrant une bande de hachures diagonales.
 * `bg-fixed` fige le motif pendant le scroll — les filets glissent, les
 * hachures restent, ce qui donne le repère vertical de la page.
 */
const GUTTER =
  "hidden lg:block border-x border-border/70 hatch hatch-fixed";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen flex-1 grid-cols-1 lg:grid-cols-[40px_1fr_40px]">
      <div className={GUTTER} aria-hidden="true" />
      <div className="relative col-span-1 min-w-0 px-3 lg:px-0">
        <div className="gradient-container pointer-events-none absolute top-0 left-1/2 -z-10 h-full -translate-x-1/2 overflow-visible blur-3xl" />
        <Navbar />
        {children}
      </div>
      <div className={GUTTER} aria-hidden="true" />
    </div>
  );
}
