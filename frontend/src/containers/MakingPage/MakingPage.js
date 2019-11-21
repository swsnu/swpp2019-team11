import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';

export const mapDispatchToProps = (dispatch) => ({
    checklogIn: () => dispatch(actionCreators.checklogIn()),
})

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
            <input />
            <div>Age:</div>
          </Segment>
          <button onClick={() => { this.insertItemHandler(); }}>
            Add Question Item
          </button>
          { Items }
          <button onClick={() => { this.props.history.push('/participate/'); }}>
            Submit
          </button>
        </div>
      );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(MakingPage));
