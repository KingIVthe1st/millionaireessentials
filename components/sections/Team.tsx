"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImagePath } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const team = [
  {
    name: "Taejon Jackson",
    role: "Chief Strategy Officer",
    image: getImagePath("/images/team/Taejon-1-1-1676x2048.jpg"),
    bio: "Strategic vision and leadership driving capital solutions for growing businesses.",
  },
  {
    name: "Natalie Ortega",
    role: "Chief Coordinator Officer",
    image: getImagePath("/images/team/nat-2-1479x1536.jpg"),
    bio: "Expert coordination ensuring seamless client experiences from start to funding.",
  },
  {
    name: "Christine Delgado",
    role: "Sales Manager",
    image: getImagePath("/images/team/christine.png"),
    bio: "Building relationships and connecting businesses with the right capital solutions.",
  },
  {
    name: "Ericka Marie Wong",
    role: "Executive Assistant",
    image: getImagePath("/images/team/erika.png"),
    bio: "Ensuring every client receives personalized attention and optimal outcomes.",
  },
  {
    name: "Novielyn Amorsolo",
    role: "Administrator",
    image: getImagePath("/images/team/Novielyn.png"),
    bio: "Streamlining operations to deliver faster, smoother funding experiences.",
  },
];

export function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-header", {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-luxury">
        {/* Header */}
        <div className="team-header text-center max-w-3xl mx-auto mb-16">
          <span className="text-overline mb-4 block">Our Team</span>
          <h2 className="text-headline mb-6">
            Advisors Who Understand{" "}
            <span className="text-[var(--color-accent)] font-serif italic">
              What's at Stake
            </span>
          </h2>
          <p className="text-subhead">
            Our team brings decades of combined experience in business finance,
            dedicated to finding the right capital solution for your unique
            situation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="team-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {team.map((member, index) => (
            <div key={index} className="team-member group text-center">
              {/* Photo */}
              <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-[var(--color-surface)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale-hover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <p className="text-xs text-[var(--color-text-secondary)] px-4 text-center">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Info */}
              <h3 className="font-medium mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
