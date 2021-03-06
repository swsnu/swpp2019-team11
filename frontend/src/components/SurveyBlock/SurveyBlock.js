import React from 'react';
import {
  Segment, Header, Button, Grid, Icon,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


export const SurveyBlock = (props) => {
  const search_css = {
    cursor: 'pointer',
    height: '100px',
    maxWidth: '800px',
    'border-top-left-radius': '20px',
    'border-bottom-left-radius': '20px',
  };
  const cart_css = {
    cursor: 'pointer',
    height: '100px',
    maxWidth: '800px',
    'border-top-left-radius': '20px',
    'border-bottom-left-radius': '20px',
    'border-bottom-right-radius': '20px',
    'border-top-right-radius': '20px',
  };


  return (
    <Grid className="SurveyBlock" padded>
      <Grid.Row style={{ minWidth: '1000px' }} verticalAlign="middle">
        <Segment className="clickSegment" style={props.search ? search_css : cart_css} attached="left" onClick={() => { props.surveyClicked(props.survey.id); }}>
          <Grid divided>
            <Grid.Column width={11}>
              <Header size="big">{props.survey.title}</Header>
              <Header size="small">
                <Icon name="user" />
                {props.survey.author}
              </Header>
            </Grid.Column>
            <Grid.Column width={5} verticalAlign="top">
              <Grid.Row>
                <Icon name="users" />
                {props.survey.respondant_count}
              </Grid.Row>
              <Grid.Row>
                <Icon name="calendar outline" />
                {props.survey.upload_date}
              </Grid.Row>
              <Grid.Row>
                <Icon name="calendar check outline" />
                {props.survey.survey_start_date}
                ~
                {props.survey.survey_end_date}
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
        {props.search ? (
          <Button
            className="cartButton"
            verticalAlign="middle"
            floated="right"
            size="huge"
            attached="right"
            style={{
              width: '50px', height: '99px', verticalAlign: 'middle', 'border-top-right-radius': '20px', 'border-bottom-right-radius': '20px', 'padding-top': '35px', backgroundColor: '#354649',
            }}
            onClick={() => { props.onClickCart(props.survey.id, props.survey.title); }}
          >
            <Icon name="cart arrow down" style={{ color: '#e0e7e9' }} />
          </Button>
        ) : null}
      </Grid.Row>
    </Grid>
  );
};


export default withRouter(SurveyBlock);
