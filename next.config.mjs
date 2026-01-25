/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["file.kikaee.com.ng"],
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'file-dev.kikae.com.ng',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'files.kikae.com.ng',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
