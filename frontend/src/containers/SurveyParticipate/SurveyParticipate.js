import React, { Component } from 'react';
import {
  Table
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
 
export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getSurveyList: (keyw) => {dispatch(actionCreators.getSurveyList(keyw));},
});
export const mapStateToProps = (state) => ({
  survey_list : state.svl.survey_list,
});

export class SurveyParticipate extends Component{
  componentDidMount(){
    this.props.getSurveyList(' ');
  }

  render(){
    return(
      <div className="SurveyParticipate">
        <TopBar/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Survey Title</Table.HeaderCell>
              <Table.HeaderCell>Upload Date</Table.HeaderCell>
              <Table.HeaderCell>Participate</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.props.survey_list.map((survey)=> (
            <Table.Row> 
              {() => alert(this.props.survey_list.length)}
              <Table.Cell>{ survey.title }</Table.Cell>
              <Table.Cell>{ survey.upload_date }</Table.Cell>
              <Table.Cell  /*onClick = {()=> { }}*/>
                <button >
                Participate
                </button>
              </Table.Cell>
            </Table.Row>))
          }
          </Table.Body>
        </Table>
      </div>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SurveyParticipate);