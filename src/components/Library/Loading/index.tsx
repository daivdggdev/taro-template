import Taro, { showLoading, hideLoading } from '@tarojs/taro';
import Toast from '../Toast';

const defaultOption: showLoading.Option = {
  title: '',
  mask: true
};

const Loading = {
  show: (option: showLoading.Option) => {
    Taro.showLoading({ ...defaultOption, ...option });
  },
  hide: (option?: hideLoading.Option, immediately?: boolean) => {
    //当页面中没有Toast时，立即关闭Loading
    if (immediately === true) {
      Taro.hideLoading(option);
    } else {
      // TODO: 临时解决方案，规避hideLoading将Toast关闭
      setTimeout(
        () => {
          Taro.hideLoading(option);
        },
        Toast.isOpen ? 3000 : 0
      );
    }
  }
};

export default Loading;
