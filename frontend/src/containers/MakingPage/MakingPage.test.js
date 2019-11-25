import React from 'react';
import { shallow, mount } from 'enzyme';
import { MakingPage, mapDispatchToProps } from './MakingPage';

describe('MakingPage', () => {
  const mockPush = jest.fn();
  const props = {
    history:{
      push: mockPush
    }
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
    expect(instance.state.target_check[1]).toEqual("test");
    expect(instance.state.target_check[0].gender).toEqual(1);
  });
});