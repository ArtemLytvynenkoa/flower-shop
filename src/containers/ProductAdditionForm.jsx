import { useForm } from 'antd/lib/form/Form';
import React from 'react';
import { Form } from 'components';
import { productAdditionFormFields } from 'utils';
import {
  Col, Row,
} from 'antd';

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
          fields={ [
            productAdditionFormFields.goodsName,
            productAdditionFormFields.price,
            productAdditionFormFields.description,
          ] }
        />
      </Col>
    </Row>
  );
};

export default ProductAdditionForm;
