/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn-teams-slug.flaticon.com'],
  },

};

export default nextConfig;
