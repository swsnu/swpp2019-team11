import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import CheckItem from './CheckItem';

class EditItem extends Component{
    render(){
        return(
            <div class="ui olive segment">
                <Header style={{ 'font-size': '2em' }} size="huge" color="olive">2. Edit Your Survey</Header>
                <h4>Title:</h4>
                <h4 style={{"margin-bottom":"30px"}}>Items:</h4>
                <Grid columns={1}>
                    <CheckItem/>
                    <Grid.Row >
                        <Grid.Column align="right">
                            <button align="right" class="ui olive basic button" align="right" > Continue </button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
export default EditItem;