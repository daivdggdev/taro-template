import React from 'react';
import { AtCard } from 'taro-ui';
import { AtCardProps } from 'taro-ui/types/card.d';

export type CardProps = AtCardProps;

const Card: React.FC<CardProps> = props => {
  return <AtCard {...props}>{props.children}</AtCard>;
};

export default Card;
