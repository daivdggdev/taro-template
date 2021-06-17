import React from 'react';
import { AtTextarea } from 'taro-ui';
import { AtTextareaProps } from 'taro-ui/types/textarea.d';
import Taro from '@tarojs/taro';

export type TextareaProps = AtTextareaProps;

const Avatar: React.FC<TextareaProps> = props => {
  return <AtTextarea {...props}>{props.children}</AtTextarea>;
};

export default Avatar;
