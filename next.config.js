/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
  env: {
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
