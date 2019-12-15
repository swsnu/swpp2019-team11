import React from 'react';
import {
  Table, Segment, Header, Grid,
} from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';
import ItemResponse from './ItemResponse/ItemResponse';
import ItemSelection from './ItemResponse/ItemSelection';
import Graph from '../../Graph/Graph';
import './SurveyItem.css';

const SurveyItem = (props) => {
  const count = props.selection.map(() => 0);

  props.response.map((rs) => {
    count[rs.content - 1] = count[rs.content - 1] + 1;
  });

  const responses = props.question_type == 'Subjective' ? (
    props.response.map((rs) => (
      <ItemResponse
        respondant_id={rs.respondant_number}
        content={rs.content}
      />
    ))
  ) : (
    props.selection.map((se) => (
      <ItemSelection
        selection_number={se.number}
        content={se.content}
        count={count[se.number - 1]}
      />
    ))
  );

  const tickValues = props.selection.map((sl) => (sl.number));
  const question_type = (props.question_type == 'Subjective' ? 'Short Answer' : (props.multiple_choice ? 'Checkbox' : 'Radio'));
  const graph_block = count.map((data, index) => (
    { x: index + 1, y: data }
  ));


  const graph_radial = count.map((data, index) => (
    { angle: data, label: index + 1 }
  ));
  return (
    <Grid padded className="SurveyItem">
      <Grid.Row>
        <Grid.Column>
          <Segment style={{ 'font-size': '1em', backgroundColor: '#E0E7E9' }}>
            <Header id="title" style={{ color: '#354649', 'font-size': '2.1em', margin: 5 }}>
Q
              {props.number}
.
              {' '}
              {props.title}
            </Header>
            <p id="qtype" style={{ textAlign: 'right', 'font-size': '1.4em' }}>
        Question Type :
              {' '}
              {question_type}
            </p>
            <Table id="table" size="huge" celled style={{ border: 'none' }}>
              <Table.Body>
                <Segment>
                  <Grid>
                    <Grid.Row id="gridrow">
                      <ScrollArea className="resScroll" speed={0.8} horizontal={false} style={{ maxHeight: 300, border: 'none' }}>
                        <Segment id="responseSeg" style={{ padding: -20 }}>
                          {responses}
                        </Segment>
                      </ScrollArea>
                      <div id="int" />
                      <div className="outerGraph">
                        {props.question_type === 'Selection' && (
                        <Graph
                          id="Graph"
                          graph_block={graph_block}
                          count={count}
                          graph_radial={graph_radial}
                          tickValues={tickValues}
                        />
                        )}
                      </div>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SurveyItem;
