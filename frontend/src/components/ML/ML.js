import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Segment, Grid, Header, Icon,
} from 'semantic-ui-react';

const ML = (props) => {
  const surveyBlock = (survey) => ((survey) ? (
    <Grid.Column width={8}>
      <Segment onClick={() => { window.location.assign(`/survey/${survey.id}/`); }} style={{ backgroundColor: '#b8bfc7', borderRadius: 25, cursor: 'pointer' }}>
        <Grid divided>
          <Grid.Column width={10}>
            <Header size="big">{survey.title}</Header>
            <Header size="small">{survey.content}</Header>

          </Grid.Column>
          <Grid.Column width={6} verticalAlign="top">
            <Grid container>
              <Grid.Row>
                <Header size="small">
                  <Icon name="user" />
                  {survey.author}
                </Header>
              </Grid.Row>
              <Grid.Row style={{ marginTop: -10 }}>
                <Header size="small">
                  <Icon name="users" />
                  {survey.respondant_count}
                </Header>
              </Grid.Row>
              <Grid.Row style={{ marginTop: -10 }}>
                <Header size="small">
                  <Icon name="calendar outline" />
                  {survey.upload_date}
                </Header>
              </Grid.Row>
              <Grid.Row style={{ marginTop: -10 }}>
                <Header size="small">
                  <Icon name="calendar check outline" />
                  {survey.survey_start_date}
                ~
                  {survey.survey_end_date}
                </Header>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  ) : (
    <Grid.Column width={8}>
      <Segment style={{ borderRadius: 25, height: 165 }} />
    </Grid.Column>
  ));

  return (
    <Grid padded>
      <Grid.Row column={1}>
        <Grid.Column>
          <Segment style={{ backgroundColor: '#8d99a5' }}>
            <Header size="huge">Related Surveys</Header>
            <Grid>
              <Grid.Row column={2}>
                {props.survey.map((survey) => surveyBlock(survey))}
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ML;