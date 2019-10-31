import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
//import { Input } from 'semantic-ui-react';
//import {withRouter} from 'react-router'
//import {connect} from 'react-redux'

const UploadFile = (props) => {  
    return(
        <div class = "ui yellow segment" >
            <Header style={{ 'font-size': '2em', "margin-left":"10px"}} size="huge" color="yellow">1. Upload</Header>
            <div style={{"font-size":"20px", "color":"#663300", "margin-left":"20px"}}><strong>.csv file</strong></div>
            <div 
                class="ui icon input"
                style={{"margin-top":"10px", "margin-left":"10px"}}
            >
                <input id="image-file" type="file" />
                <i class="search icon"></i>
            </div>
            <div align="right">
                <button 
                    class="ui yellow button" 
                    align="right" 
                    style={{"marginRight":"20pt", "width":"100pt"}} 
                    onClick={props.uploadOnClick}
                    disabled={props.progress != 0}
                > 
                    Continue
                </button>
            </div>
        </div>
    );
    
}
export default UploadFile;