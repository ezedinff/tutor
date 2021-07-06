import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.dashboardLayout || initialState;

export const selectDashboardLayout = createSelector(
  [selectDomain],
  dashboardLayoutState => dashboardLayoutState,
);
