import {
  name,
  email,
  password,
  confirmPass,
  phone,
  goodsName,
} from './input';
import { price } from './number';
import { description } from './textArea';

const signInForm = {
  email,
  password,
};

const profileForm = {
  name,
  phone,
  email,
  password,
  confirmPass,
};

const productAdditionFormFields = {
  goodsName,
  price,
  description,
};

export {
  signInForm,
  profileForm,
  productAdditionFormFields,
};
