import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.teacherProfile || initialState;

export const selectTeacherProfile = createSelector(
  [selectDomain],
  teacherProfileState => teacherProfileState,
);
