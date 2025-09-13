module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Disable source map warnings for node_modules
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/stylis-plugin-rtl/,
        ],
      });
      
      return webpackConfig;
    },
  },
};

