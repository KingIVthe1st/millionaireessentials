"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const founders = [
  {
    name: "Brandon Jackson",
    role: "Chief Executive Officer",
    title: "Co-Founder",
  },
  {
    name: "Tevin Facey",
    role: "Chief Operating Officer",
    title: "Co-Founder",
  },
];

export function Founders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".founders-header", {
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

      // Image reveal with scale
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Founder info cards stagger
      gsap.from(".founder-info", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".founders-grid",
          start: "top 85%",
          once: true,
        },
      });

      // Quote animation
      gsap.from(".founder-quote", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".founder-quote",
          start: "top 90%",
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
      {/* Background accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--color-accent)]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container-luxury relative">
        {/* Premium Header */}
        <div className="founders-header text-center max-w-4xl mx-auto mb-16">
          <span className="text-overline mb-4 block tracking-[0.3em]">
            Who We Are
          </span>
          <h2 className="text-headline mb-6">
            Two Builders.{" "}
            <span className="text-[var(--color-accent)] font-serif italic">
              One Mission.
            </span>
          </h2>
        </div>

        {/* Editorial Layout: Large Image + Info */}
        <div className="max-w-6xl mx-auto">
          {/* Main Founders Image */}
          <div
            ref={imageRef}
            className="relative aspect-[16/10] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 group"
          >
            <Image
              src="/images/brand/milliessentialsqualityervice.jpg"
              alt="Brandon Jackson and Tevin Facey - Co-Founders of Millionaire Essentials"
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)] via-transparent to-transparent opacity-60" />

            {/* Bottom text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] max-w-2xl">
                Since 2022: building what business lending should have been all
                along.
              </p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--color-accent)] tracking-wider">
                EST. 2022
              </span>
            </div>
          </div>

          {/* Founders Info Grid */}
          <div className="founders-grid grid md:grid-cols-2 gap-8 lg:gap-16">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="founder-info group relative p-8 lg:p-10 bg-[var(--color-surface)]/30 backdrop-blur-sm border border-[var(--color-border)] rounded-xl transition-all duration-500 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface)]/50"
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-24 bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent" />
                </div>

                <div className="relative">
                  {/* Title Badge */}
                  <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full border border-[var(--color-accent)]/20">
                    {founder.title}
                  </span>

                  {/* Name */}
                  <h3 className="text-2xl lg:text-3xl font-medium mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {founder.name}
                  </h3>

                  {/* Role */}
                  <p className="text-[var(--color-text-muted)] font-mono text-sm tracking-wide mb-6">
                    {founder.role}
                  </p>

                  {/* Divider */}
                  <div className="w-12 h-px bg-[var(--color-border)] group-hover:bg-[var(--color-accent)]/50 group-hover:w-20 transition-all duration-500 mb-6" />

                  {/* Bio */}
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {index === 0
                      ? "From MTA to real estate, consulting, and education — Brandon builds opportunities that change trajectories."
                      : "Google. Con Edison. A path from adversity to achievement. Tevin brings operational rigor and genuine investment in every outcome."}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 rounded-b-xl" />
              </div>
            ))}
          </div>

          {/* Founder Quote */}
          <div className="founder-quote mt-16 text-center max-w-3xl mx-auto relative">
            {/* Quote marks */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl text-[var(--color-accent)]/20 font-serif">
              "
            </span>

            <blockquote className="text-xl md:text-2xl text-[var(--color-text-secondary)] italic leading-relaxed mb-6">
              We built this for business owners who expect more and settle for
              nothing less.
            </blockquote>

            <cite className="text-sm text-[var(--color-text-muted)] font-mono not-italic">
              — Brandon Jackson & Tevin Facey
            </cite>
          </div>
        </div>

        {/* Decorative bottom divider */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>
    </section>
  );
}
