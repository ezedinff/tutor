import React from 'react';
import { render } from '@testing-library/react';

import MultiSelector from '..';
import { ValueType } from 'react-select';

describe('<MultiSelector  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <MultiSelector
        options={[]}
        onChange={(v: ValueType<any>) => {}}
        placeholder="test"
      />,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
