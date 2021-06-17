import React from 'react';
import Taro from '@tarojs/taro';
import classNames from 'classnames';
import { View, Text } from '@tarojs/components';
import LdComponent from '../common/component';
import { LdComponentProps } from '../types/base';
import ScrollView from '../ScrollView';
import { Dictionary } from '@/utils/type';
import { CommonEvent } from '../types/common';
import { cloneDeep } from 'lodash';
import './index.scss';
import VTabsPane from '../VTabsPane';

type Props = LdComponentProps & {
  /**
   * 标签内容
   */
  tabList: Array<{ title: string }>;
  /**
   * 标签栏整体样式
   */
  tabBarClass?: string;
  /**
   * 单个标签样式
   */
  tabBarItemClass?: string;
  /**
   * 激活标签页样式
   */
  activeClass?: string;
  /**
   * 未激活标签页样式
   */
  inActiveClass?: string;
  /**
   * 激活标签页左侧线条颜色
   */
  tabBarLineColor?: string;
  /**
   * 当前标签页
   */
  current: number;
  /**
   * 滑动是否有动画
   */
  animation?: boolean;
  /**
   * 点击或滑动时触发事件, 外部用来更新current值
   */
  onClick?: (index: number, event: CommonEvent) => void;
};

type State = {
  /**
   * scrollview的id标识
   */
  currentView: number;
  /**
   * 控制滚动
   */
  contentScrollTop: number;
  /**
   * 键值对，根据索引记录内容高度
   */
  contentHeight: Dictionary<number>;
};

/**
 * 纵向选项卡组件
 */
class VTabs extends LdComponent<Props, State> {
  /**
   * 存储各标签内容的高度记录
   */
  heightRecords: Array<number> = [];
  calcHeightTimer: NodeJS.Timeout;
  /**
   * 标记主动滚动到位置
   */
  isScrollTop = false;

  static defaultProps = {
    tabList: [],
    tabBarLineColor: '#50C0FF',
    current: 0,
    animation: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      currentView: 0,
      contentScrollTop: 0,
      contentHeight: {}
    };
  }

  renderItem() {
    const {
      tabList,
      current,
      tabBarItemClass,
      activeClass,
      inActiveClass,
      tabBarLineColor
    } = this.props;
    return tabList.map((item, index) => {
      const style = {
        borderLeftColor: current === index ? tabBarLineColor : '#eeeeee'
      };

      return (
        <View
          key={item.title}
          id={`weui-vtabs-item__${index}`}
          className={classNames('weui-vtabs-bar__item', tabBarItemClass, {
            [activeClass ?? '']: current === index,
            [inActiveClass ?? '']: current !== index
          })}
          data-index={'{{index}}'}
          style={style}
          onClick={this.handleTabClick.bind(this, index)}
        >
          <View
            className={classNames({
              'weui-vtabs-bar__title': true,
              [activeClass ?? '']: current === index
            })}
          >
            <Text className="">{item.title}</Text>
          </View>
        </View>
      );
    });
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child: React.ReactElement) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.type !== VTabsPane) {
        return child;
      }

      return React.createElement(VTabsPane, {
        ...(child.props as any),
        onMount: this.handlePaneMount,
        onUnMount: this.handlePaneUnMount
      });
    });
  }

  render() {
    const { tabBarClass, animation } = this.props;
    const { currentView, contentScrollTop } = this.state;
    return (
      <View className="weui-vtabs">
        <View
          className={classNames({
            'weui-vtabs-bar__wrp': true,
            [tabBarClass ?? '']: true
          })}
        >
          <ScrollView
            scrollY
            className="weui-vtabs-bar__scrollview"
            scrollIntoView={`weui-vtabs-item__${currentView}`}
          >
            <View className="weui-vtabs-bar__content">{this.renderItem()}</View>
          </ScrollView>
        </View>
        <View className="weui-vtabs-content__wrp">
          <ScrollView
            scrollY
            className="weui-vtabs-content__scrollview"
            scrollTop={contentScrollTop}
            scrollWithAnimation={animation}
            onScroll={this.handleContentScroll}
            onScrollToLower={this.handleScrollToLower}
          >
            <View className="weui-vtabs-content">{this.renderChildren()}</View>
          </ScrollView>
        </View>
      </View>
    );
  }

  handlePaneMount = target => {
    // 必须做延时操作才能获取到数据
    setTimeout(() => {
      target.calcHeight(rect => {
        const contentHeight = cloneDeep(this.state.contentHeight);
        contentHeight[target.props.tabIndex] = rect.height;
        this.setState({ contentHeight: contentHeight });

        // 计算子组件高度，防抖动
        if (this.calcHeightTimer) {
          clearTimeout(this.calcHeightTimer);
        }
        this.calcHeightTimer = setTimeout(() => {
          this.calcHeight();
        }, 100);
      });
    }, 100);
  };

  handlePaneUnMount = target => {
    const contentHeight = cloneDeep(this.state.contentHeight);
    delete contentHeight[target.props.tabIndex];
    this.setState({ contentHeight: contentHeight });
  };

  calcHeight = () => {
    const { tabList } = this.props;
    const { contentHeight } = this.state;
    const length = tabList.length;
    const heightRecords: Array<number> = [];
    let temp = 0;
    for (let i = 0; i < length; i++) {
      heightRecords[i] = temp + (contentHeight[i] || 0);
      temp = heightRecords[i];
    }
    this.heightRecords = heightRecords;
  };

  scrollTabBar = (index: number) => {
    const { tabList } = this.props;
    const len = tabList.length;
    if (len === 0) return;
    let currentView = index < 6 ? 0 : index - 5;
    if (currentView >= len) currentView = len - 1;
    this.setState({ currentView: currentView });
  };

  handleTabClick = (index: number, event: CommonEvent) => {
    const contentScrollTop = this.heightRecords[index - 1] || 0;
    this.isScrollTop = true;
    this.props?.onClick(index, event);
    this.setState({
      contentScrollTop: contentScrollTop
    });
  };

  handleContentScroll = (event: CommonEvent) => {
    const { tabList, current } = this.props;
    if (this.heightRecords.length === 0) return;
    let index = 0;
    const length = tabList.length;

    // 微信上获取的scrollTop值和预想的值有偏差，这里做修正
    let scrollTop = event.detail.scrollTop;
    if (this.isScrollTop) {
      scrollTop = this.state.contentScrollTop;
      this.isScrollTop = false;
    }

    if (scrollTop >= this.heightRecords[0]) {
      for (let i = 1; i < length; i++) {
        if (scrollTop >= this.heightRecords[i - 1] && scrollTop < this.heightRecords[i]) {
          index = i;
          break;
        }
      }
    }

    if (index !== current) {
      // this.triggerEvent('change', { index: index });
      this.props?.onClick(index, event);
    }
  };

  /**
   * 监听底部事件，修复Tab无法正常显示最后一页的问题
   *
   * @param event
   */
  handleScrollToLower = (event: CommonEvent) => {
    const { tabList, current } = this.props;
    if (current < tabList.length - 1) {
      this.props?.onClick(tabList.length - 1, event);
    }
  };
}

export default VTabs;
