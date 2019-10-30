import React, { Component } from 'react';
import { Grid, Header, Segment, GridColumn } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

const Submit = (props) => {
    if (props.progress >= 2){
        return(
            <div class="ui green segment">
                <Header style={{ 'font-size': '2em' ,'margin-left':"8px" }} size="huge" color="green">3. Warning & Confirm</Header>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <div style={{"font-size":"20px", "color":"#ff0000", 'margin-left':"19px"}}><strong>You can't delete privacy after upload.</strong></div>
                        </Grid.Column>
                        <Grid.Column align="right" >
                            <div class="ui checkbox" style={{'margin-right':"120px", 'font-size': '1em'}} align="right" >
                                <input type="checkbox" align="right" name="example" fontSize="1em" style={{"fontSize":"30pt"}}/>
                                <label align="right"> Yes, I will Admit. </label>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div align="right" >
                    <button class="ui green basic button" style={{"margin-top":"15px", "marginRight":"20pt", "width":"100pt"}}> Continue </button>
                </div>
            </div>
        );
    }
    else{
        return(<div></div>);
    }
}
export default Submit;