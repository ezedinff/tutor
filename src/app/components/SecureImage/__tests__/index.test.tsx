import React from 'react';
import { render } from '@testing-library/react';

import { SecureImage } from '..';

describe('<SecureImage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<SecureImage route="" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
