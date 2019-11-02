import React from 'react';
import { Grid, Header, Segment, Button, Icon } from 'semantic-ui-react';

const MLResult = (props) => {
  // TODO : implement this part with better algorithm (using BBST-based data structure)
  let cartIdList = []
  for(let i = 0; i < props.ml_result.length; i++){
    let curSurveyId = props.ml_result[i].surveyId;
    let curCartId = -1;
    for(let j = 0; j < props.survey_list.length; j++){
      if(curSurveyId === props.survey_list[j].id){ curCartId = j; break; }
    }
    if(curCartId === -1){
      return ( <Segment textAlign="center">INVALID</Segment> );
    }
    cartIdList.push(curCartId);
  }
  
  const similarList = props.ml_result.map((cur, index) => (
    <Grid.Row textAlign='center'>
      <Grid textAlign='center'>
        <Grid.Row><p>{cur.title}</p></Grid.Row>
        <Grid.Row><p style={{'color': '#808080'}}>{props.survey_list[cartIdList[index]].title}</p></Grid.Row>
      </Grid>
    </Grid.Row>
  ));

  return (
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size='medium' textAlign="center">Similar Items</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Grid divided='vertically' textAlign='center'>
              {similarList}
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button animated onClick={() => props.onClickSelect(cartIdList)} fluid>
              <Button.Content visible>SELECT THIS GROUP</Button.Content>
                <Button.Content hidden>
                <Icon name='check' />
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default MLResult;