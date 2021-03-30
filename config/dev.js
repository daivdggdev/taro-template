module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  plugins: [
    // [
    //   '@tarojs/plugin-mock',
    //   {
    //     host: 'localhost',
    //     port: 9000,
    //   },
    // ],
  ],
  defineConstants: {
    API_PREFIX: JSON.stringify('http://localhost:9000'),
  },
  mini: {},
  h5: {
    devServer: {
      port: 9000,
    },
  },
};
