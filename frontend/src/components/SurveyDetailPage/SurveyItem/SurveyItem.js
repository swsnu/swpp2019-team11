import React, { Component } from 'react';
import ItemResponse from './ItemResponse/ItemResponse';
import { Message } from 'semantic-ui-react';

class SurveyItem extends Component {
  state = {
    items : [
      {
        id: '1',
        itemTitle: 'survey Item1',
        itemResponse: 'response1', 
      },
      {
        id: '2',
        itemTitle: 'survey Item2',
        itemResponse: 'response2', 
      },
    ],
  };

  render(){
    const itemResponses = this.state.items.map(it => {
      return(
        <div>
            <Message style = {{'min-width': '800px', margin: 20, background: '#FFFFFF',border: '1px solid grey', 'box-shadow': '5px 3px 3px #BDBDBD', borderRadius:10,'font-size':'1.5em'}}>
            <Message.Header style={{'margin-bottom' : 10, color: '#00B5AD'}}>
              {it.itemTitle}
            </Message.Header>
          <ItemResponse
            id = {it.id}
            itemResponse = {it.itemResponse}
          />            
          </Message>

        </div>



      )
    });
  return(
    <div className = "SurveyItem">
        {itemResponses}
    </div>
  )
  }
}

export default SurveyItem;