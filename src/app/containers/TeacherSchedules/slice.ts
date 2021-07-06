import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import {
  ContainerState,
  IAPPOnlyAvialbiltyProprties,
  IAvialabilityAPP,
  TDaysKey,
} from './types';
import { generateAppReadyAvialablility } from './util';

// The initial state of the TeacherSchedules container
const initialAvialabilitySchedules: IAvialabilityAPP = {
  monday: generateAppReadyAvialablility('monday', []),
  tuesday: generateAppReadyAvialablility('tuesday', []),
  wednesday: generateAppReadyAvialablility('wednesday', []),
  thursday: generateAppReadyAvialablility('thursday', []),
  friday: generateAppReadyAvialablility('friday', []),
  saturday: generateAppReadyAvialablility('saturday', []),
  sunday: generateAppReadyAvialablility('sunday', []),
};

export const initialState: ContainerState = {
  avialabilitySchedule: initialAvialabilitySchedules,
};

const teacherSchedulesSlice = createSlice({
  name: 'teacherSchedules',
  initialState,
  reducers: {
    setAvialabilitySchedule(state, action: PayloadAction<IAvialabilityAPP>) {
      state.avialabilitySchedule = action.payload;
    },
    setADaysExtraProperties(
      state,
      action: PayloadAction<{
        day: TDaysKey;
        properties: IAPPOnlyAvialbiltyProprties;
      }>,
    ) {
      const { day, properties } = action.payload;
      state.avialabilitySchedule[day] = {
        ...state.avialabilitySchedule[day],
        ...properties,
      };
    },

    updateAvialabilityChanges(
      state,
      action: PayloadAction<{
        day: TDaysKey;
        newAvailabilitySchedules: IAvialabilityAPP;
      }>,
    ) {
      state.avialabilitySchedule[action.payload?.day].updatingValue = true;
    },

    setADaysLoadingState(
      state,
      action: PayloadAction<{ day: TDaysKey; value: boolean }>,
    ) {
      const { day, value } = action.payload;
      state.avialabilitySchedule[day].updatingValue = value;
    },
  },
});

export const { actions, reducer, name: sliceKey } = teacherSchedulesSlice;
