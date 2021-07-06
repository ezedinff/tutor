/* --- STATE --- */

export interface TPuploadProgress {
  uploading: boolean;
  progress: number;
  newUploaded: boolean;
}

export interface TeacherProfileState {
  savingProfile: boolean;
  universityFile: TPuploadProgress;
  identification: TPuploadProgress;
  eslce: TPuploadProgress;
}

export interface ITeacherProfile {
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
  yearsSpentTutoring?: { value: Number; approved: Boolean };

  tutoringEnvironment?: 'online' | 'inperson' | 'both' | '';
  willTeachKgToFive?: Boolean;
  willTeacSixToEight?: Boolean;
  willTeachNineToTwelve?: Boolean;

  ableLanguages?: { label: String; value: String; approved: Boolean }[];
  extraSkills?: { label: String; value: String; approved: Boolean }[];
  interestedSubjects?: { label: String; value: String }[];
  aboutTeacher?: String;
  address?: {
    type?: String;
    coordinates?: number[];
  };
  addressString?: String;

  experienceReferences?: {
    fullName: String;
    phoneNumber: String;
    email: String;
  }[];

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

export interface IProfileValuesOnly {
  universityOrCollege?: String;
  startYear?: Date;
  endYear?: Date;
  studyLevel?: String;
  gpa?: Number;
  major?: String;

  eslceScore?: Number;
  highSchoolName?: String;
  satScore?: Number;
  ieltsScore?: Number;
  toeflScore?: Number;

  haveTutoringExperience: 'yes' | 'no' | '';
  experienceReferences?: {
    fullName: String;
    phoneNumber: String;
    email: String;
    phoneError: boolean;
  }[];

  yearsSpentTutoring?: Number;

  tutoringEnvironment?: 'online' | 'inperson' | 'both' | '';
  willTeachKgToFive?: Boolean;
  willTeacSixToEight?: Boolean;
  willTeachNineToTwelve?: Boolean;

  ableLanguages?: { label: String; value: String }[];
  extraSkills?: { label: String; value: String }[];
  interestedSubjects?: { label: String; value: String }[];
  aboutTeacher?: String;
  address?: { lat: number; lng: number };
  addressString?: String;
}

export type ContainerState = TeacherProfileState;

export type ImportantDocumentTypes =
  | 'universityFile'
  | 'identification'
  | 'eslce';

export type ReducerUploadKeys = ImportantDocumentTypes;

export interface SetUploadProgressPayload {
  objectKey: ReducerUploadKeys;
  value: TPuploadProgress;
}

export interface uploadAFilePayload {
  reduceObjKey: ReducerUploadKeys;
  file: string;
  fileFieldName: ImportantDocumentTypes;
}
