import Taro, { showToast, hideToast } from '@tarojs/taro';

const defaultOption: showToast.Option = {
  title: '',
  duration: 1000,
  mask: false,
  icon: 'none'
};

const Toast = {
  isOpen: false,
  show: (option: showToast.Option) => {
    const duration = option.duration || defaultOption.duration;
    Taro.showToast({
      ...defaultOption,
      ...option
    });

    Toast.isOpen = true;
    setTimeout(() => {
      Toast.isOpen = false;
    }, duration);
  },

  hide: (option?: hideToast.Option) => {
    Taro.hideToast({
      ...option
    });
    Toast.isOpen = false;
  }
};

export default Toast;
