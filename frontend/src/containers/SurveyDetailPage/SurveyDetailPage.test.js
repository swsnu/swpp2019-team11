import React from 'react';
import { shallow, mount } from 'enzyme';
import { mapStateToProps, mapDispatchToProps, SurveyDetailPage } from './SurveyDetailPage';

const mockCSVconverter = jest.fn();
jest.mock('../../components/CSVconverter/CSVconverter.js', () => () => mockCSVconverter);
jest.mock('../../components/TopBar/TopBar.js', () => jest.fn(() => null));


describe('SearchDetailPage', () => {
  global.URL.createObjectURL = jest.fn();
  beforeEach(() => { jest.clearAllMocks(); });
  const mockPush = jest.fn();
  const mockOnSurveyDetail = jest.fn();
  const mockCheckLogIn = jest.fn(() => new Promise((res, rej) => { rej(); }));
  const props = {
    history: { push: mockPush },
    checklogIn: mockCheckLogIn,
    onSurveyDetail: mockOnSurveyDetail,
    survey: {
      title: '',
      id: 1,
      respondant_count: 10,
      survey_start_date: '1999-10-15',
      survey_end_date: '2018-12-12',
      item: [
        {
          response: [

          ],
          selection : []
        },
      ],
    },
  };
  const component = mount(<SurveyDetailPage {...props} />);
  it('should render without error', () => {
    const wrapper = component.find('.surveyDetailPage');
    expect(wrapper.length).toBe(1);
  });
  it('download button test', () => {
    const wrapper = component.find('.downloadButton').at(0);
    wrapper.simulate('click');
    expect(mockCSVconverter).toHaveBeenCalledTimes(0);
  });
  it('componentDidMount test', () => {
    mount(<SurveyDetailPage {...props} />);
    expect(mockCheckLogIn).toHaveBeenCalledTimes(1);
  });
  it('should not render if undefined ', () => {
    props.survey = undefined;
    const component = shallow(<SurveyDetailPage {...props} />);
    props.survey = {
      title: '',
      id: 1,
      respondant_count: 10,
      survey_start_date: '1999-10-15',
      survey_end_date: '2018-12-12',
      item: [
        {
          response: [

          ],
        },
      ],
    };
    expect(component.find('.surveyDetailPage').length).toBe(0);
  });
});

describe('redux functions testing', () => {
  it('mapStateToProps', () => {
    const initialState = {
      sv: {
        survey: {},
      },
    };
    expect(mapStateToProps(initialState).survey).toEqual(initialState.sv.completed_survey);
  });
  it('mapDispatchToProps', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).checklogIn();
    mapDispatchToProps(dispatch).onSurveyDetail();
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
