"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { MagneticWrapper } from "@/components/effects/CustomCursor";
import { getImagePath } from "@/lib/utils";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const overlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Just show everything immediately
      gsap.set(
        [
          overlineRef.current,
          titleRef.current,
          subtitleRef.current,
          ctaRef.current,
          statsRef.current,
        ],
        { opacity: 1, y: 0 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Get all split text elements
      const line1Chars = line1Ref.current?.querySelectorAll(".char-inner");
      const line2Chars = line2Ref.current?.querySelectorAll(".char-inner");

      // Initial setup
      gsap.set(overlineRef.current, { opacity: 0, y: 20 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
      gsap.set(statsRef.current, { opacity: 0, y: 20 });

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Overline fade in
      tl.to(overlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Line 1: character-by-character reveal
      if (line1Chars) {
        gsap.set(line1Chars, { y: "100%", opacity: 0 });
        tl.to(
          line1Chars,
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: "power3.out",
          },
          "-=0.3",
        );
      }

      // Line 2: character-by-character reveal (accent color)
      if (line2Chars) {
        gsap.set(line2Chars, { y: "100%", opacity: 0 });
        tl.to(
          line2Chars,
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            stagger: 0.02,
            ease: "power3.out",
          },
          "-=0.5",
        );
      }

      // Subtitle
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      );

      // CTAs
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Stats
      tl.to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Helper to create split text spans with accessibility
  const splitText = (text: string) => {
    return (
      <>
        {/* Screen reader accessible version */}
        <span className="sr-only">{text}</span>
        {/* Visual animated version */}
        <span aria-hidden="true">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className="char-outer"
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              <span
                className="char-inner"
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </span>
      </>
    );
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImagePath("/images/hero/hero-bg.png")}
          alt=""
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Gradient Overlay - Deeper for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/70 via-[var(--color-primary)]/50 to-[var(--color-primary)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-primary)] to-transparent" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] ambient-glow ambient-glow-accent ambient-glow-animated opacity-20" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] ambient-glow ambient-glow-subtle opacity-10" />

      {/* Content */}
      <div className="relative z-10 container-luxury text-center pt-32 pb-20">
        {/* Overline */}
        <div ref={overlineRef} className="mb-8">
          <span className="text-overline tracking-[0.3em]">
            Capital. Privately.
          </span>
        </div>

        {/* Main Headline - Cinematic Split Text */}
        <h1 ref={titleRef} className="text-display max-w-6xl mx-auto mb-10">
          {/* Line 1: Sans-serif */}
          <div
            ref={line1Ref}
            className="overflow-hidden"
            style={{ lineHeight: 0.95 }}
          >
            {splitText("Capital for the")}
          </div>
          {/* Line 2: Serif italic accent - the signature premium touch */}
          <div
            ref={line2Ref}
            className="overflow-hidden text-[var(--color-accent)] font-serif italic"
            style={{ lineHeight: 0.95 }}
          >
            {splitText("Relentlessly Ambitious")}
          </div>
        </h1>

        {/* Subtitle - Refined copy */}
        <p
          ref={subtitleRef}
          className="text-subhead max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Term loans. SBA financing. Credit facilities. Matched to your ambition
          by advisors who understand the stakes.
        </p>

        {/* CTAs with Magnetic Effect */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <MagneticWrapper strength={0.2}>
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="group press-scale hover-glow"
              >
                Talk to an Advisor
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </MagneticWrapper>
          <MagneticWrapper strength={0.2}>
            <Button variant="secondary" size="lg" className="group press-scale">
              <Play className="w-4 h-4 fill-current" />
              See How It Works
            </Button>
          </MagneticWrapper>
        </div>

        {/* Trust Indicators - Monospace for precision feel */}
        <div
          ref={statsRef}
          className="mt-20 pt-10 border-t border-[var(--color-border)]"
        >
          <p className="text-xs text-[var(--color-text-muted)] mb-6 tracking-wider uppercase">
            Trusted across 40+ industries
          </p>
          <div className="flex items-center justify-center gap-10 text-[var(--color-text-muted)]">
            <div className="flex flex-col items-center">
              <span className="text-stat text-[var(--color-text-primary)]">
                $47M+
              </span>
              <span className="text-xs tracking-widest uppercase mt-1">
                Funded
              </span>
            </div>
            <div className="w-px h-16 bg-[var(--color-border)]" />
            <div className="flex flex-col items-center">
              <span className="text-stat text-[var(--color-text-primary)]">
                75+
              </span>
              <span className="text-xs tracking-widest uppercase mt-1">
                Lenders
              </span>
            </div>
            <div className="w-px h-16 bg-[var(--color-border)] hidden sm:block" />
            <div className="hidden sm:flex flex-col items-center">
              <span className="text-stat text-[var(--color-text-primary)]">
                500+
              </span>
              <span className="text-xs tracking-widest uppercase mt-1">
                Clients
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - More refined */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] text-[var(--color-text-muted)] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-5 h-9 border border-[var(--color-border)] rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[var(--color-accent)] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
