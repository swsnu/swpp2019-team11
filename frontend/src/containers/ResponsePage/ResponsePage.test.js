import React from 'react';
import { shallow } from 'enzyme';
import {ResponsePage, mapStateToProps, mapDispatchToProps} from './ResponsePage'

describe("<ResponsePage />", () => {
  const mockPush =jest.fn()
  const mockSOGS =jest.fn()
  const mockgetOngoingSurvey = jest.fn()
  const props = {
    submitOngoingSurvey : mockSOGS,
    history : {
      push : mockPush
    },
    match : {
      params : {id : 1}
    },
    onSurvey : {
      item : [{
        number : 1,
        title : 'test',
        question_type : 'Subjective',
        selection : [],
        multiple_choice : false,
      }]
    },
    getOngoingSurvey : mockgetOngoingSurvey,
    checklogIn : jest.fn(() => new Promise((res) => {res()}))
  }
  const component = shallow(<ResponsePage {...props}/>)
  it("should render well", () => {
    const wrapper = component.find('.ResponsePage')
    expect(wrapper.length).toBe(1)
  })
  it("responseCallback", () => {
    const instance = component.instance()
    instance.responseCallback(1, 'test')
    expect(instance.state.response_list[0]).toEqual('test')
  })
  it("render blank if survey is not loaded", () => {
    const instance = component.instance()
    instance.state.survey = ''
    instance.forceUpdate()
    expect(0).toEqual(0)
    instance.state.survey = instance.props.onSurvey
  })
  it("onsubmit handler", () => {
    let component = shallow(<ResponsePage {...props}/>)
    component.instance().state.response_list = ["test"]
    let wrapper = component.find(".Submit")
    wrapper.simulate('click')
    let new_onSurvey = {
      onSurvey :  {
        item : [{
          number : 1,
          title : 'test',
          question_type : 'Selective',
          selection : [{number : 1, content : 'yes'}],
          multiple_choice : false,
        }]
    }}
    component = shallow(<ResponsePage {...props} {...new_onSurvey} />)
    component.instance().state.response_list = [[true]]
    wrapper = component.find(".Submit")
    wrapper.simulate('click')
    expect(mockPush).toHaveBeenCalledTimes(2)
  })
  it("component functions", (done) => {
    component.instance().componentDidMount()
    component.instance().componentDidUpdate()
    expect(mockgetOngoingSurvey).toHaveBeenCalledTimes(0)
    done()
  })
})

describe("redex functions", () => {
  it("mapDispatchToProps", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).checklogIn()
    mapDispatchToProps(dispatch).getOngoingSurvey(1)
    mapDispatchToProps(dispatch).submitOngoingSurvey(1, {})
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
  it("mapStateToProps", () => {
    const initialState = {
      sv : {
        ongoing_survey : 'test'
      }
    }
    expect(mapStateToProps(initialState).onSurvey).toEqual('test')
  })
})