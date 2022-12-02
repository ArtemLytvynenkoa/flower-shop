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

const ProductImageUpload = ({ onChange, value }) => {
  const [imageRef, setImageRef] = useState(null);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  if (value) {
    return (
      <Badge
        count={
          <Button
            icon={ <CloseOutlined /> }
            danger
            size="small"
            onClick={ async () => {
              await deleteObject(imageRef);
              setImageRef(null);
              onChange(null);
            } }
          />
        }
        offset={ [-12, 0] }
      >
        <Image src={ value } />
      </Badge>
    );
  }

  return (

    <Upload
      name="productImage"
      accept="image/png, image/jpeg"
      showUploadList={ false }
      beforeUpload={ () => false }
      onChange={ async ({ file }) => {
        const imageRef = (ref(storage, `images/${file.name}-${file.uid}`));
        await uploadFile(imageRef, file);
        const url = await getDownloadURL(imageRef);
        setImageRef(imageRef);
        onChange(url);
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

export default ProductImageUpload;
