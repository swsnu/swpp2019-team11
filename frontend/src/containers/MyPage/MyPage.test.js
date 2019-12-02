import React from 'react';
import { shallow } from 'enzyme';
import { MyPage } from './MyPage';

describe("<Mypage >", () => {
  const props = {

  }
  const component = shallow(<MyPage {...props}/>)
  it("should render well", () => {
    const wrapper = component.find('.myPage')
    expect(wrapper.length).toBe(1)
  })
  it("item click should work", () => {
    let wrapper = component.find('.OngoingSurvey')
    let instance = component.instance()
    wrapper.simulate('click')
    wrapper = component.find('.CompletedSurvey')
    wrapper.simulate('click')
    wrapper = component.find('.Cart')
    wrapper.simulate('click')
    expect(instance.state.clickedMenu).toEqual(2)
  })
})