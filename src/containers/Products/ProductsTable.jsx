import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { goodsRef } from 'fire';
import {
  Button,
  Space,
  Table,
} from 'antd';
import links from 'links';
import { Link } from 'react-router-dom';

const ProductsTable = () => {
  const [values, loading, error] = useCollectionData(
    goodsRef,
  );

  return (
    <Space
      direction="vertical"
      size={ 20 }
      style={ { width: '100%' } }
    >
      <Button type="primary">
        <Link to={ `${links.goods}/new` }>
          Завантажити новий товар
        </Link>
      </Button>
      <Table
        dataSource={ values }
        loading={ loading }
        columns={ [{
          title: 'ФОТО ТОВАРУ',
          dataIndex: 'image',
          width: 165,
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
                alt={ record.image.name || 'image' }
                src={ record?.image?.url }
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
          width: 165,
        }, {
          title: 'ЦІНА',
          dataIndex: 'price',
          width: 165,
        }, {
          title: 'КОД ТОВАРУ',
          dataIndex: 'productCode',
          width: 165,
        }, {
          title: 'ОПИС',
          dataIndex: 'description',
          width: 165,
        }, {
          render: (_, record) => (
            <div
              style={ { textAlign: 'center' } }
            >
              <Button
                type="primary"
              >
                <Link to={ `${links.goods}/${record.id}` } replace>
                  Редагувати
                </Link>
              </Button>
            </div>
          ),
          width: 165,
        }] }
      />
    </Space>
  );
};

export default ProductsTable;
