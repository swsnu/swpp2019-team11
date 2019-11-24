import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Checkbox } from 'semantic-ui-react';

export class ResponsingItem extends Component {
  render(){
    return (
      <div>
        <Segment>
        <div>{this.props.question}</div>
        {this.props.duplicate && <div>{"(You can select more than one.)"}</div>}
        {
          (this.props.question_type == 'Selection')
          &&
          this.props.options.map((option) => {
            return (
              <div>
                <Checkbox />
                {option.content}
              </div>
            );
            })
        }
        {
          (this.props.question_type == 'Subjective')
          &&
          <input/>
        }
        </Segment>
      </div>
    );
  }
};

export default withRouter(ResponsingItem);