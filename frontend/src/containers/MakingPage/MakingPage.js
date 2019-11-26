import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import { Sticky, Segment, Checkbox } from 'semantic-ui-react';
import Slider from '@material-ui/core/Slider';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';
import moment from 'moment';

export const mapDispatchToProps = (dispatch) => ({
    checklogIn: () => dispatch(actionCreators.checklogIn()),
    onSubmitSurvey: (survey) => dispatch(actionCreators.addOngoingSurvey(survey)),
})

export class MakingPage extends Component {
    state= {
        title: '',
        content: '',
        target: [{ gender: 'male' }, { age: [1, 100] }],
        gender_check: false,
        age_check: false,
        response_count: 0, 
        due_date: moment(),
        open_date: moment(),
        item_count: 1,
        item_list: [
            { id: 0, question: '', question_type: 'Subjective', duplicate_input: false, option_list: [{ id: 0, content: '' }] },
        ],
    }

    componentDidMount() {
      this.props.checklogIn()
        .then(() => {
        })
        .catch(() => { this.props.history.push('/login/'); });
    }

    onToggleTypeHandler = (id) => {
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

    onToggleDupHandler = (id) => {
        let new_list = this.state.item_list;
        if (this.state.item_list[id].duplicate_input == false) {
            new_list[id].duplicate_input = true;
            this.setState({item_list: new_list});
        }
        else {
            new_list[id].duplicate_input = false;
            this.setState({item_list: new_list});
        }
    }

    targetToggleHandler = (id) => {
      if (id == 0){
        this.setState({gender_check: !this.state.gender_check})
      }
      if (id == 1){
        this.setState({age_check: !this.state.age_check})
      }
    }

    insertOptionHandler = (item_id) => {
        let new_list = this.state.item_list;
        let num = new_list.length;
        new_list[item_id].option_list.push({ id: num, content: '' });

        this.setState({ item_list: new_list });
    };

    submitHandler = () => {
      this.state.item_list.map((item) => { //delete selections of subject question
        if (item.question_type != 'Selection'){ item.option_list = []; }
      });

      let new_target= this.state.target;
      if ( this.state.gender_check != true ) new_target[0].gender = '-';
      else{
        if (this.state.target[0].gender == 'male') new_target[0].gender = 'M';
        if (this.state.target[0].gender == 'female') new_target[0].gender = 'F';
      }
      if ( this.state.age_check == false ) new_target[1].age = [ 1, 100 ];
      
      let dueDayArr = this.state.due_date.format().split('-');
      let dueStr = dueDayArr[0].substring(0, 4);
      dueStr = dueStr.concat("/", dueDayArr[1], "/", dueDayArr[2].substring(0,2));

      let startDayArr = moment().format().split("-");
      let startStr = "";
      startStr = startStr.concat(startDayArr[0].substring(0, 4), "/", startDayArr[1], "/", startDayArr[2].substring(0,2));
        
      let openDayArr =  this.state.open_date.format().split('-');
      let openStr = openDayArr[0].substring(0, 4);
      openStr = openStr.concat("/", openDayArr[1], "/", openDayArr[2].substring(0, 2));
      let new_item_list = [];
      this.state.item_list.map((item) => {
        let new_option_list = [];
        item.option_list.map((option) => {
          const new_option = {
            number: option.id,
            selection: option.content,
          }
          new_option_list.push(new_option);
        });
        //alert(new_option_list[0].number);
        const new_item = {
          number: item.id,
          title: item.question,
          question_type: item.question_type,
          selection: new_option_list,
          multiple_choice: item.duplicate_input,
        }
        new_item_list.push(new_item);
      })
      //alert(new_item_list[0].title);
      let survey = { 
          title: this.state.title,
          content: this.state.content,
          survey_start_date: startStr,
          survey_end_date: dueStr,
          open_date: openStr,
          item: new_item_list,
          target_age_start: this.state.target[1].age[0],
          target_age_end: this.state.target[1].age[1],
          target_gender: new_target[0].gender,
          target_respondant_count: this.state.response_count,
      };
      alert(survey.item.length);
      //this.props.onSubmitSurvey(survey);
    }
    
    insertItemHandler = () => {
        const new_list = [
          ...this.state.item_list,
          {
            id: this.state.item_count,
            question: '',
            question_type: 'Subjective',
            duplicate_input: false,
            option_list: [{ id: 0, content: '' }],
          },
        ];

        this.setState({
          item_count: this.state.item_count + 1,
          item_list: new_list,
        });
    };

    parentCallBackTitle = (dataFromChild, id) => {
        let new_dat = this.state.item_list;
        new_dat[id].title = dataFromChild;
        this.setState({item_list: new_dat});
    }

    parentCallBackOption = (dataFromChild, item_id) => {
        let new_list = this.state.item_list
        new_list[item_id].option_list = dataFromChild;
        this.setState({item_list: new_list});
    }

    Items = () => this.state.item_list.map((items) => {
      return (
        <MakingItem
          id={items.id}
          itemTitle={(par1, par2) => this.parentCallBackTitle(par1, par2)}
          questiontype={items.question_type}
          duplicate={items.duplicate_input}
          optionList={(par1, par2) => this.parentCallBackOption(par1, par2)}
          callOptionList={this.state.item_list[items.id].option_list}
          onToggleType={(id) => this.onToggleTypeHandler(items.id)}
          onToggleDup={(id) => this.onToggleDupHandler(items.id)}
          onAddhandler={(id) => this.insertOptionHandler(items.id)}
        />
      );
    });

    render() {
      return (
        <div className="MakingPage">
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
            Due Date:
            <SingleDatePicker 
                numberOfMonths={1}
                onDateChange={(due_date) => this.setState({ due_date : due_date })}
                onFocusChange={({focused}) => this.setState({ due_date_focused : focused })}
                focused={this.state.due_date_focused}
                date={this.state.due_date}
            />
            Open Date:
            <SingleDatePicker 
                numberOfMonths={1}
                onDateChange={(open_date) => this.setState({ open_date })}
                onFocusChange={({focused}) => this.setState({ open_date_focused : focused })}
                focused={this.state.open_date_focused}
                date={this.state.open_date}
            />
            <h3>Survey Target Settings:</h3>
            <div>Gender:</div>
            <Checkbox toggle onChange={(e)=>{
              let new_gen = this.state.target;
              if (new_gen[0].gender == 'male') new_gen[0].gender = 'female';
              else new_gen[0].gender = 'male';
              this.setState({target: new_gen});
            }} />
            {this.state.target[0].gender}
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(0)} /> Won't input gender option
            <div>Age:</div>
            <Slider
              className="ageSlider"
              max={100}
              min={1}
              style={{ width: 270, color: '#008080' }}
              aria-labelledby="range-slider"
              defaultValue={[0, 100]}
              onChange={(e)=>{
                let new_age = this.state.target;
                new_age[1] = e.target.value;
                this.setState(new_age);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
            />
            <Checkbox className="ageNotCheck" defaultChecked={true} onClick={(id) => this.targetToggleHandler(1)} /> 
            Won't input age option
            {'  '}
            <p>Target People:</p>
            <input type="text" className="targetCount" onChange={(event) => this.setState({ response_count: event.target.value })} />
          </Segment>
          <button onClick={ this.insertItemHandler }>
            Add Question Item
          </button>
          { this.Items() }
          <button className="submitButton" onClick={() => { this.submitHandler();  this.props.history.push('/main/'); }}>
            Submit
          </button>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
