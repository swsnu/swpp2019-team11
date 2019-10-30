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
                <Header style={{ 'font-size': '2em',  "margin-left":"10px" }} size="huge" color="olive">2. Edit Your Survey</Header>
                <div style={{"font-size":"22px", "margin-bottom":"10px", "margin-left":"17px", "color":"#663300"}}><strong>Title:</strong></div>
                <div style={{"font-size":"21px", "margin-bottom":"10px", "margin-left":"17px","color":"#663300"}}><strong>Items:</strong></div>
                <div class="ui checkbox" style={{'margin-left':"32px", 'margin-top':'5px', 'margin-bottom':'5px'}}>
                    <input type="checkbox" name="example" />
                    <label > Item Name </label>
                </div>
                <div class="ui checkbox" style={{'margin-left':"32px", 'margin-top':'5px', 'margin-bottom':'5px'}}>
                    <input type="checkbox" name="example" />
                    <label > Item Name2 </label>
                </div>
                <div class="ui checkbox" style={{'margin-left':"32px", 'margin-top':'5px', 'margin-bottom':'5px'}}>
                    <input type="checkbox" name="example" />
                    <label > Item Name3 </label>
                </div>
                <Grid columns={1}>
                    <Grid.Row >
                        <Grid.Column align="right">
                            <button align="right" class="ui olive basic button" style={{"margin-top":"15px","marginRight":"20pt", "width":"100pt"}}> Continue </button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
export default EditItem;