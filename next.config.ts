import type { NextConfig } from "next";

const nextconfig: NextConfig = {
  typescript: {
    // Mengizinkan produksi build tetap selesai meskipun proyek Anda memiliki kesalahan TypeScript.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Mengizinkan produksi build tetap selesai meskipun proyek Anda memiliki kesalahan ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextconfig;
