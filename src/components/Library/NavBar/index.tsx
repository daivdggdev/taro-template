import React from 'react';
import { AtNavBar } from 'taro-ui';
import { AtNavBarProps } from 'taro-ui/types/nav-bar.d';
import Taro from '@tarojs/taro';

export interface NavBarProps extends AtNavBarProps {
  position?: 'top' | 'any';
}

const NavBar: React.FC<NavBarProps> = props => {
  const { statusBarHeight } = Taro.getSystemInfoSync();
  const customStyle = props.position === 'top' ? `margin-top: ${statusBarHeight}px` : '';
  return <AtNavBar customStyle={customStyle} leftIconType="chevron-left" {...props} />;
};

NavBar.defaultProps = {
  position: 'any'
};

export default NavBar;
