import React from 'react';
import { shallow, mount } from 'enzyme';
import { SignupPage } from './SignupPage';
import { mapDispatchToProps } from './SignupPage';

jest.mock('react-router-dom', () => { 
  return {
    NavLink : jest.fn(props => false),
    withRouter : jest.fn(cls => cls)
  }
})

describe('<signupPage/>', () => {
  const mockSignup = jest.fn(()=> new Promise((res)=>{res()}))
  const props = {
    signUp: mockSignup
  }

  it('signupPage call', () => {
    shallow(< SignupPage {...props}/>); 
  });

  it('onclick cover', () => {
    const component = shallow(< SignupPage {...props}/>)
    const wrapper = component.find("#signupButton");
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
  });

  it('onchange email input', () => {
    const component = shallow(<SignupPage {...props}/>);
    const instance = component.instance()
    const wrapper = component.find(".Email");
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.email).toEqual('test')
  });
  it('onchange PC input', () => {
    const component = shallow(<SignupPage {...props}/>);
    const instance = component.instance()
    const wrapper = component.find(".PasswordComfirmation");
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.password_confirmation).toEqual('test')
  });
  it('onchange Password input', () => {
    const component = shallow(<SignupPage {...props}/>);
    const instance = component.instance()
    const wrapper = component.find(".Password");
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.password).toEqual('test')
  });
  it('onchange username input', () => {
    const component = shallow(<SignupPage {...props}/>);
    const instance = component.instance()
    const wrapper = component.find(".UserName");
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.username).toEqual('test')
  });
})


describe('mapDispatchToProps', () => {
  it('call', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).signUp();
    expect(dispatch).toHaveBeenCalledTimes(1);
  })
})