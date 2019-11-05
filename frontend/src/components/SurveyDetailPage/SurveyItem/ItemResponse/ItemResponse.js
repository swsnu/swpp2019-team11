import React from 'react';
import { Table } from 'semantic-ui-react';


const ItemResponse = (props) => (
  <div className="ItemResponse">

      <Table.Row style={{ width: '790px', marginLeft: 20, 'font-size' : '0.5em' }}>
        <Table.Cell>{props.respondant_id}</Table.Cell>
        <Table.Cell>{props.content}</Table.Cell>
      </Table.Row>

  </div>
);

export default ItemResponse;
