"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Play,
  Clock,
  Calendar,
  BookOpen,
  Mic,
  Filter,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "@/components/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ContentType = "all" | "podcast" | "blog";

interface ContentItem {
  type: "podcast" | "blog";
  title: string;
  description: string;
  image: string;
  date: string;
  readTime?: string;
  duration?: string;
  guest?: string;
  category: string;
  slug: string;
  featured?: boolean;
}

const content: ContentItem[] = [
  {
    type: "podcast",
    title: "The Power of Strategic Capital",
    description:
      "How understanding your capital options can transform your business trajectory and open doors you didn't know existed.",
    image: "/images/podcast/davidpowertalkpodcast.jpg",
    date: "Dec 2024",
    duration: "45 min",
    guest: "David Powers",
    category: "Strategy",
    slug: "strategic-capital",
    featured: true,
  },
  {
    type: "blog",
    title: "SBA Loans in 2025: What Business Owners Need to Know",
    description:
      "A comprehensive guide to the latest SBA loan programs, requirements, and how to position your business for approval.",
    image: "/images/brand/milliessentialsqualityervice.jpg",
    date: "Dec 2024",
    readTime: "8 min read",
    category: "SBA Loans",
    slug: "sba-loans-2025-guide",
    featured: true,
  },
  {
    type: "podcast",
    title: "From Startup to Scale: A Funding Journey",
    description:
      "Lindsey shares her experience going from bootstrapped startup to multi-million dollar acquisition through smart financing.",
    image:
      "/images/podcast/lindseysmith-millionaireessentials-latestpodcasts.jpg",
    date: "Nov 2024",
    duration: "38 min",
    guest: "Lindsey Smith",
    category: "Growth",
    slug: "startup-to-scale",
  },
  {
    type: "blog",
    title: "Term Loans vs Lines of Credit: Which Is Right for You?",
    description:
      "Understanding the key differences between these financing options and when each makes the most sense for your business.",
    image: "/images/hero/hero-bg.png",
    date: "Nov 2024",
    readTime: "6 min read",
    category: "Education",
    slug: "term-loans-vs-lines-of-credit",
  },
  {
    type: "podcast",
    title: "Building Wealth Through Business Ownership",
    description:
      "Storm discusses how proper capital structure can accelerate wealth building for business owners.",
    image: "/images/podcast/stormleroy-millionaireessentials-podcast.jpg",
    date: "Oct 2024",
    duration: "52 min",
    guest: "Storm Leroy",
    category: "Wealth",
    slug: "building-wealth",
  },
  {
    type: "blog",
    title: "5 Signs Your Business Is Ready for Expansion Funding",
    description:
      "Key indicators that suggest it's time to seek capital for growth—and how to prepare your business for the application process.",
    image: "/images/brand/milliessentialsheader.png",
    date: "Oct 2024",
    readTime: "5 min read",
    category: "Growth",
    slug: "expansion-funding-readiness",
  },
];

const categories = [
  "All",
  "Strategy",
  "Growth",
  "SBA Loans",
  "Education",
  "Wealth",
];

export default function InsightsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<ContentType>("all");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredContent = content.filter((item) => {
    const typeMatch = activeType === "all" || item.type === activeType;
    const categoryMatch =
      activeCategory === "All" || item.category === activeCategory;
    return typeMatch && categoryMatch;
  });

  const featuredContent = content.filter((item) => item.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".insights-hero", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".content-card", {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".content-grid",
          start: "top 85%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-primary)]" />
        <div className="container-luxury relative z-10 insights-hero">
          <div className="max-w-3xl">
            <span className="text-overline mb-4 block">
              Insights & Resources
            </span>
            <h1 className="text-display mb-6">
              Knowledge for{" "}
              <span className="text-[var(--color-accent)]">
                Business Growth
              </span>
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Explore our podcast episodes, articles, and resources designed to
              help business owners make informed capital decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-12 bg-[var(--color-surface)]">
        <div className="container-luxury">
          <h2 className="text-lg font-medium mb-6">Featured</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredContent.map((item, index) => (
              <Link
                key={index}
                href={
                  item.type === "podcast"
                    ? `/insights/podcast/${item.slug}`
                    : `/insights/blog/${item.slug}`
                }
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="aspect-[16/9] relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === "podcast"
                          ? "bg-[var(--color-accent)] text-[var(--color-primary)]"
                          : "bg-white/20 text-white backdrop-blur-sm"
                      }`}
                    >
                      {item.type === "podcast" ? (
                        <span className="flex items-center gap-1">
                          <Mic className="w-3 h-3" /> Podcast
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> Article
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 text-white/70 text-sm mb-3">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>
                        {item.type === "podcast"
                          ? item.duration
                          : item.readTime}
                      </span>
                      {item.guest && (
                        <>
                          <span>•</span>
                          <span>with {item.guest}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/70 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
              <div className="flex gap-2">
                {(["all", "podcast", "blog"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeType === type
                        ? "bg-[var(--color-accent)] text-[var(--color-primary)]"
                        : "bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)]"
                    }`}
                  >
                    {type === "all"
                      ? "All Content"
                      : type === "podcast"
                        ? "Podcast"
                        : "Blog"}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-[var(--color-surface-elevated)] text-[var(--color-accent)] border border-[var(--color-accent)]/30"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="content-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => (
              <Link
                key={index}
                href={
                  item.type === "podcast"
                    ? `/insights/podcast/${item.slug}`
                    : `/insights/blog/${item.slug}`
                }
                className="content-card group"
              >
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-accent)]/30 transition-colors">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                          item.type === "podcast"
                            ? "bg-[var(--color-accent)] text-[var(--color-primary)]"
                            : "bg-black/50 text-white backdrop-blur-sm"
                        }`}
                      >
                        {item.type === "podcast" ? (
                          <>
                            <Mic className="w-3 h-3" />
                            Podcast
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3 h-3" />
                            Article
                          </>
                        )}
                      </span>
                    </div>

                    {/* Play overlay for podcast */}
                    {item.type === "podcast" && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
                          <Play className="w-6 h-6 text-[var(--color-primary)] fill-current ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mb-3">
                      <span className="px-2 py-0.5 rounded bg-[var(--color-surface-elevated)]">
                        {item.category}
                      </span>
                      <span>•</span>
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>
                        {item.type === "podcast"
                          ? item.duration
                          : item.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                      {item.description}
                    </p>

                    {item.guest && (
                      <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                        with {item.guest}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--color-text-secondary)]">
                No content found matching your filters.
              </p>
              <button
                onClick={() => {
                  setActiveType("all");
                  setActiveCategory("All");
                }}
                className="mt-4 text-[var(--color-accent)] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-headline mb-4">
              Stay <span className="text-[var(--color-accent)]">Informed</span>
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Get our latest insights delivered to your inbox. Monthly updates
              on capital strategies, market trends, and business growth.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-[var(--color-primary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-lg font-medium hover:bg-[var(--color-accent-hover)] transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
