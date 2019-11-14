import React from 'react';
import { mount, shallow } from 'enzyme';
import {SearchBar, mapDispatchToProps} from './SearchBar'

describe("SearchBar", () => {
  const mockOnSearch = jest.fn()
  const mockPush = jest.fn()
  const props = {
    onSearch : mockOnSearch,
    size : 'big',
    history : {
      push : mockPush
    }
  }
  const component = shallow(<SearchBar {...props} />)
  it("should work", () => {
    const spy = jest.spyOn(component.instance(), 'enterListener')
    const wrapper = component.find('.SearchBar')
    const instance = component.instance()
    expect(wrapper.length).toBe(1)
    wrapper.simulate('keypress', {key: 'up'})
    expect(spy).toHaveBeenCalledTimes(1)
    wrapper.simulate('change', {target : {value : 'test'}})
    expect(instance.state.value).toEqual('test')
    wrapper.simulate('keypress', {key: 'Enter'})
    expect(spy).toHaveBeenCalledTimes(2)
  })
  it("mount should work", () => {
    let component = mount(<SearchBar {...props} />)
    const instance = component.instance()
    const wrapper = component.find('.searchButton').at(0)
    wrapper.simulate('click')
    expect(mockOnSearch).toHaveBeenCalledTimes(0)
    instance.state.value = 'test'
    wrapper.simulate('click')
    expect(mockOnSearch).toHaveBeenCalledTimes(1)
  })
  it("map", () => {
    const dispatch = jest.fn()
    mapDispatchToProps(dispatch).onSearch()
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})

