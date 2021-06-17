import React, { useState } from 'react';
import { AtButton } from 'taro-ui';
import { AtButtonProps } from 'taro-ui/types/button.d';
import styles from './index.module.scss';

const ButtonTypes = ['error'];
const isButtonType = (x: any) => ButtonTypes.includes(x);

export type ButtonProps = {
  customtype?: string;
  className?: string;
  beforeIcon?: string;
} & AtButtonProps;

const Button: React.FC<ButtonProps> = props => {
  const [clickLoading, setClickLoading] = useState<boolean>(false);
  const { className, loading, customtype = '' } = props;
  const loadingStatus = clickLoading || loading;

  let cn = className;

  if (customtype && isButtonType(customtype)) {
    cn = className ? `${className} ${styles[customtype]}` : `${styles[customtype]}`;
  }
  //  拦截按钮单击事件，遇到异步方法传入并触发事件时自动进入loading状态
  const onClick = async event => {
    if (clickLoading) {
      return;
    }
    const { onClick } = props;
    if (onClick) {
      const response: Promise<any> | any = onClick(event);
      if (response instanceof Promise) {
        setClickLoading(true);
        try {
          await response;
        } finally {
          setClickLoading(false);
        }
      }
    }
  };

  return (
    <AtButton
      {...props}
      loading={loadingStatus}
      disabled={loadingStatus}
      onClick={onClick}
      className={cn}
    >
      {props.children}
    </AtButton>
  );
};

export default Button;
