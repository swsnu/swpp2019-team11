import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

export class ResponsingOption extends Component {
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    );
  }
}
export default withRouter(ResponsingOption);
