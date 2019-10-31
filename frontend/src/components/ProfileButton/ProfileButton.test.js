import React from 'react'
import {shallow, mount} from 'enzyme'
import ProfileButton from './ProfileButton'
import {MemoryRouter} from 'react-router-dom'

describe('<ProfileButton />', ()=> {
  beforeEach(()=> {jest.clearAllMocks()})
  const props = {

  }
  const component = shallow(<MemoryRouter><ProfileButton {...props} /></MemoryRouter>)
  const instance = component.instance()
  it('should render without errors', () => {
    const wrapper = component.find('.Dropdown')
    expect(wrapper.length).toBe(1)
  })
})