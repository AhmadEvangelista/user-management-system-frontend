import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BASE_URL: process.env.BASE_URL,
    CSRF_SECRET: process.env.CSRF_SECRET,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  },
};

export default nextConfig;
