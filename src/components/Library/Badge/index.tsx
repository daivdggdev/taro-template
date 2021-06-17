import React from 'react';
import { AtBadge } from 'taro-ui';
import { AtBadgeProps } from 'taro-ui/types/badge.d';

export type BadgeProps = AtBadgeProps;

const Badge: React.FC<BadgeProps> = props => {
  return <AtBadge {...props}>{props.children}</AtBadge>;
};

export default Badge;
