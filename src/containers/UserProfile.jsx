import {
  Avatar,
  Button,
  Col,
  Divider,
  message,
  Row,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Form } from 'components';
import errorMessages from 'errorMessages';
import { auth } from 'fire';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  useAuthState,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { profileForm } from 'utils';

const UserProfile = () => {
  const [user, isLoading] = useAuthState(auth);
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);

  const [updateProfile, isProfileUpdeting, profileError] = useUpdateProfile(auth);
  const [updateEmail, isEmailUpdeting, emailError] = useUpdateEmail(auth);
  const [updatePassword, isPasswordUpdating, passwordError] = useUpdatePassword(auth);

  useEffect(() => {
    if (profileError) {
      message.error(errorMessages[profileError.code]);

      return;
    }
    if (emailError) {
      message.error(errorMessages[emailError.code]);

      return;
    }
    if (passwordError) {
      message.error(errorMessages[passwordError.code]);
    }
  }, [emailError, passwordError, profileError]);

  const [form] = useForm();

  return (
    <Row
      justify="center"
      style={ { height: '100%' } }
      align="middle"
    >
      <Col span={ 5 }>
        <Form
          form={ form }
          isLoading={ isLoading || isProfileUpdeting || isEmailUpdeting }
          initialValues={ {
            name: user?.displayName,
            email: user?.email,
          } }
          fields={ [
            <Avatar
              key="avatar"
              shape="circle"
              size={ 100 }
              src={ user?.photoURL }
            >
              { !user?.photoURL ? user?.displayName : null }
            </Avatar>,
            profileForm.name,
            profileForm.email,
          ] }
          onSubmit={ async values => {
            await updateEmail(values.email);
            await updateProfile({ displayName: values.name });
          } }
        />
        <Button
          type="primary"
          block
          onClick={ () => setPasswordChangeVisible(!isPasswordChangeVisible) }
        >
          { !isPasswordChangeVisible ? 'Змінити пароль' : 'Відмінити' }
        </Button>
        { isPasswordChangeVisible &&
          <>
            <Divider />
            <Form
              form={ form }
              isLoading={ isPasswordUpdating }
              fields={ [
                profileForm.password,
                profileForm.confirmPass,
              ] }
              onSubmit={ async values => {
                if (values.password) {
                  await updatePassword(values.password);
                  form.resetFields(['password', 'confirmPass']);
                }
              } }
            />
          </>
        }
      </Col>
    </Row>
  );
};

export default UserProfile;
