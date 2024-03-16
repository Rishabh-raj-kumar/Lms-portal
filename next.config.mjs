/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        "utfs.io"
      ]
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    "scripts": {
      "postinstall": "prisma generate"
    }
  }
export default nextConfig;
