import React from 'react';
import { mount, shallow } from 'enzyme';
import {ProfileButton, mapDispatchToProps} from './ProfileButton';

describe('<ProfileButton />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockLogOut = jest.fn(() => new Promise((res, rej) => {res()}))
  const props = {
    history: { push: () => mockPush() },
    logOut: mockLogOut
  };
  const component = shallow(<ProfileButton {...props} />);
  it('should render without errors', () => {
    const wrapper = component.find('.DropDownClass');
    expect(wrapper.length).toBe(1);
  });
  it('myCart button should work', () => {
    const wrapper = component.find('.myCart');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
  it('logout button should work', () => {
    const wrapper = component.find('.logOut');
    wrapper.simulate('click');
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
  it("mapDispatchToProps test", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).logOut()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
});

