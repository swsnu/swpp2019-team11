import React, { Component } from 'react';
import {
  Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
import './SurveyParticipate.css';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getSurveyList: (keyw) => { dispatch(actionCreators.getOngoingSurveyList()); },
});
export const mapStateToProps = (state) => ({
  survey_list: state.svl.ongoing_survey_list,
});

export class SurveyParticipate extends Component {
  componentDidMount() {
    this.props.getSurveyList(' ');
  }

  render() {
    return (
      <div className="SurveyParticipate">
        <TopBar />
        <table celled id={"ParticipateTable"}>
          <thead id={"TableHeader"}>
            <tr>
              <th>Survey Title</th>
              <th id={"dateHeader"}>Upload Date</th>
              <th id={"buttonHeader"}>Participate</th>
            </tr>
          </thead>
          <tbody>
            {this.props.survey_list.map((survey) => (
              <tr>
                <td id={"titleRow"}>{ survey.title }</td>
                <td id={"dateRow"}>{ survey.upload_date }</td>
                <td id={"buttonRow"}>
                  <button id={"participateButton"} onClick={() => this.props.history.push(`/responsing/${survey.id}/`)}>
                    Participate
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyParticipate);