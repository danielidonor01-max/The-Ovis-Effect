import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The repo also contains the legacy Astro app + lockfile at the parent dir;
  // pin Turbopack's root to this Next app so module resolution stays correct.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
