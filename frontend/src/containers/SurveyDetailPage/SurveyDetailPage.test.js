import React from 'react';
import { shallow, mount } from 'enzyme';
import {mapStateToProps, mapDispatchToProps, SurveyDetailPage} from './SurveyDetailPage'
import CSVconverter from '../../components/CSVconverter/CSVconverter';

const mockCSVconverter = jest.fn()


describe('SearchDetailPage Shallow', () => {

  jest.mock('../../components/CSVconverter/CSVconverter.js', () => {
    return (func, survey, bool) => {
      return mockCSVconverter
    }
  })
  global.URL.createObjectURL = jest.fn();
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSurveyDetail = jest.fn()
  const mockCheckLogIn = jest.fn(() => new Promise((res, rej)=>{rej()}))
  const props = {
    history: { push: mockPush },
    checklogIn : mockCheckLogIn,
    onSurveyDetail : mockOnSurveyDetail,
    survey : {
      title : '',
      id : 1,
      respondant_count : 10,
      survey_start_date : '1999-10-15',
      survey_end_date : '2018-12-12',
      item : [
        {response : [

        ]}
      ],
    }
  };
  const component = shallow(<SurveyDetailPage {...props} />);
  const instance = component.instance();
  it("should render without error", () => {
    const wrapper = component.find('.surveyDetailPage');
    expect(wrapper.length).toBe(1);
  })
  it("download button test", () => {
    const wrapper = component.find('.downloadButton')
    wrapper.simulate('click')
    expect(mockCSVconverter).toHaveBeenCalledTimes(1)
  })
})

