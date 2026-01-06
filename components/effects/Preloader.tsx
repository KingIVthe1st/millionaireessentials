"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export function Preloader({ onComplete, minDuration = 2000 }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });
    gsap.set(textRef.current, { opacity: 0, y: 20 });

    // Animate in
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .to(
        progressRef.current,
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.2",
      );

    // Wait for minimum duration then exit
    const timer = setTimeout(() => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          onComplete?.();
        },
      });

      exitTl
        .to([logoRef.current, textRef.current, progressRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.in",
        })
        .to(
          preloaderRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power3.inOut",
          },
          "-=0.1",
        );
    }, minDuration);

    return () => {
      clearTimeout(timer);
      tl.kill();
    };
  }, [minDuration, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex flex-col items-center justify-center"
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Logo */}
      <div ref={logoRef} className="relative mb-8">
        <span className="text-4xl md:text-5xl font-semibold tracking-tight">
          Millionaire
          <span className="text-[var(--color-accent)]">.</span>
        </span>
      </div>

      {/* Loading text */}
      <div ref={textRef} className="mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Loading
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-32 h-px bg-[var(--color-border)] relative overflow-hidden">
        <div
          ref={progressRef}
          className="absolute inset-0 bg-[var(--color-accent)]"
        />
      </div>
    </div>
  );
}

// Alternative minimal preloader
export function MinimalPreloader({
  onComplete,
  minDuration = 1500,
}: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setIsLoading(false);
          onComplete?.();
        },
      });
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex items-center justify-center"
    >
      {/* Pulsing dot */}
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-[var(--color-accent)] animate-pulse" />
        <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-accent)] animate-ping opacity-75" />
      </div>
    </div>
  );
}

// Counter preloader (shows loading percentage)
export function CounterPreloader({
  onComplete,
  minDuration = 2500,
}: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = minDuration - 500; // Reserve 500ms for exit animation
    const interval = duration / 100;

    const counterInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(counterInterval);
          return 100;
        }
        // Slow down near the end
        const increment = prev > 80 ? 1 : prev > 60 ? 2 : 3;
        return Math.min(prev + increment, 100);
      });
    }, interval);

    const timer = setTimeout(() => {
      gsap.to(preloaderRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          setIsLoading(false);
          onComplete?.();
        },
      });
    }, minDuration);

    return () => {
      clearInterval(counterInterval);
      clearTimeout(timer);
    };
  }, [minDuration, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[var(--color-primary)] flex flex-col items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Large counter */}
      <div className="relative">
        <span
          ref={counterRef}
          className="text-8xl md:text-9xl font-semibold text-mono text-[var(--color-accent)] opacity-20"
        >
          {count.toString().padStart(3, "0")}
        </span>
      </div>

      {/* Brand name */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <span className="text-sm uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
          Millionaire Essentials
        </span>
      </div>
    </div>
  );
}
