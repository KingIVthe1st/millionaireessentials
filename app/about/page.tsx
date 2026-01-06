"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Shield,
  Users,
  Lightbulb,
  ChevronDown,
  Calendar,
  Linkedin,
  Mail,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/sections/Footer";
import { getImagePath } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const values = [
  {
    icon: Target,
    title: "Advisory-First Approach",
    description:
      "We begin every relationship with understanding—your goals, your challenges, your timeline. Only then do we match you with the right capital solution.",
  },
  {
    icon: Shield,
    title: "Absolute Discretion",
    description:
      "Your financial matters remain confidential. We operate with the discretion you'd expect from a private wealth advisor.",
  },
  {
    icon: Users,
    title: "Network Depth",
    description:
      "Access to 75+ lending partners means we find the right fit, not just the fastest approval. Quality relationships, quality outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description:
      "Capital is a tool. We help you wield it strategically—whether for growth, acquisition, or weathering uncertainty.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Founded with Purpose",
    description:
      "Started with a simple belief: business owners deserve advisors, not salespeople pushing products.",
  },
  {
    year: "2020",
    title: "Expanded Network",
    description:
      "Built relationships with 50+ lending partners, creating options for every situation.",
  },
  {
    year: "2022",
    title: "National Reach",
    description:
      "Grew to serve business owners across 40+ industries in all 50 states.",
  },
  {
    year: "2024",
    title: "$47M+ Funded",
    description:
      "Crossed the $47 million milestone in funded deals, maintaining our advisory-first approach.",
  },
];

const team = [
  {
    name: "Taejon Jackson",
    role: "Chief Strategy Officer",
    image: getImagePath("/images/team/Taejon-1-1-1676x2048.jpg"),
    bio: "Taejon's entrepreneurial background—having built and scaled multiple businesses himself—gives him firsthand understanding of the capital challenges business owners face. As CSO, he shapes the strategic direction of Millionaire Essentials and ensures every client receives tailored guidance.",
    linkedin: "#",
    email: "taejon@millionaireessentials.com",
  },
  {
    name: "Natalie Ortega",
    role: "Chief Coordinator Officer",
    image: getImagePath("/images/team/nat-2-1479x1536.jpg"),
    bio: "Natalie specializes in orchestrating complex funding deals and ensuring seamless coordination between clients and lending partners. Her analytical approach ensures clients understand every aspect of their funding options before making decisions.",
    linkedin: "#",
    email: "natalie@millionaireessentials.com",
  },
  {
    name: "Christine Delgado",
    role: "Sales Manager",
    image: getImagePath("/images/team/christine.png"),
    bio: "Christine brings extensive experience in business development and client acquisition. She leads our sales team with a consultative approach, ensuring every business owner feels heard and understood before any funding discussion begins.",
    linkedin: "#",
    email: "christine@millionaireessentials.com",
  },
  {
    name: "Ericka Marie Wong",
    role: "Executive Assistant",
    image: getImagePath("/images/team/erika.png"),
    bio: "Ericka's background in executive support and client relations ensures our leadership team operates at peak efficiency. She coordinates high-priority communications and keeps the entire operation running smoothly.",
    linkedin: "#",
    email: "ericka@millionaireessentials.com",
  },
  {
    name: "Novielyn Amorsolo",
    role: "Administrator",
    image: getImagePath("/images/team/Novielyn.png"),
    bio: "Novielyn orchestrates the behind-the-scenes operations that make our funding process seamless. Her attention to detail and organizational excellence ensures nothing falls through the cracks.",
    linkedin: "#",
    email: "novielyn@millionaireessentials.com",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".about-hero-text", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
      });

      // Timeline animation
      gsap.from(".timeline-item", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 80%",
          once: true,
        },
      });

      // Values animation
      gsap.from(".value-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
          once: true,
        },
      });

      // Team animation
      gsap.from(".team-member", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-primary)]" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container-luxury relative z-10">
          <div className="max-w-4xl">
            <span className="about-hero-text text-overline mb-6 block">
              About Millionaire Essentials
            </span>
            <h1 className="about-hero-text text-display mb-6">
              Capital Advisory for{" "}
              <span className="text-[var(--color-accent)]">
                Business Owners Who Value Expertise
              </span>
            </h1>
            <p className="about-hero-text text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
              We're not a lending marketplace. We're advisors who happen to have
              access to capital. The difference is in how we approach every
              conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-overline mb-4 block">Our Mission</span>
              <h2 className="text-headline mb-6">
                Changing How Business Owners{" "}
                <span className="text-[var(--color-accent)]">
                  Access Capital
                </span>
              </h2>
              <div className="space-y-4 text-[var(--color-text-secondary)]">
                <p>
                  The traditional lending process treats business owners like
                  applications to process. Fill out a form, wait for an
                  algorithm, hope for the best.
                </p>
                <p>
                  We believe business owners deserve better. You've built
                  something meaningful. You understand your numbers, your
                  market, your opportunities. What you need is an advisor who
                  listens first, then leverages their network to find the right
                  solution.
                </p>
                <p>
                  That's what we do. Every conversation starts with
                  understanding. Every recommendation comes from experience.
                  Every relationship is built on trust.
                </p>
              </div>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-4 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <Image
                  src={getImagePath(
                    "/images/brand/milliessentialsqualityervice.jpg",
                  )}
                  alt="Quality service at Millionaire Essentials"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section-padding bg-[var(--color-surface)]">
        <div className="container-luxury">
          <div className="max-w-2xl mb-12">
            <span className="text-overline mb-4 block">Our Journey</span>
            <h2 className="text-headline">
              Built on{" "}
              <span className="text-[var(--color-accent)]">
                Relationships, Not Transactions
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item relative">
                <div className="text-5xl font-bold text-[var(--color-accent)]/20 mb-2">
                  {item.year}
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-overline mb-4 block">What Guides Us</span>
            <h2 className="text-headline">
              Principles That{" "}
              <span className="text-[var(--color-accent)]">
                Define Our Work
              </span>
            </h2>
          </div>

          <div className="values-grid grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group p-8 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                  <value.icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-[var(--color-text-secondary)]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-[var(--color-surface)]">
        <div className="container-luxury">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-overline mb-4 block">Leadership</span>
            <h2 className="text-headline">
              Meet the <span className="text-[var(--color-accent)]">Team</span>
            </h2>
            <p className="text-subhead mt-4">
              Experienced advisors who understand what's at stake when you're
              seeking capital.
            </p>
          </div>

          <div className="team-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-member bg-[var(--color-primary)] rounded-xl overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-300"
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-all duration-500 grayscale hover:grayscale-0"
                  />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm text-[var(--color-accent)] mb-3">
                    {member.role}
                  </p>

                  {/* Expandable Bio */}
                  <button
                    onClick={() =>
                      setExpandedMember(expandedMember === index ? null : index)
                    }
                    className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    <span>
                      {expandedMember === index ? "Hide" : "View"} Bio
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedMember === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedMember === index && (
                    <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                      <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        {member.bio}
                      </p>
                      <div className="flex items-center gap-3">
                        <a
                          href={member.linkedin}
                          className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-surface)] to-[var(--color-primary)]" />
            <div className="absolute inset-0 opacity-30">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, var(--color-accent) 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-headline mb-4">
                Ready to Speak With{" "}
                <span className="text-[var(--color-accent)]">an Advisor</span>?
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
                No pressure, no obligation. Just a conversation about your
                business and what's possible.
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
