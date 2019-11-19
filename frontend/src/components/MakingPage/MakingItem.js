import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

export class MakingItem extends Component {
  state = {
    questiontype: 'Subjective'
  }
  render() {
    const questionTypeHandler = () => {
      if (this.state.questiontype == 'Subjective') this.setState({questiontype: 'Selection'})
      else this.setState({questiontype: 'Subjective'})
    };
    return (
      <Segment style={{ 'min-height': '250px' }}>
        Q:
        {'  '}
        <input type='text' />
        <Checkbox toggle onChange={ () => { this.props.onToggle(); questionTypeHandler() } }/>
        <h3 id="question">{this.props.questiontype}</h3>
        {(this.state.questiontype == 'Selection') &&
          <div>
            <input type='text' />
            <button>Add obtions</button>
          </div>
        }
      </Segment>
    );
  }
};
export default withRouter(MakingItem);
