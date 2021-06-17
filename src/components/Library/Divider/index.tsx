import React from 'react';
import { AtDivider } from 'taro-ui';
import { AtDividerProps } from 'taro-ui/types/divider';

export type DividerProps = AtDividerProps;

const Divider: React.FC<DividerProps> = props => {
  return <AtDivider {...props}>{props.children}</AtDivider>;
};

export default Divider;
