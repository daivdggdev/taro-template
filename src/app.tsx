import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import dva from '@/utils/dva';
import models from '@/models';
import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const app = dva({
  initialState: {},
  models,
  onError(e: any) {
    console.log('onError', e);
  },
});

const store = app.getStore();

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
