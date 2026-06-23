import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
};

module.exports = {
  allowedDevOrigins: ["10.0.0.167"],
  images: {
    remotePatterns: [new URL("https://placehold.co/200x300.png?text=Super+cool+cat")],
  },
}

export default nextConfig;
