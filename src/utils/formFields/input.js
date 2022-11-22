import {
  getEmailField,
  getInputField,
  getPassword,
  getPhoneField,
} from './formFieldsUtils';

export const email = getEmailField({
  isLabelVisible: false,
  isRequired: true,
  disabled: false,
});

export const password = getPassword({
  formItemProps: {
    name: 'password',
    required: true,
  },
  componentProps: {
    placeholder: 'Введіть Пароль',
    disabled: false,
    type: 'password',
  },
});

export const confirmPass = getPassword({
  formItemProps: {
    name: 'confirmPass',
    dependencies: ['password'],
    hasFeedback: true,
    rules: [
      {
        required: true,
        message: 'Необхідне поле',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }

          return Promise.reject(new Error('Паролі не збігаються'));
        },
      }),
    ],
  },
  componentProps: {
    placeholder: 'Повторіть пароль',
    disabled: false,
  },
});

export const name = getInputField({
  formItemProps: {
    name: 'name',
    required: true,
  },
  componentProps: {
    placeholder: 'Введіть своє ім`я',
    disabled: false,
  },
});

export const phone = getPhoneField({
  formItemProps: {
    name: 'phone',
    rules: [{ required: true }],
    label: 'Phone',
  },
  componentProps: {},
});
