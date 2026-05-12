import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fuerza la compatibilidad de paquetes que podrían fallar en Turbopack
  serverExternalPackages: ['tailwindcss'] 
};

export default nextConfig;