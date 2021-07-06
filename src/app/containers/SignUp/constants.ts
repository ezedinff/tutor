export const initialValues = {
  rolesAndPhone: {
    role: '',
    phoneNumber: '',
    internationalCode: '+251',
  },

  phoneCode: {
    code: '',
  },

  basicInfo: {
    firstName: '',
    middleName: undefined,
    lastName: '',
    gender: '',
    dateOfBirth: '',
    email: undefined,
  },

  moreInfo: {
    password: '',
    confirmPassword: '',
    pricePerHourEth: '',
    pricePerHourInt: '',
  },
};

export const signupStorageNames = {
  formIndex: '_cur.in',
  verificationSms: '_ver_cnt_ts',
};
