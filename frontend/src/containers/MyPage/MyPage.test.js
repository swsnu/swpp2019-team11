import React from 'react';
import { shallow } from 'enzyme';
import { MyPage, mapDispatchToProps, mapStateToProps } from './MyPage';

describe('<Mypage >', () => {
  const mockPush = jest.fn();
  const props = {
    checklogIn: jest.fn(() => new Promise((res) => res())),
    getSurveyOngoing: jest.fn(),
    getCart: jest.fn(),
    getSurveyAll: jest.fn(),
    getUserInfo: jest.fn(),
    history: {
      push: mockPush,
    },
  };
  const component = shallow(<MyPage {...props} />);
  it('should render well', () => {
    const wrapper = component.find('.myPage');
    expect(wrapper.length).toBe(1);
  });
  it('item click should work', () => {
    let wrapper = component.find('.OngoingSurvey');
    const instance = component.instance();
    wrapper.simulate('click');
    wrapper = component.find('.CompletedSurvey');
    wrapper.simulate('click');
    wrapper = component.find('.Cart');
    wrapper.simulate('click');
    expect(instance.state.clickedMenu).toEqual(2);
  });
  it('clickedMenu check', () => {
    const instance = component.instance();
    instance.state.clickedMenu = 0;
    instance.forceUpdate();
    instance.state.clickedMenu = 1;
    instance.forceUpdate();
    instance.state.clickedMenu = 2;
    instance.forceUpdate();
    const wrapper = component.find('.myPage');
    expect(wrapper.length).toBe(1);
  });
  it('component functions', () => {
    const instance = component.instance();
    instance.componentDidMount();
    instance.componentDidUpdate({});
    expect(mockPush).toHaveBeenCalledTimes(0);
  });
});

describe('map function', () => {
  it('mapStateToProps', () => {
    const initialState = {
      ct: {
        survey_list: [],
      },
      svl: {
        survey_list: [],
        ongoing_survey_list: [],
      },
      us: {
        info: {
          username: 'test',
          point: 100,
        },
      },
    };
    const map = mapStateToProps(initialState);
    expect(map.cart_list).toEqual([]);
    expect(map.survey_list).toEqual([]);
    expect(map.ongoing_survey_list).toEqual([]);
    expect(map.username).toEqual('test');
    expect(map.point).toEqual(100);
  });
  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).checklogIn();
    mapDispatchToProps(dispatch).getCart();
    mapDispatchToProps(dispatch).getSurveyOngoing();
    mapDispatchToProps(dispatch).getUserInfo();
    mapDispatchToProps(dispatch).getSurveyAll();
    expect(dispatch).toHaveBeenCalledTimes(5);
  });
});
