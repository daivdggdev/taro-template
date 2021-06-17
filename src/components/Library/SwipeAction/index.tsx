import React from 'react';
import { AtSwipeAction } from 'taro-ui';
import { AtSwipeActionProps } from 'taro-ui/types/swipe-action.d';
import Taro from '@tarojs/taro';

export type SwipeActionProps = AtSwipeActionProps;

const SwipeAction: React.FC<SwipeActionProps> = props => {
  return <AtSwipeAction {...props}>{props.children}</AtSwipeAction>;
};

export default SwipeAction;
