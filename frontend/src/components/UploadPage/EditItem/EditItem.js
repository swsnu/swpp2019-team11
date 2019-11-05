import React, {Component} from 'react';
import { Grid, Header, Button, Segment } from 'semantic-ui-react';
import ItemBlock from '../ItemBlock/ItemBlock';

class EditItem extends Component{

  state = {
    item : [
      {
        title : 'this is test title1',
        response : [
          {respondant_id : '1', content :  'haha1'},
          {respondant_id : '2', content :  'hoho2'}
        ]
      },
    ]
  }

  render(){
    if (this.props.progress >= 1) {
      return (
        <Segment  color='olive'>
          <Header style={{ 'font-size': '2em', 'margin-left': '10px' }} size="huge" color="olive">2. Edit Your Survey</Header>
          <Segment>
            
          </Segment>
          <ItemBlock title = {this.state.item[0].title} id = {0+1} response = {this.state.item[0].response} />
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column align="right">
                <Button
                  align="right"
                  style={{ marginTop: '15px', marginRight: '20pt' }}
                  onClick={this.props.editOnClick}
                  disabled={this.props.progress != 1}
                >
                Continue
                </Button>
                <Button
                  onClick={this.props.backOnClick}
                  disabled={this.props.progress != 1}
                >
                Back
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }
    else{
      return (
        <div />
      );
    }
  }
};
export default EditItem;
