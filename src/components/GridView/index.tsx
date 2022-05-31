import React, { ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import { View } from '@tarojs/components';

interface Props extends ComponentProps<any> {
  numberOfALine?: number;
  hspace?: number;
  vspace?: number;
  children: React.ReactElement[];
}

const GridView: React.FC<Props> = ({
  className,
  numberOfALine = 4,
  hspace = 4,
  vspace = 8,
  children,
  ...props
}) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) {
      throw new Error('invalid element');
    }

    const bgStyle = {
      marginLeft: index % numberOfALine === 0 ? 0 : `${hspace}%`,
      marginTop: index / numberOfALine < 1 ? 0 : `${vspace}%`,
      width: `${(100 - (numberOfALine - 1) * hspace) / numberOfALine}%`
    };

    return React.cloneElement(child, {
      style: bgStyle
    });
  });

  return (
    <View className={classNames(styles.layout, className)} {...props}>
      {childrenWithProps}
    </View>
  );
};

export default GridView;
