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
  const mockSignup = jest.fn((id1, id2, id3)=> new Promise((res, rej)=>{if(id) res(); rej()}))
  const props = {
    signUp: mockSignup
  }

  it('signupPage call', () => {
    const component = shallow(< SignupPage {...props}/>);  //그래도 cover는 되더라고?
  });

  it('onclick cover', () => {
    const mockclick = jest.fn()
    const component = shallow(< SignupPage {...props} signupHandler = {mockclick} />)
    const wrapper = component.find("#signupButton");
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
  });

  it('onchange input', () => {
    const state = {
      username : ''
    }
    const mocksetState = jest.fn();
    const component = mount(<SignupPage {...props} setState = {mocksetState}/>);
    const wrapper = component.find("#emailinput");
    //expect(wrapper.length).toBe(6);
  });
})

describe('mapDispatchToProps', () => {
  it('call', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).signUp();
    expect(dispatch).toHaveBeenCalledTimes(1);
  })
})