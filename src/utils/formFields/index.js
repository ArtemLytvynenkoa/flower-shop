import {
  name,
  email,
  password,
  confirmPass,
  goodsName,
  productCode,
} from './input';
import { price } from './number';
import { description } from './textArea';
import { userPhone } from './phone';

const signInForm = {
  email,
  password,
};

const profileForm = {
  name,
  userPhone,
  email,
  password,
  confirmPass,
};

const productAdditionFormFields = {
  goodsName,
  price,
  description,
  productCode,
};

export {
  signInForm,
  profileForm,
  productAdditionFormFields,
};
