import { View, PickerView, PickerViewColumn, Button } from '@tarojs/components';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isEmpty } from 'lodash';
import format from './format';
import './index.scss';
import React, { Component } from 'react';

dayjs.extend(customParseFormat);

type TimeProps = {
  /**
   * unit: 界面中的日期标记，例如年，月，日，时，分，秒
   */
  unit?: string;
  /**
   * start: mode为year和day下可用，可以指定过去的某一年/天，也可以指定将来的某一年/天
   */
  start?: string;
  /**
   *  duration: 显示当前模式的最大数量例如30 = 30天
   */
  duration?: any;
  /**
   *  fields: 可指定当前模式中间隔固定时间间断进行显示，例如只显示10秒、20秒、30秒
   */
  fields?: number;
  /**
   *  format: 用于解决组合时间的格式化问题，例如'M月D日'，或者'8:00'
   */
  format?: string;
  /**
   * selected: 可指定当前模式下只选择有效范围内的哪几个元素，例如24小时内，只选择8点、12点、16点
   */
  selected?: any;
  /**
   *humanity：目前只支持mode为day，可显示类似微信提醒的时间选择列表，如今天，明天 XX月XX日， XX月XX日 周X, 需搭配format: 'M月D日'使用
   */
  humanity?: boolean;
};

type Props = {
  /**
   * 指定onInitial和onConfirm时返回的日期格式
   */
  mode: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'format';
  /**
   * 传入需要显示的时间模式
   */
  dateTime: Array<TimeProps>;
  /**
   * 组件加载时触发，通知父组件初始化时本组件的时间选择结果(由于初始化为当前时间可能为下一个时间周期例如使用fields、selected等参数，故本操作可把初始化时间直接传给父组件用于展示)
   */
  onInitial: Function;
  /**
   * 点击确认时触发，传递参数为选择器当前选择的时间(dayjs格式)
   */
  onConfirm: Function;
  /**
   * 点击取消时触发，可被父组件用于触发弹框隐藏之类的操作
   */
  onCancel: Function;
};

type State = {
  value: any;
  source: any;
  selected: any;
  tiemValue: any;
};

class PickerTime extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: [],
      source: { value: [], item: [] },
      selected: [],
      tiemValue: ''
    };
  }

  componentWillMount = () => {
    const { dateTime } = this.props;
    const source = (dateTime && format(dateTime, dayjs())) || { value: [], item: [] };
    this.setState({ source, selected: dateTime });
  };

  componentDidMount = () => {
    this.onInitial();
  };

  render() {
    const { source, value } = this.state;
    return (
      <View className="picker-page">
        <PickerView
          indicator-style="height: 50px;"
          value={!isEmpty(value) ? value : source.value}
          onChange={this.onChange}
          style={{ width: source.item.length < 4 ? '80%' : '100%' }}
        >
          {source.item.map((item, index) => {
            return (
              <PickerViewColumn key={index}>
                {item.map(time => {
                  return <View key={time}>{time}</View>;
                })}
              </PickerViewColumn>
            );
          })}
        </PickerView>
        <View className="handle">
          <Button className="cancel" type="default" size="default" onClick={this.onCancel}>
            取消
          </Button>
          <Button className="confirm" type="primary" size="default" onClick={this.onConfirm}>
            确定
          </Button>
        </View>
      </View>
    );
  }

  // 用法
  // render() {
  //   const dateTime = [
  //     // {mode: 'year', unit: '年', start: '2020'},
  //     // {mode: 'month', unit: '月'},
  //     // { mode: 'day', duration: 30, unit: '日', humanity: true, format: 'M月D日' },
  //     { mode: 'day', start: '21', humanity: true, duration: 7, unit: '日' },
  //     { mode: 'hour', unit: ':00', format: 'H:s', selected: [8, 12, 16] },
  //     // { mode: 'hour', unit: ':00' },
  //     // { mode: 'minute', fields: 10, unit: '分' },
  //     // {mode: 'second', fields: 30, unit: '秒'},
  //   ];
  //   return (
  //     <View className={classNames(styles.container)}>
  //       <CustomPicker
  //         dateTime={dateTime}
  //         onInitial={this.handleInitial}
  //         mode="format"
  //         onConfirm={this.handleConfirm}
  //         onCancel={this.handleCancel}
  //       />
  //     </View>
  //   );
  // }

  onChange = e => {
    this.setState({ value: e.detail.value });
  };

  onInitial = () => {
    const { onInitial, mode } = this.props;
    onInitial && onInitial(this.getDayjs(mode));
  };

  onConfirm = () => {
    const { onConfirm, mode } = this.props;
    onConfirm && onConfirm(this.getDayjs(mode), this.state.tiemValue);
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel && onCancel();
  };

  getDayjs = (mode = 'unix') => {
    let { value, source, selected: dateTime } = this.state;
    if (value.length === 0) value = [...source.value];
    let time = '',
      token = '',
      tiemValue = '';
    for (let i = 0; i < dateTime.length; i++) {
      const select = source.item[i][value[i]];
      time += (select === '今天' ? dayjs().format('M月D日') : select) + '-';
      token += (dateTime[i].format || this.getToken(dateTime[i].mode)) + '-';
      tiemValue += select || '';
    }

    this.setState({
      tiemValue
    });
    return dayjs(time, token)[mode]();
  };

  getToken = mode => {
    return {
      year: 'YYYY',
      month: 'MM',
      day: 'DD',
      hour: 'HH',
      minute: 'mm',
      second: 'ss'
    }[mode];
  };
}

export default PickerTime;
