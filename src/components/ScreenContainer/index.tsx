import React, { ComponentProps } from 'react';
import { View } from '@tarojs/components';
import classNames from 'classnames';
import styles from './index.module.scss';

interface ScreenContainerProps extends ComponentProps<any> {
  bgType?: 'swoosh' | 'flower';
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ className, children, ...props }) => {
  return (
    <View className={classNames(styles.layout, className)} {...props}>
      <View className={styles.children}>{children}</View>
    </View>
  );
};

export default ScreenContainer;
