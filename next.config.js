/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
        test: /\.svg$/,
        use: [{loader: '@svgr/webpack',options: {icon: true}}]
    })
    return config;
  }

}

module.exports = nextConfig
