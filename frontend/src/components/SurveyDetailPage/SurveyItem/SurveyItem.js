import React from 'react';
import {
  Table, Segment, Header, Grid,
} from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';
import ItemResponse from './ItemResponse/ItemResponse';
import ItemSelection from './ItemResponse/ItemSelection';
import Graph from '../../Graph/Graph';

function SurveyItem(props) {
  const responses = props.response.map((rs) => {
      return (
        <ItemResponse
          respondant_id={rs.respondant_number}
          content={rs.content}
        />
      );
    })

  const selections = props.selection.map((sl) => {
    return (
      <ItemSelection
        number = {sl.number}
        content = {sl.content}
      />
    )
  })

  return (
    <Grid className="SurveyItem">
      <Table
        celled
        color="teal"
        size="huge"
        style={{
          margin: 30, 'font-size': '1em',
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Header style={{ color: '#00B5AD', 'font-size': '2em' }}>
Q
                {props.number}
.
                {' '}
                {props.title}
              </Header>
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
              {props.question_type === 'selection' ? selections : responses}
            </Segment>
          </ScrollArea>
        </Table.Body>
      </Table>
        <Graph />
    </Grid>
  );
}

export default SurveyItem;
