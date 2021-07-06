export interface CollegeInfoObj {
  universityOrCollege: String;
  startYear: Date;
  endYear: Date;
  studyLevel: 'bsc' | 'msc' | 'phd' | '' | undefined;
  major: String;
  gpa: number | null;
}

export type TeacherProfileForms =
  | 'college'
  | 'highschool'
  | 'experience'
  | 'prference'
  | 'moreinfo';

export interface referenceObjType {
  fullName: String;
  email?: String | undefined;
  phoneNumber: String;
  phoneError: boolean;
}
