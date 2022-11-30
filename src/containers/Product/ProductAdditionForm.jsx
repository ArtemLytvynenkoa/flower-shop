import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { Form } from 'components';
import { productAdditionFormFields } from 'utils';
import {
  Col,
  Row,
} from 'antd';
import { setGood } from 'fire';
import ProductImages from './ProductImages';

const ProductAdditionForm = () => {
  const [form] = useForm();

  return (
    <Row
      justify="center"
      style={ { height: '100%' } }
      align="middle"
    >
      <Col xs={ 24 } lg={ 6 }>
        <Form
          form={ form }
          onSubmit={ async values => setGood({
            price: values.price,
            goodsName: values.goodsName,
            description: values.description,
          }) }
          fields={ [
            productAdditionFormFields.goodsName,
            productAdditionFormFields.price,
            productAdditionFormFields.description,
            <ProductImages key="upload" />,
          ] }
        />
      </Col>
    </Row>
  );
};

export default ProductAdditionForm;
