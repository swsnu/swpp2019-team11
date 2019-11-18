import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment, Form } from 'semantic-ui-react';

export class MakingPage extends Component {
    state = {
        title: '',
        content: '',
        item_num: 0,
    }

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
                <button>
                    Add Question Item
                </button>
            </div>
        ); 
    }
}

export default connect(null, null)(withRouter(MakingPage));

