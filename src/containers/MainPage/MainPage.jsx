import { Row } from 'antd';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { app } from 'fire';
import { LoadingIndicator } from 'components';
import {
  getFirestore,
  collection,
} from 'firebase/firestore';
import GoodsCard from './GoodsCard';

const MainPage = () => {
  const [values, loading, error] = useCollectionData(
    collection(getFirestore(app), 'goods'),
  );

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
      { values.map(value => <GoodsCard good={ value } key={ value.id } />) }
    </Row>
  );
};

export default MainPage;
