import React from 'react';
import { AtIcon } from 'taro-ui';
import { AtIconProps } from 'taro-ui/types/icon.d';

export type IconProps = AtIconProps;

const Icon: React.FC<IconProps> = props => {
  return <AtIcon {...props}>{props.children}</AtIcon>;
};

export default Icon;
