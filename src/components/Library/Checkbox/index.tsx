import React from 'react';
import { AtCheckbox } from 'taro-ui';
import { AtCheckboxProps as Props } from 'taro-ui/types/checkbox.d';

export type AtCheckboxProps = Props<any>;

const Checkbox: React.FC<AtCheckboxProps> = props => {
  return <AtCheckbox {...props}>{props.children}</AtCheckbox>;
};

export default Checkbox;
