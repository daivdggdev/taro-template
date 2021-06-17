import React from 'react';
import { AtActivityIndicator } from 'taro-ui';
import { AtActivityIndicatorProps } from 'taro-ui/types/activity-indicator.d';

export type ActivityIndicatorProps = AtActivityIndicatorProps;
const ActivityIndicator: React.FC<ActivityIndicatorProps> = props => {
  return <AtActivityIndicator {...props}>{props.children}</AtActivityIndicator>;
};

export default ActivityIndicator;
