import React from 'react';
import { shallow } from 'enzyme';
import { MakingItem } from './MakingItem';

describe('<MakingItem />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockpush = jest.fn();
  const mockMST = jest.fn();
  const mockQTT = jest.fn();
  const mockstateSender = jest.fn();
  const props = {
    history: {
      push: mockpush,
    },
    stateSender: mockstateSender,
    question_type: 'Selection',
    multipleSelectionToggler: mockMST,
    questionTypeToggler: mockQTT,
  };
  const component = shallow(<MakingItem {...props} />);
  const instance = component.instance();
  it('rendering', () => {
    const wrapper = component.find('.MakingItem');
    expect(wrapper.length).toBe(1);
  });
  /*
  it('checkbox', () => {
    instance.setState({ questiontype: 'Selection' });
    const wrapper = component.find('.MultipleSelection');
    wrapper.simulate('click');
    expect(mockMST).toHaveBeenCalledTimes(1);
  });
  */
  /*
  it('type toggler', () => {
    const wrapper = component.find('.questionTypeToggler');
    wrapper.simulate('click');
    expect(mockQTT).toHaveBeenCalledTimes(1);
  });
  */
  it('MakingOptions test', () => {
    instance.setState({ questiontype: 'Selection' });
    const wrapper = component.find('.MakingOptions');
    expect(wrapper.length).toEqual(1);
  });
  it('title testing', () => {
    const wrapper = component.find('.title');
    wrapper.simulate('change', { target: { value: '' } });
    expect(mockstateSender).toHaveBeenCalledTimes(1);
  });
  it('selectionContentHandler test', () => {
    instance.selectionContentHandler('content', 1);
    expect(mockstateSender).toHaveBeenCalledTimes(1);
    instance.addSelectionHandler();
    expect(mockstateSender).toHaveBeenCalledTimes(2);
  });
});
