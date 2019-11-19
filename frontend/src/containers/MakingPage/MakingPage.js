import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Sticky, Segment, Form } from 'semantic-ui-react';
import MakingItem from '../../components/MakingPage/MakingItem';

export class MakingPage extends Component {
    state = {
        title: '',
        content: '',
        item_num: 1,
        item_list: [
            { question: '', question_type: 'Subjective' },
        ],
    }

    
    render() {
        const Items = this.state.item_list.map( items => {
            var onToggleHandler = () => {
                if (items.question_type == 'Subjective') items.question_type = 'Selection';
                else items.question_type = 'Subjective';
            }
            return(
                <MakingItem onToggle={ () => onToggleHandler() } />
            );
        })
        
        var insertHandler = () => {
            const new_list = [
                ...this.state.item_list,
                {
                    question: '',
                    question_type: '',
                }
            ];
            
            this.setState({
                item_list: new_list,
                item_num: this.state.item_num+1,
            })
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
                <button onClick={ () => insertHandler() } >
                    Add Question Item
                </button>
                {Items}
                <button onClick={ () => this.props.history.push('/participate/') }>
                    Submit
                </button>
            </div>
        ); 
    }
}

export default connect(null, null)(withRouter(MakingPage));

