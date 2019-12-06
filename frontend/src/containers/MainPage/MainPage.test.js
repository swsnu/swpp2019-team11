import React from 'react';
import { shallow, mount } from 'enzyme';
import { MainPage, mapDispatchToProps } from './MainPage';


jest.mock('../../components/SearchBar/SearchBar', () => () => null);
jest.mock('../../components/ProfileButton/ProfileButton', () => () => null);
describe('MainPage', () => {
  const mockPush = jest.fn();
  const mockGetUserInfo = jest.fn();
  const mockCheckLogIn = jest.fn(() => new Promise((res, rej) => rej()));
  const props = {
    history: {
      push: mockPush,
    },
    checklogIn: mockCheckLogIn,
    getUserInfo: mockGetUserInfo,
  };
  it('should render without errors', () => {
    const component = shallow(<MainPage {...props} />);
    const wrapper = component.find('.MainPage');
    expect(wrapper.length).toBe(1);
  });
  it('button should work', () => {
    const component = shallow(<MainPage {...props} />);
    const wrapper = component.find('.AddSurveyButton');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
  it('should mount well', () => {
    mount(<MainPage {...props} />);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
  it('matchDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getUserInfo();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
