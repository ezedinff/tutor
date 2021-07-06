import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.userLayout || initialState;

export const selectUserLayout = createSelector(
  [selectDomain],
  userLayoutState => userLayoutState,
);

export const selectUser = createSelector(
  [selectUserLayout],
  userLayout => userLayout.user,
);
