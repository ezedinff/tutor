import React from 'react';
import { render } from '@testing-library/react';

import { AvatarChanger } from '..';

describe('<AvatarChanger  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AvatarChanger />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
