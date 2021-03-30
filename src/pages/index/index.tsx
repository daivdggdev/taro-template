import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { WholeState } from '@/types/globals';
import { useSelector, useDispatch } from 'react-redux';
import './index.scss';

const Home: React.FC<{}> = props => {
  console.log('props: ', props);
  const dispatch = useDispatch();
  const [num, setNum] = React.useState<number>(0);
  const app = useSelector((state: WholeState) => state.app);
  const handleClick = () => {
    dispatch({
      type: 'app/updateState',
      payload: { login: !app.login }
    });
  };

  return (
    <View className="index">
      <AtButton className="add_btn" onClick={handleClick}>
        +
      </AtButton>
      {/* <Button className='dec_btn' onClick={this.props.dec}>-</Button>
      <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button> */}
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
