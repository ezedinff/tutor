import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  ContainerState,
  SendVerificationPayload,
  StageType,
  StepName,
  VerificationSmsStateType,
  VerifyAndFinishSignupPayload,
} from './types';

// The initial state of the SignUp container
export const initialState: ContainerState = {
  submitInProgress: false,
  currentFormIndex: 0,
  verificationSms: { count: 0, lastResent: null },
  finishInitiated: false,
  finishSignupStage: {
    code: { success: false, error: false, inProgress: false },
    account: { success: false, error: false, inProgress: false },
  },
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    setSubmitInProgress(state, action: PayloadAction<boolean>) {
      state.submitInProgress = action.payload;
    },
    sendVerificationSMS(state, action: PayloadAction<SendVerificationPayload>) {
      state.submitInProgress = true;
    },
    setCurrentSignupFormIndex(state, action: PayloadAction<number>) {
      state.currentFormIndex = action.payload;
    },
    setVericationSms(state, action: PayloadAction<VerificationSmsStateType>) {
      state.verificationSms = action.payload;
    },

    setASignUpStage(
      state,
      action: PayloadAction<{ name: StepName; state: StageType }>,
    ) {
      state.finishSignupStage[action.payload.name] = action.payload.state;
    },

    verifyAndFinishSignup(
      state,
      action: PayloadAction<VerifyAndFinishSignupPayload>,
    ) {
      state.submitInProgress = true;
      state.finishInitiated = true;
    },
  },
});

export const { actions, reducer, name: sliceKey } = signUpSlice;
