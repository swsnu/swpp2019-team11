import React from 'react'
import {shallow, mount} from 'enzyme'
import {ProfileButton} from './ProfileButton'

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
  it('myCart button should work', () => {
    const wrapper = component.find('.myCart').at(1)
    wrapper.simulate('click')
    expect(mockPush).toHaveBeenCalledTimes(1);
  })
  it('logout button should work', () => {
    const wrapper = component.find('.logOut').at(1)
    wrapper.simulate('click')
    expect(mockPush).toHaveBeenCalledTimes(1);
  })
})