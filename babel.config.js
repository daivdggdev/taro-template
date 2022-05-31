// babelpresettaro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babelpresettaro/README.md
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: true
        // decoratorsBeforeExport: true,
        // decoratorsLegacy: false
      }
    ]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'taro-hooks',
        camel2DashComponentName: false
      },
      'taro-hooks'
    ],
    [
      'import',
      {
        libraryName: '@antmjs/vantui',
        libraryDirectory: 'es',
        style: true
      },
      '@antmjs/vantui'
    ],
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'lodash'
    ]
  ]
};
