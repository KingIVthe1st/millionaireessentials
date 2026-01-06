"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navigation = {
  services: [
    { name: "Term Loans", href: "/services/term-loans" },
    { name: "SBA Loans", href: "/services/sba-loans" },
    { name: "Lines of Credit", href: "/services/lines-of-credit" },
    { name: "Business Credit", href: "/services/business-credit" },
    { name: "Alternative Lending", href: "/services/alternative-lending" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about#team" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  insights: [
    { name: "Podcast", href: "/insights/podcast" },
    { name: "Blog", href: "/insights/blog" },
    { name: "Resources", href: "/insights/resources" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-[var(--color-surface)] border-t border-[var(--color-border)]"
    >
      <div className="container-luxury">
        {/* Main Footer */}
        <div className="footer-content py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-semibold">
                  Millionaire
                  <span className="text-[var(--color-accent)]">.</span>
                </span>
              </Link>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-xs">
                Private capital advisory for businesses that value expertise,
                discretion, and results over speed.
              </p>
              {/* Contact Info */}
              <div className="space-y-3 text-sm">
                <a
                  href="mailto:info@millionaireessentials.com"
                  className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@millionaireessentials.com
                </a>
                <a
                  href="tel:+19178095707"
                  className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +1 (917) 809-5707
                </a>
                <div className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>
                    6 Gates Ave
                    <br />
                    Montclair, NJ 07042
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4">Services</h4>
              <ul className="space-y-3">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Insights */}
            <div>
              <h4 className="font-medium mb-4">Insights</h4>
              <ul className="space-y-3">
                {navigation.insights.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-medium mb-4">Stay Informed</h4>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                Monthly insights on capital strategies and business growth.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-lg text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-[var(--color-text-muted)] text-center md:text-left">
              © {new Date().getFullYear()} Millionaire Essentials. All rights
              reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {navigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
