import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';
import { LdButton, LdIcon } from '..';
import classNames from 'classnames';

export interface ConfirmModalProps {
  title?: string;
  content?: string;
  visible: boolean;
  loading?: boolean;
  onOk?: Function;
  onCancel?: Function;
  btnTitle?: string;
  btnCustomtype?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = props => {
  const { title, content, visible, onOk, onCancel, btnTitle, loading, btnCustomtype } = props;
  return (
    <View
      className={classNames(
        styles['at-float-layout'],
        visible ? styles['at-float-layout--active'] : ''
      )}
    >
      <View className={styles['at-float-layout__overlay']} onClick={onCancel as any}></View>
      <View className={styles['at-float-layout__container']}>
        <View className={styles.header}>
          <LdIcon value="close" size="20" color="#333" onClick={onCancel as any} />
        </View>
        <View className={styles.body}>
          <View className={styles.title}>{title}</View>
          <View className={styles.content}>{content}</View>
          <LdButton
            onClick={onOk as any}
            type="primary"
            customtype={btnCustomtype}
            loading={loading}
          >
            {btnTitle}
          </LdButton>
        </View>
      </View>
    </View>
  );
};

export default ConfirmModal;
