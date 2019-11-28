import React from 'react';
import { shallow } from 'enzyme';
import { MakingItem } from './MakingItem';

describe("<MakingItem />", () => {
  const mockpush = jest.fn()
  const mockOnToggleDup = jest.fn()
  const mockOnToggleType = jest.fn()
  const mockOptionList = jest.fn()
  const mockItemTitle = jest.fn()
  const props = {
    history : {
      push : mockpush
    },
    callOptionList : [{id : 1}],
    onToggleDup : mockOnToggleDup,
    onToggleType : mockOnToggleType,
    optionList : mockOptionList,
    itemTitle : mockItemTitle,
  }
  const component = shallow(<MakingItem {...props} />)
  const instance = component.instance()
  it("rendering", () => {
    const wrapper = component.find('.MakingItem')
    expect(wrapper.length).toBe(1)
  })
  it("checkbox", () => {
    instance.setState({questiontype : "Selection"})
    let wrapper = component.find(".MultipleSelection")
    wrapper.simulate('click')
    expect(mockOnToggleDup).toHaveBeenCalledTimes(1)
    
  })
  it("selection toggler", () => {
    const wrapper = component.find(".SelectionToggler")
    wrapper.simulate('click')
    expect(mockOnToggleType).toHaveBeenCalledTimes(1)
  })
  it("MakingOptions test", () => {
    instance.setState({questiontype : "Selection"})
    const wrapper = component.find('.MakingOptions')
    expect(wrapper.length).toEqual(1)
  })
  it("call back function testing", () => {
    const data = 'test_data'
    instance.parentCallBackContent(data, 1)
    expect(mockOptionList).toHaveBeenCalledTimes(1)
  })
  it('title testing', () => {
    const wrapper = component.find(".Title")
    wrapper.simulate('change', {target : {value : ""}})
    expect(mockItemTitle).toHaveBeenCalledTimes(1)
  })
})