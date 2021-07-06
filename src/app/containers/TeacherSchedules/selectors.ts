import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.teacherSchedules || initialState;

export const selectTeacherSchedules = createSelector(
  [selectDomain],
  teacherSchedulesState => teacherSchedulesState,
);
