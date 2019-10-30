import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class UploadFile extends Component{
    render(){
        return(
            <div class="ui yellow segment" >
                Hell Yeah!
                <div align="right">
                    <button class="ui yellow basic button" align="right" > Continue </button>
                </div>
            </div>
        );
    }
}
export default UploadFile;