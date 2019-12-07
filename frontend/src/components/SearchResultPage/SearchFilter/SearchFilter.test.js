import React from 'react';
import { shallow } from 'enzyme';
import SearchFilter from './SearchFilter';

describe('<SearchFilter />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockFilterHandler = jest.fn();
  const props = {
    history: { push: () => mockPush() },
    filterHandler: mockFilterHandler,
  };
  const component = shallow(<SearchFilter {...props} />);
  const instance = component.instance();
  it('should render without errors', () => {
    const wrapper = component.find('div.topTag');
    expect(wrapper.length).toBe(1);
  });
  it('button testing', () => {
    const wrapper = component.find('.ApplyButton');
    wrapper.simulate('click');
    expect(mockFilterHandler).toHaveBeenCalledTimes(1);
  });
  it('handleSlider testing', () => {
    instance.handleSlider(null, 'a');
    expect(instance.state.respondant).toEqual('a');
  });
  it('formatFunction testing', () => {
    expect(instance.formatFunction('1000')).toEqual('1000+');
    expect(instance.formatFunction('500')).toEqual('500');
  });
});
