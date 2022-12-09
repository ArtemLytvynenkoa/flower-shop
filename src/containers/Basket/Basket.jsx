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
  Button,
  Row, Space,
} from 'antd';
import { LoadingIndicator } from 'components';
import BasketGoodsCard from './BasketGoodsCard';

const Basket = () => {
  const [user, isLoading] = useAuthState(auth);
  const [values, loading, error] = useCollectionData(
    collection(getFirestore(app), `users/${user.uid}/basket`),
  );

  if (isLoading || loading) {
    return <LoadingIndicator />;
  }

  return (
    <Space
      direction="vertical"
      style={ {
        width: '100%',
        textAlign: 'center',
      } }
    >
      <Button
        type="primary"
      >
        Зробити замовлення
      </Button>
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
