import React from 'react';
import ItemResponse from './ItemResponse/ItemResponse';
import { Message } from 'semantic-ui-react';
import * as actionCreators from '../../../store/actions/index'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    onGetItems : () => 
      dispatch(actionCreators.getItems()),
    onItemResponses : id =>
      dispatch(actionCreators.getItemResponses(id)),
  }
};

const SurveyItem = (props) => {
  return (
    <div>
      <Message style = {{'min-width': '800px', margin: 20, background: '#FFFFFF',border: '1px solid grey', 'box-shadow': '5px 3px 3px #BDBDBD', borderRadius:10,'font-size':'1.5em'}}>
      <Message.Header style={{'margin-bottom' : 10, color: '#00B5AD'}}>
        {props.title}
      </Message.Header>
      <ItemResponse
      id = {props.id}
      />            
      </Message>

    </div>
  )
}

export default connect(null, mapDispatchToProps)(SurveyItem);