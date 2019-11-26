import React from 'react';
import { shallow } from 'enzyme';
import { MakingPage } from './MakingPage';

describe('MakingPage', () => {
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
    let wrapper = component.find('.ageNotCheck');
    wrapper.simulate('click');
    wrapper = component.find('.genderNotCheck');
    wrapper.simulate('click');
    expect(instance.state.gender_check).toEqual(true);
    expect(instance.state.age_check).toEqual(true);
  });
  it('slider testing', () => {
    const wrapper = component.find('.ageSlider')
  })
});