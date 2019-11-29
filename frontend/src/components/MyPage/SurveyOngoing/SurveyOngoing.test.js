import React from 'react';
import { shallow } from 'enzyme';
import { SurveyOngoing, mapDispatchToProps } from './SurveyOngoing';

describe('<SurveyOngoing />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const props = {
    history: {
      push: mockPush,
    },
    ongoing_survey_list: [],
  };
  const component = shallow(<SurveyOngoing {...props} />);
  it('should render well', () => {
    const wrapper = component.find('.surveyOngoing_list');
    expect(wrapper.length).toBe(1);
  });
});
