import React from 'react';
import { AtTabs } from 'taro-ui';
import { AtTabsProps } from 'taro-ui/types/tabs';
import Taro from '@tarojs/taro';

export type TabsProps = AtTabsProps;
const Tabs: React.FC<TabsProps> = props => {
  return <AtTabs {...props}>{props.children}</AtTabs>;
};

export default Tabs;
