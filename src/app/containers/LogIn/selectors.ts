import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.logIn || initialState;

export const selectLogIn = createSelector(
  [selectDomain],
  logInState => logInState,
);
