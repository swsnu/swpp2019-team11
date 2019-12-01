import React from 'react';
import { shallow } from 'enzyme';
import { ResponsingOptionRadio } from './ResponsingOptionRadio';

describe('< ResponsingOptionRadio />', () => {
  const mockRadioChange = jest.fn();
  const props = {
    content: 'content',
    checked: true,
    radioChange: mockRadioChange,
  };
  const component = shallow(<ResponsingOptionRadio {...props} />);
  it('should render well', () => {
    const wrapper = component.find('#OptionRadio');
    expect(wrapper.length).toBe(1);
  });
  it('should button work', () => {
    const wrapper = component.find('.Radio');
    wrapper.simulate('click');
    expect(mockRadioChange).toHaveBeenCalledTimes(1);
  });
});
