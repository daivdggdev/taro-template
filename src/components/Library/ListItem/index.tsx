import React from 'react';
import { AtListItem } from 'taro-ui';
import { AtListItemProps } from 'taro-ui/types/list.d';
import Taro from '@tarojs/taro';

export type ListItemProps = AtListItemProps;

const ListItem: React.FC<ListItemProps> = props => {
  return <AtListItem {...props}>{props.children}</AtListItem>;
};

export default ListItem;
