import React from 'react';
import { shallow, mount } from 'enzyme';
import { MakingPage, mapDispatchToProps } from './MakingPage';

describe('MakingPage', () => {
  const mockPush = jest.fn();
  const mockSubmit = jest.fn();
  const mocktoggle = jest.fn();
  const mocksetstate = jest.fn();
  const submitHandler = mockSubmit;
  const targetToggleHandler = (id) => mocktoggle;
  const setState = mocksetstate;
  const props = {
    history:{
      push: mockPush
    }
  }
  it('makingpage', () => {
    const component = shallow(<MakingPage />);
    const wrapper = component.find('.MakingPage');
    expect(wrapper.length).toBe(1);
  });
  it('submitbutton', () => {
    const component = shallow(<MakingPage {...submitHandler}{...props} />);
    const wrapper = component.find('.submitButton');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
  it('onchange target people', () => {
    const component = shallow(<MakingPage {...setState} />)
    const wrapper = component.find('.targetCount');
    wrapper.simulate('change', { target: { value: test }} );
    expect(mocksetstate).toHaveBeenCalledTimes(0);
  });
  it('checkbox age', () => {
    const component = shallow(<MakingPage {...targetToggleHandler(1)}{...props} />);
    const wrapper = component.find('.ageNotCheck');
    wrapper.simulate('click');
    expect(mocktoggle).toHaveBeenCalledTimes(0);
  });
});