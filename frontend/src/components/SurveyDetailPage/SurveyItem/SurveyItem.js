import React, { Component } from 'react';
import ItemResponse from './ItemResponse/ItemResponse';
import { Header, Message } from 'semantic-ui-react';

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
          <Header style = {{border: '1px solid grey', margin: 20, 'font-size':'1.5em'}}>
            {it.itemTitle}
          
          <ItemResponse
            id = {it.id}
            itemResponse = {it.itemResponse}
          />            
          </Header>
        </div>



      )
    });
  return(
    <div className = "SurveyItem">
        {itemResponses}
    </div>
  )
  };
};

export default SurveyItem;