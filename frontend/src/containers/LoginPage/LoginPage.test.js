import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPage from './LoginPage';

describe('<LoginPage/>', () => {
  const state = {
    username:"un",
    password:"1234"
  }
  it('asdf', () => {
    const component = mount(<LoginPage/>);
    const wrapper = component.find('.login');
    expect(wrapper.length).toBe(1);
  })
})