import React from 'react';
import {
  Segment, Header, Button, Grid, Icon,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


const SurveyBlock = (props) => {
  const search_css = {
    cursor: 'pointer',
    height: '100px',
    maxWidth: '600px',
    'border-top-left-radius': '20px',
    'border-bottom-left-radius': '20px',
  };
  const cart_css = {
    cursor: 'pointer',
    height: '100px',
    maxWidth: '600px',
    'border-top-left-radius': '20px',
    'border-bottom-left-radius': '20px',
    'border-bottom-right-radius': '20px',
    'border-top-right-radius': '20px',
  };


  return (
    <Grid padded>
      <Grid.Row style={{ minWidth: '1000px' }} verticalAlign="middle">
        <Segment stretched style={props.search ? search_css : cart_css} attached="left" onClick={() => { props.history.push(`/survey/${props.id}`); }}>
          <Header size="big">{props.title}</Header>
        </Segment>
        {props.search ? (
          <Button
            color="teal"
            verticalAlign="middle"
            floated="right"
            size="huge"
            attached="right"
            style={{
              width: '50px', height: '99px', verticalAlign: 'middle', 'border-top-right-radius': '20px', 'border-bottom-right-radius': '20px', 'padding-top': '35px',
            }}
          >
            <Icon name="cart arrow down" />
          </Button>
        ) : null}
      </Grid.Row>
    </Grid>
  );
};


export default withRouter(SurveyBlock);
