import React from 'react';
import { Navigate } from 'react-router-dom';
import {
  Form,
  LoadingIndicator,
} from 'components';
import { signInForm } from 'utils';
import { useForm } from 'antd/lib/form/Form';
import links from 'links';
import {
  Button,
  Col,
  message,
  Row,
  Space,
} from 'antd';
// import errorMessages from 'errorMessages';

const SignUp = () => {
  const [form] = useForm();

  return (
    <Row
      justify="center"
      style={ { height: '100%' } }
      align="middle"
    >
      <Col
        xs={ 24 }
        lg={ 6 }
      >
        <Form
          form={ form }
          // isLoading={ isUserLoading }
          buttonText="Зареєструватися"
          initialValues={ { remember: true } }
          // onSubmit={ values => createUserWithEmailAndPassword(values.email, values.password) }
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
                Register with Facebook
              </Button> */ }
              <Button
                block
                type="primary"
                // loading={ isGoogleUserLoading }
                // onClick={ () => signInWithGoogle() }
              >
                Зареєструватися за допомогою Google
              </Button>
            </Space>
          }
        />
      </Col>
    </Row>
  );
};

export default SignUp;
