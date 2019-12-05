import React from 'react';
import {
  Table, Segment, Header, Grid, Button
} from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';
import ItemResponse from './ItemResponse/ItemResponse';
import ItemSelection from './ItemResponse/ItemSelection';
import Graph from '../../Graph/Graph';

function SurveyItem(props) {
  let isClicked= 0;
  let count =  Array.apply(null, new Array(props.selection.length)).map(Number.prototype.valueOf,0);

  const counting = props.response.map((rs) => {
    count[rs.content-1] = count[rs.content-1] + 1;
  });

  const responses = props.response.map((rs) => (
    <ItemResponse
      respondant_id={rs.respondant_number}
      content={rs.content}
    />
    
  ));

  const selections = props.selection.map((sl) => (
    <ItemSelection
      number={sl.number}
      content={sl.content}
      count={count[sl.number-1]}
    />
  ));

  const graph_block = count.map((data, index) => (
    {'x':index, 'y': data}
  ));


  const graph_radial = count.map((data) => (
    {'angle':data}
  ))
  console.log(graph_radial)
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
              {counting}
              {props.question_type === 'selection' ? selections : responses}
            </Segment>
          </ScrollArea>
        </Table.Body>
      </Table>
      
      <Graph
        graph_block={graph_block}
        count = {count}
        isClicked = {isClicked}
        graph_radial = {graph_radial}
      />
    </Grid>
  );
}

export default SurveyItem;
