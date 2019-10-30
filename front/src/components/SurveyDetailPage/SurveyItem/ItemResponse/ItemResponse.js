import React from 'react';
import { Message } from 'semantic-ui-react';


const ItemResponse = (props) => {
  return (  
    <div className = "ItemResponse">
        <Message color = '#F8FFFF' style={{borderRadius:5, border:'1px solid #CFCFCF' }} >
        <Message.List>
          {props.itemResponse}
        </Message.List>
      </Message>
    </div>
  )
}

export default ItemResponse;