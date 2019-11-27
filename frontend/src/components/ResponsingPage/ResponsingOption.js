import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

export class ResponsingOption extends Component {
  render() {
    return (
      <div>
        {this.props.selection.content}
      </div>
    );
  };
}
export default withRouter (ResponsingOption)