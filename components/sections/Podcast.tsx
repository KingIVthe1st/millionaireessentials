"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const episodes = [
  {
    title: "The Power of Strategic Capital",
    guest: "David Powers",
    description:
      "How understanding your capital options can transform your business trajectory and open doors you didn't know existed.",
    image: "/images/podcast/davidpowertalkpodcast.jpg",
    duration: "45 min",
    date: "Dec 2024",
    href: "/insights/podcast/strategic-capital",
  },
  {
    title: "From Startup to Scale: A Funding Journey",
    guest: "Lindsey Smith",
    description:
      "Lindsey shares her experience going from bootstrapped startup to multi-million dollar acquisition through smart financing.",
    image:
      "/images/podcast/lindseysmith-millionaireessentials-latestpodcasts.jpg",
    duration: "38 min",
    date: "Nov 2024",
    href: "/insights/podcast/startup-to-scale",
  },
  {
    title: "Building Wealth Through Business Ownership",
    guest: "Storm Leroy",
    description:
      "Storm discusses how proper capital structure can accelerate wealth building for business owners.",
    image: "/images/podcast/stormleroy-millionaireessentials-podcast.jpg",
    duration: "52 min",
    date: "Oct 2024",
    href: "/insights/podcast/building-wealth",
  },
];

export function Podcast() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".podcast-header", {
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

      gsap.from(".podcast-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".podcast-grid",
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-luxury">
        {/* Header */}
        <div className="podcast-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-overline mb-4 block">The ME Podcast</span>
            <h2 className="text-headline mb-4">
              Conversations About{" "}
              <span className="text-[var(--color-accent)] font-serif italic">
                Capital & Growth
              </span>
            </h2>
            <p className="text-subhead">
              Insights from business owners, advisors, and experts on navigating
              the financial side of entrepreneurship.
            </p>
          </div>
          <Link
            href="/insights/podcast"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium hover:gap-3 transition-all"
          >
            All Episodes
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Episodes Grid */}
        <div className="podcast-grid grid md:grid-cols-3 gap-6">
          {episodes.map((episode, index) => (
            <Link
              key={index}
              href={episode.href}
              className="podcast-card group"
            >
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/30 transition-colors">
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                      <Play className="w-6 h-6 text-[var(--color-primary)] fill-current ml-1" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-xs text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {episode.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-3">
                    <span>{episode.date}</span>
                    <span>•</span>
                    <span>with {episode.guest}</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {episode.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
