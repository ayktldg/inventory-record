/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/inventory-record",
  assetPrefix: "/inventory-record/",
};

module.exports = nextConfig;
