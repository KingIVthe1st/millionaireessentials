import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis-provider";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { Preloader } from "@/components/effects/Preloader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Premium serif font for editorial headlines
const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Millionaire Essentials | Private Capital Advisory",
    template: "%s | Millionaire Essentials",
  },
  description:
    "Millionaire Essentials connects established business owners with capital solutions tailored to opportunity. Term loans, credit facilities, and SBA financing with advisors who understand what's at stake.",
  keywords: [
    "business funding",
    "capital advisory",
    "term loans",
    "SBA loans",
    "business credit",
    "lines of credit",
    "alternative lending",
    "business financing",
  ],
  authors: [{ name: "Millionaire Essentials" }],
  creator: "Millionaire Essentials",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://millionaireessentials.com",
    siteName: "Millionaire Essentials",
    title: "Millionaire Essentials | Private Capital Advisory",
    description:
      "Capital solutions for businesses that don't stand still. Expert guidance on term loans, SBA financing, and credit facilities.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Millionaire Essentials - Private Capital Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Millionaire Essentials | Private Capital Advisory",
    description: "Capital solutions for businesses that don't stand still.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} font-sans antialiased bg-[var(--color-primary)] text-[var(--color-text-primary)]`}
      >
        {/* Premium page preloader */}
        <Preloader minDuration={2000} />

        {/* Custom cursor for desktop */}
        <CustomCursor />

        <LenisProvider>
          <Header />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
