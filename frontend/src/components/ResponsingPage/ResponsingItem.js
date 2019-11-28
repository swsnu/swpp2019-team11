import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Form, Checkbox } from 'semantic-ui-react';
import ResponsingOption from './ResponsingOption';
import ResponsingOptionRadio from './ResponsingOptionRadio';

export class ResponsingItem extends Component {
  state={
    itemClicked: this.props.itemClicked // [ list of clicked ] 
  }

  radioChange = (dataFromChild) => {
    this.props.itemSelectionClick(this.props.number, dataFromChild, this.props.multiple);
    this.setState({ itemClicked: [dataFromChild] });
  }

  render() {
    return (
      <div>
        <Segment>
        <div>{this.props.title}</div>
        { //multiple choice admitted
          (this.props.multiple && this.props.question_type == 'Selection') && 
          <div>
            { "(You can select more than one.)" }
            { this.props.selection.map((selection) => {
              return (
                <div>
                  <Checkbox /><ResponsingOption content={selection.content} />
                </div>
              );
            }) }
          </div>
        }
        { //multiple choice denied
          ((!this.props.multiple) && (this.props.question_type == 'Selection'))
          &&
          this.props.selection.map((selection) => {
            return (
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
            );
          })
        }
        {
          (this.props.question_type == 'Subjective')
          &&
          <input onChange={(e) => this.props.subjectInput(e.target.value, this.props.item.number)}/>
        }
        </Segment>
      </div>
    );
  }
};

export default withRouter(ResponsingItem);