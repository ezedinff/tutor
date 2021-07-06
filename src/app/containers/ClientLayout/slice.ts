import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the ClientLayout container
export const initialState: ContainerState = {};

const clientLayoutSlice = createSlice({
  name: 'clientLayout',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = clientLayoutSlice;
