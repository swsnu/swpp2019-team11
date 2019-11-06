import React from 'react';
import { Table } from 'semantic-ui-react';


const ItemResponse_short = (props) => (
  <div className="ItemResponse_short">
      <Table.Row style={{ marginLeft: 20, 'font-size' : '0.7em' }}>
        <Table.Cell>{props.respondant_id}</Table.Cell>
        <Table.Cell>{props.content}</Table.Cell>
      </Table.Row>
  </div>
);

export default ItemResponse_short;