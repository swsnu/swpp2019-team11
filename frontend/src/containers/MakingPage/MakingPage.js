import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import { Sticky, Segment, Input, TextArea, Progress, Form, Button, Checkbox } from 'semantic-ui-react';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';
import moment from 'moment';

export const mapDispatchToProps = (dispatch) => ({
    checklogIn: () => dispatch(actionCreators.checklogIn()),
    //onSubmitSurvey: (survey) => dispatch(actionsCreators.submitSurvey(survey)),
})

const genders = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const ages = [
  { key: 'a', text: '10', value: '10~19' },
  { key: 'b', text: '20', value: '20~29' },
  { key: 'c', text: '30', value: '30~39' },
  { key: 'd', text: '40', value: '40~49' },
  { key: 'e', text: 'Other', value: 'other' },
]

export class MakingPage extends Component {
    state= {
        title: '',
        content: '',
        target: [{ gender: 'male' }, { age: [1, 100] }],
        target_check: [{ gender: 0 }, { age: 0 }],
        response_count: 0, 
        due_date: moment(),
        item_count: 1,
        item_list: [
            { id: 0, question: '', question_type: 'Subjective', duplicate_input: false, option_list: [{ id: 0, content: '' }] },
        ],
        focused: false,
        scrollPostion: 0,
    }

    
    componentDidMount() {
      this.listenToScrollEvent();
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
        let new_check = this.state.target_check;
        new_check[id] = 1 - new_check[id];
        this.setState({ target_check: new_check });
    }

    insertOptionHandler = (item_id) => {
        let new_list = this.state.item_list;
        let num = new_list.length;
        new_list[item_id].option_list.push({ id: num, content: '' });

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
        
        
        let dueDayArr = this.state.due_date.format().split('-');
        let dueStr = dueDayArr[0].substring(2, 4);
        dueStr = dueStr.concat("/", dueDayArr[1], "/", dueDayArr[2].substring(0,2));

        let startDayArr = moment().format().split("-");
        let startStr = "";
        startStr = startStr.concat(startDayArr[0].substring(2, 4), "/", startDayArr[1], "/", startDayArr[2].substring(0,2));
        
        let survey = { 
            title: this.state.title,
            content: this.state.content,
            survey_start_date: startStr,
            survey_end_date: dueStr,
            items: this.state.item_list,
            target_age: this.state.target[1].age,
            target_gender: this.state.target[0].gender,
            target_respondant_count: this.state.response_count,
        };
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
  
    listenToScrollEvent = () => {
      document.addEventListener("scroll", () => {
        requestAnimationFrame(() => {
          this.calculateScrollDistance();
        });
      });
    }
  
    calculateScrollDistance = () => {
      const scrollTop = window.pageYOffset; // how much the user has scrolled by
      const winHeight = window.innerHeight;
      const docHeight = this.getDocHeight();
  
      const totalDocScrollLength = docHeight - winHeight;
      const scrollPostion = Math.floor(scrollTop / totalDocScrollLength * 100)
  
      this.setState({
        scrollPostion,
      });
    }
  
    getDocHeight = () => {
      return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
    }

    render() {
      console.log(this.state.scrollPostion)
      return (
        <div style = {{marginLeft : 10}}>
          <Sticky>
            <div style = {{ backgroundColor: "#E0E7E9"}}>
              <Segment style = {{ backgroundColor: "#E0E7E9", 'border-bottom':'0px', 'box-shadow': 0}}><h1>MakingPage</h1></Segment>
              <Progress color='teal' value={this.state.scrollPostion <= 50 ? '1' : (this.state.scrollPostion < 99 ? '2' : '3')} total='3' progress='ratio' />
            </div>   
          </Sticky>
          <Segment style = {{ backgroundColor: "#A3C6C4", 'border-color': 'white'}}>
          <h3><span style = {{padding:'5px', backgroundColor: "#E0E7E9", 'border-radius':5}}>1. Explain your survey!</span></h3><br />
            <p style = {{'font-size': '15px', marginBottom: 5}}>Title </p>
            <Input style = {{width: '500px'}} onChange={(event) => this.setState({ title: event.target.value })} />
            <br /><br />
            <p style = {{'font-size': '15px', marginBottom: 5}}>Content </p>
            <TextArea rows={4} style={{'border-color': 'white', width:'800px', height:'100px', borderRadius:5, minHeight: 100 }} onChange={(event) => this.setState({ content: event.target.value })} />
            <br /><br /> <p style = {{'font-size': '15px', marginBottom: 5}}>Due Date </p>
            <SingleDatePicker
                borderRadius={5}
                numberOfMonths={1}
                onDateChange={(due_date) => this.setState({ due_date })}
                onFocusChange={({focused}) => this.setState({ focused })}
                focused={this.state.focused}
                date={this.state.due_date}
            />
          </Segment>

          <Segment style = {{ backgroundColor: "#A3C6C4"}}>

            <h3 color='#354649'><span style = {{padding:'5px', backgroundColor: "#E0E7E9", 'border-radius':5}}>2. Survey Target Settings!</span></h3><br />
            <p style = {{'font-size': '15px', marginBottom: 5}}>Gender </p>
            <Form.Select options={genders} placeholder='Gender' error />
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(0)} /> Won't input gender option
            <p style = {{'font-size': '15px', marginBottom: 5}}>Age </p>
            <Form.Select options={ages} placeholder='Age' error />
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(1)} /> 
            Won't input age option
            <p>Target People:</p>
            <Input type="text" onChange={(event) => this.setState({ response_count: event.target.value })} />
          </Segment>
          <h3>3. Items</h3>
          <Button onClick={() => { this.insertItemHandler(); }}>
            Add Question Item
          </Button>
          { this.Items() }
          <Button onClick={() => { this.submitHandler();  this.props.history.push('/main/'); }}>
            Submit
          </Button>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
