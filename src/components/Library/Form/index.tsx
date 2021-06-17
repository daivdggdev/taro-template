import React from 'react';
import { AtForm } from 'taro-ui';
import { AtFormProps } from 'taro-ui/types/form.d';

export type FormProps = AtFormProps;

const Form: React.FC<FormProps> = props => {
  return <AtForm {...props}>{props.children}</AtForm>;
};

export default Form;
