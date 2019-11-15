import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage, mapDispatchToProps } from './LoginPage';


jest.mock('react-router-dom', () => ({
  NavLink: jest.fn(() => false),
  withRouter: jest.fn((cls) => cls),
}));

describe('<LoginPage/>', () => {
  const mocklogin = jest.fn((id) => new Promise((res, rej) => { if (id) res(); rej(); }));
  const mockpush = jest.fn();
  const props = {
    logIn: mocklogin,
    history: mockpush,
  };

  it('loginpage call', () => {
    shallow(<LoginPage {...props} />);
  });

  it('loginHandler', () => {
    const component = shallow(<LoginPage {...props} />);
    const wrapper = component.find('#loginbutton');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(mocklogin).toHaveBeenCalledTimes(1);
  });

  it('onchange', () => {
    const component = shallow(<LoginPage {...props} />);
    const wrapper = component.find('.UserName').first();
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(component.instance().state.username).toEqual('test');
  });
});


describe('mapdispatchtoprops', () => {
  it('dispatch', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).logIn();
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
