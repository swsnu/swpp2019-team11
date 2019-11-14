import React from 'react';
import { shallow, mount } from 'enzyme';
import {SearchResultPage, mapDispatchToProps, mapStateToProps} from './SearchResultPage'

describe("<SearchResultPage />", () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnAddCart = jest.fn((id) => new Promise((res, rej)=>{if(id) res(); rej()}))
  const mockOnSurveyDetail = jest.fn()
  const mockCheckLogIn = jest.fn(() => new Promise((res, rej)=>{rej()}))
  const props = {
    history: { push: mockPush },
    onAddCart : mockOnAddCart,
    checklogIn : mockCheckLogIn,
    onSurveyDetail : mockOnSurveyDetail,
    survey_list : [{
      respondant_count : 10,
      survey_start_date : '1999-10-15',
      survey_end_date : '2018-12-12'
    }]
  };
  const component = shallow(<SearchResultPage {...props} />);
  const instance = component.instance();
  it("should render without error", () => {
    const wrapper = component.find('.searchResultPage');
    expect(wrapper.length).toBe(1);
  })
  it("getCartPopup test", () => {
    instance.state.cartPopup = true;
    instance.forceUpdate()
    const wrapper = component.find('.cartPopup')
    expect(wrapper.length).toBe(1)
  })
  
  it("onClickCart Test", () => {
    instance.onClickCart()
    expect(mockOnAddCart).toHaveBeenCalledTimes(1)
  })
  
})

jest.mock('../../components/')

describe("component lifecycle methods test", () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnAddCart = jest.fn((id) => new Promise((res, rej)=>{if(id) res(); rej()}))
  const mockOnSurveyDetail = jest.fn()
  const mockCheckLogIn = jest.fn(() => new Promise((res, rej)=>{rej()}))
  var props = {
    history: { push: mockPush },
    onAddCart : mockOnAddCart,
    checklogIn : mockCheckLogIn,
    onSurveyDetail : mockOnSurveyDetail,
    survey_list : [{
      respondant_count : 10,
      survey_start_date : '1999-10-15',
      survey_end_date : '2018-12-12'
    }]
  };
  var component = mount(<Provider store = {svl : []}><MemoryRouter><SearchResultPage {...props} /></MemoryRouter></Provider>);
  var instance = component.instance();
  it("componentDidMount test", () => {
    expect(mockCheckLogIn).toHaveBeenCalledTimes(1)
  })
  it("component update test", () => {
    instance.setState({startDate : '2020-01-01'})
    instance.forceUpdate()
    const wrapper = component.find('.surveyBlock')
    expect(wrapper.length).toBe(0)
    
  })
})

describe("redux functions testing", () => {
  it("mapStateToProps", () => {
    const initialState = {
      svl : {
        survey_list : []
      }
    }
    expect(mapStateToProps(initialState).survey_list).toEqual(initialState.svl.survey_list)
  })
  it("mapDispatchToProps", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).checklogIn()
    mapDispatchToProps(dispatch).onSurveyDetail()
    mapDispatchToProps(dispatch).onAddCart()
    expect(dispatch).toHaveBeenCalledTimes(3)
    
  })
})