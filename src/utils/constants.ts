import { MultiSelectorOptionType } from 'app/components/MultiSelector/types';
import languages from './languages.json';

export const roles = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
};

export const rolesOnPlatform = ['student', 'teacher', 'parent'];
export const authTokenName = '_da_to';
export const refereshTokenName = '_s_iud';
export const API_URL = '/api';

export const getLanguageOptionsArray = () => {
  const languagesArray: MultiSelectorOptionType[] = [];
  for (const code in languages) {
    if (Object.prototype.hasOwnProperty.call(languages, code)) {
      const language = languages[code];
      if (language.name && language.nativeName) {
        const { name, nativeName } = language;
        languagesArray.push({ label: `${name} (${nativeName})`, value: code });
      }
    }
  }

  return languagesArray;
};

export const subjects = [
  { label: 'Amharic', value: 'amharic' },
  { label: 'English', value: 'english' },
  { label: 'Maths', value: 'maths' },
  { label: 'Biology', value: 'biology' },
  { label: 'Chemistry', value: 'chemistry' },
  { label: 'Physics', value: 'physics' },
  { label: 'Geography', value: 'geography' },
  { label: 'History', value: 'history' },
  { label: 'Accounting', value: 'accounting' },
  { label: 'Management', value: 'management' },
  { label: 'Computers', value: 'computers' },
];

export const extraSkills = [
  { label: 'Music', value: 'music' },
  { label: 'Drawing', value: 'drawing' },
  { label: 'Computer', value: 'computer' },
];
