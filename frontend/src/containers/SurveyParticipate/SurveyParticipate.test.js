import React from 'react';
import { shallow } from 'enzyme';
import { SurveyParticipate, mapStateToProps, mapDispatchToProps } from './SurveyParticipate';

describe('<SurveyParticipate />', () => {
  const mockPush = jest.fn();
  const mockGetOngoingSurvey = jest.fn();
  const props = {
    history: {
      push: mockPush,
    },
    survey_list: [{
      title: 'test',
      upload_date: '1999/10/15',
    }],
    getOngoingSurvey: mockGetOngoingSurvey,
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
    };
    expect(mapStateToProps(initialState).survey_list).toEqual([]);
  });
  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).checklogIn();
    mapDispatchToProps(dispatch).getSurveyList();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
