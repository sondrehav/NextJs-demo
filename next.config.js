module.exports = {
  images: {
    formats: ['image/avif', 'image/webp', 'image/svg'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    config.module.rules.push({
      test: /\.gql$/,
      type: 'asset/source',
    });
    return config;
  }
};