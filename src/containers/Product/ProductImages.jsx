/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { CloseOutlined } from '@ant-design/icons';
import {
  Space,
  Typography,
  Form,
  Badge,
  Button,
  Upload,
  Image,
} from 'antd';
import React, { useRef } from 'react';
import {
  DndProvider,
  useDrag,
  useDrop,
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const { Text } = Typography;
const { List, Item, useFormInstance } = Form;

const ProductImage = ({
  id,
  value,
  remove,
  name,
  index,
  moveCard,
}) => {
  const isUrl = typeof value === 'string';

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'Image',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'Image',
    item: () => ({
      id, index,
    }),
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ ref }
      style={ {
        cursor: 'move',
        opacity,
      } }
      data-handler-id={ handlerId }
    >
      <Badge
        key={ isUrl ? value : value?.uid }
        count={
          <Button
            icon={ <CloseOutlined /> }
            danger
            size="small"
            onClick={ () => remove(name) }
          />
        }
        offset={ [-12, 0] }
      >
        <Image
          src={ isUrl ? value : URL.createObjectURL(value) }
          width={ 200 }
        />
      </Badge>
    </div>
  );
};

const ProductImages = () => {
  const form = useFormInstance();

  return (
    <Space direction="vertical">
      <Text>
        Drag images to reorder how they display on this product’s gallery.
        First image will ba a preview image that will be seen on main shop pages.
      </Text>
      <DndProvider backend={ HTML5Backend }>
        <List
          name="images"
          rules={ [{
            validator: async (_, images) => {
              if (!images || !images?.length) {
                return Promise.reject(new Error('At least one image is required'));
              }

              return Promise.resolve();
            },
          }] }
        >
          { (fields, { remove, move, add }, { errors }) => (
            <Space direction="vertical" size={ 20 }>
              <Space wrap>
                { fields.map((field, index) => (
                  <Item { ...field } noStyle>
                    <ProductImage
                      id={ index }
                      value={ undefined }
                      remove={ remove }
                      name={ field.name }
                      moveCard={ move }
                      index={ index }
                    />
                  </Item>
                )) }
              </Space>
              <Upload
                showUploadList={ false }
                accept="image/png, image/jpeg"
                multiple
                beforeUpload={ file => {
                  add(file);

                  form.validateFields(['images']);

                  return false;
                } }
              >
                <Button type="primary">
                  Upload Images
                </Button>
                <Form.ErrorList errors={ errors } />
              </Upload>
            </Space>
          ) }
        </List>
      </DndProvider>
    </Space>
  );
};

export default ProductImages;
