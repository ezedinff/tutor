import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, LoginActionPayload } from './types';

// The initial state of the LogIn container
export const initialState: ContainerState = {
  loggingIn: false,
};

const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    loginAction(state, action: PayloadAction<LoginActionPayload>) {
      state.loggingIn = true;
    },

    setLoggingIn(state, action: PayloadAction<boolean>) {
      state.loggingIn = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = logInSlice;
