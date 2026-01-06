"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImagePath } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote:
      "Millionaire Essentials didn't just find us funding — they found us the right funding. The terms were better than anything we'd been offered elsewhere, and Christine's team made the entire process feel effortless.",
    author: "Marcus Thompson",
    title: "CEO, Thompson Construction Group",
    image: getImagePath("/images/testimonials/marcus.jpg"),
    rating: 5,
    funding: "$350K Term Loan",
  },
  {
    quote:
      "After being turned down by three banks, I was skeptical. Within two weeks, Millionaire Essentials connected me with an SBA lender who understood my business. We closed in 30 days.",
    author: "Sarah Chen",
    title: "Founder, Meridian Consulting",
    image: getImagePath("/images/testimonials/sarah.jpg"),
    rating: 5,
    funding: "$500K SBA 7(a)",
  },
  {
    quote:
      "The difference is in the details. They didn't push the first option — they presented three paths, explained the trade-offs, and let me choose what was right for my situation. That's rare in this industry.",
    author: "David Rodriguez",
    title: "Owner, Rodriguez Auto Group",
    image: getImagePath("/images/testimonials/david.jpg"),
    rating: 5,
    funding: "$200K Line of Credit",
  },
  {
    quote:
      "We needed capital fast for a real estate opportunity. Millionaire Essentials delivered in 10 days with terms I could actually live with. They've become our go-to for every funding need since.",
    author: "Jennifer Walsh",
    title: "Managing Partner, Walsh Investments",
    image: getImagePath("/images/testimonials/jennifer.jpg"),
    rating: 5,
    funding: "$750K Bridge Financing",
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-header", {
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

      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-card",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--color-surface)]"
    >
      <div className="container-luxury">
        {/* Header */}
        <div className="testimonials-header text-center max-w-3xl mx-auto mb-16">
          <span className="text-overline mb-4 block">
            Their Words, Not Ours
          </span>
          <h2 className="text-headline mb-6">
            Trusted by Those Who{" "}
            <span className="text-[var(--color-accent)] font-serif italic">
              Demand More
            </span>
          </h2>
          <p className="text-subhead">
            Real outcomes. Real businesses. No scripts.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="testimonial-card max-w-4xl mx-auto">
          <div className="relative bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
              <Quote className="w-6 h-6 text-[var(--color-primary)]" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl md:text-2xl leading-relaxed mb-8 transition-opacity duration-500"
                style={{ opacity: isAnimating ? 0.5 : 1 }}
              >
                "{activeTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {/* Avatar Placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] flex items-center justify-center text-[var(--color-primary)] font-semibold text-lg">
                    {activeTestimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium">{activeTestimonial.author}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {activeTestimonial.title}
                    </p>
                  </div>
                </div>

                {/* Funding Badge */}
                <div className="px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium">
                  {activeTestimonial.funding}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setActiveIndex(i);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-8 bg-[var(--color-accent)]"
                      : "bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
