import {
  collection,
  getFirestore,
} from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from 'fire';
import {
  Button,
  Space,
  Table,
} from 'antd';
import links from 'links';
import { Link } from 'react-router-dom';

const OrdersTable = () => {
  const [values, loading, error] = useCollectionData(
    collection(getFirestore(app), 'orders'),
  );

  return (
    <Space
      direction="vertical"
      size={ 20 }
      style={ { width: '100%' } }
    >
      <Button type="primary">
        <Link to={ `${links.orders}/new` }>
          Створити нове замовлення
        </Link>
      </Button>
      <Table
        dataSource={ values }
        loading={ loading }
      />
    </Space>
  );
};

export default OrdersTable;
