export const weekDays = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const possibleChoices = [
  '',
  'Morning Before noon',
  'Afternoon 12-5pm',
  'Evening After 5pm',
];
export const initial = [0, 1, 2, 3].map(row => {
  return weekDays.map((d, i) => ({
    name: i ? d : possibleChoices[row],
    [`${d}-${row}`]: false,
    type: 'checkbox',
  }));
});
export const scheduleInitalValue = values => {
  const r = {};
  values.forEach((row, rowIndex) => {
    row.forEach((column, i) => {
      r[`${column.label}`] = rowIndex && i ? false : undefined;
    });
  });
  return r;
};

export const schedules = {
  desktop: [
    [{ label: '' }].concat(
      weekDays.filter(d => d !== '').map(d => ({ label: `${d}` })),
    ),
    [{ label: 'Morning Before noon' }].concat(
      weekDays
        .filter(d => d !== '')
        .map(d => ({ label: `${d}-1`, value: false })),
    ),
    [{ label: 'Afternoon 12-5pm' }].concat(
      weekDays
        .filter(d => d !== '')
        .map(d => ({ label: `${d}-2`, value: false })),
    ),
    [{ label: 'Evening After 5pm' }].concat(
      weekDays
        .filter(d => d !== '')
        .map(d => ({ label: `${d}-3`, value: false })),
    ),
  ],
  mobile: [
    [{ label: '' }].concat(
      possibleChoices.filter(d => d !== '').map(d => ({ label: `${d}` })),
    ),
    [{ label: 'Mon' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Mon-${index + 1}`, value: false })),
    ),
    [{ label: 'Tue' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Tue-${index + 1}`, value: false })),
    ),
    [{ label: 'Wed' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Wed-${index + 1}`, value: false })),
    ),
    [{ label: 'Thu' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Thu-${index + 1}`, value: false })),
    ),
    [{ label: 'Fri' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Fri-${index + 1}`, value: false })),
    ),
    [{ label: 'Sat' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Sat-${index + 1}`, value: false })),
    ),
    [{ label: 'Sun' }].concat(
      possibleChoices
        .filter(d => d !== '')
        .map((d, index) => ({ label: `Sun-${index + 1}`, value: false })),
    ),
  ],
};
const getGradeOptions = [
  'kindergarten',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
].map((v, i) => ({ label: i ? `${v} Grade` : v, value: v }));
export const requestForm = [
  {
    name: 'grade',
    label: 'Grade Level',
    type: 'select',
    options: getGradeOptions,
  },
  {
    name: 'location',
    label: 'Exact Location',
    type: 'text',
  },
];
