import React from 'react';
import { Table } from 'semantic-ui-react';
import ItemResponse from './ItemResponse/ItemResponse';

function SurveyItem(props) {
  const responses = props.response.map(rs => {
    return (
        <ItemResponse
            respondant_id={rs.respondant_id}
            content={rs.content}
        />
    );
  });

  return(
  <div style = {{width : '1000px'}}>
    <Table celled color={'teal'} style={{
      width: '800px', margin: 20,'font-size': '1.5em',
    }}
    >
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell style={{color: '#00B5AD'}}>
          Q. {props.title} <br />
        </Table.HeaderCell>
        <Table.Cell style={{ width : '230px','font-size':'0.7em'}}>
          question_type : {props.question_type}
        </Table.Cell>

        </Table.Row>
      </Table.Header>
      <Table.Body style = {{width : '790px'}}>
      {responses}
      </Table.Body>
    </Table>

  </div>
  )
};

export default SurveyItem;
