"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type TypewriterProps = {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  started?: boolean;
};

export function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1800,
  className,
  started = false,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState(words[0]);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasStarted = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // When started becomes true, begin by deleting the first word
  useEffect(() => {
    if (started && !hasStarted.current) {
      hasStarted.current = true;
      timeoutRef.current = setTimeout(
        () => setIsDeleting(true),
        pauseDuration,
      );
    }
  }, [started, pauseDuration]);

  const tick = useCallback(() => {
    const current = words[wordIndex];

    if (!isDeleting) {
      if (displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
      } else {
        timeoutRef.current = setTimeout(
          () => setIsDeleting(true),
          pauseDuration,
        );
        return;
      }
    } else {
      if (displayed.length > 0) {
        setDisplayed(displayed.slice(0, -1));
      } else {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
    }
  }, [displayed, isDeleting, wordIndex, words, pauseDuration]);

  useEffect(() => {
    if (!started) return;
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(tick, speed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, started, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        className="inline-block w-[2px] translate-y-[0.1em] align-baseline bg-current"
        style={{ height: "1em" }}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </span>
  );
}
