import React from 'react';
import { AtSearchBar } from 'taro-ui';
import { AtSearchBarProps } from 'taro-ui/types/search-bar.d';
import Taro from '@tarojs/taro';

export type SearchBarProps = AtSearchBarProps;

const SearchBar: React.FC<SearchBarProps> = props => {
  return <AtSearchBar {...props}>{props.children}</AtSearchBar>;
};

export default SearchBar;
