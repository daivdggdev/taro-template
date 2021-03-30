/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import Taro from '@tarojs/taro';

interface Props {
  name:
    | 'success'
    | 'yiqianshou'
    | 'yidaohuo'
    | 'yixiadan'
    | 'saoyisao1'
    | 'saoyisao2'
    | 'tubiao-'
    | 'guanbi1'
    | 'dianhua'
    | 'dui'
    | 'right'
    | 'xiugai'
    | 'gougou'
    | 'remen'
    | 'jiantou-2'
    | 'jiantou-1'
    | 'tishi'
    | 'guanbi'
    | 'weixin'
    | 'gouwuche-jia'
    | 'wode-tuijianyoujiang'
    | 'kabao'
    | 'touxiang-logo'
    | 'jinbi-3'
    | 'jinbi-1'
    | 'jinbi-2'
    | 'gengduo'
    | 'yijianfankui'
    | 'wodedingdan'
    | 'paixu1'
    | 'dizhi'
    | 'peisong'
    | 'paixu'
    | 'tongzhi'
    | 'gou'
    | 'test1'
    | 'test2'
    | 'test4'
    | 'test3'
    | 'guanliyuan'
    | 'book'
    | 'growth'
    | 'vip'
    | 'service'
    | 'explain';
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = props => {
  const { name, size, color } = props;

  // @ts-ignore
  return <iconfont name={name} size={parseFloat(Taro.pxTransform(size))} color={color} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
