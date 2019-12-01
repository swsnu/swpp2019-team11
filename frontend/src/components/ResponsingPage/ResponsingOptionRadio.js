import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Radio, Form } from 'semantic-ui-react';
import './ResponsingOptionRadio.css';

export class ResponsingOptionRadio extends Component {
  render() {
    return (
      <div>
        <Form.Field id={"OptionRadio"}>
          <Radio
            className = "Radio"
            label={this.props.content}
            checked={this.props.checked}
            onClick={() => this.props.radioChange(this.props.number-1)}
          />
        </Form.Field>
      </div>
    );
  }
}
export default withRouter(ResponsingOptionRadio);
