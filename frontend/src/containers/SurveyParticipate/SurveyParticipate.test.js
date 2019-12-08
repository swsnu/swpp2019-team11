import React from 'react';
import { shallow } from 'enzyme';
import { SurveyParticipate, mapStateToProps, mapDispatchToProps } from './SurveyParticipate';

describe('<SurveyParticipate />', () => {
  const mockPush = jest.fn();
  const mockGetOngoingSurvey = jest.fn();
  const mockGetSurveyList = jest.fn();
  const mockGetUserInfo = jest.fn();
  const mockCheckIn = jest.fn(() => new Promise((res) => res()));
  const props = {
    history: {
      push: mockPush,
    },
    checklogIn: mockCheckIn,
    survey_list: [{
      title: 'test',
      upload_date: '1999/10/15',
    }],
    getOngoingSurvey: mockGetOngoingSurvey,
    getSurveyList: mockGetSurveyList,
    getUserInfo: mockGetUserInfo,

  };
  const component = shallow(<SurveyParticipate {...props} />);
  it('should render well', () => {
    const wrapper = component.find('.SurveyParticipate');
    expect(wrapper.length).toBe(1);
  });
  it('should button work', () => {
    const wrapper = component.find('#participateButton');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
  it('component functions', () => {
    component.instance().componentDidUpdate({});
    component.instance().componentDidMount();
  });
});

describe('map functions', () => {
  it('mapStateToProps', () => {
    const initialState = {
      svl: {
        ongoing_survey_list: [],
      },
      us: {
        info: {
          username: 'test',
        },
      },
      pt: {
        survey_list: [],
      },
    };
    expect(mapStateToProps(initialState).survey_list).toEqual([]);
  });
  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).checklogIn();
    mapDispatchToProps(dispatch).getSurveyList();
    mapDispatchToProps(dispatch).getOngoingSurvey();
    mapDispatchToProps(dispatch).getUserInfo();
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
