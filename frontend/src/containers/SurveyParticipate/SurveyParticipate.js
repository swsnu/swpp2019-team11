import React, { Component, createRef } from 'react';
import {
  Ref, Segment, Grid, Header, Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
import './SurveyParticipate.css';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getSurveyList: () => dispatch(actionCreators.getParticipatingList()),
  getOngoingSurvey: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});
export const mapStateToProps = (state) => ({
  survey_list: state.svl.ongoing_survey_list,
  username: state.us.info.username,
  point: state.us.info.state,
});

export class SurveyParticipate extends Component {
  contextRef = createRef()

  componentDidMount() {
    this.props.getSurveyList();
    this.props.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.forceUpdate();
    }
  }

  participateHandler = (id) => {
    this.props.getOngoingSurvey(id);
    this.props.history.push('/responsing/');
  }

  render() {
    return (
      <Ref innerRef={this.contextRef}>
        <div className="SurveyParticipate">
          <TopBar context={this.contextRef} username={this.props.username} point={this.props.point} />
          <Grid padded>
            <Grid.Row id="underTopbar" columns={1}>
              <Grid.Column>
                <table celled id="ParticipateTable">
                  <thead id="TableHeader">
                    <tr>
                      <th>Survey Title</th>
                      <th id="dateHeader">Upload Date</th>
                      <th id="countHeader">current</th>
                      <th id="buttonHeader">Participate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.survey_list.map((survey) => (
                      <tr>
                        <td id="titleRow">{ survey.title }</td>
                        <td id="dateRow">{ survey.upload_date }</td>
                        <td id="countRow">
                          {survey.respondant_count}{" / "}{survey.target_respondant_count}
                        </td>
                        <td id="buttonRow">
                          <button id="participateButton" onClick={() => this.participateHandler(survey.id)}>
                        Participate
                          </button>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
                {this.props.survey_list.length == 0 && (
                <Segment placeholder block style={{ textAlign: 'center' }}>
                  <Header icon>
                    <Icon name="x" />
                    There are no Surveys available to Participate
                  </Header>

                </Segment>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </Ref>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyParticipate);
