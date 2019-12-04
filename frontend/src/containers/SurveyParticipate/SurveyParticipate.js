import React, { Component, createRef } from 'react';
import { Ref } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
import './SurveyParticipate.css';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getSurveyList: () =>  dispatch(actionCreators.getParticipatingList()),
  getOngoingSurvey: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
});
export const mapStateToProps = (state) => ({
  survey_list: state.svl.ongoing_survey_list,
});

export class SurveyParticipate extends Component {
  contextRef = createRef()

  componentDidMount() {
    this.props.getSurveyList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.forceUpdate();
    }
  }

  participateHandler = (id) => {
    this.props.getOngoingSurvey(id)
    this.props.history.push(`/responsing/`)
  }

  render() {
    return (
      <Ref innerRef={this.contextRef}>
        <div className="SurveyParticipate">
          <TopBar context={this.contextRef} />
          <table celled id="ParticipateTable">
            <thead id="TableHeader">
              <tr>
                <th>Survey Title</th>
                <th id="dateHeader">Upload Date</th>
                <th id="buttonHeader">Participate</th>
              </tr>
            </thead>
            <tbody>
              {this.props.survey_list.map((survey) => (
                <tr>
                  <td id="titleRow">{ survey.title }</td>
                  <td id="dateRow">{ survey.upload_date }</td>
                  <td id="buttonRow">
                    <button id="participateButton" onClick={() => this.participateHandler(survey.id) }>
                      Participate
                    </button>
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </Ref>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyParticipate);
