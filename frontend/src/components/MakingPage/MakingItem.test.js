import React from 'react';
import { shallow } from 'enzyme';
import { MakingItem } from './MakingItem';

describe("<MakingItem />", () => {
  const mockpush = jest.fn()
  const mockOnToggleDup = jest.fn()
  const mockOnToggleType = jest.fn()
  const props = {
    history : {
      push : mockpush
    },
    callOptionList : [],
    onToggleDup : mockOnToggleDup,
    onToggleType : mockOnToggleType,
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
    wrapper = component.find()
    expect(mockOnToggleDup).toHaveBeenCalledTimes(1)
  })
  it("selection toggler", () => {
    const wrapper = component.find(".SelectionToggler")
    wrapper.simulate('click')
    expect(mockOnToggleType).toHaveBeenCalledTimes(1)
  })
})