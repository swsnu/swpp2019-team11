import React, {Component} from 'react';
import { Grid, Header, Button, Segment } from 'semantic-ui-react';
import ItemBlock from '../ItemBlock/ItemBlock';

class EditItem extends Component{

  state = {
    item : [],
    check : []
  }

  check = (id, value) => {
    this.state.check[id]=value
    this.setState({...this.state})
  }

  componentDidUpdate(prevProps) {
    
    if(prevProps!=this.props&&this.props.survey!=null){
      let check_dummy = this.state.check
      this.props.survey.item.map((item, item_index) => {
        check_dummy[item_index] = true;
        return item
      })
      this.setState({...this.state, check : check_dummy})
    }
  }

  render(){
    if (this.props.progress >= 1) {
      this.props.survey.item.map((item, item_index) => {
        this.state.item[item_index]=<ItemBlock check = {this.check} title = {item.title} id = {item_index} response = {item.response} />
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
                  onClick={() => {this.props.editOnClick(this.state.check)}}
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
      this.state.item = []
      this.state.check = []
      return (null);
    }
  }
};
export default EditItem;
