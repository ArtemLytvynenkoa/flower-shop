/* eslint-disable react/prop-types */
import {
  Badge,
  Button,
  Image,
  Upload,
} from 'antd';
import React, { useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { storage } from 'fire';
import {
  deleteObject,
  getDownloadURL,
  ref,
} from 'firebase/storage';
import { CloseOutlined } from '@ant-design/icons';
import { LoadingIndicator } from 'components';

const UserAvatarUpload = ({ onChange, value }) => {
  const [imageRef, setImageRef] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  if (isLoading && !value) {
    return <LoadingIndicator />;
  }

  if (value?.url) {
    return (
      <Badge
        count={
          <Button
            icon={ <CloseOutlined /> }
            danger
            size="small"
            onClick={ async () => {
              setIsloading(true);
              await deleteObject(imageRef || ref(storage, `images/users/${value.name}`));
              setIsloading(false);
              setImageRef(null);
              onChange(null);
            } }
          />
        }
        offset={ [-12, 0] }
      >
        <Image src={ value?.url } />
      </Badge>
    );
  }

  return (

    <Upload
      name="userAvatar"
      accept="image/png, image/jpeg"
      showUploadList={ false }
      beforeUpload={ () => false }
      onChange={ async ({ file }) => {
        const imageRef = ref(storage, `images/users/${file.name}`);
        setIsloading(true);
        await uploadFile(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImageRef(imageRef);
        onChange({
          url,
          name: file.name,
        });
        setIsloading(false);
      } }
    >
      <Button
        type="primary"
        loading={ uploading }
      >
        Завантажити фото
      </Button>
    </Upload>
  );
};

export default UserAvatarUpload;
