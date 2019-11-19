import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment } from 'semantic-ui-react';
import MakingItem from '../../components/MakingPage/MakingItem';

export class MakingPage extends Component {
    state= {
      title: '',
      content: '',
      item_list: [
        { question: '', question_type: 'Subjective', option_list: [ { 'content': '' } ] },
      ],
    }

    render() {
      const Items = this.state.item_list.map(items => {
        var onToggleHandler = () => {
          if (items.question_type == 'Subjective') items.question_type = 'Selection';
          else items.question_type = 'Subjective';
          var el = document.getElementById("question");
          el.innerHTML = items.question_type;
        }

        var insertOptionHandler = () => {
          const new_list = [
            ...items.option_list,
            { 'content': '' }
          ];

          this.setState({
            option_list: new_list,
          });
          items.option_list = new_list;
        };

        return (
          <MakingItem
            questiontype={ items.question_type }
            optionList={ items.option_list }
            onToggle={ () => onToggleHandler() }
            onAddhandler={ () => insertOptionHandler() }
          />
        );
    })

    var insertItemHandler = () => {
      const new_list = [
        ...this.state.item_list,
        {
            question: '',
            question_type: '',
        }
      ];

      this.setState({
        item_list: new_list,
      });
    };

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
        <button onClick={ () => { insertItemHandler() } } >
          Add Question Item
        </button>
        { Items }
        <button onClick={ () => { this.props.history.push('/participate/'); } }>
          Submit
        </button>
      </div>
    );
  }
}

export default connect(null, null)(withRouter(MakingPage));
