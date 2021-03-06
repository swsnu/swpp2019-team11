import React from 'react';
import { shallow } from 'enzyme';
import { MakingItem } from './MakingItem';

describe('<MakingItem />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockpush = jest.fn();
  const mockMST = jest.fn();
  const mockQTT = jest.fn();
  const mockstateSender = jest.fn();
  const mockItemTypeHandler = jest.fn();
  const props = {
    data: {
      title: 'test',
      content: 'content',
      question_type: 'Subjective',
      multiple_choice: true,
      selection: [{ number: 1, content: 'c' }, { number: 2, content: 'asd' }],
    },
    history: {
      push: mockpush,
    },
    cart_list: [{}],
    survey_list: [],
    ongoing_survey_list: [],
    stateSender: mockstateSender,
    question_type: 'Selection',
    multipleSelectionToggler: mockMST,
    questionTypeToggler: mockQTT,
    itemTypeHandler: mockItemTypeHandler,
  };
  const component = shallow(<MakingItem {...props} />);
  const instance = component.instance();
  it('rendering', () => {
    const wrapper = component.find('.MakingItem');
    expect(wrapper.length).toBe(1);
  });
  it('MakingOptions test', () => {
    instance.typeHandler(0, 2);
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
  it('delete selection', () => {
    instance.componentDidUpdate({});
    instance.deleteSelectionHandler(2);
    expect(mockstateSender).toHaveBeenCalledTimes(1);
  });
});
