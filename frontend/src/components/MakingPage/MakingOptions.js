import React from 'react';
import { withRouter } from 'react-router-dom';

export const MakingOptions = (props) => {
  return (
    <div>
      <input onChange={(e) => props.content(e.target.value, props.id)}/>
    </div>
  );
};

export default withRouter(MakingOptions);
