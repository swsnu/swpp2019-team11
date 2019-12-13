import React from 'react';
import {
  Table, Segment, Header, Grid,
} from 'semantic-ui-react';
import ScrollArea from 'react-scrollbar';
import ItemResponse from './ItemResponse/ItemResponse';
import ItemSelection from './ItemResponse/ItemSelection';
import Graph from '../../Graph/Graph';

const SurveyItem = (props) => {
  const count = props.selection.map(() => 0);

  props.response.map((rs) => {
    count[rs.content - 1] = count[rs.content - 1] + 1;
  });

  const responses = props.response.map((rs) => (
    props.question_type == 'Subjective'
      ? (
        <ItemResponse
          respondant_id={rs.respondant_number}
          content={rs.content}
        />
      )
      : (
        <ItemSelection
          respondant_id={rs.respondant_number}
          content={rs.content}
        />
      )

  ));

  const tickValues = props.selection.map((sl) => (sl.number));
  const question_type = (props.question_type == 'Subjective' ? 'Short Answer' : (props.multiple_choice ? 'Checkbox' : 'Radio'));
  const graph_block = count.map((data, index) => (
    { x: index + 1, y: data }
  ));


  const graph_radial = count.map((data, index) => (
    { angle: data, label: (props.question_type == 'Subjective' ? (null) : (props.selection[index].content)) }
  ));
  return (
    <Grid padded className="SurveyItem">
      <Grid.Row>
        <Grid.Column>
          <Segment style={{ 'font-size': '1em', backgroundColor: '#E0E7E9' }}>
            <Header style={{ color: '#354649', 'font-size': '2em', margin: 5 }}>
Q
              {props.number}
.
              {' '}
              {props.title}
            </Header>
            <p style={{ textAlign: 'right', 'font-size': '1.4em' }}>
        Question Type :
              {' '}
              {question_type}
            </p>
            <Table size="huge" celled style={{ border: 'none' }}>
              <Table.Body>
                <Segment>
                  <Grid>
                    <Grid.Row column={2}>
                      <Grid.Column style={{ height: 300 }} width={13}>
                        <ScrollArea speed={0.8} horizontal={false} style={{ maxHeight: 300, border: 'none' }}>
                          <Segment style={{ padding: -20 }}>
                            {responses}
                          </Segment>
                        </ScrollArea>
                      </Grid.Column>
                      <Grid.Column style={{ marginLeft: -10 }} width={3}>
                        {props.question_type === 'Selection' && (
                        <Graph
                          selection={props.selection}
                          graph_block={graph_block}
                          count={count}
                          graph_radial={graph_radial}
                          tickValues={tickValues}
                        />
                        )}
                      </Grid.Column>
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
