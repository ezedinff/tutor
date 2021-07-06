import React from 'react';
import { render } from '@testing-library/react';

import { LoadableButton } from '..';

describe('<LoadableButton  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<LoadableButton loading />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
