/* eslint-disable react/prop-types */
import { Form } from 'components';
import {
  Button,
  Modal,
  message,
} from 'antd';
import React, { useState } from 'react';
import { orderForm } from 'utils';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
  createOrder,
  deleteGoodFromUsersBasket,
  auth,
  getUserRef,
} from 'fire';
import { useForm } from 'antd/lib/form/Form';
import { useNavigate } from 'react-router-dom';
import links from 'links';
import { useAuthState } from 'react-firebase-hooks/auth';

const OrderCreationForm = ({ basket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, isLoading] = useAuthState(auth);

  const [value, loading, error] = useDocument(
    getUserRef(user.uid),
  );

  const [form] = useForm();

  const userData = value?.data();

  const navigate = useNavigate();

  form.setFieldsValue({
    ...userData,
    orderPrice: basket?.reduce((previousValue, { price, quantity }) => previousValue + (price * quantity), 0),
  });

  return (
    <>
      <Button
        type="primary"
        onClick={ () => {
          setIsModalOpen(true);
        } }
      >
        Зробити замовлення
      </Button>
      <Modal
        title="Замовлення"
        visible={ isModalOpen }
        onCancel={ () => setIsModalOpen(false) }
        footer={ null }
      >
        <Form
          form={ form }
          buttonText="Замовити"
          style={ { textAlign: 'center' } }
          fields={ [
            orderForm.userName,
            orderForm.phoneNumber,
            orderForm.deliveryAddress,
            orderForm.orderPrice,
          ] }
          onSubmit={ async values => {
            try {
              const orderCreationDate = new Date().getTime().toString();

              await createOrder(
                {
                  goods: basket,
                  orderCreationDate,
                  orderPrice: values.orderPrice,
                },
                user.uid,
                `${user.uid}-${values.orderPrice}-${orderCreationDate}`,
              );

              basket.forEach(async ({ id }) => {
                await deleteGoodFromUsersBasket(user.uid, id);
              });

              message.success('Готово');

              navigate(links.main);
            } catch (error) {
              message.error(error.message);
            }
          } }
        />
      </Modal>
    </>
  );
};

export default OrderCreationForm;
