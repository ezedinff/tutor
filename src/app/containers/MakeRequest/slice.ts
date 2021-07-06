import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the MakeRequest container
export const initialState: ContainerState = {};

const makeRequestSlice = createSlice({
  name: 'makeRequest',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = makeRequestSlice;
