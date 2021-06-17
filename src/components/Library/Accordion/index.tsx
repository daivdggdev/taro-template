import React from 'react';
import { AtAccordion } from 'taro-ui';
import { AtAccordionProps } from 'taro-ui/types/accordion';

export type AvatarProps = AtAccordionProps;

const Accordion: React.FC<AvatarProps> = props => {
  return <AtAccordion {...props}>{props.children}</AtAccordion>;
};

export default Accordion;
