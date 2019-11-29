import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Radio, Form } from 'semantic-ui-react';

export class ResponsingOptionRadio extends Component {
  render() {
    return (
      <div>
        <Form.Field>
          <Radio
            label={this.props.content}
            checked={this.props.checked}
            onChange={() => this.props.radioChange(this.props.number)}
          />
        </Form.Field>
      </div>
    );
  }
}
export default withRouter(ResponsingOptionRadio);
