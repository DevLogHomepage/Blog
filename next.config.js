/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: "https://localhost:8000/api/graphql",
      },
    ];
  },
}

module.exports = nextConfig
