import APIError from 'app/api/APIError';
import { signupStorageNames } from 'app/containers/SignUp/constants';
import { VerificationSmsStateType } from 'app/containers/SignUp/types';
import moment from 'moment';
import { authTokenName, refereshTokenName } from 'utils/constants';

export const getResendVerificationSMSState = (
  lastSent: Date | null,
  trial: number,
) => {
  if (!lastSent || !trial) {
    return {
      canResend: true,
      canResendAt: moment(),
    };
  }
  // can resend after 2 minutes for first time
  let minimumAfterMinute = 2;

  if (trial > 1 && trial <= 5) {
    // Can resend sms in trial multiplied by 5 minutes for first 5 trials
    minimumAfterMinute = trial * 5;
  } else if (trial > 1) {
    minimumAfterMinute = trial * 10;
  }

  const minimumResendTime = moment(lastSent).add(minimumAfterMinute, 'minute');

  return {
    canResend: minimumResendTime.isBefore(moment()),
    canResendAt: minimumResendTime,
  };
};

// Used to add '0' to one digit numbers
export const zeroUp = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const isJson = (str: string | null) => {
  try {
    if (typeof str === 'string') {
      JSON.parse(str);
      return true;
    }

    return false;
  } catch (__) {
    return false;
  }
};

export const getNextVerificationSmsState = () => {
  const currentStoredVerificationSmsState = localStorage.getItem(
    signupStorageNames.verificationSms,
  );
  if (
    typeof currentStoredVerificationSmsState === 'string' &&
    isJson(currentStoredVerificationSmsState)
  ) {
    const parsedOldState: VerificationSmsStateType = JSON.parse(
      currentStoredVerificationSmsState,
    );
    const newState: VerificationSmsStateType = {
      count: parsedOldState.count + 1,
      lastResent: new Date(),
    };
    return newState;
  } else {
    const newState: VerificationSmsStateType = {
      count: 1,
      lastResent: new Date(),
    };
    return newState;
  }
};

export const getErrorMessage = error => {
  if (error instanceof APIError && error.status !== 500) {
    return error.message;
  }

  console.error(error);
  return 'An unkown error occured';
};

export const setAuthTokens = (token: string, refreshToken?: string) => {
  window.localStorage.setItem(authTokenName, token);
  if (refreshToken) {
    window.localStorage.setItem(refereshTokenName, refreshToken);
  }
};

export const capitalizeFirstLetter = (str: string) => {
  let result = '';

  if (str.length >= 1) {
    const firstLetter = str.charAt(0).toUpperCase();
    result = `${firstLetter}${str.slice(1)}`;
  }

  return result;
};

export const countWords = str => {
  if (typeof str === 'string') {
    const words = str.split(' ');
    return words.length - 1;
  }

  return 0;
};

export const getCoordinateObject = (coordinates: Array<number> | undefined) => {
  if (Array.isArray(coordinates) && coordinates.length > 1) {
    const lng = coordinates[0];
    const lat = coordinates[1];

    return { lat, lng };
  }
};
