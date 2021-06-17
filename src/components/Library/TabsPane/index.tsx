import React from 'react';
import { AtTabsPane } from 'taro-ui';
import { AtTabsPaneProps } from 'taro-ui/types/tabs-pane';
import Taro from '@tarojs/taro';

export type TabsPaneProps = AtTabsPaneProps;
const TabsPane: React.FC<TabsPaneProps> = props => {
  return <AtTabsPane {...props}>{props.children}</AtTabsPane>;
};

export default TabsPane;
