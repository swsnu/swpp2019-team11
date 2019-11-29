import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/index';
import ResponsingItem from '../../components/ResponsingPage/ResponsingItem';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  getOngoingSurvey: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
  submitOngoingSurvey: (id, survey) => dispatch(actionCreators.participateSurvey(id, survey)), 
})

export const mapStateToProps = (state) => ({
  onSurvey: state.sv.ongoing_survey,
});

export class ResponsePage extends Component {
  state= {
    survey: this.props.onSurvey,
    itemClickedArray: [],
  }

  componentDidUpdate(prevProps) {
    if( prevProps != this.props ){
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
    let itemClickArray = [];
    this.props.onSurvey.item.map((item) => {
      let itemClick = { number: item.number, clicked: [] }
      itemClickArray.push(itemClick);
    });
    this.setState({ itemClickedArray: itemClickArray });
  }

  onSubmitHandler = () => {
    this.state.itemClickedArray.map((val) => {
      if (this.state.survey.item[val.number].question_type == 'Subjective' || !this.state.survey.item[val.number].multiple_choice){
        this.state.survey.item[val.number].response.push({ number: val.number, content: val.clicked[0] });
      }
      else {
        val.clicked.map((selected) => {
          this.state.survey.item[val.number].response.push({ number: val.number, content: selected });
        });
      }
    })
    this.props.submitOngoingSurvey(this.props.match.params.id, this.state.survey);
    //this.props.history.push('/participate/');
  }

  itemSubjectInput = (dataFromChild, item_num) => {
    let newItem = this.state.itemClickedArray;
    newItem[item_num].clicked[0] = dataFromChild;
    this.setState({ itemClickedArray: newItem });
  }

  itemSelectionClick = (item_num, option_num, multiple) => {
    let itemClicked = this.state.itemClickedArray;
    itemClicked[item_num].clicked = option_num;
    this.setState({ itemClickedArray: itemClicked })
  }

  render() {
    if (this.state.survey == ""){
      return null;
    }
    else{
      if (this.state.survey.item != null)
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
            this.state.survey.item.map((item) => {
              if (this.state.itemClickedArray[item.number] != null) {
                //console.log(this.state.itemClickedArray[item.number].clicked);
              return(
                <ResponsingItem
                  itemSelectionClick={this.itemSelectionClick}
                  itemClicked={(this.state.itemClickedArray[item.number]!=null)?this.state.itemClickedArray[item.number].clicked:[]} //array
                  number={item.number}
                  title={item.title}
                  question_type={item.question_type}
                  selection={item.selection}
                  multiple={item.multiple_choice}
                  subjectInput={this.itemSubjectInput}
                />
              );}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResponsePage));
