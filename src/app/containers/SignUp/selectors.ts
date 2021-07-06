import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';
import { SignUpState } from './types';

const selectDomain = (state: RootState) => state.signUp || initialState;

export const selectSignUp = createSelector(
  [selectDomain],
  signUpState => signUpState,
);

export const selectFinishStage = createSelector(
  [selectSignUp],
  (signupState: SignUpState) => signupState.finishSignupStage,
);
