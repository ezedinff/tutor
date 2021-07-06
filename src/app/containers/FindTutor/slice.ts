import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the FindTutor container
export const initialState: ContainerState = {
  tutors: undefined,
  loading: false,
};

const findTutorSlice = createSlice({
  name: 'findTutor',
  initialState,
  reducers: {
    queryTutor(state, action: PayloadAction<any>) {
      console.log(action.payload);
    },
    setTutors(state, action: PayloadAction<any>) {
      state.tutors = action.payload;
    },
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = findTutorSlice;
export const selectTutors = (state: ContainerState) => state.tutors;
export const selectLoading = (state: ContainerState) => state.loading;
