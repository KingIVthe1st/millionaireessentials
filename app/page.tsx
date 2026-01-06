import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Founders } from "@/components/sections/Founders";
import { Team } from "@/components/sections/Team";
import { Podcast } from "@/components/sections/Podcast";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      {/* Hero - Cinematic opening with key message */}
      <Hero />

      {/* Stats - Trust indicators */}
      <Stats />

      {/* Services - What we offer */}
      <Services />

      {/* Process - How it works */}
      <Process />

      {/* Testimonials - Social proof */}
      <Testimonials />

      {/* Founders - The visionaries behind the brand */}
      <Founders />

      {/* Team - The people who execute */}
      <Team />

      {/* Podcast - Content hub teaser */}
      <Podcast />

      {/* CTA - Final conversion */}
      <CTA />

      {/* Footer - Navigation and contact */}
      <Footer />
    </>
  );
}
