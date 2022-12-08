/* eslint-disable react/prop-types */
import {
  doc,
  getFirestore,
} from 'firebase/firestore';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
  app,
  auth,
} from 'fire';
import {
  Button,
  Col,
  Image,
  Space,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import links from 'links';

const { Text } = Typography;

const GoodsCard = ({ good }) => {
  const [value, loading, error] = useDocument(
    doc(getFirestore(app), 'goods', good.id),
  );

  const [user, isUserLoading] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <Col flex="1">
      <Space direction="vertical">
        <Image
          style={ { objectFit: 'contain' } }
          alt={ good.image.name }
          src={ good.image.url || undefined }
          preview
          width="500px"
          height="500px"
        />
        <Text>{ good.goodsName }</Text>
        <Text>
          { good.price }
          ₴
        </Text>
        <Text>{ good.productCode }</Text>
        <Text>{ good.description }</Text>
        <Button
          type="primary"
          onClick={ async () => {
            if (!user) {
              navigate(links.signIn);
            }
            // else {
            //   try {
            //     setOrder();
            //   } catch (error) {

            //   }
            // }
          } }
        >
          Додати в корзину
        </Button>
      </Space>
    </Col>
  );
};

export default GoodsCard;
