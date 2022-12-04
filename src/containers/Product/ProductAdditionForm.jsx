import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { Form } from 'components';
import { productAdditionFormFields } from 'utils';
import {
  Col,
  Row,
  Form as AntdForm,
  message,
} from 'antd';
import { setGood } from 'fire';
import ProductImageUpload from './ProductImageUpload';

const { Item } = AntdForm;

const ProductAdditionForm = () => {
  const [form] = useForm();
  const [isLoading, setIsloading] = useState(false);

  return (
    <Row
      justify="center"
      style={ { height: '100%' } }
      align="middle"
    >
      <Col xs={ 24 } lg={ 6 }>
        <Form
          form={ form }
          isLoading={ isLoading }
          onSubmit={ async values => {
            try {
              setIsloading(true);
              await setGood({
                price: values.price,
                goodsName: values.goodsName,
                description: values.description,
                productCode: values.productCode,
                image: values.image,
                id: `${values.goodsName}-${values.productCode}`,
              });
              setIsloading(false);
              form.resetFields();
            } catch (error) {
              message.error(error.message);
            }
          } }
          fields={ [
            productAdditionFormFields.goodsName,
            productAdditionFormFields.price,
            productAdditionFormFields.productCode,
            productAdditionFormFields.description,
            <Item
              noStyle
              name="image"
              key="image"
              rules={ [{
                required: true, message: 'Завантажте фото',
              }] }
            >
              <ProductImageUpload />
            </Item>,
          ] }
        />
      </Col>
    </Row>
  );
};

export default ProductAdditionForm;
