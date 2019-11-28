import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import { Sticky, Segment, Input, TextArea, Progress, Form, Button, Checkbox, Ref } from 'semantic-ui-react';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';
import moment from 'moment';

export const mapDispatchToProps = (dispatch) => ({
    checklogIn: () => dispatch(actionCreators.checklogIn()),
    onSubmitSurvey: (survey) => dispatch(actionCreators.addOngoingSurvey(survey)),
})

const genders = [
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'f', text: 'Female', value: 'F' },
  { key: 'o', text: 'Other', value: 'O' },
]

const ages = [
  { key: 'a', text: '10', value: {start : 10, end : 19} },
  { key: 'b', text: '20', value: {start : 20, end : 29} },
  { key: 'c', text: '30', value: {start : 30, end : 39} },
  { key: 'd', text: '40', value: {start : 40, end : 49} },
  { key: 'e', text: 'All', value: {start : 1, end :  100} },
]

export class MakingPage extends Component {

    contextRef = createRef()
    state= {
        title: '',
        content: '',
        target_gender: 'M',
        target_age: [1, 100],
        gender_check: false,
        age_check: false,
        response_count: 0, 
        due_date: moment().format("YYYY/MM/DD"),
        open_date: moment().format("YYYY/MM/DD"),
        item_count: 1,
        item_list: [
            { number: 1, title: '', question_type: 'Subjective', multiple_selection: false, selection: [] },
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

    questionTypeToggler = (number) => {
        if (this.state.item_list[number-1].question_type == 'Subjective') {
            let new_list = this.state.item_list;
            new_list[number-1].question_type = 'Selection';
            new_list[number-1].selection = [{ number: 1, content: '' }]
            this.setState({ item_list: new_list });
        }
        else {
            let new_list = this.state.item_list;
            new_list[number-1].question_type = 'Subjective';
            new_list[number-1].selection = []
            this.setState({ item_list: new_list });
        }
    }

    multipleSelectionToggler = (number) => {
        let new_list = this.state.item_list;
        if (this.state.item_list[number-1].multiple_selection == false) {
            new_list[number-1].multiple_selection = true;
            this.setState({item_list: new_list});
        }
        else {
            new_list[number-1].multiple_selection = false;
            this.setState({item_list: new_list});
        }
    }

    genderCheckToggler = () => {
      this.setState({gender_check: !this.state.gender_check})
    }

    ageCheckToggler = () => {
      this.setState({age_check: !this.state.age_check})
    }

    submitHandler = () => {
      const survey = { 
          title: this.state.title,
          content: this.state.content,
          survey_start_date: moment().format("YYYY/MM/DD"),
          survey_end_date: this.state.due_date,
          open_date: this.state.open_date,
          item: this.state.item_list,
          target_age_start: this.state.target_age[0],
          target_age_end: this.state.target_age[1],
          target_gender: this.state.target_gender,
          target_respondant_count: this.state.response_count,
      };
      this.props.onSubmitSurvey(survey);
      this.props.history.push('/main/');
    }
    
    addItemHandler = () => {
      const new_item = {
        number: this.state.item_list.length+1,
        title: '',
        question_type: 'Subjective',
        multiple_selection: false,
        selection: [],
      };
      this.state.item_list.push(new_item)
      this.forceUpdate()
    };

    dataCallBackHandler = (data, number) => {
      this.state.item_list[number-1].title = data.title
      this.state.item_list[number-1].selection = data.selection_list
      this.setState({...this.state})
    }

    Items = () => this.state.item_list.map((item) => {
      return (
        <MakingItem
          number={item.number}
          question_type={item.question_type}
          multiple_selection={item.multiple_selection}
          stateSender = {this.dataCallBackHandler}
          multipleSelectionToggler = {this.multipleSelectionToggler}
          questionTypeToggler = {this.questionTypeToggler}
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
      let items = this.Items()
      return (
        <Ref className="MakingPage" innerRef={this.contextRef} >
          <div style = {{marginLeft : 10}}>
          <Sticky context = {this.contextRef}>
            <Segment style = {{ backgroundColor: "#E0E7E9"}}>
              <Segment style = {{ backgroundColor: "#E0E7E9", 'border-bottom':'0px', 'box-shadow': 0}}><h1>MakingPage</h1></Segment>
              <Progress color='teal' value={this.state.scrollPostion <= 50 ? '1' : (this.state.scrollPostion < 99 ? '2' : '3')} total='3' progress='ratio' />
            </Segment>   
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
                onDateChange={(due_date) => this.setState({ due_date : due_date })}
                onFocusChange={({focused}) => this.setState({ due_date_focused : focused })}
                focused={this.state.due_date_focused}
                date={moment(this.state.due_date)}
            />
          </Segment>

          <Segment style = {{ backgroundColor: "#A3C6C4"}}>
            <h3 color='#354649'><span style = {{padding:'5px', backgroundColor: "#E0E7E9", 'border-radius':5}}>2. Survey Target Settings!</span></h3><br />
            <p style = {{'font-size': '15px', marginBottom: 5}}>Gender </p>
            <Form.Select value = {this.state.target_gender} options={genders} onChange = {(e, {value}) => {this.setState({target_gender : value})}} placeholder='Gender' />
            <Checkbox defaultChecked={true} onClick={this.genderCheckToggler} /> Won't input gender option
            <p style = {{'font-size': '15px', marginBottom: 5}}>Age </p>
            <Form.Select value = {{start : this.state.target_age[0], end : this.state.target_age[1]}} options={ages} onChange = {(e, {value}) => {this.setState({target_age : [value.start, value.end]})}} placeholder='Age' />
            <Checkbox defaultChecked={true} onClick={this.ageCheckToggler} /> 
            Won't input age option
            <p>Target People:</p>
            <Input type="text" onChange={(event) => this.setState({ response_count: event.target.value })} />
          </Segment>
          <h3>3. Items</h3>
          <Button onClick={this.addItemHandler}>
            Add Question Item
          </Button>
          { items }
          <Button onClick={this.submitHandler}>
            Submit
          </Button>
        </div>
      </Ref>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
