"use client";
import { Button } from "@heroui/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef, useState } from "react";
import confettiAnimation from "@/assets/confetti.json";

export default function SecretButton() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [showConfetti, setShowConfetti] = useState(false);
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
      <Button
        onClick={handleButtonClick}
        className="bg-background text-transparent hover:text-foreground absolute top-2 left-2 z-10"
      >
        Bouton Caché :p 🎉
      </Button>
    </>
  );
}
