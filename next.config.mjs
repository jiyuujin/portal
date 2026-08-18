/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export", // only for AWS
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
