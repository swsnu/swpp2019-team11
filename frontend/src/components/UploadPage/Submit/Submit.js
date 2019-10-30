import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class Submit extends Component{
    render(){
        return(
            <div class="ui green segment">
                Hell Yeah!
                <div align="right" >
                    <button class="ui green basic button" > Continue </button>
                </div>
            </div>
        );
    }
}
export default Submit;