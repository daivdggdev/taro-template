import React from 'react';
import { AtCountdown } from 'taro-ui';
import { AtCountDownProps } from 'taro-ui/types/countdown';

export type CountDownProps = AtCountDownProps;

/**
 * 修复AtCountdown清空定时器没有赋空值的bug
 */
AtCountdown.prototype.clearTimer = function() {
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
};

const Countdown: React.FC<AtCountDownProps> = props => {
  return <AtCountdown {...props}>{props.children}</AtCountdown>;
};

export default Countdown;
