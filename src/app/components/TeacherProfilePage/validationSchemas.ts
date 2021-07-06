import * as yup from 'yup';
import { getLanguageOptionsArray } from 'utils/constants';
import { countWords } from 'app/utils';

const languageOptions = getLanguageOptionsArray();

console.log(languageOptions);

export const teacherProfileValidationSchema = yup.object({
  universityOrCollege: yup.string().optional(),
  startYear: yup.date().optional(),
  endYear: yup
    .date()
    .optional()
    .test({
      test: function (endDate) {
        const startYear = this.resolve(yup.ref('startYear')) || new Date();
        console.log(startYear);
        if (startYear && endDate < startYear) {
          return false;
        }

        return true;
      },
      message: 'End year can not be less than start year',
    }),
  studyLevel: yup.string().optional(),
  major: yup.string().optional(),
  gpa: yup
    .number()
    .positive()
    .max(4, 'GPA Should be lower or equal to 4')
    .min(1, 'GPA shpuld be greater or equal to 1'),

  eslceScore: yup
    .number()
    .optional()
    .min(100, 'ESLCE Score can not be less than 100')
    .max(700, 'ESLCE Score can not be greater than 700'),
  highSchoolName: yup.string().optional(),
  satScore: yup.number().optional(),
  ieltsScore: yup.number().optional(),
  toeflScore: yup.number().optional(),

  haveTutoringExperience: yup
    .string()
    .oneOf(['yes', 'no', ''], 'Experience can only be yes or no')
    .optional(),

  yearsSpentTutoring: yup
    .number()
    .optional()
    .min(0, "Experience year can't be less than 0")
    .max(50, "Experience year can't be greater than 50")
    .optional(),
  tutoringEnvironment: yup
    .string()
    .oneOf(['online', 'inperson', 'both'])
    .optional(),

  willTeachKgToFive: yup.boolean().optional(),
  willTeacSixToEight: yup.boolean().optional(),
  willTeachNineToTwelve: yup.boolean().optional(),

  // ableLanguages: yup.array().of(yup.object().oneOf(languageOptions)).optional(),
  // interestedSubjects: yup.array().of(yup.object().oneOf(subjects)).optional(),
  aboutTeacher: yup
    .string()
    .optional()
    .test({
      test: about => {
        const wordsLength = countWords(about);
        if (wordsLength > 19 || wordsLength === 0) {
          return true;
        }
        return false;
      },
      message: 'A minimum of 20 words is required',
    }),
});
