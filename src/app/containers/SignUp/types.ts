/* --- STATE --- */

export interface RoleAndPhoneFormObject {
  role: 'teacher' | 'student' | 'parent';
  phoneNumber: string;
  internationalCode: string;
}

export interface PhoneCodeFormObject {
  code: string;
}

export interface BasicInfoFormObject {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  email: string;
}

export interface MoreInfoFormObject {
  password: string;
  confirmPassword: string;
  pricePerHourEth?: number;
  pricePerHourInt?: number;
}

export interface StageType {
  success: boolean;
  error: boolean;
  inProgress: boolean;
}

export type StepName = 'code' | 'account';

export interface FinishSignupStages {
  code: StageType;
  account: StageType;
}

export type VerificationSmsStateType = {
  count: number;
  lastResent: Date | null;
};
export interface SignUpState {
  currentFormIndex: number;
  submitInProgress: boolean;
  verificationSms: VerificationSmsStateType;
  finishInitiated: boolean;
  finishSignupStage: FinishSignupStages;
}

export interface SendVerificationPayload {
  phoneNumber: string;
}

export interface VerifyAndFinishSignupPayload
  extends SendVerificationPayload,
    BasicInfoFormObject,
    MoreInfoFormObject {
  code: string;
}

export type ContainerState = SignUpState;
