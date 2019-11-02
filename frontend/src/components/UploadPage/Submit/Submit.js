import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

const Submit = (props) => {
  if (props.progress >= 2) {
    return (
      <div className="ui green segment">
        <Header style={{ 'font-size': '2em', 'margin-left': '8px' }} size="huge" color="green">3. Warning & Confirm</Header>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <div style={{ 'font-size': '20px', color: '#ff0000', 'margin-left': '19px' }}><strong>You can't delete privacy after upload.</strong></div>
            </Grid.Column>
            <Grid.Column align="right">
              <div className="ui checkbox" style={{ 'margin-right': '120px', 'font-size': '1em' }} align="right">
                <input type="checkbox" align="right" name="example" fontSize="1em" style={{ fontSize: '30pt' }} />
                <label align="right"> Yes, I will Admit. </label>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div align="right">
          <button className="ui green button" style={{ 'margin-top': '15px', marginRight: '20pt', width: '100pt' }}> Continue </button>
        </div>
      </div>
    );
  }

  return (<div />);
};
export default Submit;
