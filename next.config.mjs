/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eng.univ-setif.dz",
      },
      {
        protocol: "https",
        hostname: "ancien-eng.univ-setif.dz",
      },
      {
        protocol: "https",
        hostname: "iceeac23.univ-setif.dz",
      },
      {
        protocol: "https",
        hostname: "fontawesome.com",
      },
    ],
  },
  experimental: {
    enableDevTools: false,
  },
};

export default nextConfig;
