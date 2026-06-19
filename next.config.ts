import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
};

module.exports = {
  allowedDevOrigins: ['10.0.0.167'],
}

export default nextConfig;
