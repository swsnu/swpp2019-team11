import React from 'react';
import {
  Table, Checkbox,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export const SurveyTable = (props) => (
  <Table.Row>
    <Table.Cell collapsing>
      <Checkbox slider />
    </Table.Cell>
    <Table.Cell>{props.survey.title}</Table.Cell>
    <Table.Cell>{props.survey.author}</Table.Cell>
    <Table.Cell>{props.survey.respondant_count}</Table.Cell>
    <Table.Cell>{props.survey.content}</Table.Cell>
  </Table.Row>
);


export default withRouter(SurveyTable);
