import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';

export class MakingItem extends Component {
  state = {
    questiontype: 'Subjective',
  }

  onAddhandler = () => {
    this.props.onAddhandler();
  };

  render() {
    const questionTypeHandler = () => {
      if (this.state.questiontype == 'Subjective') this.setState({ questiontype: 'Selection' });
      else this.setState({ questiontype: 'Subjective' });
    };

    return (
      <Segment style={{ 'min-height': '250px' }}>
        Q:
        {'  '}
        <input id="question" onChange={this.props.question }/>
        <Checkbox toggle onChange={(e) => { this.props.onToggle(this.props.id); questionTypeHandler(); }} />
        <h3>{this.props.questiontype}</h3>
        {
          (this.state.questiontype == 'Selection')
        && this.props.optionList.map(() => { return ( <div><MakingOptions /></div> ); })
        }
        {
          (this.state.questiontype == 'Selection')
          && <button onClick={() => {this.onAddhandler() }}>Add obtions</button>
        }
      </Segment>
    );
  }
}
export default withRouter(MakingItem);

