// import SortButton from '@/components/SortButton';

import { Text, View } from '@tarojs/components';
import classNames from 'classnames';
import React, { ComponentClass, PureComponent } from 'react';
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui';

import styles from './index.module.scss';

import { LdAccordion } from '@/components/Library';
import { isEmpty, isFunction } from 'lodash';

export type ListRenderItem = () => React.ReactElement | null;
type Props = {
  /**
   * 展开或收起
   */
  open: any;
  /**
   * 筛选框内容
   */
  data: {
    /**
     * 筛选名称
     */
    title: string;
    /**
     * 筛选内容类型 'tabs' | 'list'
     */
    type?: string;
    // 选择
    check: string | number;
    /**
     * id
     */
    id: number;
    /**
     * 筛选框内容 如果type为tabs 这里放的是tabsTitle
     */
    children?: {
      value?: string;
      title?: string;
      id: number | string;
    }[];
  }[];
  /**
   * 元素的高度
   */
  height?: string;
  /**
   * tabs内容数据,type为tabs时可用
   */
  tabData?: any[];
  /**
   * 点击切换筛选按钮的回调
   */
  handleClick?: (val: object) => void;
  /**
   * s筛选内容为tabs时，切换title的回调
   */
  handleTabsClick?: (val: number) => void;
  /**
   * 点击内容的回调
   */
  handlePaneListClick: (val: object) => void;
  /**
   * 是否显示遮罩的回调
   */
  handleMarkShow?: (val: boolean) => void;
  /**
   * 自定义展示回调
   */
  renderItem?: ListRenderItem;
  /**
   * 二级分类索引
   */
  reTabsCurrent: number;
  /**
   * 三级分类Id
   */
  sortId: number | string;
  /**
   * 三级分类Id
   */
  classifications: string | number;
};

type State = {
  /**
   * tab当前选中项
   */
  // current: number;
  /**
   * 当前选中item
   */
  checkItem: number;
};

interface Filtrate {
  props: Props;
}

class Filtrate extends PureComponent<Props, State> {
  page = 0;

  constructor(props) {
    super(props);
    this.state = {
      // current: 0,
      checkItem: -1
    };
  }

  renderTabs(tablist) {
    const { tabData, classifications, reTabsCurrent } = this.props;
    if (isEmpty(tabData) || !tabData) return null;
    return (
      <AtTabs
        current={reTabsCurrent}
        scroll
        height="176px"
        tabDirection="vertical"
        tabList={tablist}
        onClick={this.handleTabsClick}
      >
        {tablist?.map?.((item, index) => (
          <AtTabsPane tabDirection="vertical" current={reTabsCurrent} index={index} key={index}>
            {tabData.map((e, i) => (
              <View
                className={styles.paneCenter}
                onClick={() => this.handlePaneListClick(e)}
                key={i}
              >
                <Text className={classNames({ foo: classifications === e.id })}>{e.value}</Text>
                {classifications === e.id ? (
                  <AtIcon value="check" size="18" color="#50C0FF"></AtIcon>
                ) : (
                  ''
                )}
              </View>
            ))}
          </AtTabsPane>
        ))}
      </AtTabs>
    );
  }

  renderRange() {
    const { renderItem } = this.props;
    if (!isFunction(renderItem)) {
      console.error('renderItem is must function');
      return null;
    }

    return renderItem();
  }

  renderList(list) {
    const { sortId } = this.props;
    if (isEmpty(list) || !list) return null;
    return (
      <View className={styles.list}>
        {list?.map?.((e, i) => (
          <View className={styles.paneCenter} onClick={() => this.handlePaneListClick(e)} key={i}>
            <Text>{e.value}</Text>
            {sortId === e.id ? <AtIcon value="check" size="18" color="#50C0FF"></AtIcon> : ''}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { data, height } = this.props;

    if (isEmpty(data) || !data) return null;

    return (
      <View className={styles.box} style={{ height: height }}>
        {data.map(item => {
          let cpt: any = '';
          switch (item.type) {
            case 'tabs':
              cpt = this.renderTabs(item.children || []);
              break;
            case 'list':
              cpt = this.renderList(item.children || []);
              break;
            case 'range':
              cpt = this.renderRange();
              break;
          }
          return (
            <LdAccordion
              open={this.props.open === item.id}
              isAnimation={false}
              onClick={() => this.handleClick(item)}
              title={item.title}
              hasBorder={false}
              key={item.id}
              className={classNames(styles.accordion, {
                [styles.activeAccordion]: this.props.open === item.id,
                [styles.activeAccordion]: item.check
              })}
            >
              <View className={styles.headerCenter}>
                {this.props.open === item.id ? <View className={styles.centerBox}>{cpt}</View> : ''}
              </View>
            </LdAccordion>
          );
        })}
      </View>
    );
  }
  // 切换筛选
  handleClick = item => {
    this.setState({
      // current: 0,
      checkItem: -1
    });
    this.props?.handleMarkShow?.(item.id === this.props.open ? -1 : item.id);
    this.props?.handleClick?.(item);
  };
  // 切换tabs
  handleTabsClick = e => {
    this.setState({
      // current: e,
    });
    this.props?.handleTabsClick?.(e);
  };

  // tabsItem点击
  handlePaneListClick = item => {
    this.setState({
      checkItem: item.id === this.state.checkItem ? -1 : item.id
    });
    this.props?.handlePaneListClick(item);
  };
}

export default Filtrate as ComponentClass<Props, State>;
