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
  state= {
    survey: this.props.onSurvey
  }

  componentDidMount() {
    /*this.props.checklogIn()
      .then(() => {
        this.props.getOngoingSurvey(this.props.match.params.id);
      })
      .catch(() => { this.props.history.push('/login/'); });*/
      
      this.props.getOngoingSurvey(this.props.match.params.id);
      this.setState({ survey: this.props.onSurvey });
  }

  makeSelectionObj = () => {
    this.state.survey.item.map((item) => {
      let new_item_list = this.state.item;

      if (item.question_type == 'Selection') {
        let new_res = [{ number: '', content: '' }];
        new_item_list[item.number].response = new_res;

        this.setState({ item: new_item_list });
      }

    })
  }

  onSubmitHandler = () => {

    this.props.history.push('/participate/');
  }

  itemSelectionClick = (item_num, op_num, op_content, multiple_choice) => {
    if (multiple_choice == false){
      let new_res = [{
        number: op_num,
        content: op_content,
      }]
      new_item = this.state.onSurvey.item;
      new_item[item_num].response = new_res;
      this.setState({ item: new_item })
    }
  }

  render() {
    if (this.props.onSurvey==""){
      return null;
    }
    else{
      return (
        <div>
          {this.makeSelectionObj}
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
            this.props.onSurvey.item.map((item) => {
              return(
                <ResponsingItem
                  title={item.title}
                  question_type={item.question_type}
                  selection={item.selection}
                  duplicate={item.multiple_choice}
                  selectionClick={this.itemSelectionClick}
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
