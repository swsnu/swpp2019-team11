import React from 'react';
import { Message } from 'semantic-ui-react';


const ItemResponse = (props) => (
  <div className="ItemResponse">
    <Message.List
      color="#F8FFFF"
      style={{
        'min-width': '700px', border: '1.5px solid #CFCFCF', background: '#e1fff5', borderRadius: 5, 'font-size': '0.8em', color: '#484749',
      }}
    >
      <Message.Item style={{ 'margin-top': 10, 'margin-left': 30 }}>
        {props.id}
      </Message.Item>
      <Message.Item style={{ 'margin-bottom': 10, 'margin-left': 30 }}>
        {props.id}
      </Message.Item>
    </Message.List>

  </div>
);

export default ItemResponse;
