import React, { Component } from 'react';
import { Segment, Checkbox, Input, Button } from 'semantic-ui-react';
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
  }

  render() {
    const questionTypeHandler = () => {
      if (this.state.questiontype == 'Subjective') this.setState({ questiontype: 'Selection' });
      else this.setState({ questiontype: 'Subjective' });
    };

    return (
      <Segment style={{backgroundColor: "#6C7A89", minHeight: '250px' }}>
        Q: &nbsp;&nbsp;
        <Input id="question" onChange={(e)=> this.props.itemTitle(e.target.value, this.props.id)}/>
        <Checkbox toggle onChange={(e) => { this.props.onToggleType(this.props.id); questionTypeHandler(); }} />
        {this.props.questiontype}
        {
          (this.state.questiontype == 'Selection')&&<div>{"Options:"}</div>
        }
        {
          (this.state.questiontype == 'Selection')
        && this.props.callOptionList.map((options) => {
          return (
            <div>
              <MakingOptions
                id={options.id}
                content={(par1, par2) => this.parentCallBackContent(par1, par2)}
              />
              <Checkbox toggle onClick={(e) => {this.props.onToggleDup(this.props.id)}}></Checkbox>
              {(this.props.duplicate==false) && <div>False</div>}
              {(this.props.duplicate==true) && <div>True</div>}
            </div>
          );
        })
        }
        {
          (this.state.questiontype == 'Selection')
          && <Button onClick={ this.onAddhandler }>Add options</Button>
        }
      </Segment>
    );
  }
}
export default withRouter(MakingItem);

