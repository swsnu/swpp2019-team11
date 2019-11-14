import React from 'react';
import { mount, shallow } from 'enzyme';
import {TopBar, mapDispatchToProps} from './TopBar';

describe("TopBar", () => {
  it("searchbar render", () => {
    const mockPush = jest.fn()
    const component = shallow(<TopBar searchBar = {true} history = {{push : mockPush}} />)
    const wrapper = component.find('.TopBar')
    expect(wrapper.length).toBe(1)
  })
  it("searchbar not render", () => {
    const mockPush = jest.fn()
    const component = shallow(<TopBar searchBar = {false} history = {{push : mockPush}} />)
    const wrapper = component.find('.TopBar')
    expect(wrapper.length).toBe(1)
  })
  it("button simulation", () => {
    const mockPush = jest.fn()
    const component = shallow(<TopBar searchBar = {true} history = {{push : mockPush}} />)
    const wrapper = component.find('.logo')
    wrapper.simulate('click')
    expect(mockPush).toHaveBeenCalledTimes(1)
  })
  
})