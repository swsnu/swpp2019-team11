import React from 'react';
import { shallow } from 'enzyme';
import { MakingOptions } from './MakingOptions';

describe('<MakingOptions />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockContent = jest.fn();
  const props = {
    id: 1,
    contentHandler: mockContent,
    
  };
  const component = shallow(<MakingOptions {...props} />);
  it('render', () => {
    const wrapper = component.find('.MakingOptions');
    expect(wrapper.length).toBe(1);
  });
  it('simulate change', () => {
    const wrapper = component.find('.OptionInput');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(mockContent).toHaveBeenCalledTimes(1);
  });
});
