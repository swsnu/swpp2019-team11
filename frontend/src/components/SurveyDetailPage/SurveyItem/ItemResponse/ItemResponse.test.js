import React from 'react';
import { shallow } from 'enzyme';
import ItemResponse from './ItemResponse';

describe("ItemResponse", () => {
  it("should render without error", () => {
    const component = shallow(<ItemResponse respondant_id = {1} content = 'content' />)
    const wrapper = component.find('.ItemResponse')
    expect(wrapper.length).toBe(1)
  })
  
})