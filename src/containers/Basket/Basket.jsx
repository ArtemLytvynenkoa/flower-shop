import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  getBasketRef,
} from 'fire';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  message,
  Row,
  Space,
} from 'antd';
import { LoadingIndicator } from 'components';
import { Navigate } from 'react-router-dom';
import links from 'links';
import BasketGoodsCard from './BasketGoodsCard';
import OrderCreationForm from './OrderCreationForm';

const Basket = () => {
  const [user, isLoading] = useAuthState(auth);
  const [values, loading, error] = useCollectionData(
    getBasketRef(user.uid),
  );

  if (isLoading || loading) {
    return <LoadingIndicator />;
  }

  if (values.length === 0) {
    message.warning('Корзина пуста!');

    return <Navigate to={ links.main } />;
  }

  return (
    <Space
      direction="vertical"
      style={ {
        width: '100%',
        textAlign: 'center',
      } }
    >
      <OrderCreationForm basket={ values } />
      <Row
        gutter={ [16, 16] }
        style={ {
          textAlign: 'center',
          padding: '20px',
        } }
      >
        { values?.map(good => <BasketGoodsCard key={ good?.id } good={ good } />) }
      </Row>
    </Space>
  );
};

export default Basket;
