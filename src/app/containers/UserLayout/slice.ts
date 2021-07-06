import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, IUser } from './types';

// The initial state of the UserLayout container
export const initialState: ContainerState = {
  user: null,
  gettingUser: false,
};

const userLayoutSlice = createSlice({
  name: 'userLayout',
  initialState,
  reducers: {
    getCurrentUser(state, action: PayloadAction<undefined>) {
      state.gettingUser = true;
    },
    setGettingUser(state, action: PayloadAction<boolean>) {
      state.gettingUser = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.gettingUser = false;
      state.user = action.payload;
    },
    logOutUser(state, action: PayloadAction<undefined>) {
      state.user = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = userLayoutSlice;
