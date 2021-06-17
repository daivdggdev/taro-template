import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import ActivityIndicator from '../ActivityIndicator';
import classNames from 'classnames';
import styles from './index.module.scss';

export interface LoadMoreProps {
  status: 'loadMore' | 'loading' | 'noMore';
}

const LoadMore: React.FC<LoadMoreProps> = props => {
  const { status } = props;
  return (
    <View className={classNames('flex-row-center', 'item-center', styles.loadMore)}>
      {status === 'loadMore' ? (
        '———上拉加载更多———'
      ) : status === 'noMore' ? (
        '———已经到底了———'
      ) : (
        <ActivityIndicator mode="normal" content="加载中..." size={32} />
      )}
    </View>
  );
};

export default LoadMore;
