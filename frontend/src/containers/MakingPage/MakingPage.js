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
    //onSubmitSurvey: (survey) => dispatch(actionsCreators.submitSurvey(survey)),
})

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
            { id: 0, question: '', question_type: 'Subjective', option_list: [{ id: 0, content: '' }] },
        ],
        focused: false,
    }

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

        let survey = { 
            title: this.state.title,
            content: this.state.content,
            item_list: this.state.item_list,
            target: this.state.target,
        };
        //alert(this.state.item_list[0].option_list[0].content);
        this.props.onSubmitSurvey(survey);
    }
    
    insertItemHandler = () => {
        const new_list = [
          ...this.state.item_list,
          {
            id: this.state.item_count,
            question: '',
            question_type: 'Subjective',
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
          optionList={(par1, par2) => this.parentCallBackOption(par1, par2)}
          callOptionList={this.state.item_list[items.id].option_list}
          onToggle={(id) => this.onToggleHandler(items.id)}
          onAddhandler={(id) => this.insertOptionHandler(items.id)}
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
            Due Date:
            <SingleDatePicker
                numberOfMonths={1}
                onDateChange={due_date => this.setState({due_date})}
                onFocusChange={({ focused }) => this.setState({ focused})}
                focused={this.state.focused}
                date={this.state.date}
            />
            <h3>Survey Target Settings:</h3>
            <div>Gender:</div>
            <Checkbox toggle onChange={(e)=>{
              let new_gen = this.state.target;
              if (new_gen[0].gender == 'male') new_gen[0].gender = 'female';
              else new_gen[0].gender = 'male';
              this.setState({target: new_gen});
            }}/>
            {this.state.target[0].gender}
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(0)} /> Won't input gender option
            <div>Age:</div>
            <Slider
                  max={100}
                  min={1}
                  style={{ width: 270, color: '#008080' }}
                  aria-labelledby="range-slider"
                  defaultValue={[20, 40]}
                  onChange={(e)=>{
                    let new_age = this.state.target;
                    new_age[1] = e.target.value;
                    this.setState(new_age);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
            />
            <Checkbox defaultChecked={true} onClick={(id) => this.targetToggleHandler(1)} /> 
            Won't input age option
            {'  '}
            <p>Target People:</p>
            <input type="text" onChange={(event) => this.setState({ response_count: event.target.value })} />
          </Segment>
          <button onClick={ this.insertItemHandler }>
            Add Question Item
          </button>
          { this.Items() }
          <button onClick={() => { this.props.history.push('/participate/'); this.submitHandler(); }}>
            Submit
          </button>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
