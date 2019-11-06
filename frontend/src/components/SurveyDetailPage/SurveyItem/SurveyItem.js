import React from 'react';
import { Table, Segment } from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';
import ItemResponse from './ItemResponse/ItemResponse';
import ItemResponseShort from './ItemResponse/ItemResponseShort';

function SurveyItem(props) {
  const responses = props.response.map((rs) => {
    if (props.question_type === 'Selection') {
      return (
        <ItemResponse
          respondant_id={rs.respondant_id}
          content={rs.content}
        />
      );
    }
    return (
      <ItemResponseShort
        respondant_id={rs.respondant_id}
        content={rs.content}
      />
    );
  });

  return (
    <div style={{ width: '1000px' }}>
      <Table
        celled
        color="teal"
        style={{
          width: '800px', margin: 20, 'font-size': '1.5em',
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{ color: '#00B5AD' }}>
          Q.
              {' '}
              {props.title}
              <p style={{ textAlign: 'right', color: 'black', 'font-size': '0.7em' }}>
            type :
                {' '}
                {props.question_type}
              </p>
            </Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body style={{ width: '790px' }}>
          <ScrollArea speed={0.8} horizontal={false} style={{ maxHeight: 250, border: 'none' }}>
            <Segment style={{ padding: -20, border: 'none' }}>
              {responses}
            </Segment>
          </ScrollArea>
        </Table.Body>
      </Table>

    </div>
  );
}

export default SurveyItem;
