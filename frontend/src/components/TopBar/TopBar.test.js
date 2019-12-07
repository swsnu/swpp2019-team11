import React from 'react';
import { shallow } from 'enzyme';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  it('searchbar render', () => {
    const component = shallow(<TopBar searchBar history={{ push: mockPush }} />);
    const wrapper = component.find('.TopBar');
    expect(wrapper.length).toBe(1);
  });
  it('searchbar not render', () => {
    const component = shallow(<TopBar searchBar={false} history={{ push: mockPush }} />);
    const wrapper = component.find('.TopBar');
    expect(wrapper.length).toBe(1);
  });
  it('button simulation', () => {
    const component = shallow(<TopBar searchBar history={{ push: mockPush }} />);
    let wrapper = component.find('.logo');
    wrapper.simulate('click');
    wrapper = component.find('.Participate');
    wrapper.simulate('click');
    wrapper = component.find('.Making');
    wrapper.simulate('click');
    wrapper = component.find('.Mypage');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(4);
  });
});
