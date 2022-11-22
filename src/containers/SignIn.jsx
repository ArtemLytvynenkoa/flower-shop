import React from 'react';
import { useForm } from 'antd/lib/form/Form';
import {
  Button,
  Col,
  Row,
  Space,
} from 'antd';
import { Form } from 'components';
import { signInForm } from 'utils';

const SignIn = () => {
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
          buttonText="Увійти"
          // isLoading={ isUserLoading }
          initialValues={ { remember: true } }
          // onSubmit={ values => signInWithEmailAndPassword(values.email, values.password) }
          fields={ [
            signInForm.email,
            signInForm.password,
          ] }
          footer={
            <Space
              direction="vertical"
              style={ { width: '100%' } }
            >
              { /* <Button
                type="primary"
                loading={ isWithFacebookSignIn }
                onClick={ () => signInWithFacebook() }
              >
                Sign in with Facebook
              </Button> */ }
              <Button
                block
                type="primary"
                // loading={ isGoogleUserLoading }
                // onClick={ () => signInWithGoogle() }
              >
                Увійти за допомогою Google
              </Button>
            </Space>
          }
        />
      </Col>
    </Row>
  );
};

export default SignIn;
