import React, { ComponentClass, PureComponent } from 'react';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import { WholeState } from '@/types/globals';
import { DispatchProp } from '@/types/dva';
import { connect } from 'react-redux';
import './index.scss';

const mapStateToProps = ({ app, loading }: WholeState) => ({
  login: app.login,
  loading: loading.effects['app/login'],
});

type StateProps = ReturnType<typeof mapStateToProps>;
type OwnProps = {};
type Props = DispatchProp & StateProps & OwnProps;

type State = {};

interface Index {
  props: Props;
}

@connect(mapStateToProps)
class Index extends PureComponent<Props, State> {
  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <AtButton className="add_btn" onClick={this.onClick}>
          +
        </AtButton>
        {/* <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button> */}
        <View>
          <Text>{1}</Text>
        </View>
        <View>
          <Text>Hello, World</Text>
        </View>
      </View>
    );
  }

  onClick = () => {
    this.props.dispatch({
      type: 'app/login',
    });
  };
}

export default Index as ComponentClass<OwnProps, State>;
