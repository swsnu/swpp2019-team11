import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import ResponsingItem from '../../components/ResponsingPage/ResponsingItem';
import './ResponsePage.css';

export const mapDispatchToProps = (dispatch) => ({
  clearParticipatingList: () => dispatch(actionCreators.clearParticipatingList()),
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  response: (id, response) => dispatch(actionCreators.participateSurvey(id, response)),
});

export const mapStateToProps = (state) => ({
  survey: state.sv.ongoing_survey,
});

export class ResponsePage extends Component {
  state= {
    survey: this.props.survey,
    response_list: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState({ survey: this.props.survey });
    }
  }

  componentDidMount() {
    this.props.clearParticipatingList();
    this.props.checklogIn().catch(() => { this.props.history.push('/login/'); });
  }

  onSubmitHandler = () => {
    const response_json = [];
    this.state.response_list.map((response, response_index) => {
      if (this.state.survey.item[response_index].question_type == 'Subjective') {
        response_json.push({ number: response_index + 1, content: response });
      } else {
        response.map((choice, choice_index) => {
          if (choice == true) {
            response_json.push({ number: response_index + 1, content: choice_index + 1 });
          }
        });
      }
    });
    this.props.response(this.props.survey.id, response_json);
    window.location.assign('/participate/');
  }

  responseCallback = (item_num, data) => {
    const response = this.state.response_list;
    response[item_num - 1] = data;
    this.setState({ response_list: response });
  }

  render() {
    if (this.state.survey.item != null) {
      return (
        <div className="ResponsePage">
          <Sticky>
            <Segment id="Head"><h1 id="PageName">ResponsingPage</h1></Segment>
          </Sticky>
          <Segment id="info">
            <h2 id="SurveyTitle">{this.props.survey.title}</h2>
            <h3 id="SurveyContent">{this.props.survey.content}</h3>
            <h3 id="SurveyAuthor">
              {' '}
              {this.props.survey.author}
              {' '}
            </h3>
          </Segment>
          <div id="Items">
            {
            this.state.survey.item.map((item) => (
              <ResponsingItem
                number={item.number}
                title={item.title}
                question_type={item.question_type}
                selection={item.selection}
                multiple={item.multiple_choice}
                response={this.responseCallback}
              />
            ))
          }
          </div>
          <button id="Submit" className="Submit" onClick={() => { this.onSubmitHandler(this.state.survey.id); }}>
            Submit
          </button>
        </div>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResponsePage));
