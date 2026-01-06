import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with conflict resolution
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number with commas and optional prefix/suffix
 */
export function formatNumber(
  num: number,
  options?: {
    prefix?: string;
    suffix?: string;
    decimals?: number;
  },
): string {
  const { prefix = "", suffix = "", decimals = 0 } = options || {};
  const formatted = num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}

/**
 * Delays execution for smooth animation sequencing
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Clamps a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Maps a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Get the base path for assets (images, etc.)
 * In production (GitHub Pages), this returns "/millionaireessentials"
 * In development, this returns ""
 */
const basePath =
  process.env.NODE_ENV === "production" ? "/millionaireessentials" : "";

/**
 * Prepends the basePath to image paths for GitHub Pages compatibility
 * Use this for all image src attributes when using next/image with unoptimized: true
 *
 * @example
 * // In a component:
 * import { getImagePath } from "@/lib/utils";
 * <Image src={getImagePath("/images/team/photo.jpg")} alt="..." />
 */
export function getImagePath(path: string): string {
  // If path already has the basePath or is external, return as-is
  if (
    path.startsWith(basePath) ||
    path.startsWith("http") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
