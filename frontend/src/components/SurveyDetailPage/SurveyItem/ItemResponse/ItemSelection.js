import React from 'react';
import { Table } from 'semantic-ui-react';

const ItemSelection = (props) => (
  <div className="ItemSelection">
    <Table.Row style={{ marginLeft: 20, 'font-size': '1em' }}>
      <Table.Cell>{props.respondant_id}</Table.Cell>
      <Table.Cell>{props.content}</Table.Cell>
    </Table.Row>
  </div>
);

export default ItemSelection;
