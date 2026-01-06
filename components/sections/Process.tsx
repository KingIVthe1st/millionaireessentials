"use client";

import { useRef, useEffect } from "react";
import { MessageCircle, FileSearch, Coins, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "One Call",
    description:
      "15 minutes. No application. Just a real conversation about what you need.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Your Options",
    description:
      "Within 48 hours: a curated set of options with terms spelled out in plain English.",
  },
  {
    number: "03",
    icon: Coins,
    title: "Guided Clarity",
    description: "We walk you through each path. You choose. No pressure.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Capital, Delivered",
    description:
      "We handle the paperwork. You handle the business. Funded in 7–14 days.",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".process-header", {
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

      // Steps animation
      gsap.from(".process-step", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-steps",
          start: "top 80%",
          once: true,
        },
      });

      // Line drawing animation
      if (lineRef.current) {
        const lineLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 70%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--color-surface)]"
    >
      <div className="container-luxury">
        {/* Header */}
        <div className="process-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-overline mb-4 block">The Path Forward</span>
          <h2 className="text-headline mb-6">
            From Conversation to{" "}
            <span className="text-[var(--color-accent)] font-serif italic">
              Capital
            </span>
          </h2>
          <p className="text-subhead">
            Fifteen minutes to start. Fourteen days to fund.
          </p>
        </div>

        {/* Steps */}
        <div className="process-steps relative">
          {/* Connecting Line (Desktop) */}
          <svg
            className="absolute top-16 left-0 w-full h-1 hidden lg:block"
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="12.5%"
              y1="0"
              x2="87.5%"
              y2="0"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
          </svg>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="process-step relative">
                {/* Step Number & Icon */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-[var(--color-accent)]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--color-accent)] text-[var(--color-primary)] text-xs font-semibold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-medium mb-3">{step.title}</h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
