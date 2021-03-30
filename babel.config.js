// babelpresettaro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babelpresettaro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true,
        // decoratorsBeforeExport: true,
        // decoratorsLegacy: false
      },
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
};
