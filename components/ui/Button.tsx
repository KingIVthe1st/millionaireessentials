"use client";

import { forwardRef, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = false,
      children,
      ...props
    },
    ref
  ) => {
    const magneticRef = useRef<HTMLButtonElement>(null);
    const buttonRef = (ref as React.RefObject<HTMLButtonElement>) || magneticRef;

    useEffect(() => {
      if (!magnetic || !buttonRef.current) return;

      const button = buttonRef.current;
      let bounds: DOMRect;

      const handleMouseMove = (e: MouseEvent) => {
        bounds = button.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      };

      const handleMouseLeave = () => {
        button.style.transform = "translate(0, 0)";
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [magnetic, buttonRef]);

    const variants = {
      primary:
        "bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent-hover)] hover:shadow-[0_10px_30px_var(--color-accent-glow)]",
      secondary:
        "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
      ghost:
        "bg-transparent text-[var(--color-text-primary)] hover:text-[var(--color-accent)] p-0",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={buttonRef}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          variants[variant],
          variant !== "ghost" && sizes[size],
          magnetic && "transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
