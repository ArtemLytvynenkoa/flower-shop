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

const UsersTable = () => {
  const [values, loading, error] = useCollectionData(
    collection(getFirestore(app), 'users'),
  );
  console.log(values);

  return (
    <Space
      direction="vertical"
      size={ 20 }
      style={ { width: '100%' } }
    >
      <Button type="primary">
        <Link to={ `${links.users}/new` }>
          Додати користувача
        </Link>
      </Button>
      <Table
        dataSource={ values }
        loading={ loading }
        columns={ [{
          title: 'Електронна пошта',
          dataIndex: 'email',
          width: 165,
        }, {
          title: 'Телефон',
          dataIndex: 'phoneNumber',
          width: 165,
        }, {
          title: 'Телефон',
          dataIndex: 'photoUrl',
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
                alt={ record.photoUrl || 'image' }
                src={ record.photoUrl ? record.photoUrl : undefined }
                style={ {
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '50%',
                } }
              />
            </div>
          ),
        }] }
      />
    </Space>
  );
};

export default UsersTable;
