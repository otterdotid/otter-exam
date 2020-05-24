import React from 'react';
import { render } from '@testing-library/react';

import Select from './Select';

describe('<Select />', () => {
  it('renders without crash', () => {
    const wrapper = render(<Select />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });
});
