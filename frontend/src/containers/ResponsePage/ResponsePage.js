import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import ResponsingItem from '../../components/ResponsingPage/ResponsingItem';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onGetOngoingSurvey: () => dispatch(actionCreators.getOngoingSurvey()),
})

export const mapStateToProps = (state) => ({
  survey: state.sv.ongoing_survey,
})

export class ResponsePage extends Component {
  dummy_dat= {
    id: 0,
    title: 'Survey Title',
    content: 'Survey Content',
    target: [{ gender: 'male' }, { age: [1, 100] }],
    item_count: 1,
    item_list: [
      { id: 0, question: 'What is your name?', question_type: 'Subjective', duplicate_input: false, option_list: [{ id: 0, content: '' }] },
      { id: 1, question: 'Do you like Mint Chocolate?', question_type: 'Selection', duplicate_input: true, option_list: [{ id: 0, content: 'Yes' }, { id: 1, content: 'Absolutely' }] },
    ],
  }

  state= {
    survey: this.props.survey
  }

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
        this.props.onGetOngoingSurvey()
        })
      .catch(() => { this.props.history.push('/login/'); });
  }

  onSubmitHandler = () => {

    this.props.history.push('/participate/')
  }

  render() {
    return (
      <div>
        <Sticky>
          <Segment><h1>ResponsingPage</h1></Segment>
        </Sticky>
        <Segment>
          <h2>{this.dummy_dat.title}</h2>
          <h3>{this.dummy_dat.content}</h3>
        </Segment>
        <div>
        {
          this.dummy_dat.item_list.map((item) => {
            return(
              <ResponsingItem
                question={item.question}
                question_type={item.question_type}
                options={item.option_list}
                duplicate={item.duplicate_input}
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
export default connect(null, mapDispatchToProps) (withRouter(ResponsePage));
