import React from 'react';
import { shallow } from 'enzyme';
import ItemSelection from './ItemSelection';

describe('ItemSelection', () => {
  it('should render without error', () => {
    const component = shallow(<ItemSelection respondant_id={1} content="content" />);
    const wrapper = component.find('.ItemSelection');
    expect(wrapper.length).toBe(1);
  });
});
