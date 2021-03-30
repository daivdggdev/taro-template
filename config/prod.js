module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    API_PREFIX: JSON.stringify('http://localhost:3721'),
  },
  mini: {
    webpackChain(chain, webpack) {
      // chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
      chain.plugin('ignore').use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    },
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
