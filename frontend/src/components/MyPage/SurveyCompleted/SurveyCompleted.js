import React, { Component } from 'react';
import {
  Grid, Menu, Segment, Sidebar, Table, Button, Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import SurveyTable from '../../SurveyTable/SurveyTable';

export const mapStateToProps = (state) => ({
  survey_list: state.svl.survey_list,
});

export class SurveyCompleted extends Component {
  getContents = () => {
    if (this.props.survey_list.length != 0) {
      return(
        this.props.survey_list.map((cur) => (
                <SurveyTable survey={cur} search={false} />
        ))
      )
    }
        else {
      return (<p>The completed survey list is Empty!</p>);
    }
  };

  render(){
    return(
      <div className = "surveyOngoing_list">
        <h2>Completed Survey</h2><br/>
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
    )
  }

};

export default connect(mapStateToProps, null)(SurveyCompleted);
