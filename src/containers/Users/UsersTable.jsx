import {
  collection,
  getFirestore,
} from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from 'fire';
import {
  Avatar,
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
          title: 'Аватар',
          dataIndex: 'photoURL',
          width: 165,
          render: (_, record) => (
            <Avatar
              size={ 50 }
              src={ record?.photoURL?.url }
            >
              { (!record?.photoURL?.url && record?.userName)
                ? (`${record.userName}`)
                : null }
            </Avatar>
          ),
        }, {
          title: 'Ім`я користувача',
          dataIndex: 'userName',
          width: 165,
        }, {
          title: 'Електронна пошта',
          dataIndex: 'email',
          width: 165,
        }, {
          title: 'Телефон',
          dataIndex: 'phoneNumber',
          width: 165,
        }] }
      />
    </Space>
  );
};

export default UsersTable;
