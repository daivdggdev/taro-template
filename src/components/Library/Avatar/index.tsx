import React from 'react';
import { AtAvatar } from 'taro-ui';
import { AtAvatarProps } from 'taro-ui/types/avatar.d';

export type AvatarProps = AtAvatarProps;

const Avatar: React.FC<AvatarProps> = props => {
  return <AtAvatar {...props}>{props.children}</AtAvatar>;
};

export default Avatar;
