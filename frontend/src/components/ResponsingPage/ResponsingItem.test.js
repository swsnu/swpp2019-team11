import React from 'react';
import { shallow } from 'enzyme';
import { ResponsingItem } from './ResponsingItem';

describe('<ResponsingItem />', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mocksubjectInput = jest.fn();
  const mockResponse = jest.fn()
  const props = {
    history: {
      push: mockPush,
    },
    question_type: 'Selection',
    multiple: false,
    subjectInput: mocksubjectInput,
    selection: [{ number: 1, content: '' }],
    itemClicked: [],
    number: '1',
    response : mockResponse,

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
    expect(mockResponse).toHaveBeenCalledTimes(1);
  });
  it('should click work', () => {
    instance.click(0)
    expect(mockResponse).toHaveBeenCalledTimes(1)
  });
  it('should checkbox work', () => {
    const addituonal_props = { multiple : true };
    const wrapper = shallow(<ResponsingItem {...props} {...addituonal_props} />).find('.CheckBox');
    wrapper.simulate('click');
    expect(mockResponse).toHaveBeenCalledTimes(1);
  });
  it('component should mount well', () => {
    instance.componentDidMount()
    expect(instance.state.check_response).toEqual([false])
  });
});
