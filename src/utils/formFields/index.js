import {
  name,
  email,
  password,
  confirmPass,
  phone,
} from './input';

const carForm = { phone };

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

export {
  signInForm,
  carForm,
  profileForm,
};
