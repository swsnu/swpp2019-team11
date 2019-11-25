import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment, Input, TextArea, Progress, Form, Button } from 'semantic-ui-react';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';
import style from './MakingPage.css';

export const mapDispatchToProps = (dispatch) => ({
    checklogIn: () => dispatch(actionCreators.checklogIn()),
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
      item_count: 1,
      item_list: [
        { id: 0, question: '', question_type: 'Subjective', option_list: [{ 'content': '' }] },
      ],
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

    insertOptionHandler = (id) => {
        let new_list = this.state.item_list;
        new_list[id].option_list.push({ content: '' });

        this.setState({
          item_list: new_list
        });
    };

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

    render() {
      const Items = this.state.item_list.map((items, item_index) => {
        return (
          <MakingItem
            id={item_index}
            questiontype={items.question_type}
            optionList={items.option_list}
            onToggle={this.onToggleHandler}
            onAddhandler={(id) => this.insertOptionHandler(id)}
          />
        );
      });
      
      return (
        <div style = {{marginLeft : 10}}>
          <Sticky>
            <div style = {{ backgroundColor: "#E0E7E9"}}>
              <Segment style = {{ backgroundColor: "#E0E7E9", 'border-bottom':'0px', 'box-shadow': 0}}><h1>MakingPage</h1></Segment>
              <Progress value='3' total='5' progress='ratio' />
            </div>   
          </Sticky>
          <Segment style = {{ backgroundColor: "#A3C6C4", 'border-color': 'white'}}>
          <h3>Explain your survey!</h3>
            <p style = {{'font-size': '15px', marginBottom: 5}}>Title </p>
            <Input style = {{width: '500px'}} onChange={(event) => this.setState({ title: event.target.value })} />
            <br /><br />
            <p style = {{'font-size': '15px', marginBottom: 5}}>Content </p>
            <TextArea rows={4} style={{'border-color': 'white', width:'800px', height:'100px', borderRadius:5, minHeight: 100 }} onChange={(event) => this.setState({ content: event.target.value })} />
          </Segment>
          <Segment style = {{ backgroundColor: "#A3C6C4"}}>
            <h3 color='#354649'>Survey Target Settings!</h3>
            <p style = {{'font-size': '15px', marginBottom: 5}}>Gender </p>
            <Form.Select options={genders} placeholder='Gender' error />
            <br />
            <p style = {{'font-size': '15px', marginBottom: 5}}>Age </p>
            <Form.Select options={ages} placeholder='Age' error />
          </Segment>
          <h3>Items</h3>
          <Button onClick={() => { this.insertItemHandler(); }}>
            Add Question Item
          </Button>

          { Items }
          <Button style = {{marginBottom : 10}} onClick={() => { this.props.history.push('/participate/'); }}>
            Submit
          </Button>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
