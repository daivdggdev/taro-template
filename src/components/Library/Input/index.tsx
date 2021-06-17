import React from 'react';
import { AtInput } from 'taro-ui';
import { AtInputProps } from 'taro-ui/types/input.d';
import Taro from '@tarojs/taro';

export type InputProps = AtInputProps;

const Input: React.FC<InputProps> = props => {
  return <AtInput {...props}>{props.children}</AtInput>;
};

export default Input;
