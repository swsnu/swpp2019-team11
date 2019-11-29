import React from 'react';
import { shallow, mount } from 'enzyme';
import { ResponsingItem } from './ResponsingItem';

describe('<ResponsingItem />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mocksubjectInput = jest.fn();
  const mockItemSelectionClick = jest.fn();
  const props = {
    history: {
      push: mockPush,
    },
    question_type: 'Selection',
    multiple: false,
    subjectInput: mocksubjectInput,
    selection: [{ number: 1, content: '' }],
    itemSelectionClick: mockItemSelectionClick,
    itemClicked: [],
    number: '1',

  };
  const component = shallow(<ResponsingItem {...props} />);
  const instance = component.instance();
  it('should render well', () => {
    const wrapper = component.find('.ResponsingItem');
    expect(wrapper.length).toBe(1);
  });
  it('should subjectInput work', () => {
    const addituonal_props = { question_type: 'Subjective' };
    const wrapper = shallow(<ResponsingItem {...props} {...addituonal_props} />).find('.subjectiveInput');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(mocksubjectInput).toHaveBeenCalledTimes(1);
  });
  it('should checkbox work', () => {
    const addituonal_props = { multiple: true };
    const wrapper = shallow(<ResponsingItem {...props} {...addituonal_props} />).find('.CheckBox');
    wrapper.simulate('click');
    expect(mockItemSelectionClick).toHaveBeenCalledTimes(1);
  });
  it('should radio change', () => {
    instance.radioChange(1);
    instance.componentDidMount();
    expect(mockItemSelectionClick).toHaveBeenCalledTimes(1);
  });
});
