import React, { Component } from 'react';
import {
  Grid, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import SurveyBlock from '../../SurveyBlock/SurveyBlock';

export const mapDispatchToProps = (dispatch) => ({
  onSurveyDetail: (id) => dispatch(actionCreators.getSurvey(id)),
});

export const mapStateToProps = (state) => ({
  ongoing_survey_list: state.svl.ongoing_survey_list,
});

export class SurveyOngoing extends Component {
  getContents = () => {
    if (this.props.ongoing_survey_list.length != 0) {
      return (
        this.props.ongoing_survey_list.map((cur) => (
          <Grid>
            <Grid columns={1}>
              <Grid.Column style={{ minWidth: 830 }}>
                <SurveyBlock survey={cur} search={false} />
              </Grid.Column>
            </Grid>
          </Grid>
        ))
      ); } else {
      return (<Grid><h2> The ongoing survey list is Empty! </h2></Grid>);
    }
  };

  render(){
    return (
      <div className = "surveyOngoing_list">
        <h2>Ongoing Survey</h2>
          {this.getContents()} <br />
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveyOngoing);