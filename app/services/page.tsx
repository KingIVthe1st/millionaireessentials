"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Banknote,
  Building,
  CreditCard,
  LineChart,
  Briefcase,
  Calendar,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    slug: "term-loans",
    title: "Term Loans",
    description:
      "Traditional financing with predictable payments. Ideal for major investments, acquisitions, or growth initiatives with clear ROI.",
    icon: Banknote,
    highlights: [
      "Fixed or variable rates",
      "Terms from 1-10 years",
      "$50K to $5M+",
      "Secured or unsecured options",
    ],
    bestFor: "Equipment purchases, expansions, acquisitions",
  },
  {
    slug: "sba-loans",
    title: "SBA Loans",
    description:
      "Government-backed financing with favorable terms. Lower down payments and longer repayment periods make these ideal for established businesses.",
    icon: Building,
    highlights: [
      "7(a) and 504 programs",
      "Up to 25-year terms",
      "Competitive rates",
      "Working capital or real estate",
    ],
    bestFor: "Real estate, major equipment, business acquisition",
  },
  {
    slug: "lines-of-credit",
    title: "Lines of Credit",
    description:
      "Flexible funding you can draw on as needed. Only pay interest on what you use. Perfect for managing cash flow and seasonal fluctuations.",
    icon: CreditCard,
    highlights: [
      "Revolving access",
      "Draw as needed",
      "Interest only on usage",
      "Quick access to capital",
    ],
    bestFor: "Cash flow management, inventory, payroll",
  },
  {
    slug: "business-credit",
    title: "Business Credit Building",
    description:
      "Establish and grow your business credit profile. Access better rates and terms by building a strong credit foundation.",
    icon: LineChart,
    highlights: [
      "Credit profile analysis",
      "Strategic building plan",
      "Monitor and improve",
      "Access better terms",
    ],
    bestFor: "New businesses, credit repair, rate improvement",
  },
  {
    slug: "alternative-lending",
    title: "Alternative Lending",
    description:
      "Non-traditional financing for businesses that don't fit conventional criteria. Speed and flexibility for time-sensitive opportunities.",
    icon: Briefcase,
    highlights: [
      "Fast approval",
      "Flexible requirements",
      "Revenue-based options",
      "Bridge financing",
    ],
    bestFor: "Urgent needs, limited credit history, unique situations",
  },
];

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-hero", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".service-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-primary)]" />
        <div className="container-luxury relative z-10 services-hero">
          <div className="max-w-3xl">
            <span className="text-overline mb-4 block">Our Services</span>
            <h1 className="text-display mb-6">
              Capital Solutions,{" "}
              <span className="text-[var(--color-accent)]">
                Thoughtfully Structured
              </span>
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Every business has unique capital needs. We offer a comprehensive
              suite of funding options, each carefully matched to your specific
              situation and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="services-grid space-y-6">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card group block"
              >
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 md:p-10 hover:border-[var(--color-accent)]/30 transition-all duration-300">
                  <div className="grid md:grid-cols-12 gap-6 md:gap-8">
                    {/* Left: Icon & Title */}
                    <div className="md:col-span-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                          <service.icon className="w-7 h-7 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-medium mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            Best for: {service.bestFor}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Description & Highlights */}
                    <div className="md:col-span-6">
                      <p className="text-[var(--color-text-secondary)] mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="px-3 py-1 text-xs rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)]"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="md:col-span-2 flex md:items-center md:justify-end">
                      <span className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-surface)] to-[var(--color-primary)]" />
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-headline mb-4">
                    Not Sure Which Solution{" "}
                    <span className="text-[var(--color-accent)]">Fits?</span>
                  </h2>
                  <p className="text-lg text-[var(--color-text-secondary)]">
                    That's where we come in. Our advisors will assess your
                    situation and recommend the capital solution that makes the
                    most sense for your goals.
                  </p>
                </div>
                <div className="flex md:justify-end">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      magnetic
                      className="group"
                    >
                      <Calendar className="w-5 h-5" />
                      Speak With an Advisor
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
