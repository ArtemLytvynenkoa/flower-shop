import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  auth,
  ordersRef,
} from 'fire';
import {
  Space,
  Table,
  Tag,
} from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment-timezone';

const OrdersTable = () => {
  const [user, isUserLoading] = useAuthState(auth);
  const [values, loading, error] = useCollectionData(
    ordersRef,
  );

  return (
    <Space
      direction="vertical"
      size={ 20 }
      style={ { width: '100%' } }
    >
      <Table
        dataSource={ values }
        loading={ loading || isUserLoading }
        scroll={ { y: 'calc(100vh - 15rem)' } }
        columns={ [{
          title: 'Order ID',
          dataIndex: 'orderId',
          width: 165,
        }, {
          title: 'User ID',
          dataIndex: 'userId',
          width: 165,
        }, {
          title: 'Ціна Замовлення',
          dataIndex: 'orderPrice',
          width: 165,
        }, {
          title: 'Статус Замовлення',
          dataIndex: 'status',
          width: 165,
        }, {
          title: 'Дата Замовлення',
          dataIndex: 'orderCreationDate',
          width: 165,
          render: value => (
            <div>
              { moment(Number(value)).format('DD/MM/YYYY') }
            </div>
          ),
        }, {
          title: 'Замовлені Товари',
          dataIndex: 'goods',
          width: 165,
          render: (_, record) => (
            <Space
              style={ { width: '100%' } }
            >
              { record.goods.map((item, index) => (
                <Tag
                  // eslint-disable-next-line react/no-array-index-key
                  key={ `${record.orderId}${index}` }
                  color={ (index % 2) ? 'rgb(41, 55, 70)' : undefined }
                >
                  <Space direction="vertical">
                    { `Код товару: ${item.productCode}` }
                    { `Назва товару: ${item.goodsName}` }
                  </Space>
                </Tag>
              )) }
            </Space>
          ),
        }] }
      />
    </Space>
  );
};

export default OrdersTable;
