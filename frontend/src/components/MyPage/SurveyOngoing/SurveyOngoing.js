import React, { Component } from 'react';
import {
  Grid, Menu, Segment, Sidebar, Table, Button, Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import SurveyTable from '../../SurveyTable/SurveyTable';

export const mapDispatchToProps = (dispatch) => ({
  onSurveyDetail: (id) => dispatch(actionCreators.getSurvey(id)),
});

export const mapStateToProps = (state) => ({
  ongoing_survey_list: state.svl.ongoing_survey_list,
});

export class SurveyOngoing extends Component {
  getContents = () => {
    if (this.props.ongoing_survey_list.length != 0) {
      return(
        this.props.ongoing_survey_list.map((cur) => (
                <SurveyTable survey={cur} search={false} />
        ))
      )
    }
        else {
      return (<Grid><h2> The ongoing survey list is Empty! </h2></Grid>);
    }
  };

  render() {
    return (
      <div className = "surveyOngoing_list">
        <h2>Ongoing Survey</h2><br/>
        <Table celled definition style = {{borderRadius: 0, width:1300, height:150, 'font-size':2, outline: '0.1rem solid', outlineColor: '#DEDEDF'}}>
          <Table.Header>
            <Table.Row style ={{'font-size':'20pt'}}>
              <Table.HeaderCell/>
              <Table.HeaderCell>Survey Title</Table.HeaderCell>
              <Table.HeaderCell>Survey author</Table.HeaderCell>
              <Table.HeaderCell>Survey respondant_count</Table.HeaderCell>
              <Table.HeaderCell>Survey content</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          
          <Table.Body>
            {this.getContents()} <br />
          </Table.Body>
          
          <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='5'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyOngoing);
