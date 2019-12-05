import React, { Component } from 'react';
import {
  Segment, Checkbox, Input, Popup, Dropdown, Button,
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';
import './MakingItem.css';

export class MakingItem extends Component {
  state = {
    title: '',
    selection_list: [{ number: 1, content: '' }],
    type: '',
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
    const options = [
      { key: 1, text: 'Subjective', value: 1 },
      { key: 2, text: 'Radio', value: 2 },
      { key: 3, text: 'Multi-Selection', value: 3 },
    ];
    return (
      <Segment className="MakingItem" style={{ backgroundColor: '#b8bfc7', minHeight: '250px' }}>
        <div id="ItemTop">
        Q
          {this.props.number}
: &nbsp;&nbsp;
          <Input className="title" id="title" placeholder="Question..." onChange={(e) => this.titleChangeHandler(e.target.value)} />
          <Dropdown
            selection
            placeholder="ItemType"
            as={Button}
            size="large"
            style={{ float: 'right' }}
            options={options}
            onChange={(target, data) => { this.setState({ type: data.value }); this.props.itemTypeHandler(this.props.number, data.value); }}
          />
        </div>

        <Popup
          id="personalPopup"
          content="You must Check it if the question asks personal Data"
          trigger={(
            <div>
              <Checkbox onClick={() => { this.props.personalToggler(this.props.number); }} />
              <p style={{ fontSize: 15, marginLeft: 10, display: 'inline' }}>This is Personal Data.</p>
            </div>
            )}
        />

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
