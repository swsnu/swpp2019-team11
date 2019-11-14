import React from 'react';
import { shallow, mount } from 'enzyme';
import {mapStateToProps, mapDispatchToProps, SurveyDetailPage} from './SurveyDetailPage'

describe('SearchResultPage Shallow', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSurveyDetail = jest.fn()
  const mockCheckLogIn = jest.fn(() => new Promise((res, rej)=>{rej()}))
  const props = {
    history: { push: mockPush },
    checklogIn : mockCheckLogIn,
    onSurveyDetail : mockOnSurveyDetail,
    survey : {
      id : 1,
      respondant_count : 10,
      survey_start_date : '1999-10-15',
      survey_end_date : '2018-12-12'
    }
  };
  const component = shallow(<SurveyDetailPage {...props} />);
  const instance = component.instance();
  it("should render without error", () => {
    const wrapper = component.find('.surveyDetailPage');
    expect(wrapper.length).toBe(1);
  })
})