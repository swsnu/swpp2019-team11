import React, { Component, createRef } from 'react';
import { Ref } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
import './SurveyParticipate.css';
import { ResponsePage } from '../ResponsePage/ResponsePage';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getSurveyList: () => dispatch(actionCreators.getParticipatingList()),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
  getOngoingSurvey: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
  submitOngoingSurvey: (id, response) => dispatch(actionCreators.participateSurvey(id, response)),
});

export const mapStateToProps = (state) => ({
  survey_list: state.svl.ongoing_survey_list,
  username: state.us.info.username,
  point: state.us.info.point,
  age: state.us.info.age,
  gender: state.us.info.gender,
  survey: state.sv.ongoing_survey,
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

  goingIndividualSur = (id) => {
    //this.props.getOngoingSurvey(id).then(() => this.setState({ pageShow: 'response', clickedSurvey: id }) )
    this.props.getOngoingSurvey(id);
    console.log(id);
    this.setState({ pageShow: 'response', clickedSurvey: id });
    //console.log()
  }

  state= {
    pageShow: 'table',
    clickedSurvey: null,
  }

  render() {
    console.log(this.props)
    if (this.state.pageShow == 'table'){
    return (
      <Ref innerRef={this.contextRef}>
        <div className="SurveyParticipate">
          <TopBar context={this.contextRef} username={this.props.username} point={this.props.point} />
          <div id="underTopbar">
          <table celled id="ParticipateTable">
            <thead id="TableHeader">
              <tr>
                <th>Survey Title</th>
                <th id="dateHeader">Upload Date</th>
                <th id="buttonHeader">Participate</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {this.props.survey_list.map((survey) => {
                if (this.props.gender == survey.target_gender || this.props.gender == null) return (
                <tr id="tableRow" className="tableRow">
                  <td id="titleRow">{ survey.title }</td>
                  <td id="dateRow">{ survey.upload_date }</td>
                  <td id="buttonRow">
                    <button id="participateButton" onClick={() => this.goingIndividualSur(survey.id)}>
                      Participate
                    </button>
                  </td>
                </tr>
              )}) }
            </tbody>
          </table>
          </div>
        </div>
      </Ref>
    );
    }
    else {
      return (
        <ResponsePage survey={this.props.survey} /*submit={(par1, par2) => this.props.submitOngoingSurvey(par1, par2)}*//>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyParticipate);
