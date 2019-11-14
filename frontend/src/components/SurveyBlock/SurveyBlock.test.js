import React from 'react';
import { shallow } from 'enzyme';
import {SurveyBlock} from './SurveyBlock';

describe("SurveyBlock", () => {
  it("should render without error", () => {
    const mockOnClickCart = jest.fn()
    const mockPush = jest.fn()
    const props = {
      history : {
        push : mockPush
      },
      search : true,
      survey : {
        title : 'title',
        author : 'name',
        respondant_count : 10,
        upload_date : '1999',
        survey_start_date : '1999',
        survey_end_date : '1999',
      },
      onClickCart : mockOnClickCart 
    }
    const component = shallow(<SurveyBlock {...props} />)
    const wrapper = component.find('.SurveyBlock')
    expect(wrapper.length).toBe(1)
  })
  it("segment should be pressed", () => {
    const mockOnClickCart = jest.fn()
    const mockPush = jest.fn()
    const props = {
      history : {
        push : mockPush
      },
      search : true,
      survey : {
        title : 'title',
        author : 'name',
        respondant_count : 10,
        upload_date : '1999',
        survey_start_date : '1999',
        survey_end_date : '1999',
      },
      onClickCart : mockOnClickCart 
    }
    const component = shallow(<SurveyBlock {...props} />)
    const wrapper = component.find('.clickSegment')
    wrapper.simulate('click')
    expect(mockPush).toHaveBeenCalledTimes(1)
  })
  it("cart button should be pressed", () => {
    const mockOnClickCart = jest.fn()
    const mockPush = jest.fn()
    const props = {
      history : {
        push : mockPush
      },
      search : true,
      survey : {
        title : 'title',
        author : 'name',
        respondant_count : 10,
        upload_date : '1999',
        survey_start_date : '1999',
        survey_end_date : '1999',
      },
      onClickCart : mockOnClickCart 
    }
    const component = shallow(<SurveyBlock {...props} />)
    const wrapper = component.find('.cartButton')
    wrapper.simulate('click')
    expect(mockOnClickCart).toHaveBeenCalledTimes(1)
  })
})