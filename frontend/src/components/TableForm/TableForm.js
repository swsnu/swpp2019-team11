import React from 'react';
import {
  Menu, Table, Icon, Checkbox,
} from 'semantic-ui-react';
import './TableForm.css';


const onClickHandler = (participating, ongoing, id) => {
  if(!participating){
    if (ongoing) {
      window.location.assign(`/ongoingsurvey/${id}/`);
    } 
    else {
      window.location.assign(`/survey/${id}/`);
    }
  }
};

export const TableForm = (props) => (
  <Table
    celled
    selectable
    fixed
    singleLine
    definition
    textAlign="center"
    id="Table"
    style={{
      borderRadius: 0, outline: '0.1rem solid', outlineColor: '#DEDEDF',
    }}
  >
    <Table.Header id="Header">
      <Table.Row style={{ 'font-size': '14pt' }}>
        { props.slide && <Table.HeaderCell />}
        <Table.HeaderCell id="headerTitle">Survey Title</Table.HeaderCell>
        <Table.HeaderCell id="headerAuthor">Survey Date</Table.HeaderCell>
        <Table.HeaderCell id="headerResp">Total Respondants</Table.HeaderCell>
        {props.ongoing && <Table.HeaderCell id="headerResp">Target Respondants</Table.HeaderCell>}
        <Table.HeaderCell id="headerContent">Survey content</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body id="Body">
      {props.content.map((cur) => (
        <Table.Row style={{ cursor: 'pointer' }} onClick={() => { onClickHandler(props.participating, props.ongoing, cur.id); }}>
          { props.slide
          && (
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          )}
          <Table.Cell id="bodyTitle">{cur.title}</Table.Cell>
          <Table.Cell>
            {cur.survey_start_date}
~
            {cur.survey_end_date}
          </Table.Cell>
          <Table.Cell>{cur.respondant_count}</Table.Cell>
          {props.ongoing && <Table.Cell>{cur.target_respondant_count}</Table.Cell>}
          <Table.Cell>{cur.content}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export default TableForm;
