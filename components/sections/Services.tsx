"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  Building2,
  CreditCard,
  Wallet,
  Landmark,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: TrendingUp,
    title: "Term Loans",
    headline: "Growth Capital. Your Timeline.",
    description:
      "$50K–$500K for expansion, acquisition, or strategic moves. Transparent terms. Predictable payments.",
    href: "/services/term-loans",
  },
  {
    icon: Landmark,
    title: "SBA Loans",
    headline: "Federal Rates. Private Counsel.",
    description:
      "We navigate the SBA complexity so you don't. Favorable rates. Less paperwork.",
    href: "/services/sba-loans",
  },
  {
    icon: Wallet,
    title: "Lines of Credit",
    headline: "Ready When You Are",
    description:
      "Capital on demand. Draw what you need, repay on your schedule.",
    href: "/services/lines-of-credit",
  },
  {
    icon: CreditCard,
    title: "Business Credit Cards",
    headline: "Spend Smart. Earn More.",
    description:
      "Rewards structured around how real businesses spend — not consumer fantasies.",
    href: "/services/business-credit",
  },
  {
    icon: Building2,
    title: "Alternative Lending",
    headline: "For Those Who Break the Mold",
    description:
      "Revenue-based. Equipment. Creative structures. For the unconventional.",
    href: "/services/alternative-lending",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for spotlight effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cards = document.querySelectorAll(".service-card-spotlight");
    cards.forEach((card) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    });
  }, []);

  useEffect(() => {
    // Add mouse tracking
    window.addEventListener("mousemove", handleMouseMove);

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Cards animation with stagger
      gsap.from(".service-card", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <section ref={sectionRef} className="section-padding relative">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] -translate-y-1/2 -translate-x-1/2 bg-[var(--color-accent)]/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="container-luxury relative">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-20">
          <span className="text-overline mb-4 block tracking-[0.25em]">
            What We Fund
          </span>
          <h2 className="text-headline mb-6">
            Capital,{" "}
            <span className="text-[var(--color-accent)] font-serif italic">
              Structured Around You
            </span>
          </h2>
          <p className="text-subhead">
            Your business isn&apos;t generic. Neither is our approach.
          </p>
        </div>

        {/* Services Grid - Premium Spotlight Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="service-card service-card-spotlight spotlight-card group block"
            >
              <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center mb-8 group-hover:from-[var(--color-accent)]/30 group-hover:to-[var(--color-accent)]/10 transition-all duration-500">
                  <service.icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Category Label */}
                  <span className="text-overline text-[var(--color-text-muted)] mb-3 block">
                    {service.title}
                  </span>

                  {/* Headline */}
                  <h3 className="text-xl lg:text-2xl font-medium mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {service.headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Link - Animated underline */}
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] border-animate">
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
