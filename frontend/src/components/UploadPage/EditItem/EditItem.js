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
                <div style={{"font-size":"22px", "margin-bottom":"10px", "color":"#663300"}}><strong>Title:</strong></div>
                <div style={{"font-size":"20px", "margin-bottom":"10px", "color":"#663300"}}>Items:</div>
                <div class="ui checkbox" style={{'margin-left':"25px"}}>
                    <input type="checkbox" name="example" />
                    <label > Item Name </label>
                </div>
                <Grid columns={1}>
                    <Grid.Row >
                        <Grid.Column align="right">
                            <button align="right" class="ui olive basic button" style={{"marginRight":"20pt", "width":"100pt"}}> Continue </button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
export default EditItem;