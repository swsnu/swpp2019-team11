import React, { Component } from 'react';
import { Segment, Checkbox, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';

export class MakingItem extends Component {
  state = {
    title : '',
    selection_list: [{ number: 1, content: '' }],
  }


  selectionContentHandler = (content, number) => {
    this.state.selection_list[number-1].content = content
    this.props.stateSender(this.state, this.props.number)
  }

  addSelectionHandler = () => {
    const new_selection = {
      number : this.state.selection_list.length+1,
      content : ''
    }
    this.state.selection_list.push(new_selection)
    this.props.stateSender(this.state, this.props.number)
  }


  titleChangeHandler = (title) => {
    this.state.title = title
    this.props.stateSender(this.state, this.props.number)
  }

  render() {

    return (
      <Segment style={{backgroundColor: "#6C7A89", minHeight: '250px' }}>
        Q: &nbsp;&nbsp;
        <Input id="question" onChange={(e)=> this.titleChangeHandler(e.target.value)}/>
        <Checkbox toggle onChange={(e) => { this.props.questionTypeToggler(this.props.number) }} />
        {this.props.question_type}
        {
          (this.props.question_type == 'Selection')&&
          <div>
          {"Options:"}
          <Checkbox className = "MultipleSelection" toggle onClick={() => {this.props.multipleSelectionToggler(this.props.number)}}></Checkbox>
            {(this.props.duplicate==false) && <div>False</div>}
            {(this.props.duplicate==true) && <div>True</div>}
          </div>
        }
        {
          (this.props.question_type == 'Selection')
        && this.state.selection_list.map((selection) => {
          return (
              <MakingOptions
                className = "MakingOptions"
                number={selection.number}
                content={this.selectionContentHandler}
              />
          );
        })
        }
        {
          (this.props.question_type == 'Selection')
          && <Button onClick={ this.addSelectionHandler }>Add options</Button>
        }
      </Segment>
    );
  }
}
export default withRouter(MakingItem);

