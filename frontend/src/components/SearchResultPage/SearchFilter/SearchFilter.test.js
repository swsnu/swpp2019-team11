import React from 'react'
import {shallow, mount} from 'enzyme'
import SearchFilter from './SearchFilter'

describe('<SearchFilter />', () => {
  beforeEach(()=> {jest.clearAllMocks()})
  const mockPush = jest.fn()
  const mockFilterHandler = jest.fn()
  const props = {
    history : {push : () => mockPush()},
    filterHandler : mockFilterHandler
  }
  const component = shallow(<SearchFilter {...props} />)
  const instance = component.instance()
  it("should render without errors", () => {
    const wrapper = component.find('div.topTag')
    expect(wrapper.length).toBe(1)
  })
  it("button testing", () => {
    const wrapper = component.find('#applyButton')
    console.log(shallow(<SearchFilter {...props} />).find('#applyButton').debug())
    wrapper.simulate('click')
    expect(mockFilterHandler).toHaveBeenCalledTimes(1)
  })
})