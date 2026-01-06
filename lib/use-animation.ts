"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for scroll-triggered fade-in animations
 */
export function useFadeIn(options?: {
  threshold?: number;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    threshold = 0.1,
    delay = 0,
    duration = 0.8,
    y = 30,
  } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !isVisible) return;

    gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
      }
    );
  }, [isVisible, delay, duration, y]);

  return { ref, isVisible };
}

/**
 * Hook for scroll-triggered text reveal animations
 */
export function useTextReveal(options?: {
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { stagger = 0.1, duration = 1 } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Find all child elements with the reveal class
    const lines = element.querySelectorAll(".reveal-line");
    if (lines.length === 0) return;

    gsap.set(lines, { y: "100%", opacity: 0 });

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stagger, duration]);

  return ref;
}

/**
 * Hook for animated number counter
 */
export function useCounter(
  end: number,
  options?: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  }
) {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const { duration = 2, prefix = "", suffix = "", decimals = 0 } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the counter
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * end * Math.pow(10, decimals)) / Math.pow(10, decimals);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, decimals]);

  const formatted = count.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, value: `${prefix}${formatted}${suffix}` };
}

/**
 * Hook for parallax scroll effects
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.to(element, {
      y: () => ScrollTrigger.maxScroll(window) * speed * -1,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

/**
 * Hook for staggered children animations
 */
export function useStaggerChildren(options?: {
  stagger?: number;
  duration?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { stagger = 0.1, duration = 0.6, y = 20 } = options || {};

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const children = element.children;
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y });

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [stagger, duration, y]);

  return ref;
}
