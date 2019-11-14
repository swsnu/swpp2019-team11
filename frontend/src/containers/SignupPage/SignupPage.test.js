import React from 'react';
import { shallow, mount } from 'enzyme';
import { Signup } from './SignupPage';

jest.mock('react-router-dom', () => { 
  return {
    NavLink : jest.fn(props => false),
    withRouter : jest.fn(cls => cls)
  }
})

describe('<signuppage/>', () => {
  
})