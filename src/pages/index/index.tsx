import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { WholeState } from '@/types/globals';
import { useSelector, useDispatch } from 'react-redux';
import { usePersistFn } from 'ahooks';
import './index.scss';

const Home: React.FC<{}> = props => {
  const dispatch = useDispatch();
  const [num, setNum] = React.useState<number>(0);
  const app = useSelector((state: WholeState) => state.app);
  const handleClick = usePersistFn(() => {
    dispatch({
      type: 'app/updateState',
      payload: { login: !app.login }
    });
  });

  return (
    <View className="index">
      <AtButton className="add_btn" onClick={handleClick}>
        +
      </AtButton>
      <View>
        <Text>{num}</Text>
      </View>
      <View>
        <Text>Hello, World</Text>
      </View>
    </View>
  );
};

export default Home;
