import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import ResponsingItem from '../../components/ResponsingPage/ResponsingItem';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getOngoingSurvey: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
})

export const mapStateToProps = (state) => {
  return {
    onSurvey: state.sv.ongoing_survey,
  };
}

export class ResponsePage extends Component {
  dummy_dat= {
    id: 0,
    title: 'Survey Title',
    content: 'Survey Content',
    target: [{ gender: 'male' }, { age: [1, 100] }],
    item_count: 1,
    item: [
      { number: 0, title: 'What is your name?', question_type: 'Subjective', multiple_choice: false, selection: [{ number: 0, content: '' }] },
      { number: 1, title: 'Do you like Mint Chocolate?', question_type: 'Selection', multiple_choice: true, selectiont: [{ number: 0, content: 'Yes' }, { number: 1, content: 'Absolutely' }] },
    ],
  }

  state= {
    survey: this.props.survey
  }

  componentDidMount() {
    /*this.props.checklogIn()
      .then(() => {
        this.props.getOngoingSurvey(this.props.match.params.id);
      })
      .catch(() => { this.props.history.push('/login/'); });*/
      this.props.getOngoingSurvey(this.props.match.params.id);
  }

  onSubmitHandler = () => {

    this.props.history.push('/participate/')
  }

  render() {
    if(this.props.onSurvey==""){
      return null;
    }
    else{
      return (
        <div>
          <Sticky>
            <Segment><h1>ResponsingPage</h1></Segment>
          </Sticky>
          <Segment>
            <h2>{this.props.onSurvey.title}</h2>
            <h3>{this.props.onSurvey.content}</h3>
            {this.props.onSurvey.author}
          </Segment>
          <div>
          {
              //this.dummy_dat.item.map((item) => {
              this.props.onSurvey.item.map((item) => {
              return(
                <ResponsingItem
                  question={item.question}
                  question_type={item.question_type}
                  selection={item.selection}
                  duplicate={item.multiple_choice}
                />
              );
            })
          }
          </div>
          <button onClick={this.onSubmitHandler}>
            Submit
          </button>
        </div>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ResponsePage));
