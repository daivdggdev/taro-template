import { useGlobalIconFont } from './components/iconfont/helper';

export default {
  pages: [
    /**
     * 首页
     */
    'pages/index/index',
  ],
  permission: {},
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },

  usingComponents: Object.assign(useGlobalIconFont(), {
    parser: './components/Library/RichText/parser/parser',
  }),
};
