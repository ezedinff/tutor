import React from 'react';
import { render } from '@testing-library/react';

import { TeacherSchedulePage } from '..';

describe('<TeacherSchedulePage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<TeacherSchedulePage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
