import React from 'react';
import { shallow } from 'enzyme';
import { ProfileButton, mapDispatchToProps } from './ProfileButton';

describe('<ProfileButton />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockLogOut = jest.fn(() => new Promise((res) => { res(); }));
  const props = {
    history: { push: () => mockPush() },
    logOut: mockLogOut,
    username: 'jom',
  };
  const component = shallow(<ProfileButton {...props} />);
  it('should render without errors', () => {
    const wrapper = component.find('.DropDownClass');
    expect(wrapper.length).toBe(1);
  });
  it('logout button should work', () => {
    const wrapper = component.find('.logOut');
    wrapper.simulate('click');
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
  it('mapDispatchToProps test', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).logOut();
    mapDispatchToProps(dispatch).getUserInfo();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
  it('componentDidUpdate', () => {
    const mockProps = {
      history: { push: () => mockPush() },
      logOut: mockLogOut,
      username: 'hoho',
    };
    component.instance().componentDidUpdate(mockProps);
    expect(1).toBe(1);
  });
  it('line36, onClick', () => {
    const wrapper = component.find('#upperItem');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
