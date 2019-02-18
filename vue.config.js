module.exports = {
  configureWebpack: {},
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  devServer: {
    proxy: {
      '/api': { target: 'http://localhost:3000', changeOrigin: true },
    },
  },
};
