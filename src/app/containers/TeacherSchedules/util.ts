import { IAvialabilityAPI, TSchedules } from '../UserLayout/types';
import {
  IAPPOnlyAvialbiltyProprties,
  IAvialabilityAPP,
  IAvialableDayAPP,
  TDaysKey,
} from './types';

export const dayNameMapper = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

const defaultExtraProperty: IAPPOnlyAvialbiltyProprties = {
  rangeAdderVisible: false,
  newRangeOverlapsError: false,
  updatingValue: false,
};

/**
 * Generates an app ready avialbility object from API's value for a given day
 */
export const generateAppReadyAvialablility = (
  day: TDaysKey,
  schedules: TSchedules,
  extraProperties: IAPPOnlyAvialbiltyProprties = defaultExtraProperty,
): IAvialableDayAPP => {
  const dayName = dayNameMapper[day];

  // Change date strings to date object
  const parsedSchedules: TSchedules = [];

  schedules.map(schedule => {
    return parsedSchedules.push({
      start: new Date(schedule.start),
      end: new Date(schedule.end),
    });
  });

  return {
    dayName,
    schedules: parsedSchedules,
    ...extraProperties,
  };
};

export const apiAvialabilityToAppAvalability = (
  apiAvialability: IAvialabilityAPI,
): IAvialabilityAPP => {
  return {
    monday: generateAppReadyAvialablility(
      'monday',
      apiAvialability.monday.schedules,
    ),
    tuesday: generateAppReadyAvialablility(
      'tuesday',
      apiAvialability.tuesday.schedules,
    ),
    wednesday: generateAppReadyAvialablility(
      'wednesday',
      apiAvialability.wednesday.schedules,
    ),
    thursday: generateAppReadyAvialablility(
      'thursday',
      apiAvialability.thursday.schedules,
    ),
    friday: generateAppReadyAvialablility(
      'friday',
      apiAvialability.friday.schedules,
    ),
    saturday: generateAppReadyAvialablility(
      'saturday',
      apiAvialability.saturday.schedules,
    ),
    sunday: generateAppReadyAvialablility(
      'sunday',
      apiAvialability.sunday.schedules,
    ),
  };
};

export const appAvialabilityToApi = (
  avialabilities: IAvialabilityAPP,
): IAvialabilityAPI => {
  return {
    monday: { schedules: avialabilities.monday.schedules },
    tuesday: { schedules: avialabilities.tuesday.schedules },
    wednesday: { schedules: avialabilities.wednesday.schedules },
    thursday: { schedules: avialabilities.thursday.schedules },
    friday: { schedules: avialabilities.friday.schedules },
    saturday: { schedules: avialabilities.saturday.schedules },
    sunday: { schedules: avialabilities.sunday.schedules },
  };
};
