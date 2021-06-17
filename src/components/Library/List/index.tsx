import React from 'react';
import { AtList } from 'taro-ui';
import { AtListProps } from 'taro-ui/types/list.d';
import Taro from '@tarojs/taro';

export type ListProps = AtListProps;

const List: React.FC<ListProps> = props => {
  return <AtList {...props}>{props.children}</AtList>;
};

export default List;
