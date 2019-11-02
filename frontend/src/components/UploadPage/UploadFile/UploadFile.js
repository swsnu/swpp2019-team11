import React from 'react';
import { Header } from 'semantic-ui-react';


const UploadFile = (props) => {
    return(
        <div class = "ui yellow segment" >
            <Header style={{ 'font-size': '2em', "margin-left":"10px"}} size="huge" color="yellow">1. Upload</Header>
            <div style={{"font-size":"20px", "color":"#663300", "margin-left":"20px"}}><strong>.csv file</strong></div>
            {props.inputButton}
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