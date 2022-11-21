import React from 'react';
import {
  Button,
  Space,
} from 'antd';
import { Link } from 'react-router-dom';
import links from 'links';

export const RightHeader = () => (
  <div
    style={ {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '100%',
      textAlign: 'right',
      flex: '0 1 auto',
    } }
  >
    <Space>
      <Button type="primary">
        <Link to={ links.signIn }>
          Увійти
        </Link>
      </Button>
      <Button type="primary">
        <Link to={ links.signUp }>
          Зареєструватися
        </Link>
      </Button>
    </Space>
  </div>
);

export default RightHeader;
