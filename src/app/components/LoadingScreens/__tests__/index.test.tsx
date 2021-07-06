import React from 'react';
import { render } from '@testing-library/react';

import { LoadingScreen } from '..';

describe('<LoadingScreens  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LoadingScreen />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
