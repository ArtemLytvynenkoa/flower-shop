import {
  Button,
  Col,
  Divider,
  message,
  Row,
  Form as AntdForm,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Form } from 'components';
import errorMessages from 'errorMessages';
import {
  auth,
  updateUser,
  app,
} from 'fire';
import {
  doc,
  getFirestore,
} from 'firebase/firestore';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { profileForm } from 'utils';
import UserAvatarUpload from './UserAvatarUpload';

const { Item } = AntdForm;

const UserProfile = () => {
  const [isPasswordChangeVisible, setPasswordChangeVisible] = useState(false);

  const [form] = useForm();

  const [updateProfile, isProfileUpdeting, profileError] = useUpdateProfile(auth);
  const [updateEmail, isEmailUpdeting, emailError] = useUpdateEmail(auth);
  const [updatePassword, isPasswordUpdating, passwordError] = useUpdatePassword(auth);

  const { userId } = useParams();

  const [value, loading, error] = useDocument(
    doc(getFirestore(app), 'users', userId),
  );

  const userData = value?.data();

  form.setFieldsValue(userData);

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

  return (
    <Row
      justify="center"
      style={ {
        height: '100%',
        textAlign: 'center',
      } }
      align="middle"
    >
      <Col span={ 5 }>
        <Form
          form={ form }
          isLoading={ isProfileUpdeting || isEmailUpdeting || loading }
          // initialValues={ {
          //   name: user?.displayName,
          //   email: user?.email,
          // } }
          fields={ [
            <Item key="userAvatar" name="photoURL" noStyle>
              <UserAvatarUpload userName={ userData?.userName } />
            </Item>,
            profileForm.userName,
            profileForm.email,
            profileForm.phoneNumber,
          ] }
          onSubmit={ async values => {
            await updateEmail(values.email);
            await updateProfile({
              displayName: values.userName,
              photoURL: values?.photoURL?.url || null,
            });
            try {
              if (!profileError && !emailError) {
                await updateUser({
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  userName: values.userName,
                  photoURL: values.photoURL,
                }, userId);
                message.success('Готово');
              }
            } catch (error) {
              message.error(error.message);
            }
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
