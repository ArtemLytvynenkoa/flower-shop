/* eslint-disable react/prop-types */
import { parsePhoneNumber } from 'libphonenumber-js';
import { Input } from 'antd';
import React from 'react';
import FormItem from 'antd/lib/form/FormItem';

const FormTelephoneInput = ({
  field,
  disabled,
}) => (
  <FormItem
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    label={ field.formItemProps.label }
    normalize={ value => {
      let phone;

      // eslint-disable-next-line no-restricted-globals
      if (!value) {
        return '+1';
      }

      try {
        if (value) {
          const parsedPhone = parsePhoneNumber(value.includes('+') ? value.toString() : `+${value.toString()}`);

          if (parsedPhone.isValid()) {
            phone = parsedPhone.formatInternational();
          } else {
            phone = value;
          }
        }
      } catch {
        phone = value;
      }

      return phone;
    } }
  >
    <Input
      disabled={ disabled }
      placeholder="Phone Number"
      style={ { width: '100%' } }
    />
  </FormItem>
);

export default FormTelephoneInput;
