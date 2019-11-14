import React from 'react';
import { shallow } from 'enzyme';
import ItemResponseShort from './ItemResponseShort';

describe("ItemResponseShort", () => {
  it("should render without error", () => {
    const component = shallow(<ItemResponseShort respondant_id = {1} content = 'content' />)
    const wrapper = component.find('.ItemResponseShort')
    expect(wrapper.length).toBe(1)
  })
  
})