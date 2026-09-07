/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ["localhost", "127.0.0.1", "10.2.0.2"],
};
export default nextConfig;

