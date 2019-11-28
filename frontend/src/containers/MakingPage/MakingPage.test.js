import React from 'react';
import { shallow, mount } from 'enzyme';
import { MakingPage } from './MakingPage';

describe('MakingPage', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSubmitSurvey = jest.fn()
  const props = {
    history:{
      push: mockPush
    },
    onSubmitSurvey : mockOnSubmitSurvey
  }
  const component = shallow(<MakingPage {...props} />);
  const instance = component.instance()
  it('makingpage', () => {
    
    const wrapper = component.find('.MakingPage');
    expect(wrapper.length).toBe(1);
  });
  it('submitbutton', () => {
    const wrapper = component.find('.submitButton');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
  it('onchange target resondant count', () => {
    const wrapper = component.find('.targetCount');
    wrapper.simulate('change', { target: { value: 1 }} );
    expect(instance.state.response_count).toEqual(1);
  });
  it('checkbox age', () => {
    let wrapper = component.find('.ageCheck');
    wrapper.simulate('click');
    wrapper = component.find('.genderCheck');
    wrapper.simulate('click');
    expect(instance.state.gender_check).toEqual(true);
    expect(instance.state.age_check).toEqual(true);
  });
  it("form select test", () => {
    let wrapper = component.find('.genderSelect')
    wrapper.simulate('change', {target : {value : 'M'}}, {value : 'M'})
    expect(instance.state.target_gender).toEqual('M')
    wrapper = component.find('.ageSelect')
    wrapper.simulate('change', {}, {value : {start: 10, end : 19}})
    expect(instance.state.target_age[0]).toEqual(10)
  })
  it("survey info", () => {
    let wrapper = component.find(".SurveyContent")
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.content).toEqual('test')
    wrapper = component.find(".SurveyTitle")
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.title).toEqual('test')
  })
  it("multipleSelectionToggler", () => {
    instance.multipleSelectionToggler(1)
    expect(instance.state.item_list[0].multiple_selection).toEqual(true)
  })
});

jest.mock('react-dates', () => {
  return {
    SingleDatePicker : props => {
      props.onDatesChange('test')
      props.onFocusChange({focused : 'test'})
      return null
    }
  }
})

describe("mount", () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSubmitSurvey = jest.fn()
  const props = {
    history:{
      push: mockPush
    },
    onSubmitSurvey : mockOnSubmitSurvey
  }
  const component = mount(<MakingPage {...props} />);
  const instance = component.instance()
  it('render', () => {
    const wrapper = component.find('.MakingPage');
    expect(wrapper.length).toBe(1);
  })
})