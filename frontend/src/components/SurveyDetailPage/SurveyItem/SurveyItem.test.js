import React from 'react';
import { shallow } from 'enzyme';
import SurveyItem from './SurveyItem';

describe('SurveyItem', () => {
  it('should render without error', () => {
    const props = {
      question_type: 'Selection',
      response: [
        {
          respondant_id: 1,
          content: 1,
        },
      ],
      selection: [{ number: 1, content: 'yes' }],
    };
    const component = shallow(<SurveyItem {...props} />);
    const wrapper = component.find('.SurveyItem');
    expect(wrapper.length).toEqual(1);
  });
  it('should render without error', () => {
    const props = {
      question_type: 'Subjective',
      response: [
        {
          respondant_id: 1,
          content: 'sadas',
        },
      ],
      selection: [],
    };
    const component = shallow(<SurveyItem {...props} />);
    const wrapper = component.find('.SurveyItem');
    expect(wrapper.length).toEqual(1);
  });
});
