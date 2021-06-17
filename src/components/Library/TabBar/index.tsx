import React from 'react';
import { AtTabBar } from 'taro-ui';
import { AtTabBarProps } from 'taro-ui/types/tab-bar.d';
import Taro from '@tarojs/taro';

export type TabBarProps = AtTabBarProps;
const TabBar: React.FC<TabBarProps> = props => {
  return <AtTabBar {...props}>{props.children}</AtTabBar>;
};

export default TabBar;
