import { RootState } from './RootState';

type FormFieldErrorType = {
  error: boolean;
  text: string;
};

type RoleTypes = 'teacher' | 'student' | 'parent';

export type { RootState, FormFieldErrorType, RoleTypes };
