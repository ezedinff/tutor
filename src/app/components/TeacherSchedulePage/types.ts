import {
  IAPPOnlyAvialbiltyProprties,
  IAvialabilityAPP,
  TDaysKey,
} from 'app/containers/TeacherSchedules/types';

export interface AvailabilityDialogProps {
  avialableDays: IAvialabilityAPP;
  setADaysAppOnlyProperties: (
    day: TDaysKey,
    property: IAPPOnlyAvialbiltyProprties,
  ) => void;
  setAvialabilityChanges: (
    dayKey: TDaysKey,
    newSchedules: IAvialabilityAPP,
  ) => void;
  open: boolean;
  onClose: () => void;
}

export interface RangePickersProps {
  addingARange?: boolean;
  addRange: (start: Date, end: Date) => void;
  newRangeOverlapsError?: boolean | string;
}

export interface RangesChipProps {
  start: Date;
  end: Date;
  dayIsUpdating: boolean;
  onDelete: () => void;
}
