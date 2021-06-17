import React from 'react';
import { AtModal } from 'taro-ui';
import { AtModalProps } from 'taro-ui/types/modal.d';
import Taro from '@tarojs/taro';

export type ModalProps = AtModalProps;

const Modal: React.FC<ModalProps> = props => {
  return <AtModal {...props}>{props.children}</AtModal>;
};

export default Modal;
