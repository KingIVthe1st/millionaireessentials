import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // Base path for GitHub Pages (repo name)
  basePath: isProd ? "/millionaireessentials" : "",

  // Asset prefix for GitHub Pages
  assetPrefix: isProd ? "/millionaireessentials/" : "",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slash for static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
