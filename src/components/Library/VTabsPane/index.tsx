import React from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import LdComponent from '../common/component';
import { LdComponentProps } from '../types/base';
import classNames from 'classnames';
import './index.scss';

type Props = LdComponentProps & {
  /**
   * 对应的标签页下标
   */
  tabIndex: number;
  /**
   * 组件加载后的回调，模拟原生小程序的 relations linked
   */
  onMount?: (target: React.ReactNode) => void;
  /**
   * 组件卸载后的回调，模拟原生小程序的 relations unlinked
   */
  onUnMount?: (target: React.ReactNode) => void;
};

/**
 * 纵向选项卡内容
 */
class VTabsPane extends LdComponent<Props> {
  static defaultProps = {
    tabIndex: 0
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.onMount && this.props.onMount(this);
  }

  componentWillUnmount() {
    this.props.onUnMount && this.props.onUnMount(this);
  }

  render() {
    const { tabIndex, className } = this.props;
    return (
      <View
        className={classNames('weui-vtabs-content__item', className)}
        id={`weui-vtabs-content__${tabIndex}`}
      >
        {this.props.children}
      </View>
    );
  }

  calcHeight = callback => {
    const { tabIndex } = this.props;
    const query = Taro.createSelectorQuery();
    query
      .select(`#weui-vtabs-content__${tabIndex}`)
      .boundingClientRect(function(rect) {
        callback && callback(rect);
      })
      .exec();
  };
}

export default VTabsPane;
