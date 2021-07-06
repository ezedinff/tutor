// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the DashboardLayout container
export const initialState: ContainerState = {};

const dashboardLayoutSlice = createSlice({
  name: 'dashboardLayout',
  initialState,
  reducers: {
    // logOutUser(state, action: PayloadAction<undefined>) {
    //   state.user = null;
    // },
  },
});

export const { actions, reducer, name: sliceKey } = dashboardLayoutSlice;
