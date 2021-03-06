import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.clientLayout || initialState;

export const selectClientLayout = createSelector(
  [selectDomain],
  clientLayoutState => clientLayoutState,
);
