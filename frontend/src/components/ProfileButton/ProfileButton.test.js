import React from 'react'
import {shallow, mount} from 'enzyme'
import {ProfileButton} from './ProfileButton'

describe('<ProfileButton />', ()=> {
  beforeEach(()=> {jest.clearAllMocks()})
  const props = {
    history : {push : jest.fn()}
  }
  const component = mount(<ProfileButton {...props} />)
  const instance = component.instance()
  it('should render without errors', () => {
    const wrapper = component.find('.DropDownClass')
    expect(wrapper.length).toBe(3)
  })
  it('button should work', () => {
    const wrapper = component.find('.DropDownClass')[1]
    wrapper.simulate('click')
    expect(props.history.push).toHaveBeenCalledTimes(1);
  })
})