import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  app,
} from 'fire';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  collection,
  getFirestore,
} from 'firebase/firestore';
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
    collection(getFirestore(app), `users/${user.uid}/basket`),
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
      <OrderCreationForm user={ user } basket={ values } />
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
