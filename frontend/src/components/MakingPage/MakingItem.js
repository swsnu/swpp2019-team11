import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';

export class MakingItem extends Component {
  state = {
    questiontype: 'Subjective',
  }

  render () {
    const questionTypeHandler = () => {
      if (this.state.questiontype == 'Subjective') this.setState({ questiontype: 'Selection' });
      else this.setState({ questiontype: 'Subjective' });
    };

    const onAddhandler = () => {
      this.props.onAddhandler();
    };

    return (
      <Segment style={{ 'min-height': '250px' }}>
        Q:
        {'  '}
        <input/>
        <Checkbox toggle onChange={() => { this.props.onToggle(); questionTypeHandler(); }} />
        <h3>{this.props.questiontype}</h3>
        {
          (this.state.questiontype == 'Selection')
        && this.props.optionList.map(() => { <div><MakingOptions /></div> } )
        }
        {
          (this.state.questiontype == 'Selection')
          && <button onClick={() => onAddhandler()}>Add obtions</button>
        }
      </Segment>
    );
  }
}
export default withRouter(MakingItem);
