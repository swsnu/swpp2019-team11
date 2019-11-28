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
    survey: this.props.onSurvey,
    itemClickedArray: [],
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
    this.props.onSurvey.item.map((item) => {
      let itemClick = { number: item.number, clicked: [] }
      this.state.itemClickedArray.push(itemClick);
    });
  }

  onSubmitHandler = () => {
    //this.props.history.push('/participate/');
  }

  itemSubjectInput = (dataFromChild, item_num) => {
    let new_item_list = this.state.item;
    let new_res = { number: item_num, content: dataFromChild };
    new_item_list[item_num].response.push(new_res);
    this.setState({ item: new_item_list });
  }

  itemSelectionClick = (item_num, option_num, multiple) => {
    let itemClicked = this.state.itemClickedArray;
    if (multiple == false) {
      itemClicked[item_num].clicked = [ option_num ];
    }
  }

  render() {
    if (this.props.onSurvey==""){
      return null;
    }
    else{
      return (
        <div>
          {this.makeSelectionObj()}
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
                  itemSelectionClick={this.itemSelectionClick}
                  itemClicked={this.state.itemClickedArray[item.number].clicked} //array
                  number={item.number}
                  title={item.title}
                  question_type={item.question_type}
                  selection={item.selection}
                  multiple={item.multiple_choice}
                  subjectInput={this.itemSubjectInput}
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
