import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.makeRequest || initialState;

export const selectMakeRequest = createSelector(
  [selectDomain],
  makeRequestState => makeRequestState,
);
