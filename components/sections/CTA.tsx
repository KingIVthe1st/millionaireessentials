"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-[var(--color-primary)]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

      <div className="container-luxury relative z-10">
        <div className="cta-content max-w-4xl mx-auto text-center">
          {/* Overline */}
          <span className="text-overline mb-6 block">Next Step</span>

          {/* Headline */}
          <h2 className="text-display mb-8">
            Let&apos;s{" "}
            <span className="text-[var(--color-accent)] font-serif italic">
              Talk
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-subhead max-w-2xl mx-auto mb-12">
            15 minutes. No application. No commitment. Just clarity.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button variant="primary" size="lg" magnetic className="group">
              <Calendar className="w-5 h-5" />
              Schedule a Call
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="secondary" size="lg" className="group">
              <Phone className="w-4 h-4" />
              (888) 555-0123
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>No credit pull to start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Response in 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Always confidential</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
