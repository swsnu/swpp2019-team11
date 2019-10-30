import React, { Component } from 'react';
import { Grid, Header, Segment, GridColumn } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class Submit extends Component{
    render(){
        return(
            <div class="ui green segment">
                <Header style={{ 'font-size': '2em' }} size="huge" color="green">3. Warning & Confirm</Header>
                <div align="right" >
                    <button class="ui green basic button" > Continue </button>
                </div>
            </div>
        );
    }
}
export default Submit;