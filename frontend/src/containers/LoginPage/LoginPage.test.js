import React from 'react';
import { shallow, mount } from 'enzyme';
import { LoginPage } from './LoginPage';
import {mapDispatchToProps, mapStateToProps} from './LoginPage';

jest.mock('react-router-dom', () => { 
  return {
    NavLink : jest.fn(props => false),
    withRouter : jest.fn(cls => cls)
  }
})

describe('<LoginPage/>', () => {
  const state = {
    username:"un",
    password:"1234"
  }
  const mocklogin = jest.fn((id1, id2)=> new Promise((res, rej)=>{if(id) res(); rej()}))
  const mockpush = jest.fn();
  const mockonchange = jest.fn();
  const props = {
    logIn : mocklogin, //mapdispatchtoprops
    history : mockpush
  };
  
  it('loginpage call', () => {
    const component = shallow(<LoginPage {...props}/>);
  })

  it('loginHandler', () => {
    const mockclick = jest.fn()
    const component = shallow(<LoginPage {...props } loginHandler = {mockclick}/>);
    const wrapper = component.find("#loginbutton");
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(mocklogin).toHaveBeenCalledTimes(1);
  })

  it('onchange', () => {
    const mocksetState = jest.fn();
    const component = mount(<LoginPage {...props} setState = {mocksetState}/>);
    const event = {target: {username: "un"}}
    const wrapper = component.find("#usernameinput");
    expect(wrapper.length).toBe(4);
  })


})


describe('mapdispatchtoprops', () => {
  it ("dispatch", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).logIn();
    expect(dispatch).toHaveBeenCalledTimes(1);
  })
})