/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";
module.exports = {
    basePath: "/pixel-brush",
    output: "export",
    reactStrictMode: true,
}
  