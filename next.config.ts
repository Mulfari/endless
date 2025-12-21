import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    // En Windows a veces se corrompe/rompe el filesystem cache y aparecen ENOENT
    // (chunks/manifests faltantes). En dev priorizamos estabilidad.
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
