import React from 'react';
import { shallow, mount } from 'enzyme';
import { LoginPage } from './LoginPage';
import {mapDispatchToProps, mapStateToProps} from './LoginPage';
//import { jssPreset } from '@material-ui/core';


jest.mock('react-router-dom', () => {
  return {
    NavLink : jest.fn(props => false),
    withRouter : jest.fn(props => false)
  }
})
/*jest.mock('react-redux', () => {
  return {
    connect: jest.fn((a,b)=> a)
  }
})*/

describe('<LoginPage/>', () => {
  const state = {
    username:"un",
    password:"1234"
  }
  const mocklogin = jest.fn();
  const props = {
    logIn : mocklogin //mapdispatchtoprops
  };
  
  it('login', () => {
    const component = shallow(<LoginPage {...props}/>);
  })
})


describe('mapdispatchtoprops', () => {
  /*const mockPush = jest.fn();
  const state = {
    username: "jj",
    password: "pw"
  }
  const props = {
    history: {push: mockPush}
  }*/
  const username = "jj"
  const password = "pw"
  it ("dispatch", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).logIn();
    expect(dispatch).toHaveBeenCalledTimes(3);
  })
})