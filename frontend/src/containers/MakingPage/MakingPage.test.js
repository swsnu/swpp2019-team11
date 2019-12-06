import React from 'react';
import { shallow, mount } from 'enzyme';
import { MakingPage, mapDispatchToProps } from './MakingPage';

describe('MakingPage', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSubmitSurvey = jest.fn();
  const mockCheckLogin = jest.fn();
  const props = {
    history: {
      push: mockPush,
    },
    onSubmitSurvey: mockOnSubmitSurvey,
    checklogIn: mockCheckLogin,
  };
  const component = shallow(<MakingPage {...props} />);
  const instance = component.instance();
  it('makingpage', () => {
    const wrapper = component.find('.MakingPage');
    expect(wrapper.length).toBe(1);
  });
  it('submitbutton', () => {
    const wrapper = component.find('.submitButton');
    wrapper.simulate('click');
    expect(mockPush).toHaveBeenCalledTimes(0);
  });
  it('onchange target resondant count', () => {
    const wrapper = component.find('.targetCount');
    wrapper.simulate('change', { target: { value: 1 } });
    expect(instance.state.response_count).toEqual(1);
  });
  it('checkbox age', () => {
    let wrapper = component.find('.ageCheck');
    wrapper.simulate('click');
    wrapper = component.find('.genderCheck');
    wrapper.simulate('click');
    expect(instance.state.gender_check).toEqual(false);
    expect(instance.state.age_check).toEqual(false);
  });
  it('form select test', () => {
    let wrapper = component.find('.genderSelect');
    wrapper.simulate('change', { target: { value: 'M' } }, { value: 'M' });
    expect(instance.state.target_gender).toEqual('M');
    wrapper = component.find('.ageSelect');
    wrapper.simulate('change', {}, { value: { start: 10, end: 19 } });
    expect(instance.state.target_age[0]).toEqual(10);
  });
  it('survey info', () => {
    let wrapper = component.find('.SurveyContent');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(instance.state.content).toEqual('test');
    wrapper = component.find('.SurveyTitle');
    wrapper.simulate('change', { target: { value: 'test' } });
    expect(instance.state.title).toEqual('test');
  });
  it('Toggler', () => {
    instance.itemTypeHandler(1, 1);
    instance.itemTypeHandler(1, 2);
    instance.itemTypeHandler(1, 3);
    expect(instance.state.item_list[0].question_type).toEqual('Selection');
  });
  it('dataCallBackHandler', () => {
    instance.dataCallBackHandler({ title: 'test', selection_list: [] }, 1);
    instance.addItemHandler();
    expect(instance.state.item_list[0].title).toEqual('test');
  });
});


describe('map', () => {
  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).checklogIn();
    mapDispatchToProps(dispatch).onSubmitSurvey();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

jest.mock('react-dates', () => ({
  SingleDatePicker: () => null,
}));

jest.mock('../../components/MakingPage/MakingItem', () => () => null);
jest.mock('../../components/ProfileButton/ProfileButton', () => () => null);

describe('mount', () => {
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSubmitSurvey = jest.fn();
  const mockCheckLogin = jest.fn(() => new Promise((res) => res()));
  const props = {
    history: {
      push: mockPush,
    },
    onSubmitSurvey: mockOnSubmitSurvey,
    checklogIn: mockCheckLogin,
  };
  const component = mount(<MakingPage {...props} />);
  it('render', () => {
    const wrapper = component.find('.MakingPage');
    expect(wrapper.length).toBe(1);
  });
});
