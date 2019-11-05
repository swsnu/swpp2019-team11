import React, {Component} from 'react';
import { Grid, Header, Button, Segment } from 'semantic-ui-react';
import ItemBlock from '../ItemBlock/ItemBlock';

class EditItem extends Component{

  state = {
    item : [
      {
        title : 'this is test question1',
        response : [
          {respondant_id : '1', content :  'hahwa1'},
          {respondant_id : '2', content :  'haawdwdha1'},
          {respondant_id : '3', content :  'hahaw1'},
          {respondant_id : '4', content :  'hahasad1'},
          {respondant_id : '5', content :  'hoasdho2'},
          {respondant_id : '1', content :  'hahwa1'},
          {respondant_id : '2', content :  'haawdwdha1'},
          {respondant_id : '3', content :  'hahaw1'},
          {respondant_id : '4', content :  'hahasad1'},
          {respondant_id : '5', content :  'hoasdho2'},
        ]
      },
    ]
  }



  render(){
    if (this.props.progress >= 1) {
      this.props.survey.item.map((item, item_index) => {
        this.state.item[item_index]=<ItemBlock title = {item.title} id = {item_index+1} response = {item.response} />
        return item
      })
      return (
        <Segment color='olive'>
          <Header style={{ 'font-size': '2em', 'margin-left': '10px' }} size="huge" color="olive">2. Edit Your Survey</Header>
          <Segment style = {{height : 100}}>
            <Header floated = 'left' color = 'olive' style={{'font-size': '22px'}}>
              Title: {this.props.survey.title}
            </Header>
          </Segment>
          {this.state.item}
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
