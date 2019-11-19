import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from '../MakingPage/MakingOptions'

export class MakingItem extends Component {
  state = {
    questiontype: 'Subjective',
    option_count: 1,
  }
  render() {
    const questionTypeHandler = () => {
      if (this.state.questiontype == 'Subjective') this.setState({questiontype: 'Selection'})
      else this.setState({questiontype: 'Subjective'})
    };

    const onAddhandler = () => {
      this.props.onAddhandler()
    }

    return (
      <Segment style={{ 'min-height': '250px' }}>
        Q:
        {'  '}
        <input type='text' />
        <Checkbox toggle onChange={ () => { this.props.onToggle(); questionTypeHandler() } }/>
        <h3 id="question">{this.props.questiontype}</h3>
        {
          (this.state.questiontype == 'Selection') &&
          this.props.optionList.map( options => { return (<div><MakingOptions /></div>); })
        }
        {(this.state.questiontype == 'Selection') &&
          <button onClick={ () => {onAddhandler()} } >Add obtions</button>
        }
      </Segment>
    );
  }
};
export default withRouter(MakingItem);
