import React from 'react';
import { render } from '@testing-library/react';

import SnackBarAlert from '..';

describe('<SnackBarAlert  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SnackBarAlert open message="" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
