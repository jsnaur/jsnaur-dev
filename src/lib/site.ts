/**
 * Resolves the canonical site URL.
 * - Production: jsnaur-dev.vercel.app (override via NEXT_PUBLIC_SITE_URL if needed).
 * - Local dev: localhost.
 */
const PROD_URL = "https://jsnaur-dev.vercel.app";

export const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NODE_ENV === "production") return PROD_URL;
  return "http://localhost:3000";
})();
