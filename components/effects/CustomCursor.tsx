"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CursorState {
  isHovering: boolean;
  isClicking: boolean;
  isHidden: boolean;
  text: string;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    isHidden: false,
    text: "",
  });

  useEffect(() => {
    // Check if on mobile/touch device
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;
    if (!cursor || !cursorDot) return;

    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      setState((prev) => ({ ...prev, isHidden: false }));
    };

    const handleMouseLeave = () => {
      setState((prev) => ({ ...prev, isHidden: true }));
    };

    const handleMouseDown = () => {
      setState((prev) => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setState((prev) => ({ ...prev, isClicking: false }));
    };

    // Smooth follow animation
    const animate = () => {
      // Cursor ring follows with slight delay (lerp)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Dot follows more closely
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      if (cursor) {
        cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      }
      if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }

      requestAnimationFrame(animate);
    };

    // Interactive elements detection
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      );

      if (interactiveElement) {
        const cursorText = interactiveElement.getAttribute("data-cursor") || "";
        setState((prev) => ({
          ...prev,
          isHovering: true,
          text: cursorText,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isHovering: false,
          text: "",
        }));
      }
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Start animation loop
    animate();

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
    };
  }, []);

  // Animate cursor state changes
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor) return;

    // Get computed CSS variable for accent color
    const accentColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-accent")
        .trim() || "#c9703a";

    if (state.isHovering) {
      // Premium hover state - filled cursor with scale
      gsap.to(cursor, {
        scale: 2,
        borderColor: accentColor,
        backgroundColor: accentColor,
        duration: 0.4,
        ease: "power3.out",
      });
      // Hide dot on hover for cleaner look
      if (cursorDot) {
        gsap.to(cursorDot, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
        });
      }
    } else if (state.isClicking) {
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
        backgroundColor: "transparent",
        duration: 0.4,
        ease: "power3.out",
      });
      // Show dot again
      if (cursorDot) {
        gsap.to(cursorDot, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        });
      }
    }
  }, [state.isHovering, state.isClicking]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/30 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          opacity: state.isHidden ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Cursor text */}
        {state.text && (
          <div
            ref={cursorTextRef}
            className="absolute inset-0 flex items-center justify-center text-[8px] font-medium text-white uppercase tracking-wider"
          >
            {state.text}
          </div>
        )}
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pointer-events-none z-[9999]"
        style={{
          opacity: state.isHidden ? 0 : 1,
          transition: "opacity 0.3s ease",
          transform: state.isClicking ? "scale(0.5)" : "scale(1)",
        }}
      />
    </>
  );
}

// Magnetic button wrapper that attracts the cursor
interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticWrapper({
  children,
  strength = 0.3,
  className = "",
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
