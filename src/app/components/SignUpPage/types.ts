import {
  FinishSignupStages,
  VerificationSmsStateType,
} from 'app/containers/SignUp/types';
import { RefObject } from 'react';
import { FormFieldErrorType } from 'types';
import {
  RoleAndPhoneFormObject,
  PhoneCodeFormObject,
  BasicInfoFormObject,
  MoreInfoFormObject,
} from 'app/containers/SignUp/types';

export interface RoleAndPhonValidationTypes {
  role: FormFieldErrorType;
  phoneNumber: FormFieldErrorType;
}

export interface RoleAndPhoneFormProps {
  initialValue: RoleAndPhoneFormObject;
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (values: RoleAndPhoneFormObject) => void;
}

export interface PhoneCodeFormProps {
  initialValue: PhoneCodeFormObject;
  rolesAndPhonValues: RoleAndPhoneFormObject;
  formRef: RefObject<HTMLFormElement>;
  verificationSmsState: VerificationSmsStateType;
  onResendSms: () => void;
  finishInitiated: boolean;
  signupFnishStage: FinishSignupStages;
  onSubmit: (values: PhoneCodeFormObject) => void;
}

export interface BasicInfoFormProps {
  initialValue: BasicInfoFormObject;
  rolesAndPhonValues: RoleAndPhoneFormObject;
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (values: BasicInfoFormObject) => void;
}

export interface MoreInfoFormProps {
  initialValue: MoreInfoFormObject;
  rolesAndPhonValues: RoleAndPhoneFormObject;
  basicInfoValues: BasicInfoFormObject;
  formRef: RefObject<HTMLFormElement>;
  onSubmit: (values: MoreInfoFormObject) => void;
}
