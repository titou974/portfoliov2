"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import CustomCursor from "./CustomCursor";
import { Button } from "@heroui/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import confettiAnimation from "@/assets/confetti.json";

export default function PageContainer({ children }: { children: ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    target.addEventListener("mousemove", handleMouseMove);
    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleButtonClick = () => {
    setShowConfetti(true);
    lottieRef.current?.goToAndPlay(0);

    // Cache l'animation après qu'elle soit terminée
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000); // Ajuste selon la durée de ton animation
  };

  return (
    <>
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      <div
        ref={targetRef}
        className="lg:cursor-none"
        style={
          {
            "--mouse-x": `${mousePosition.x}px`,
            "--mouse-y": `${mousePosition.y}px`,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            backgroundImage: `radial-gradient(
            200px circle at var(--mouse-x) var(--mouse-y),
            var(--color-accent) 0,
            transparent 100%
          )`,
          }}
        />

        <Button
          onClick={handleButtonClick}
          className="bg-background text-transparent hover:text-foreground"
        >
          Bouton Caché :p
        </Button>

        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <Lottie
              lottieRef={lottieRef}
              animationData={confettiAnimation}
              loop={false}
              autoplay={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        )}

        {/* Contenu principal */}
        <div className="w-full md:max-w-7xl lg:mx-auto min-h-screen h-full relative z-10">
          {children}
        </div>
      </div>
    </>
  );
}
