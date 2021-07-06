/* --- STATE --- */

export type TSchedules = { start: Date; end: Date }[];

export interface IAvialableDayAPI {
  schedules: TSchedules;
}

export interface IAvialabilityAPI {
  monday: IAvialableDayAPI;

  tuesday: IAvialableDayAPI;

  wednesday: IAvialableDayAPI;

  thursday: IAvialableDayAPI;

  friday: IAvialableDayAPI;

  saturday: IAvialableDayAPI;

  sunday: IAvialableDayAPI;
}

export interface ITeacherProfileFields {
  currentBalance?: Number;

  avialabilitySchedule?: IAvialabilityAPI;
  universityOrCollege?: { value: String; approved: Boolean };
  startYear?: { value: Date; approved: Boolean };
  endYear?: { value: Date; approved: Boolean };
  studyLevel?: { value: String; approved: Boolean };
  gpa?: { value: Number; approved: Boolean };
  major?: { value: String; approved: Boolean };

  eslceScore?: { value: Number; approved: Boolean };
  highSchoolName?: { value: String; approved: Boolean };
  satScore?: { value: Number; approved: Boolean };
  ieltsScore?: { value: Number; approved: Boolean };
  toeflScore?: { value: Number; approved: Boolean };

  haveTutoringExperience: {
    value: 'yes' | 'no' | '';
    approved: Boolean;
  };
  experienceReferences?: {
    fullName: String;
    phoneNumber: String;
    email: String;
  }[];
  yearsSpentTutoring?: { value: Number; approved: Boolean };

  tutoringEnvironment?: 'online' | 'inperson' | 'both' | '';
  willTeachKgToFive?: Boolean;
  willTeacSixToEight?: Boolean;
  willTeachNineToTwelve?: Boolean;

  ableLanguages?: { label: String; value: String; approved: Boolean }[];
  interestedSubjects?: { label: String; value: String }[];
  extraSkills?: { label: String; value: String; approved: Boolean }[];
  aboutTeacher?: String;

  address?: {
    type?: String;
    coordinates?: number[];
  };
  addressString?: String;

  universityFile?: {
    fileName: String;
    approved: Boolean;
  };

  identification?: {
    fileName: String;
    approved: Boolean;
  };

  eslce?: {
    fileName: String;
    approved: Boolean;
  };
}

export interface IUser extends ITeacherProfileFields {
  firstName: String;
  middleName?: String;
  lastName: String;
  fullName: String;
  gender: 'male' | 'female';
  dateOfBirth: Date | String;
  avatar?: String;
  phoneNumber: String;
  email?: String;

  role: 'teacher' | 'student' | 'parent';
  isActive?: Boolean;
  isActiveOnPlatform?: Boolean;
  emailVerified?: Boolean;
  rating?: Number;
  numberOfRatings?: Number;
}

export interface IUserUpdateBody extends ITeacherProfileFields {
  firstName?: String;
  middleName?: String;
  lastName?: String;
  dateOfBirth?: Date | String;
  avatar?: String;
  email?: String;
  role?: 'teacher' | 'student' | 'parent';
}

export interface UserLayoutState {
  user: IUser | null;
  gettingUser: boolean;
}

export type ContainerState = UserLayoutState;
