import React, { Component } from 'react';
import {
  Grid, Header, Button, Segment, Checkbox,
} from 'semantic-ui-react';

class Submit extends Component {
  state = {
    checked: false,
  }

  toggle = () => {
    this.setState({ checked: !this.state.checked });
  }

  checkValidation = () => {
    if (this.state.checked) this.props.submitOnClick();
    else alert('Please check in the checkbox');
  }

  render() {
    if (this.props.progress >= 2) {
      return (
        <Segment color="green">
          <Header style={{ 'font-size': '2em', 'margin-left': '8px' }} size="huge" color="green">3. Warning & Confirm</Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header color="red" style={{ 'font-size': '15px', 'margin-left': '19px' }}>
                  surBing shall not be liable for all legal obligations arising out of
                  uploading data containing sensitive personal information.
                </Header>
              </Grid.Column>
              <Grid.Column align="right">
              </Grid.Column>
            </Grid.Row>
            <Checkbox onClick={this.toggle} checked={this.state.checked} label="Yes I agree" floated style={{ marginLeft: '18px', 'font-size': '1em' }} align="right" />
          </Grid>
          <div align="right">
            <Button onClick={this.checkValidation} style={{ 'margin-top': '15px', marginRight: '20pt', width: '100pt' }}> Yes I admit </Button>
            <Button onClick={this.props.backOnClick}>Back</Button>
          </div>
        </Segment>
      );
    }

    return null;
  }
}


export default Submit;
