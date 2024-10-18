/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cd-dev-pull.b-cdn.net",
        port: "",
        pathname: "*/posters/**",
      },
      {
        protocol: "https",
        hostname: "cd-prod-pull.b-cdn.net",
        port: "",
        pathname: "*/posters/**",
      },
      {
        protocol: "https",
        hostname: "vz-eb5d6b10-75c.b-cdn.net",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "vz-cac74041-8b3.b-cdn.net",
        port: "",
        pathname: "*/**",
      },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")();

module.exports =
  process.env.ANALYZE === "true" ? withBundleAnalyzer(nextConfig) : nextConfig;
