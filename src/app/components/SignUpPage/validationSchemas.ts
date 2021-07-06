import * as Yup from 'yup';
import phoneNumberValidator from 'app/validators/phoneNumber.validator';
import { rolesOnPlatform } from 'utils/constants';
import { RoleTypes } from 'types';

export let rolesAndPhoneSchema = Yup.object({
  role: Yup.string().oneOf(rolesOnPlatform).required(),
  internationalCode: Yup.string().required(),
  phoneNumber: Yup.string()
    .when('internationalCode', (internationalCode, schema) => {
      return schema.test({
        test: phoneNumber => {
          return phoneNumberValidator(`${internationalCode}${phoneNumber}`);
        },
        message: 'Enter a valid phone number',
      });
    })
    .required('Phone number is required'),
});

export const phoneCodeSchema = Yup.object({
  code: Yup.string()
    .length(6, 'A valid code is 6 digits')
    .required('Verification code is required'),
});

export const basicInfoSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().nullable(),
  lastName: Yup.string().required('Last name is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'Gender can only be male or female'])
    .required('Gender is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email'),
});

export const getMoreInfoSchema = (role: RoleTypes) => {
  if (role === 'teacher') {
    return Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password should be at least 8 characters'),
      confirmPassword: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('password')], "Confirmation doesn't match password"),

      pricePerHourEth: Yup.number()
        .required('Price per hour for students in Ethiopia is required')
        .min(10, 'Minimum price is 10 ETB')
        .nullable(),
      pricePerHourInt: Yup.number()
        .required('Price per hour for international students is required')
        .min(10, 'Minimum price is 10 ETB')
        .nullable(),
    });
  }

  return Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], "Confirmation doesn't match password"),
  });
};
