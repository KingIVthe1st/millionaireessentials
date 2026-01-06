"use client";

import { useRef, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  Target,
  Shield,
} from "lucide-react";
import { servicesData } from "./services-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceDetailClientProps {
  slug: string;
}

export default function ServiceDetailClient({
  slug,
}: ServiceDetailClientProps) {
  const service = servicesData[slug];
  const pageRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!service) return;

    const ctx = gsap.context(() => {
      gsap.from(".service-hero", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".stat-item", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-bar",
          start: "top 90%",
          once: true,
        },
      });

      gsap.from(".process-step", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 80%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [service]);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-primary)]" />
        <div className="container-luxury relative z-10">
          {/* Back Link */}
          <Link
            href="/services"
            className="service-hero inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>

          <div className="service-hero max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <div>
                <span className="text-overline">{service.tagline}</span>
              </div>
            </div>
            <h1 className="text-display mb-6">{service.title}</h1>
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar py-8 bg-[var(--color-surface)] border-y border-[var(--color-border)]">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {service.stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <p className="text-2xl md:text-3xl font-bold text-[var(--color-accent)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="process-section section-padding">
        <div className="container-luxury">
          <div className="max-w-2xl mb-12">
            <span className="text-overline mb-4 block">The Process</span>
            <h2 className="text-headline">
              How <span className="text-[var(--color-accent)]">It Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.howItWorks.map((step, index) => (
              <div
                key={index}
                className="process-step flex gap-6 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[var(--color-accent)]">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Requirements */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <h2 className="text-2xl font-medium">Key Benefits</h2>
              </div>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <h2 className="text-2xl font-medium">Typical Requirements</h2>
              </div>
              <ul className="space-y-4">
                {service.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[var(--color-text-secondary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ideal For */}
          <div className="mt-12 pt-12 border-t border-[var(--color-border)]">
            <h3 className="text-lg font-medium mb-4">Ideal For:</h3>
            <div className="flex flex-wrap gap-3">
              {service.idealFor.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-[var(--color-primary)] border border-[var(--color-border)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-headline text-center mb-12">
              Frequently Asked{" "}
              <span className="text-[var(--color-accent)]">Questions</span>
            </h2>

            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[var(--color-border)] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[var(--color-surface)] transition-colors"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-5">
                      <p className="text-[var(--color-text-secondary)]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-surface)] to-[var(--color-primary)]" />
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-headline mb-4">
                Ready to Explore{" "}
                <span className="text-[var(--color-accent)]">
                  {service.title}
                </span>
                ?
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
                Schedule a consultation with one of our advisors to discuss how{" "}
                {service.title.toLowerCase()} can support your business goals.
              </p>
              <Link href="/contact">
                <Button variant="primary" size="lg" magnetic className="group">
                  <Calendar className="w-5 h-5" />
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
