import React from 'react';
import { Table } from 'semantic-ui-react';

function ItemResponse(props) {
  return (
    <div className="ItemResponse">
      <Table.Row style={{ width: '790px', marginLeft: 20, 'font-size': '1em' }}>
        <Table.Cell>{props.respondant_id}</Table.Cell>
        <Table.Cell>{props.content}</Table.Cell>
      </Table.Row>

    </div>
  );
}

export default ItemResponse;
