/* eslint-disable react/prop-types */
import React from 'react';
import {
  auth,
  addingGoodToUsersBasket,
} from 'fire';
import {
  Button,
  Col,
  Image,
  message,
  Space,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import links from 'links';

const { Text } = Typography;

const GoodsCard = ({ good }) => {
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
            } else {
              try {
                addingGoodToUsersBasket(
                  {
                    ...good,
                    uid: user.uid,
                    quantity: 1,
                    fullPrice: good.price,
                  },
                  user.uid,
                  good.id,
                );
                message.success('Додано до корзини');
              } catch (error) {
                message.error(error.message);
              }
            }
          } }
        >
          Додати в корзину
        </Button>
      </Space>
    </Col>
  );
};

export default GoodsCard;
