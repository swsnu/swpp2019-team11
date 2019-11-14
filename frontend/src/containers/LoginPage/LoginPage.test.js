import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPage from './LoginPage';

describe('<LoginPage/>', () => {
  const state = {
    username:"un",
    password:"1234"
  }
  it('asdf', () => {
    const component =  shallow(<LoginPage/>);
  })
})