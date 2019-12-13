import React from 'react';
import { shallow } from 'enzyme';
import { TableForm, onClickHandler } from './TableForm';

describe('TableForm', () => {
  const props = {
    slide: true,
    content: [
      {
        title: 'mockTitle', author: 'mockAuthor', respondant_count: 1, content: 'mockContent',
      },
    ],
  };
  it('test1', () => {
    const component = shallow(<TableForm {...props} />);
    const wrapper = component.find('#Table');
    expect(wrapper.length).toBe(1);
  });
  it('handler', () => {
    window.location.assign = jest.fn()
    onClickHandler(true, false, 1)
    onClickHandler(false, true, 1)
    onClickHandler(false, false, 1)
    expect(window.location.assign).toHaveBeenCalledTimes(2)
  })
});
