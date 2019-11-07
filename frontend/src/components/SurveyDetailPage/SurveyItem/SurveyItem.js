import React from 'react';
import { Table, Segment, Header, Grid } from 'semantic-ui-react';
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
    <Grid>
      <Table
        celled
        color="teal"
        size = 'huge'
        style={{
          margin: 30, 'font-size': '1em', 
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >
              <Header style={{ color: '#00B5AD', 'font-size' : '2em' }}>Q{props.number}.{' '}{props.title}</Header>
              <p style={{ textAlign: 'right', color: 'black', 'font-size': '1.4em' }}>
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

    </Grid>
  );
}

export default SurveyItem;
