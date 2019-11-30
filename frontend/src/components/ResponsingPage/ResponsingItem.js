import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Form, Checkbox } from 'semantic-ui-react';
import ResponsingOption from './ResponsingOption';
import ResponsingOptionRadio from './ResponsingOptionRadio';
import './ResponsingItem.css';

export class ResponsingItem extends Component {
  state={
    itemClicked: this.props.itemClicked, // [ list of clicked ]
    multiClickedList: [],
  }

  radioChange = (dataFromChild) => {
    this.props.itemSelectionClick(this.props.number, [dataFromChild], this.props.multiple);
    this.setState({ itemClicked: dataFromChild });
  }

  componentDidMount() {
    const newList = this.state.multiClickedList;
    this.props.selection.map(() => {
      newList.push(false);
    });
  }

  checkboxChange = (number) => {
    this.state.multiClickedList[number] = !this.state.multiClickedList[number];
    this.state.itemClicked = [];
    let i = 0;
    this.state.multiClickedList.map((bool) => {
      if (bool) this.state.itemClicked.push(i);
      i++;
    });
    // console.log(this.state.multiClickedList);
    // console.log(this.state.itemClicked);
    this.props.itemSelectionClick(this.props.number, this.state.itemClicked, this.props.multiple);
  }

  render() {
    return (
      <div className="ResponsingItem">
        <Segment id={"ResponseSegment"}>
          <div id={"Title"}>{this.props.number}{". "}{this.props.title}</div>
          { // multiple choice admitted
          (this.props.multiple && this.props.question_type == 'Selection')
          && (
          <div>
            { '(You can select more than one.)' }
            { this.props.selection.map((selection) => (
              <div>
                <Checkbox className="CheckBox" onClick={() => this.checkboxChange(selection.number)} />
                <ResponsingOption content={selection.content} />
              </div>
            )) }
          </div>
          )
        }
          { // multiple choice denied
          ((!this.props.multiple) && (this.props.question_type == 'Selection'))
          && this.props.selection.map((selection) => (
            <div>
              <Form>
                <ResponsingOptionRadio
                  number={selection.number}
                  content={selection.content}
                  checked={this.state.itemClicked[0] == selection.number}
                  radioChange={this.radioChange}
                />
              </Form>
            </div>
          ))
        }
          {
          (this.props.question_type == 'Subjective')
          && <input id={"SubjectInput"} placeholder="Answer..." className="subjectiveInput" onChange={(e) => this.props.subjectInput(e.target.value, this.props.number)} />
        }
        </Segment>
      </div>
    );
  }
}

export default withRouter(ResponsingItem);
