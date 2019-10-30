import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class EditItem extends Component{
    render(){
        return(
            <div class="ui olive segment">
                Hell Yeah!
                <div align="right">
                    <button class="ui olive basic button" align="right" > Continue </button>
                </div>
            </div>
        );
    }
}
export default EditItem;