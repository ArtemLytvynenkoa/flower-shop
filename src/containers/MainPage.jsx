import {
  Col,
  Image,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import React, { useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from 'fire';
import { LoadingIndicator } from 'components';
import {
  getFirestore,
  collection,
} from 'firebase/firestore';
import errorMessages from 'errorMessages';

const { Text } = Typography;

const MainPage = () => {
  const [values, loading, error] = useCollectionData(
    collection(getFirestore(app), 'goods'),
  );

  useEffect(() => {
    if (error) {
      console.log(error.code);
      message.error(errorMessages[error.code]);
    }
  }, [error]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <Row
      gutter={ [16, 16] }
      style={ {
        textAlign: 'center',
        padding: '20px',
      } }
    >
      { values.map(value => (
        <Col flex="1" key={ value.productCode }>
          <Space direction="vertical">
            <Image
              style={ { objectFit: 'contain' } }
              alt={ value.goodsName }
              src={ value.image || undefined }
              preview
              width="500px"
              height="500px"
            />
            <Text>{ value.goodsName }</Text>
            <Text>
              { value.price }
              ₴
            </Text>
            <Text>{ value.productCode }</Text>
            <Text>{ value.description }</Text>
          </Space>
        </Col>
      )) }
    </Row>
  );
};

export default MainPage;
