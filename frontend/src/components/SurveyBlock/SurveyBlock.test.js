import React from 'react';
import { shallow } from 'enzyme';
import { SurveyBlock } from './SurveyBlock';

describe('SurveyBlock', () => {
  const mockOnClickCart = jest.fn();
  const mockPush = jest.fn();
  const mockSurveyClicked = jest.fn();
  const props = {
    history: {
      push: mockPush,
    },
    surveyClicked: mockSurveyClicked,
    search: true,
    survey: {
      title: 'title',
      author: 'name',
      respondant_count: 10,
      upload_date: '1999',
      survey_start_date: '1999',
      survey_end_date: '1999',
    },
    onClickCart: mockOnClickCart,
  };
  const component = shallow(<SurveyBlock {...props} />);
  it('should render without error', () => {
    const wrapper = component.find('.SurveyBlock');
    expect(wrapper.length).toBe(1);
  });
  it('segment should be pressed', () => {
    const wrapper = component.find('.clickSegment');
    wrapper.simulate('click');
    expect(mockSurveyClicked).toHaveBeenCalledTimes(1);
  });
  it('cart button should be pressed', () => {
    const wrapper = component.find('.cartButton');
    wrapper.simulate('click');
    expect(mockOnClickCart).toHaveBeenCalledTimes(1);
  });
});
