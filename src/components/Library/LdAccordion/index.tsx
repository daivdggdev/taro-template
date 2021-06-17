import React, { PureComponent } from 'react';
import { View } from '@tarojs/components';
import { AtAccordion } from 'taro-ui';
import { LdButton } from '@/components/Library';
import styles from './index.module.scss';
import classNames from 'classnames';
import { isEmpty, cloneDeep, isEqual } from 'lodash';

type ChildrenType = {
  id: string | number;
  value: string;
  selected: boolean;
};

type DataType = {
  /**
   * 标题
   */
  title: string;
  /**
   * 标识
   */
  openName: string;
  /**
   * 筛选内容
   */
  children?: Array<ChildrenType>;
  /**
   * 当前标记
   */
  selected?: any;
};

type Props = {
  /**
   * 筛选组件的数据
   */
  data: Array<DataType>;
  /**
   * 是否显示动画效果
   */
  isAnimation?: boolean;
  /**
   * mark的高度，如果动画为true，需要外部传入高度，
   */
  markHeighe?: string;
  /**
   * 筛选内容的高度，如果动画为true 则必填
   */
  centerHeight?: string;
  /**
   * 是否需要遮罩
   */
  mark?: boolean;
  /**
   * 点击筛选tabs列表的回调
   */
  onTitleList?: Function;
  /**
   * 点击确定的回调
   */
  onOk: (list: Array<number>) => void;
};

type State = {
  open: string;
  mark: boolean;
  selectIds: any[];
  data: any;
};

interface Screen {
  props: Props;
}

class Screen extends PureComponent<Props, State> {
  static defaultProps = {
    markHeighe: '70%',
    mark: true,
    isAnimation: false
  };

  constructor(props) {
    super(props);
    this.state = {
      open: '',
      mark: false,
      selectIds: [],
      data: []
    };
  }

  static getDerivedStateFromProps(props: Props, _state: State) {
    const { data } = props;
    const newData = {} as State;
    // 循环数据
    if (!isEqual(data, _state.data)) {
      for (let i = 0; i < data.length; i++) {
        // 如果有默认选中项，则根据默认选中想，改变数组内选中的子元素
        if (data[i].selected && !isEmpty(data[i].selected)) {
          const { selected, children = [] as any } = data[i];
          for (let i = 0; i < children.length; i++) {
            for (let j = 0; j < selected.length; j++) {
              if (selected[j] === children[i].id) {
                children[i].selected = true;
              }
            }
          }
        }
      }
    }
    newData.data = data;
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    });
  }

  render() {
    const { markHeighe, isAnimation, centerHeight } = this.props;
    const { mark } = this.state;
    const { data } = this.state;

    // const list = [
    //   {
    //     title: '标题一',
    //     openName: 'open1',
    //     content: '1111111111',
    //     children: [
    //       {
    //         value: '分类名称',
    //         id: 1,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 2,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 3,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 4,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 5,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 6,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 7,
    //         selected: false,
    //       },
    //       {
    //         value: '分类名称',
    //         id: 8,
    //         selected: false,
    //       },
    //     ],
    //     selected: [1, 4, 6],
    //   },
    //   {
    //     title: '标题二',
    //     openName: 'open2',
    //     children: [
    //       {
    //         value: '分类',
    //         id: 1,
    //         selected: false,
    //       },
    //       {
    //         value: '分类',
    //         id: 2,
    //         selected: false,
    //       },
    //       {
    //         value: '分类',
    //         id: 3,
    //         selected: false,
    //       },
    //       {
    //         value: '分类',
    //         id: 4,
    //         selected: false,
    //       },
    //       {
    //         value: '分类',
    //         id: 5,
    //         selected: false,
    //       },
    //       {
    //         value: '分类',
    //         id: 6,
    //         selected: false,
    //       },
    //       {
    //         value: '分类',
    //         selected: false,
    //         id: 7,
    //       },
    //       {
    //         value: '分类',
    //         id: 8,
    //         selected: false,
    //       },
    //     ],
    //   },
    //   {
    //     title: '标题三',
    //     openName: 'open3',
    //   },
    // ];

    return (
      <View className={styles.page}>
        <View className={styles.header}>
          {data.map((item, index) => (
            <AtAccordion
              key={index}
              isAnimation={isAnimation}
              open={this.state.open === item.openName}
              className={styles.accordion}
              onClick={() => this.handleClick(item)}
              title={item.title}
            >
              <View className={styles.headerCenter} style={{ height: centerHeight }}>
                <View className={styles.centerBox}>
                  {item.children && !isEmpty(item.children)
                    ? item.children.map(el => (
                        <View
                          onClick={() => this.handleClassBtn(item, el)}
                          className={classNames(styles.classBtn, {
                            [styles.selectBtn]: el.selected
                          })}
                        >
                          {el.value}
                        </View>
                      ))
                    : ''}
                </View>
                <View className={styles.centerBtn}>
                  <LdButton className={styles.btn} onClick={this.handleClose}>
                    取消
                  </LdButton>
                  <LdButton className={classNames(styles.btn, styles.btn1)} onClick={this.handleOk}>
                    确定
                  </LdButton>
                </View>
              </View>
            </AtAccordion>
          ))}
          {/* <AtAccordion open={this.state.open} onClick={this.handleClick} title="标题二"></AtAccordion>
        <AtAccordion open={this.state.open} onClick={this.handleClick} title="标题三"></AtAccordion> */}
        </View>
        {this.props.mark && mark ? (
          <View
            className={styles.mark}
            style={{ height: markHeighe }}
            onClick={this.handleClose}
          ></View>
        ) : (
          ''
        )}
      </View>
    );
  }

  handleClick = item => {
    const data = cloneDeep(this.state.data);
    // 下标
    let index = -1;

    const selectedData = data.find((e, i) => {
      if (e.openName === this.state.open) {
        index = i;
        return e;
      }
    });
    if (selectedData) {
      const ids: any = [];
      selectedData.children?.map(el => {
        if (el.selected) {
          ids.push(el.id);
        }
      });
      selectedData.selected = ids;
      data.splice(index, 1, selectedData);
    }

    this.setState({
      open: item.openName === this.state.open ? '' : item.openName,
      mark: item.openName !== this.state.open,
      data
    });
  };

  handleClose = () => {
    this.setState({
      open: '',
      mark: false
    });
  };

  handleOk = () => {
    const { selectIds } = this.state;
    this.props?.onOk(selectIds);
    this.handleClose();
  };

  // 分类按钮
  handleClassBtn = (superiors, item) => {
    const data = cloneDeep(this.state.data);

    for (let i = 0; i < data.length; i++) {
      if (data[i].openName === superiors.openName) {
        const { children } = data[i];
        if (children && !isEmpty(children)) {
          children.forEach(el => {
            if (el.id === item.id) {
              el.selected = !el.selected;
            }
          });
        }
      }
    }
    this.setState({
      data
    });
  };
}

export default Screen;
