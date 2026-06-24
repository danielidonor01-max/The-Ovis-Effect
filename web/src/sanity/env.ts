// Sanity project config. Project ID + dataset are public, so we fall back to
// literals — the app works without any env vars set (override via env if needed).
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gorjnjxy";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
