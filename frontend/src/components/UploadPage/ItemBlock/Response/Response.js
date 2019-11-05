import React from 'react';
import { Header } from 'semantic-ui-react';

const Response = (props) => (
  <Header
    as="h5"
    block
    style={{
      marginTop: 2, marginBottom: 3, marginLeft: 0, marginRight: 0,
    }}
  >
    {props.content}
  </Header>
);

export default Response;
