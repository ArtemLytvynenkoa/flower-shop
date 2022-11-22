/* eslint-disable react/prop-types */
import 'antd/dist/antd.less';
// import enUS from 'antd/lib/locale/en_US';
import {
  ConfigProvider,
  Layout,
  Button,
  Space,
  Tag,
  Spin,
} from 'antd';
import {
  LeftOutlined,
  SyncOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import {
  CenterBox,
  Header,
} from 'components';

Spin.setDefaultIndicator(<LoadingOutlined style={ { fontSize: 24 } } spin />);

const { Content } = Layout;
const { Group } = Button;

const FallbackComponent = ({ resetErrorBoundary }) => (
  <CenterBox>
    <Space direction="vertical" align="center" size="large">
      <Tag color="red">
        Something Went Wrong
      </Tag>
      <Group>
        <Button
          type="primary"
          onClick={ resetErrorBoundary }
          icon={ <LeftOutlined /> }
        >
          Go Back
        </Button>
        <Button
          type="primary"
          onClick={ resetErrorBoundary }
          icon={ <SyncOutlined /> }
        >
          Refresh
        </Button>
      </Group>
    </Space>
  </CenterBox>
);

const CoreLayout = ({ children }) => (
  <ConfigProvider>
    <Layout
      style={ {
        height: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
      } }
    >
      <Layout
        style={ {
          overflow: 'overlay',
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          backgroundColor: 'white',
        } }
      >
        <Header />
        <Content
          style={ {
            flex: '1 1 auto',
            position: 'relative',
            padding: '1rem 3rem 2rem 3rem',
          } }
        >
          <ErrorBoundary
            FallbackComponent={ FallbackComponent }
            onReset={ () => {
              // reset the state of your app so the error doesn't happen again
            } }
          >
            { children }
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  </ConfigProvider>
);
export default CoreLayout;
