import languages from 'utils/languages.json';
import { getLanguageOptionsArray } from '../../../utils/constants';
const getLanguages = () => {
  const ls: { label: string; value: string }[] = [];
  for (const l in languages) {
    if (languages.hasOwnProperty(l)) {
      ls.push({
        label: `${languages[l].name} (${languages[l].nativeName})`,
        value: l,
      });
    }
  }
  return ls;
};

const filterForm = {
  basic: [
    {
      name: 'language',
      label: 'Language the tutor will be using',
      type: 'multi-select',
      options: getLanguages(),
    },
    {
      name: 'gender',
      label: "Select Tutor's Gender",
      type: 'radio',
      options: [
        { label: 'Both', value: 'both' },
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
      ],
    },
    {
      name: 'env',
      label: 'Tutoring Environment',
      type: 'radio',
      options: [
        { label: 'In person', value: 'inperson' },
        { label: 'Online', value: 'online' },
      ],
    },
    {
      name: 'grade',
      label: 'level',
      type: 'radio',
      options: [
        { label: 'KG - Grade 5', value: 'kg-5' },
        { label: 'Grade 6 - Grade 8', value: '6-8' },
        { label: 'Grade 9 - Grade 12', value: '9-12' },
      ],
    },
  ],
  advanced: [
    {
      name: 'major',
      label: 'Major',
      type: 'select',
      options: [
        { label: 'Computer Science', value: 'cs' },
        { label: 'Software Engineering', value: 'se' },
        { label: 'Information Science', value: 'is' },
      ],
    },
    {
      name: 'level',
      label: 'Study Level',
      type: 'radio',
      options: [
        { label: 'First Degree', value: 'bsc' },
        { label: 'Second Degree', value: 'msc' },
        { label: 'Doctor of Philosophy', value: 'phd' },
      ],
    },
    {
      name: 'cgpa',
      label: 'Last GPA OR C-GPA',
      type: 'radio',
      options: [
        { label: '2.5 - 3.0', value: '2.5 - 3.0' },
        { label: '3.0 - 3.5', value: '3.0 - 3.5' },
        { label: '3.5 - 4.0', value: '3.5 - 4.0' },
      ],
    },
  ],
};
export default filterForm;
