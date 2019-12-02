import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Form, Checkbox } from 'semantic-ui-react';
import ResponsingOptionRadio from './ResponsingOptionRadio';
import './ResponsingItem.css';

export class ResponsingItem extends Component {
  state={
    check_response: [],
    text_response: '',
  }


  componentDidMount() {
    const allFalse = this.props.selection.map(() => (false));
    this.setState({ check_response: allFalse });
  }

  write = (data) => {
    this.state.text_response = data;
    this.props.response(this.props.number, this.state.text_response);
    this.forceUpdate();
  }

  click = (index) => {
    if (this.props.multiple == true) {
      const checkList = this.state.check_response;
      if (checkList[index]) {
        checkList[index] = false;
      } else {
        checkList[index] = true;
      }
      this.state.check_response = checkList;
    } else {
      const checkList = this.props.selection.map(() => (false));
      checkList[index] = true;
      this.state.check_response = checkList;
    }
    this.props.response(this.props.number, this.state.check_response);
    this.forceUpdate();
  }

  render() {
    return (
      <div className="ResponsingItem">
        <Segment id="ResponseSegment">
          <div id="Title">
            {this.props.number}
            {'. '}
            {this.props.title}
          </div>
          { // multiple choice admitted
          (this.props.multiple && this.props.question_type == 'Selection')
          && (
          <div>
            { '(You can select more than one.)' }
            { this.props.selection.map((selection, index) => (
              <div>
                <Checkbox className="CheckBox" label={selection.content} onClick={() => this.click(index)} />
              </div>
            )) }
          </div>
          )
        }
          { // if single choice
          ((!this.props.multiple) && (this.props.question_type == 'Selection'))
          && this.props.selection.map((selection, index) => (
            <div>
              <Form>
                <ResponsingOptionRadio
                  number={selection.number}
                  content={selection.content}
                  checked={this.state.check_response[index]}
                  radioChange={this.click}
                />
              </Form>
            </div>
          ))
        }

          {// Subjective question
          (this.props.question_type == 'Subjective')
          && <input id="SubjectInput" placeholder="Answer..." className="subjectiveInput" onChange={(e) => this.write(e.target.value)} />
        }
        </Segment>
      </div>
    );
  }
}

export default withRouter(ResponsingItem);
