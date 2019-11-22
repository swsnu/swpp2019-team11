import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment, Checkbox } from 'semantic-ui-react';
import Slider from '@material-ui/core/Slider';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';

export const mapDispatchToProps = (dispatch) => ({
    checklogIn: () => dispatch(actionCreators.checklogIn()),
    //onSubmitSurvey: (survey) => dispatch(actionsCreators.submitSurvey(survey)),
})

export class MakingPage extends Component {
    state= {
        title: '',
        content: '',
        target: [{ gender: 'male' }, { age: [1, 100] }],
        target_check: [{ gender: 0 }, { age: 0 }],
        item_count: 1,
        item_list: [
            { id: 0, question: '', question_type: 'Subjective', option_list: [{ 'content': '' }] },
        ],
    }
    /*parentCallBack = (dataFromChild) => {
        this.setState({item_list: dataFromChild})
    }*/
    componentDidMount() {
        this.props.checklogIn()
      .then(() => {
      })
      .catch(() => { this.props.history.push('/login/'); });
    }

    onToggleHandler = (id) => {
        if (this.state.item_list[id].question_type == 'Subjective') {
            let new_list = this.state.item_list;
            new_list[id].question_type = 'Selection';
            this.setState({ item_list: new_list });
        }
        else {
            let new_list = this.state.item_list;
            new_list[id].question_type = 'Subjective';
            this.setState({ item_list: new_list });
        }
    }

    targetToggleHandler = (id) => {
        let new_check = this.state.target_check;
        new_check[id] = 1 - new_check[id];
        this.setState({ target_check: new_check });
    }

    insertOptionHandler = (id) => {
        let new_list = this.state.item_list;
        new_list[id].option_list.push({ content: '' });

        this.setState({
          item_list: new_list
        });
    };

    submitHandler = () => {
        this.state.item_list.map((item) => { //delete selections of subject question
            if (item.question_type != 'Selection'){
                item.option_list = [];
            }
        });

        let new_target= this.state.target;
        if ( this.state.target_check[0].gender == 0 ) new_target[0].gender = 'male';
        if ( this.state.target_check[1].age == 0 ) new_target[1].age = [ 1, 100 ];

        let survey = { 
            title: this.state.title,
            content: this.state.content,
            item_list: this.state.item_list,
        };
        alert(this.state.title);
        //this.props.onSubmitSurvey(survey);
    }
    
    insertItemHandler = () => {
        const new_list = [
          ...this.state.item_list,
          {
            id: this.state.item_count,
            question: '',
            question_type: 'Subjective',
            option_list: [{ content: '' }],
          },
        ];

        this.setState({
          item_count: this.state.item_count + 1,
          item_list: new_list,
        });
    };

    Items = () =>  this.state.item_list.map((items, item_index) => {
      return (
        <MakingItem
          id={item_index}
          question={items.question}
          questiontype={items.question_type}
          optionList={items.option_list}
          onToggle={this.onToggleHandler}
          onAddhandler={(id) => this.insertOptionHandler(id)}
          submitHandler={this.submitHandler}
        />
      );
    });

    render() {
      return (
        <div>
          <Sticky>
            <Segment><h1>MakingPage</h1></Segment>
          </Sticky>
          <Segment>
            Title:
            {'    '}
            <input type="text" onChange={(event) => this.setState({ title: event.target.value })} />
            {'    '}
            Content:
            {'    '}
            <input type="text" onChange={(event) => this.setState({ content: event.target.value })} />
          </Segment>
          <Segment>
            <h3>Survey Target Settings:</h3>
            <div>Gender:</div>
            <Checkbox toggle/>{'  gender   '}
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(0)} /> Won't input gender option
            <div>Age:</div>
            <Slider
                  max={100}
                  min={1}
                  style={{ width: 270, color: '#008080' }}
                  //value={this.state.respondant}
                  //onChange={this.handleSlider}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  //valueLabelFormat={this.formatFunction}
            />
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(1)} /> Won't input age option
          </Segment>
          <button onClick={() => { this.insertItemHandler(); }}>
            Add Question Item
          </button>
          { this.Items() }
          <button onClick={() => { /*this.props.history.push('/participate/');*/ this.submitHandler(); }}>
            Submit
          </button>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
