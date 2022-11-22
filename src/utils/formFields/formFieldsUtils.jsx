import { MailOutlined } from '@ant-design/icons';
import { parsePhoneNumber } from 'libphonenumber-js';
import formComponentType from 'formComponentType';
import React from 'react';

// rules
export const isPhoneValidRule = {
  required: true,
  validator: (_, value) => {
    try {
      const phone = parsePhoneNumber(value);

      if (phone.isValid()) {
        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(new Error('Incorrect Phone'));
    }

    return Promise.reject(new Error('Incorrect Phone'));
  },
};

const requiredRule = {
  required: true,
  message: 'Необхідне поле',
};

const emailRule = {
  type: 'email',
  message: 'Invalid Email',
};

const getField = type => ({
  formItemProps,
  componentProps,
}) => ({
  formItemProps: {
    ...formItemProps,
    rules: formItemProps.required ? [requiredRule].concat(formItemProps.rules || []) : formItemProps.rules,
  },
  componentProps,
  type,
});

export const getInputField = getField(formComponentType.INPUT);

export const getPassword = getField(formComponentType.PASSWORD);

export const getEmailField = ({
  isLabelVisible,
  isRequired,
  disabled,
  defaultValue,
}) => getInputField({
  formItemProps: {
    name: 'email',
    label: isLabelVisible ? 'Email' : undefined,
    normalize: value => value.trim().toLowerCase(),
    rules: isRequired ? [emailRule, requiredRule] : [emailRule],
  },
  componentProps: {
    placeholder: 'Email',
    disabled,
    type: 'email',
    prefix: !isLabelVisible && <MailOutlined />,
    defaultValue,
  },
});

export const getTextAreaField = getField(formComponentType.TEXTAREA);

export const getRadioButtonGroupField = getField(formComponentType.RADIOBUTTONGROUP);

export const getNumberField = getField(formComponentType.NUMBER);

export const getDatePickerField = getField(formComponentType.DATE);

export const getSelectField = getField(formComponentType.SELECT);

export const getCheckboxField = getField(formComponentType.CHECKBOX);

export const getPhoneField = getField(formComponentType.PHONE);

export const getUploadField = getField(formComponentType.UPLOAD);
