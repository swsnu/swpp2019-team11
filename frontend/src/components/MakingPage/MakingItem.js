import React, { Component } from 'react';
import {
  Segment, Checkbox, Input, Popup, Dropdown, Button, Icon
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import MakingOptions from './MakingOptions';
import './MakingItem.css';

export class MakingItem extends Component {
  state = {
    title: '',
    selection_list: [],
    type: 1,
    error: [],
  }

  componentDidUpdate(prevProps){
    if(prevProps != this.props){
      this.setState({
        title : this.props.data.title,
        selection_list : this.props.data.selection,
        type : this.props.data.question_type == 'Subjective' ? 1 : (this.props.data.multiple_choice ? 3 :2)
      })  
    }
  }

  selectionContentHandler = (content, number) => {
    this.state.selection_list[number - 1].content = content;
    this.state.error[number - 1] = (content == '');
    this.props.stateSender(this.state, this.props.number);
  }

  addSelectionHandler = () => {
    const new_selection = {
      number: this.state.selection_list.length + 1,
      content: '',
    };
    this.state.selection_list.push(new_selection);
    this.state.error[this.state.selection_list.lenth - 1] = true;
    this.props.stateSender(this.state, this.props.number);
  }

  deleteSelectionHandler = (number) => {
    if(this.state.selection_list.length>1){
        let new_selection_list = this.state.selection_list.filter((selection) => !(selection.number == number))
        new_selection_list.map((selection, index) => {
          selection.number = index+1
        })
        this.state.selection_list = new_selection_list
        this.setState({selection_list : new_selection_list})
        this.props.stateSender(this.state, this.props.number);
    }

  }

  typeHandler = (target, data) => {
    if (this.state.type != data.value) {
      if (data.value == 1) {
        this.state.selection_list = [];
      } else {
        this.state.selection_list = [{ number: 1, content: '' }];
        this.state.error[0] = true;
      }
      this.setState({ type: data.value });
      this.props.itemTypeHandler(this.props.number, data.value);
    }
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
          <Input value = {this.state.title} style={{ width: 550 }} className="title" error={this.state.title == ''} id="title" placeholder="Question..." onChange={(e) => this.titleChangeHandler(e.target.value)} />
          <Dropdown
            selection
            placeholder="ItemType"
            as={Button}
            size="large"
            style={{ float: 'right' }}
            options={options}
            value={this.state.type}
            onChange={this.typeHandler}
          />
        </div>

        <Popup
          id="personalPopup"
          content="You must Check it if the question asks personal Data"
          position="right center"
          trigger={(
            <Checkbox label="This question asks about personal information" onClick={() => { this.props.personalToggler(this.props.number); }} />
            )}
        />

        {
          (this.props.question_type == 'Selection')
        && this.state.selection_list.map((selection) => (
          <MakingOptions
            className="MakingOptions"
            number={selection.number}
            contentHandler={this.selectionContentHandler}
            content={selection.content}
            error={selection.content == ''}
            deleteHandler = {this.deleteSelectionHandler}
          />
        ))
        }
        {
          (this.props.question_type == 'Selection')
          && <button className="addOptionButton" onClick={this.addSelectionHandler}>Add options</button>
        }
        <Icon size = 'large' onClick = {() => this.props.deleteHandler(this.props.number)} circular style = {{position : 'absolute', bottom : 10, right : 10, backgroundColor : 'white', cursor : 'pointer'}} name = "trash alternate outline" />
      </Segment>
    );
  }
}
export default withRouter(MakingItem);
