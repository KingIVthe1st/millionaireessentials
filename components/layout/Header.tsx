"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Add glass effect after scrolling
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-b border-[var(--color-border)]"
            : "bg-transparent",
          isHidden && "-translate-y-full"
        )}
      >
        <div className="container-luxury">
          <nav className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-80"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <div className="absolute inset-0 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
                  <span className="text-[var(--color-primary)] font-bold text-xl md:text-2xl">
                    M
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg md:text-xl font-medium tracking-tight">
                  Millionaire
                </span>
                <span className="text-lg md:text-xl font-medium tracking-tight text-[var(--color-accent)]">
                  {" "}Essentials
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors link-hover"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="primary" magnetic className="group">
                Begin the Conversation
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2 -mr-2 text-[var(--color-text-primary)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute inset-y-0 right-0 w-full max-w-sm bg-[var(--color-surface)] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            <nav className="flex flex-col gap-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "py-4 text-2xl font-medium text-[var(--color-text-primary)] border-b border-[var(--color-border)] transition-all",
                    "hover:text-[var(--color-accent)] hover:pl-2",
                    isMobileMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${150 + index * 50}ms`
                      : "0ms",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Begin the Conversation
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="mt-4 text-sm text-[var(--color-text-muted)] text-center">
                No application required. Complete confidentiality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
