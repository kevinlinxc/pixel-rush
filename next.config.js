/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
module.exports = {
    basePath: isDev ? "": "/pixel-brush",
    output: "export",
    reactStrictMode: true,
}
  