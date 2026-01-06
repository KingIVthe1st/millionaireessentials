"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface SplitTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  splitBy?: "chars" | "words" | "lines";
  animation?: "fadeUp" | "slideUp" | "reveal" | "blur";
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  splitBy = "chars",
  animation = "fadeUp",
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !containerRef.current) return;

    const text = containerRef.current.textContent || "";
    let elements: string[] = [];

    switch (splitBy) {
      case "chars":
        elements = text.split("");
        break;
      case "words":
        elements = text.split(" ");
        break;
      case "lines":
        elements = text.split("\n");
        break;
    }

    // Build HTML with spans
    const html = elements
      .map((el, i) => {
        const char = el === " " ? "&nbsp;" : el;
        return `<span class="split-char" style="display: inline-block; overflow: hidden;">
          <span class="char-inner" style="display: inline-block;">${char}</span>
        </span>${splitBy === "words" && i < elements.length - 1 ? "&nbsp;" : ""}`;
      })
      .join("");

    containerRef.current.innerHTML = html;

    const innerChars = containerRef.current.querySelectorAll(".char-inner");

    // Set initial state based on animation type
    const fromVars: gsap.TweenVars = {
      opacity: 0,
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    };

    switch (animation) {
      case "fadeUp":
        fromVars.y = "100%";
        toVars.y = "0%";
        break;
      case "slideUp":
        fromVars.y = "120%";
        fromVars.opacity = 1;
        toVars.y = "0%";
        break;
      case "reveal":
        fromVars.y = "100%";
        fromVars.opacity = 1;
        fromVars.rotateX = 90;
        toVars.y = "0%";
        toVars.rotateX = 0;
        break;
      case "blur":
        fromVars.y = "50%";
        fromVars.filter = "blur(10px)";
        toVars.y = "0%";
        toVars.filter = "blur(0px)";
        break;
    }

    gsap.set(innerChars, fromVars);
    gsap.to(innerChars, toVars);

    hasAnimated.current = true;

    return () => {
      gsap.killTweensOf(innerChars);
    };
  }, [delay, stagger, duration, splitBy, animation]);

  return (
    <span ref={containerRef} className={className}>
      {children}
    </span>
  );
}

// Word-by-word animation with masks
interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function WordReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
}: WordRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = children.split(" ");
    containerRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="word-mask" style="display: inline-block; overflow: hidden; vertical-align: bottom;">
            <span class="word-inner" style="display: inline-block; transform: translateY(100%);">${word}</span>
          </span>&nbsp;`,
      )
      .join("");

    const innerWords = containerRef.current.querySelectorAll(".word-inner");

    gsap.to(innerWords, {
      y: "0%",
      duration: 1,
      stagger,
      delay,
      ease: "power3.out",
    });
  }, [children, delay, stagger]);

  return (
    <span ref={containerRef} className={className}>
      {children}
    </span>
  );
}

// Line-by-line reveal for paragraphs
interface LineRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function LineReveal({
  children,
  className = "",
  delay = 0,
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = children.split("\n").filter((line) => line.trim());
    containerRef.current.innerHTML = lines
      .map(
        (line) =>
          `<div style="overflow: hidden;">
            <div class="line-inner" style="transform: translateY(100%); opacity: 0;">${line}</div>
          </div>`,
      )
      .join("");

    const innerLines = containerRef.current.querySelectorAll(".line-inner");

    gsap.to(innerLines, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      delay,
      ease: "power3.out",
    });
  }, [children, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
