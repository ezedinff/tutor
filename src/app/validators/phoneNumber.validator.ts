import { supportedCountryCodes } from 'app/constants';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const phoneNumberValidator = (strPhoneNumber: string) => {
  const phoneNumber = parsePhoneNumberFromString(strPhoneNumber);
  if (!phoneNumber?.isValid()) {
    return false;
  }

  const { country } = phoneNumber;
  const formattedNumber = phoneNumber.formatInternational();

  if (
    formattedNumber.replace(/\s/g, '') !== strPhoneNumber.replace(/\s/g, '')
  ) {
    return false;
  }
  if (supportedCountryCodes.includes(country || '')) {
    return formattedNumber;
  }
  return false;
};

export default phoneNumberValidator;
