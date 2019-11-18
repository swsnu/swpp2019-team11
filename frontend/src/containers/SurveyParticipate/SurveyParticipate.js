import React, { Component } from 'react';
import {
  Grid, Menu, Segment, Sidebar
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';

export class SurveyParticipate extends Component{
  render(){
    return(
      <div className = "SurveyParticipate">
        <TopBar/>
      </div>
    );
  }
};
export default SurveyParticipate;