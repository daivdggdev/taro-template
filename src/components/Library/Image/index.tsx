import React from 'react';
import { Image as AtImage } from '@tarojs/components';
import { ImageProps as AtImageProps } from '@tarojs/components/types/Image';
import Taro from '@tarojs/taro';

export type ImageProps = AtImageProps;

const Image: React.FC<AtImageProps> = props => {
  return <AtImage {...props}>{props.children}</AtImage>;
};

export default Image;
