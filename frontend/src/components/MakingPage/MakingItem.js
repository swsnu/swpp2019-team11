import React, { Component } from 'react';
import { Segment, Checkbox } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';

export class MakingItem extends Component {
  state = {
    questiontype: 'Subjective',
    option_list: [{ id: 0, content: '' }],
  }

  parentCallBackContent = (dataFromChild, id) => {
    let new_op = this.state.option_list;
    new_op[id].content = dataFromChild;
    this.setState({ option_list: new_op });
    this.props.optionList( this.state.option_list, this.props.id );
  };

  onAddhandler = () => {
    this.props.onAddhandler();
    let new_op = this.state.option_list;
    let num = new_op.length
    //new_op.push({ id: num, content: '' })
  }

  render() {
    const questionTypeHandler = () => {
      if (this.state.questiontype == 'Subjective') this.setState({ questiontype: 'Selection' });
      else this.setState({ questiontype: 'Subjective' });
    };

    return (
      <Segment style={{ 'min-height': '250px' }}>
        Q:
        {'  '}
        <input id="question" onChange={(e)=> this.props.itemTitle(e.target.value, this.props.id)}/>
        <Checkbox toggle onChange={(e) => { this.props.onToggle(this.props.id); questionTypeHandler(); }} />
        <h3>{this.props.questiontype}</h3>
        {
          (this.state.questiontype == 'Selection')
        && this.props.callOptionList.map((options) => {
          return ( 
            <div>
              <MakingOptions 
                id={options.id} 
                content={(par1, par2) => this.parentCallBackContent(par1, par2)}
              />
            </div> 
          ); 
        })
        }
        {
          (this.state.questiontype == 'Selection')
          && <button onClick={ this.onAddhandler }>Add obtions</button>
        }
      </Segment>
    );
  }
}
export default withRouter(MakingItem);

