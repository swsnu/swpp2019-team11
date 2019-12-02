import React from 'react';
import { shallow } from 'enzyme';
import { SignupPage, mapDispatchToProps } from './SignupPage';


jest.mock('react-router-dom', () => ({
  NavLink: jest.fn(() => false),
  withRouter: jest.fn((cls) => cls),
}));

describe('<signupPage/>', () => {
  const mockSignup = jest.fn(() => new Promise((res) => { res(); }));
  const mockPush = jest.fn()
  const props = {
    signUp: mockSignup,
    history : {
      push : mockPush
    }
  };

  it('signupPage call', () => {
    shallow(<SignupPage {...props} />);
  });

  it('onclick cover', () => {
    const component = shallow(<SignupPage {...props} />);
    const wrapper = component.find('#signupButton');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
  });

  it('onchange email input', () => {
    const component = shallow(<SignupPage {...props} />);
    const instance = component.instance();
    const wrapper = component.find('.Email');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(instance.state.email).toEqual('test');
  });
  it('onchange PC input', () => {
    const component = shallow(<SignupPage {...props} />);
    const instance = component.instance();
    const wrapper = component.find('.PasswordComfirmation');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(instance.state.password_confirmation).toEqual('test');
  });
  it('onchange Password input', () => {
    const component = shallow(<SignupPage {...props} />);
    const instance = component.instance();
    const wrapper = component.find('.Password');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(instance.state.password).toEqual('test');
  });
  it('onchange username input', () => {
    const component = shallow(<SignupPage {...props} />);
    const instance = component.instance();
    const wrapper = component.find('.UserName');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(instance.state.username).toEqual('test');
  });
  it('signup handler testing', () => {
    const component = shallow(<SignupPage {...props} />);
    const instance = component.instance();
    const wrapper = component.find('.ageInput')
    wrapper.simulate('change', {target : {value : 20}})
    expect(instance.state.age).toEqual(20);
  })
  it("validate finished", () => {
    const component = shallow(<SignupPage {...props} />);
    const instance = component.instance();
    const wrapper = component.find('.genderInput')
    wrapper.simulate('change', {}, {value : 'M'})
    instance.state.age = 'falseage'
    instance.state.email = '11@naver.com'
    instance.state.password = 'test'
    instance.state.password_confirmation = 'test'
    instance.state.username = 'jangsus1'
    instance.validate()
    instance.signupHandler()
    expect(mockPush).toHaveBeenCalledTimes(0)
  })
});


describe('mapDispatchToProps', () => {
  it('call', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).signUp();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
