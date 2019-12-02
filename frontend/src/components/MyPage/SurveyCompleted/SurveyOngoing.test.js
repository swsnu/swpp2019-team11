import React from 'react';
import { shallow } from 'enzyme';
import { SurveyCompleted } from './SurveyCompleted';

describe("<SurveyCompleted />", () => {
  const mockPush = jest.fn()
  const props = {
    history : {push : mockPush},
    survey_list : [{
      title : 'test',
      item : []
    }]
  }
  const component = shallow(<SurveyCompleted {...props}/>)
  it("should render well", () => {
    const wrapper = component.find('.surveyOngoing_list')
    expect(wrapper.length).toBe(1)
  })
})