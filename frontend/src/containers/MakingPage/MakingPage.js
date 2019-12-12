import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import {
  Sticky, Segment, Input, TextArea, Progress, Form, Button, Checkbox, Ref, Modal, Icon, Header, Grid,
} from 'semantic-ui-react';
import moment from 'moment';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';
import './MakingPage.css';
import { TopBar } from '../../components/TopBar/TopBar';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onSubmitSurvey: (survey) => dispatch(actionCreators.addOngoingSurvey(survey)),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});

export const mapStateToProps = (state) => ({
  username: state.us.info.username,
  point: state.us.info.point,
});

const genders = [
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'f', text: 'Female', value: 'F' },
  { key: 'o', text: 'Other', value: 'O' },
];

const ages = [
  { key: 'a', text: '10s', value: { start: 10, end: 19 } },
  { key: 'b', text: '20s', value: { start: 20, end: 29 } },
  { key: 'c', text: '30s', value: { start: 30, end: 39 } },
  { key: 'd', text: '40s', value: { start: 40, end: 49 } },
  { key: 'e', text: '50s', value: { start: 50, end: 60 } },
];

export class MakingPage extends Component {
    contextRef = createRef()

    state= {
      title: '',
      content: '',
      target_gender: 'M',
      target_age: [10, 19],
      gender_check: true,
      age_check: true,
      response_count: 0,
      due_date: moment(),
      open_date: moment(),
      item_count: 1,
      item_list: [
        {
          number: 1, title: '', question_type: 'Subjective', multiple_choice: false, personal_data: false, selection: [],
        },
      ],
      open_date_focused: false,
      due_date_focused: false,
      scrollBound: [200, 300],
      modal_open: false,
    }


    componentDidMount() {
      this.listenToScrollEvent();
      this.props.checklogIn()
        .then(() => {
          this.props.getUserInfo();
        })
        .catch(() => { this.props.history.push('/login/'); });
    }


    itemTypeHandler = (number, type) => {
      const new_list = this.state.item_list;
      if (type == 3) {
        new_list[number - 1].question_type = 'Selection';
        new_list[number - 1].selection = [{ number: 1, content: '' }];
        new_list[number - 1].multiple_choice = true;
      } else if (type == 2) {
        new_list[number - 1].question_type = 'Selection';
        new_list[number - 1].selection = [{ number: 1, content: '' }];
        new_list[number - 1].multiple_choice = false;
      } else {
        new_list[number - 1].question_type = 'Subjective';
        new_list[number - 1].selection = [];
        new_list[number - 1].multiple_choice = false;
      }
      this.setState({ item_list: new_list });
    }

    personalToggler = (number) => {
      const new_list = this.state.item_list;
      new_list[number - 1].personal_data = !(new_list[number - 1].personal_data);
      this.setState({ item_list: new_list });
    }

    genderCheckToggler = () => {
      this.setState({ gender_check: !this.state.gender_check });
    }

    ageCheckToggler = () => {
      this.setState({ age_check: !this.state.age_check });
    }

    submitHandler = () => {
      let error = (
        this.state.title == ''
        || this.state.content == ''
        || !Number.isInteger(+this.state.response_count)
        || this.state.response_count <= 0
        || this.state.response_count > 100
        || this.state.item_list.reduce((item_acc, item) => (item_acc || (item.title == '') || item.error.reduce((error_acc, error) => error_acc || error, false)), false));

      this.state.item_list.map((Item) => {
        if (Item.question_type == 'Selection' && Item.selection.length <= 1) error = true;
      });

      if (error) {
        this.setState({ modal_open: true });
      } else {
        const survey = {
          title: this.state.title,
          content: this.state.content,
          survey_start_date: moment().format('YYYY/MM/DD'),
          survey_end_date: this.state.due_date.format('YYYY/MM/DD'),
          open_date: this.state.open_date.format('YYYY/MM/DD'),
          item: this.state.item_list,
          target_age_start: this.state.age_check ? 1 : this.state.target_age[0],
          target_age_end: this.state.age_check ? 100 : this.state.target_age[1],
          target_gender: this.state.gender_check ? 'A' : this.state.target_gender,
          target_respondant_count: this.state.response_count,
        };
        this.props.onSubmitSurvey(survey);
        this.props.history.push('/main/');
      }
    }

    addItemHandler = () => {
      const new_item = {
        number: this.state.item_list.length + 1,
        title: '',
        question_type: 'Subjective',
        multiple_choice: false,
        selection: [],
        personal_data: false,
      };
      this.state.item_list.push(new_item);
      this.forceUpdate();
    };

    deleteItemHandler = (number) => {
      let new_item_list = this.state.item_list.filter((item) => !(item.number==number))
      console.log(new_item_list)
      new_item_list.map((item, index) => {
        item.number = index+1;
      })
      console.log(new_item_list)
      this.state.item_list = new_item_list;
      this.forceUpdate();
    }

    isDateBlocked = (date) => (date.isBefore(this.state.due_date))

    dataCallBackHandler = (data, number) => {
      this.state.item_list[number - 1].title = data.title;
      this.state.item_list[number - 1].selection = data.selection_list;
      this.state.item_list[number - 1].error = data.error;
      this.setState({ ...this.state });
    }

    Items = () => this.state.item_list.map((item) => (
      <MakingItem
        number={item.number}
        question_type={item.question_type}
        multiple_choice={item.multiple_choice}
        stateSender={this.dataCallBackHandler}
        multipleSelectionToggler={this.multipleSelectionToggler}
        questionTypeToggler={this.questionTypeToggler}
        personalToggler={this.personalToggler}
        itemTypeHandler={this.itemTypeHandler}
        deleteHandler={this.deleteItemHandler}
      />
    ));

    listenToScrollEvent = () => {
      document.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
          this.scroll();
        });
      });
    }

    scroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = this.getDocHeight();
      const totalDocScrollLength = docHeight - winHeight;
      if (totalDocScrollLength < 1000) {
        this.setState({ scrollBound: [300, 400] });
      } else {
        this.setState({ scrollBound: [500, 850] });
      }
    }

    getDocHeight = () => Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    )

    render() {
      const items = this.Items();
      return (
        <Ref className="MakingPage" innerRef={this.contextRef}>
          <div>
            <Modal open={this.state.modal_open}>
              <Header icon="x" content="Form error!" />
              <Modal.Content>
                <h3>Please check if you have filled all of the forms.</h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color="grey" onClick={() => this.setState({ modal_open: false })}>
                  <Icon name="checkmark" />
                  {' '}
Okay
                </Button>
              </Modal.Actions>
            </Modal>
            <TopBar menu="Making" history={this.props.history} context={this.contextRef} username={this.props.username} point={this.props.point} />
            <Sticky offset={130} context={this.contextRef}>
              <Segment
                border="none"
                style={{
                  height: '50px', marginTop: '15px', borderBottom: 'none', borberTop: 'none',
                }}
              >
                <Progress style={{ marginTop: '0px' }} id="progressBar" value={window.pageYOffset <= this.state.scrollBound[0] ? '1' : (window.pageYOffset < this.state.scrollBound[1] ? '2' : '3')} total="3" progress="ratio" />
              </Segment>
            </Sticky>
            <Grid id="underTopbar">
              <Grid.Row columns={1}>
                <Grid.Column>

                  <Segment className="ItemFirst" id="item" sytle={{ backgroundColor: '#E0E7E9' }} backgroundColor="#E0E7E9">
                    <h3 style={{ marginBottom: 0, marginTop: 10 }}><span id="ExplainSurvey" style={{ padding: '5px', fontSize: 26, 'border-radius': 5 }}>1. Explain your survey!</span></h3>
                    <br />
                    <p id="titleInput" style={{ 'font-size': '20px', marginBottom: 5 }}>Title </p>
                    <Input className="SurveyTitle" error={this.state.title == ''} placeholder="Survey Title..." style={{ width: '500px' }} onChange={(event) => this.setState({ title: event.target.value })} />
                    <br />
                    <br />
                    <p style={{ 'font-size': '19px', marginBottom: 5 }}>Content </p>
                    <TextArea
                      className="SurveyContent"
                      placeholder="Please explain about your Survey"
                      error={this.state.content == ''}
                      rows={4}
                      onChange={(event) => this.setState({ content: event.target.value })}
                    />
                    <br />
                    <br />
                    <p style={{ 'font-size': '17px', marginBottom: 5 }}>Due Date </p>
                    <SingleDatePicker
                      borderRadius={5}
                      numberOfMonths={1}
                      onDateChange={(due_date) => { this.setState({ due_date, open_date: this.state.open_date.isBefore(due_date) ? due_date : this.state.open_date }); }}
                      onFocusChange={({ focused }) => this.setState({ due_date_focused: focused })}
                      focused={this.state.due_date_focused}
                      date={moment(this.state.due_date)}
                    />
                    <p style={{ 'font-size': '17px', marginBottom: 5, marginTop: 5 }}>Open Date </p>
                    <SingleDatePicker
                      borderRadius={5}
                      numberOfMonths={1}
                      onDateChange={(open_date) => this.setState({ open_date })}
                      onFocusChange={({ focused }) => this.setState({ open_date_focused: focused })}
                      focused={this.state.open_date_focused}
                      date={moment(this.state.open_date)}
                      isDayBlocked={this.isDateBlocked}
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <Segment style={{ backgroundColor: '#A3C6C4' }}>
                    <h3 id="TargetSetting" color="#354649" style={{ marginBottom: 14, marginTop: 10 }}><span style={{ padding: '5px', fontSize: 26, 'border-radius': 5 }}>2. Survey Target Settings!</span></h3>

                    <p style={{ 'font-size': '15px', marginBottom: 5, fontWeight: 'bold' }}>Gender </p>
                    <Form.Select className="genderSelect" disabled={this.state.gender_check} value={this.state.target_gender} options={genders} onChange={(e, { value }) => { this.setState({ target_gender: value }); }} placeholder="Gender" />
                    <div id="Gender">
                      <Checkbox className="genderCheck" checked={this.state.gender_check} onClick={this.genderCheckToggler} />
                      {' '}
                For all genders
                    </div>
                    <p style={{
                      'font-size': '15px', marginBottom: 5, marginTop: 6, fontWeight: 'bold',
                    }}
                    >
                Age
                    </p>
                    <Form.Select className="ageSelect" disabled={this.state.age_check} value={{ start: this.state.target_age[0], end: this.state.target_age[1] }} options={ages} onChange={(e, { value }) => { this.setState({ target_age: [value.start, value.end] }); }} placeholder="Age" />
                    <Checkbox className="ageCheck" checked={this.state.age_check} onClick={this.ageCheckToggler} />
                For all age
                    <p style={{ marginTop: 10, marginBottom: 5, fontWeight: 'bold' }}>Target Response count:</p>
                    <Input
                      className="targetCount"
                      type="text"
                      error={!Number.isInteger(+this.state.response_count) || this.state.response_count <= 0 || this.state.response_count > 100}
                      onChange={(event) => this.setState({ response_count: event.target.value })}
                      placeholder="... How many Responses?"
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Segment style={{ backgroundColor: '#8d99a5' }}>
                    <p id="itemsText">3. Items</p>
                    <Button className="addItemButton" onClick={this.addItemHandler}>
                  Add Question Item
                    </Button>
                    { items }
                  </Segment>
                  <Button
                    floated="right"
                    size="huge"
                    style={{
                      marginBottom: '10px', width: '150px', color: 'black', backgroundColor: '#8d99a5',
                    }}
                    className="submitButton"
                    onClick={this.submitHandler}
                  >
            Submit
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Ref>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MakingPage));
