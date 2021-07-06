import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { findTutorSaga } from './saga';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.findTutor || initialState;

export const selectFindTutor = createSelector(
  [selectDomain],
  findTutorState => findTutorState,
);
