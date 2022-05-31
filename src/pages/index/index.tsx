import React, { useCallback } from 'react';
import { Image, View, Text } from '@tarojs/components';
import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';
import { Button } from '@antmjs/vantui';
import { WholeState } from '@/types/globals';
import { useSelector, useDispatch } from 'react-redux';
import { usePersistFn } from 'ahooks';
import logo from './hook.png';
import styles from './index.module.scss';
import { ScreenContainer } from '@/components';

const Home: React.FC<{}> = props => {
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: 'Taro Hooks' });
  const dispatch = useDispatch();
  const [num, setNum] = React.useState<number>(0);
  const app = useSelector((state: WholeState) => state.app);
  console.log('app: ', app);
  const handleClick = usePersistFn(() => {
    dispatch({
      type: 'app/updateState',
      payload: { login: !app.login }
    });
  });

  const [show] = useModal({
    title: 'Taro Hooks!',
    showCancel: false,
    confirmColor: '#8c2de9',
    confirmText: '支持一下',
    mask: true
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: '不如给一个star⭐️!' }).then(() => {
      showToast({ title: '点击了支持!' });
    });
  }, [show, showToast]);

  return (
    <ScreenContainer>
      <View className={styles.wrapper}>
        <Image className={styles.logo} src={logo} />
        <Text className={styles.title}>为Taro而设计的Hooks Library</Text>
        <Text className={styles.desc}>
          目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks! 并结合ahook适配Taro!
        </Text>
        <View className={styles.list}>
          <Text className={styles.label}>运行环境</Text>
          <Text className={styles.note}>{env}</Text>
        </View>
        <Button className={styles.button} onClick={() => setTitle('Taro Hooks Nice!')}>
          设置标题
        </Button>
        <Button className={styles.button} onClick={handleModal}>
          使用Modal
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default Home;
