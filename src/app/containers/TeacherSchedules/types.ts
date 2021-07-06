/* --- STATE --- */

import { IAvialableDayAPI } from '../UserLayout/types';

export type TDaysKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface IAPPOnlyAvialbiltyProprties {
  rangeAdderVisible: boolean;
  newRangeOverlapsError?: string | boolean;
  updatingValue?: boolean;
}

export interface IAvialableDayAPP
  extends IAvialableDayAPI,
    IAPPOnlyAvialbiltyProprties {
  dayName: string;
}

export interface IAvialabilityAPP {
  monday: IAvialableDayAPP;

  tuesday: IAvialableDayAPP;

  wednesday: IAvialableDayAPP;

  thursday: IAvialableDayAPP;

  friday: IAvialableDayAPP;

  saturday: IAvialableDayAPP;

  sunday: IAvialableDayAPP;
}

export interface TeacherSchedulesState {
  avialabilitySchedule: IAvialabilityAPP;
}

export type ContainerState = TeacherSchedulesState;
