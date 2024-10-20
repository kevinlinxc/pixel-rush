/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/pixel-brush",
    assetPrefix: "/pixel-brush/",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
  };
  
  module.exports = nextConfig;
  