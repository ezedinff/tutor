import React from 'react';
import { render } from '@testing-library/react';

import BulletListItem from '..';

describe('<BulletListItem  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<BulletListItem />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
