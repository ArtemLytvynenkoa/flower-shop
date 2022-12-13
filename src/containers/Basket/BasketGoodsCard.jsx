/* eslint-disable react/prop-types */
import {
  Button,
  Col,
  Image,
  InputNumber,
  message,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import {
  deleteGoodFromUsersBasket,
  auth,
  updateGoodFromUsersBasket,
} from 'fire';
import { useAuthState } from 'react-firebase-hooks/auth';

const { Text } = Typography;

const BasketGoodsCard = ({ good }) => {
  const [user, isUserLoading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Col flex="1">
      <Space
        direction="vertical"
      >
        <Image
          style={ { objectFit: 'cover' } }
          alt={ good.image.name }
          src={ good.image.url || undefined }
          preview
          width="300px"
          height="300px"
        />
        <Text>{ good.goodsName }</Text>
        <Text>
          { good.price }
          ₴
        </Text>
        <Text>{ good.productCode }</Text>
        <Text>{ good.description }</Text>
        <InputNumber
          defaultValue={ good.quantity }
          min={ 1 }
          onChange={ async value => {
            setIsLoading(true);
            try {
              await updateGoodFromUsersBasket({
                quantity: value,
                fullPrice: value * good.price,
              }, user.uid, good.id);
            } catch (error) {
              message.error(error.message);
            }
            setIsLoading(false);
          } }
        />
        <Text>
          Повна ціна:
          { ' ' }
          { good.fullPrice }
          ₴
        </Text>
        <Button
          type="primary"
          loading={ isLoading }
          onClick={ async () => {
            setIsLoading(true);
            try {
              await deleteGoodFromUsersBasket(user.uid, good.id);
            } catch (error) {
              message.error(error.message);
            }
            setIsLoading(false);
          } }
        >
          Видалити з корзини
        </Button>
      </Space>
    </Col>
  );
};

export default BasketGoodsCard;
