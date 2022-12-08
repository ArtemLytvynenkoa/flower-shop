import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { Form } from 'components';
import { productAdditionFormFields } from 'utils';
import {
  Col,
  Row,
  Form as AntdForm,
  message,
  Space,
  Button,
} from 'antd';
import {
  setGood,
  app,
  updateGood,
  deleteGood,
  storage,
} from 'fire';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
  doc,
  getFirestore,
} from 'firebase/firestore';
import links from 'links';
import {
  deleteObject,
  ref,
} from 'firebase/storage';
import { LeftOutlined } from '@ant-design/icons';
import ProductImageUpload from './ProductImageUpload';

const { Item } = AntdForm;

const ProductAdditionForm = () => {
  const [form] = useForm();
  const [isLoading, setIsloading] = useState(false);

  const { goodId } = useParams();

  const isNewGood = goodId === 'new';

  const [value, loading, error] = useDocument(
    doc(getFirestore(app), 'goods', goodId),
  );

  const goodsData = value?.data();

  form.setFieldsValue(goodsData);

  const navigate = useNavigate();

  return (
    <Row
      justify="center"
      style={ { height: '100%' } }
      align="middle"
    >
      <Col xs={ 24 } lg={ 6 }>
        <Space
          direction="vertical"
          size={ 20 }
          style={ { width: '100%' } }
        >
          <Space size={ 30 }>
            <Button
              type="link"
              style={ { padding: '0px' } }
            >
              <Link to={ links.goods }>
                <LeftOutlined />
                { ' ' }
                До таблиці
              </Link>
            </Button>
            <Button
              type="primary"
              onClick={ async () => {
                setIsloading(true);
                try {
                  await deleteObject(ref(storage, `images/goods/${goodsData.image.name}`));
                  await deleteGood(goodId);
                  navigate(`${links.goods}`);
                } catch (error) {
                  message.error(error.message);
                }
                setIsloading(false);
              } }
            >
              Видалити Товар
            </Button>
          </Space>
          <Form
            form={ form }
            isLoading={ isLoading || loading }
            initialValues={ goodsData }
            buttonText={ !isNewGood ? 'Змінити' : 'Завантажити' }
            onSubmit={ async values => {
              setIsloading(true);
              try {
                if (isNewGood) {
                  await setGood({
                    price: values.price,
                    goodsName: values.goodsName,
                    description: values.description,
                    productCode: values.productCode,
                    image: values.image,
                    id: `${values.goodsName}-${values.productCode}`,
                  });
                  navigate(`${links.goods}/${values.goodsName}-${values.productCode}`);
                } else {
                  await updateGood({
                    price: values.price,
                    goodsName: values.goodsName,
                    description: values.description,
                    productCode: values.productCode,
                    image: values.image,
                  }, goodId);
                }
                message.success('Готово');
              } catch (error) {
                message.error(error.message);
              }
              setIsloading(false);
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
        </Space>
      </Col>
    </Row>
  );
};

export default ProductAdditionForm;
