import React, { Component } from 'react';
import {
  Segment, Checkbox, Input, Button,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';
import './MakingItem.css';

export class MakingItem extends Component {
  state = {
    title: '',
    selection_list: [{ number: 1, content: '' }],
  }


  selectionContentHandler = (content, number) => {
    this.state.selection_list[number - 1].content = content;
    this.props.stateSender(this.state, this.props.number);
  }

  addSelectionHandler = () => {
    const new_selection = {
      number: this.state.selection_list.length + 1,
      content: '',
    };
    this.state.selection_list.push(new_selection);
    this.props.stateSender(this.state, this.props.number);
  }


  titleChangeHandler = (title) => {
    this.state.title = title;
    this.props.stateSender(this.state, this.props.number);
  }

  render() {
    return (
      <Segment className="MakingItem" style={{ backgroundColor: '#6C7A89', minHeight: '250px' }}>
        <div id="ItemTop">
        Q
          {this.props.number}
: &nbsp;&nbsp;
          <Input className="title" id="title" placeholder="Question..." onChange={(e) => this.titleChangeHandler(e.target.value)} />
          <Checkbox toggle className="questionTypeToggler" onClick={() => { this.props.questionTypeToggler(this.props.number); }} />
          {this.props.question_type}
        </div>
        <div>
          <Checkbox onClick={() => { this.props.personalToggler(this.props.number); }} />
          <p style={{ fontSize: 15, marginLeft: 10, display: 'inline'}}>This is Personal Data.</p>
        </div>
        {
          (this.props.question_type == 'Selection')
          && (
          <div>
            <Checkbox className="MultipleSelection" label={this.props.multiple_choice ? 'Multiple Choice' : 'Single Choice'} toggle onClick={() => { this.props.multipleSelectionToggler(this.props.number); }} />
            <br />
            <div className="Options">Options:</div>
          </div>
          )
        }
        {
          (this.props.question_type == 'Selection')
        && this.state.selection_list.map((selection) => (
          <MakingOptions
            className="MakingOptions"
            number={selection.number}
            content={this.selectionContentHandler}
          />
        ))
        }
        {
          (this.props.question_type == 'Selection')
          && <button className="addOptionButton" onClick={this.addSelectionHandler}>Add options</button>
        }
      </Segment>
    );
  }
}
export default withRouter(MakingItem);
