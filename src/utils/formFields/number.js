import { getNumberField } from './formFieldsUtils';

// eslint-disable-next-line import/prefer-default-export
export const price = getNumberField({
  componentProps: { disabled: false },
  formItemProps: {
    name: 'price',
    label: 'Ціна, ₴',
    required: true,
  },
});
