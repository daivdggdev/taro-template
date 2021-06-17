import React, { ComponentClass, PureComponent } from 'react';
import { View, Text, Image } from '@tarojs/components';
import { LdButton, LdFloatLayout, LdIcon } from '@/components/Library';
import styles from './index.module.scss';
import GWC from '@/assets/TabBarImage/gouwuche.png';
import GoodsItem from '@/components/GoodsItem';
import { AtBadge } from 'taro-ui';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import kongGWC from '@/assets/images/kongGWC.png';
import Toast from '../Toast';

type Props = {
  /**
   * 展示购物车回调
   */
  onOpenCart?: Function;
  /**
   * 购物车商品数量修改
   */
  onChangeNumber: Function;
  /**
   * item点击事件
   */
  onItemClick: Function;
  /**
   * 清空购物车
   */
  onEmpty: Function;
  /**
   * 提交订单
   */
  onSubmit: Function;
  /**
   * 购物车数据
   */
  data: any;
};

type State = {
  isOpened: boolean;
};

interface GoodsFooter {
  props: Props;
}

class GoodsFooter extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false
    };
  }

  async componentDidMount() {}

  renderEmpty() {
    return (
      <View className={styles.empty}>
        <Image src={kongGWC} className={styles.emptyImage} mode="aspectFit" />
        您的购物车空空如也哦~
      </View>
    );
  }

  renderCart() {
    const {
      data: { carList }
    } = this.props;
    if (isEmpty(carList) || !carList) return this.renderEmpty();

    return (
      <View className={styles.center}>
        {carList.map((item, index) => (
          <GoodsItem
            id={item.id}
            key={index}
            image={item.goodsImage}
            name={item.goodsName}
            specification={item.groupName}
            price={item.price?.toFixed?.(2) ?? item.price}
            originPrice={item.originPrice?.toFixed?.(2) ?? item.priginPrice}
            count={item.quantity}
            data={item}
            invalidStatus={item.invalidStatus}
            handleInputNumber={this.handleInputNumber}
            onItemClick={() => this.onItemClick(item)}
          />
        ))}
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <View className={styles.footer}>
        <View className={styles.btnBox}>
          <View className={styles.shoppingBox}>
            <View className={styles.shoppingTrolley} onClick={this.openCart}>
              {data.quantity ? (
                <AtBadge value={data.quantity} maxValue={99}>
                  <Image src={GWC} className={styles.cart} mode="widthFix" />
                </AtBadge>
              ) : (
                <Image src={GWC} className={styles.cart} mode="widthFix" />
              )}
            </View>
            <Text className={styles.shoppingPrice}>￥{data.amount?.toFixed(2)}</Text>
          </View>
          <LdButton className={classNames(styles.btn)} onClick={this.submit}>
            提交订单
          </LdButton>
        </View>
        <LdFloatLayout isOpened={this.state.isOpened} scrollY={false} onClose={this.closeModal}>
          <View className={styles.body}>
            <View className={styles.header}>
              <Text>已选商品</Text>
              <View className={styles.trashBox} onClick={this.onEmpty}>
                <LdIcon value="trash" size="14" />
                <Text>清空</Text>
              </View>
            </View>
            {this.renderCart()}
          </View>
        </LdFloatLayout>
      </View>
    );
  }

  // 显示
  openCart = async () => {
    await this.props.onOpenCart?.();

    this.setState({
      isOpened: true
    });
  };

  closeModal = () => {
    this.setState({
      isOpened: false
    });
  };

  // 提交
  submit = () => {
    this.props?.onSubmit?.();
  };

  // 修改数量
  handleInputNumber = (item, val) => {
    this.props?.onChangeNumber?.(item, val, 'update');
  };

  // 清空
  onEmpty = () => {
    this.props?.onEmpty?.();
  };

  // item点击事件
  onItemClick = item => {
    if (item.invalidStatus) {
      Toast.show({ title: '商品已失效' });
      return;
    }
    this.props?.onItemClick?.(item.goodsId);
  };
}

export default GoodsFooter as ComponentClass<Props, State>;
