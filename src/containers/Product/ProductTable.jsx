import {
  collection,
  getFirestore,
} from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from 'fire';
import { Table } from 'antd';

const ProductTable = () => {
  const [values, loading, error] = useCollectionData(
    collection(getFirestore(app), 'goods'),
  );

  return (
    <Table
      dataSource={ values }
      columns={ [{
        title: 'ФОТО ТОВАРУ',
        dataIndex: 'image',
        // width: 165,
        render: (_, record) => (
          <div
            style={ {
              display: 'flex',
              width: '100px',
              height: '100px',
              alignItems: 'center',
              justifyContent: 'center',
            } }
          >
            <img
              alt={ record.goodsName || 'image' }
              src={ record.imageUrl ? record.imageUrl : undefined }
              style={ {
                maxWidth: '100%',
                maxHeight: '100%',
              } }
            />
          </div>
        ),
      }, {
        title: 'НАЗВА ТОВАРУ',
        dataIndex: 'goodsName',
        // width: 165,
      }, {
        title: 'ЦІНА',
        dataIndex: 'price',
        // width: 165,
      }, {
        title: 'КОД ТОВАРУ',
        dataIndex: 'productCode',
        width: 165,
      }, {
        title: 'ОПИС',
        dataIndex: 'description',
        width: 165,
      }] }
    />
  );
};

export default ProductTable;
