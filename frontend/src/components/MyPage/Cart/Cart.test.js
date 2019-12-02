import React from 'react';
import { shallow } from 'enzyme';
import { Cart } from './Cart';

describe('<Cart />', () => {
  const mockPush = jest.fn();
  const props = {
    history: { push: mockPush },
    cart_list: [{
      title: 'test',
      item: [],
    }],
  };
  const component = shallow(<Cart {...props} />);
  it('should render well', () => {
    const wrapper = component.find('.surveyOngoing_list');
    expect(wrapper.length).toBe(1);
  });
});
