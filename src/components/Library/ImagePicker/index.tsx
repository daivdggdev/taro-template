import React from 'react';
import { AtImagePicker } from 'taro-ui';
import Taro from '@tarojs/taro';

const ImagePicker: React.FC<any> = props => {
  return <AtImagePicker {...props}>{props.children}</AtImagePicker>;
};

export default ImagePicker;
