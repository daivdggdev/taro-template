import React from 'react';
import { ScrollView as AtScrollView } from '@tarojs/components';
import { ScrollViewProps as AtScrollViewProps } from '@tarojs/components/types/ScrollView';
import Taro from '@tarojs/taro';

export type ScrollViewProps = AtScrollViewProps;

const ScrollView: React.FC<ScrollViewProps> = props => {
  return <AtScrollView {...props} />;
};

export default ScrollView;
