module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: '/akl/',
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
