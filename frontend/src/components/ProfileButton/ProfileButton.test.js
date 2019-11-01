import React from 'react'
import {shallow, mount} from 'enzyme'
import {ProfileButton} from './ProfileButton'
import { debuglog } from 'util'

describe('<ProfileButton />', ()=> {
  beforeEach(()=> {jest.clearAllMocks()})
  const mockPush = jest.fn()
  const props = {
    history : {push : () => mockPush()}
  }
  const component = mount(<ProfileButton {...props} />)
  const instance = component.instance()
  it('should render without errors', () => {
    const wrapper = component.find('.DropDownClass')
    expect(wrapper.length).toBe(3)
  })
  it('button should work', () => {
    const wrapper = component.find('.DropDownClass').at(1)
    console.log(mount(<ProfileButton />).find('.DropDownClass').at(1).debug({ ignoreProps: true }))
    wrapper.simulate('click')
    expect(mockPush).toHaveBeenCalledTimes(1);
  })
})