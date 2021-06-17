import React from 'react';
import { AtFloatLayout } from 'taro-ui';
import { AtFloatLayoutProps } from 'taro-ui/types/float-layout.d';

export type FloatLayoutProps = AtFloatLayoutProps;

const FloatLayout: React.FC<FloatLayoutProps> = props => {
  return <AtFloatLayout {...props}>{props.children}</AtFloatLayout>;
};

export default FloatLayout;
