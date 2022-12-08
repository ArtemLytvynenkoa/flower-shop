import {
  userName,
  email,
  password,
  confirmPass,
  goodsName,
  productCode,
} from './input';
import { price } from './number';
import { description } from './textArea';
import { phoneNumber } from './phone';

const signInForm = {
  email,
  password,
};

const profileForm = {
  userName,
  phoneNumber,
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
