"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItemProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

function StatItem({ value, prefix = "", suffix = "", label, duration = 2 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * value);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-mono mb-2">
        <span className="text-[var(--color-accent)]">{prefix}</span>
        {count.toLocaleString()}
        <span className="text-[var(--color-accent)]">{suffix}</span>
      </div>
      <p className="text-[var(--color-text-secondary)] text-sm md:text-base">{label}</p>
    </div>
  );
}

const stats = [
  { value: 47, prefix: "$", suffix: "M+", label: "Capital Facilitated" },
  { value: 75, suffix: "+", label: "Lending Partners" },
  { value: 500, suffix: "+", label: "Businesses Funded" },
  { value: 40, suffix: "+", label: "Industries Served" },
];

export function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container-luxury">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <StatItem {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
