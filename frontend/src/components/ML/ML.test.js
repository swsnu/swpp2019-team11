import React from 'react';
import { shallow } from 'enzyme';
import ML from './ML';

describe('<ML />', () => {
  const props = {
    survey: [{

    }],
  };
  const component = shallow(<ML {...props} />);
  it('rendering', () => {
    const wrapper = component.find('.ML');
    expect(wrapper.length).toBe(1);
  });
});
