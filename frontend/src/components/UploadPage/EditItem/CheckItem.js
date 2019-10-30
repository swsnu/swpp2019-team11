import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class CheckItem extends Component{
    render(){
        return(
          <div class="ui checkbox" style={{'margin-left':"25px"}}>
            <input type="checkbox" name="example" />
            <label > Item Name </label>
          </div>
        );
    }
}
export default CheckItem;