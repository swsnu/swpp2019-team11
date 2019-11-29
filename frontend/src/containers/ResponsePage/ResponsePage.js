import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import ResponsingItem from '../../components/ResponsingPage/ResponsingItem';
import './ResponsePage.css';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getOngoingSurvey: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
  submitOngoingSurvey: (id, survey) => dispatch(actionCreators.participateSurvey(id, survey)),
});

export const mapStateToProps = (state) => ({
  onSurvey: state.sv.ongoing_survey,
});

export class ResponsePage extends Component {
  state= {
    survey: this.props.onSurvey,
    itemClickedArray: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState({ survey: this.props.onSurvey });
      this.makeObj();
    }
  }

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
        this.props.getOngoingSurvey(this.props.match.params.id);
      })
      .catch(() => { this.props.history.push('/login/'); });
  }

  makeObj = () => {
    this.state.itemClickedArray = [];
    this.props.onSurvey.item.map((item) => {
      const itemClick = { number: item.number, clicked: [] };
      this.state.itemClickedArray.push(itemClick);
      //console.log(this.state.itemClickedArray[0].clicked);
      return null;
    });
  }

  onSubmitHandler = () => {
    this.state.itemClickedArray.map((val) => {
      if (this.state.survey.item[val.number].question_type == 'Subjective' || !this.state.survey.item[val.number].multiple_choice) {
        this.state.survey.item[val.number].response.push({ number: val.number, content: val.clicked[0] });
      } else {
        val.clicked.map((selected) => {
          this.state.survey.item[val.number].response.push({ number: val.number, content: selected });
        });
      }
    });
    this.props.submitOngoingSurvey(this.props.match.params.id, this.state.survey);
    // this.props.history.push('/participate/');
  }

  itemSubjectInput = (dataFromChild, item_num) => {
    const newItem = this.state.itemClickedArray;
    newItem[item_num].clicked[0] = dataFromChild;
    this.setState({ itemClickedArray: newItem });
  }

  itemSelectionClick = (item_num, option_num, multiple) => {
    const itemClicked = this.state.itemClickedArray;
    itemClicked[item_num].clicked = option_num;
    this.setState({ itemClickedArray: itemClicked });
  }

  promise1 = function(item){
    const val = this.state.itemClickedArray[item.number];
    return new Promise( function(resolve, reject){
      window.setTimeout( function() {
        if (val != null) {
          resolve();
        } else {
          reject();
        }
      }, 2000);
    })
  }

  render() {
    if (this.state.survey == '') {
      return null;
    }
    if (this.state.survey.item != null) {

      return (
        <div>
          <Sticky>
            <Segment id={"Head"}><h1 id="PageName" >ResponsingPage</h1></Segment>
          </Sticky>
          <Segment id={"info"}>
            <h2 id={"SurveyTitle"} >{this.props.onSurvey.title}</h2>
            <h3 id={"SurveyContent"}>{this.props.onSurvey.content}</h3>
            <h3 id={"SurveyAuthor"}> {this.props.onSurvey.author} </h3>
          </Segment>
          <div id={"Items"}>
            {
            this.state.survey.item.map((item) => {
              //if (this.state.itemClickedArray[item.number] != null) {
                // console.log(this.state.itemClickedArray[item.number].clicked);
                return (
                  <ResponsingItem
                    itemSelectionClick={this.itemSelectionClick}
                    itemClicked={(this.state.itemClickedArray[item.number] != null) ? this.state.itemClickedArray[item.number].clicked : []} // array
                    number={item.number}
                    title={item.title}
                    question_type={item.question_type}
                    selection={item.selection}
                    multiple={item.multiple_choice}
                    subjectInput={this.itemSubjectInput}
                  />
                );
              //}
            })
          }
          </div>
          <button id={"Submit"} onClick={this.onSubmitHandler}>
            Submit
          </button>
        </div>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResponsePage));
