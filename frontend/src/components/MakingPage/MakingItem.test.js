import React from 'react';
import { shallow } from 'enzyme';
import { MakingItem } from './MakingItem';

describe("<MakingItem />", () => {
  const mockpush = jest.fn()
  const props = {
    history : {
      push : mockpush
    }
  }
  const component = shallow(<MakingItem {...props} />)
  it("rendering", () => {
    const wrapper = component.find('.MakingItem')
    expect(wrapper.length).toBe(1)
  })
  it("checkbox", () => {
    const wrapper = component.find(".MultipleSelection")
    wrapper.simulate('click')
    expect()

  })
})