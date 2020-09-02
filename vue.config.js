module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: '/',
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
