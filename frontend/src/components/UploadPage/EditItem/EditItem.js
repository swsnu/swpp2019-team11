import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

const EditItem = (props) => {
  if (props.progress >= 1) {
    return (
      <div className="ui olive segment">
        <Header style={{ 'font-size': '2em', 'margin-left': '10px' }} size="huge" color="olive">2. Edit Your Survey</Header>
        <div style={{
          'font-size': '22px', 'margin-bottom': '10px', 'margin-left': '17px', color: '#663300',
        }}
        >
          <strong>Title:</strong>
        </div>
        <div style={{
          'font-size': '21px', 'margin-bottom': '10px', 'margin-left': '17px', color: '#663300',
        }}
        >
          <strong>Items:</strong>
        </div>

        <Grid columns={1}>
          <Grid.Row>
            <h3 className="ui checkbox" style={{ 'margin-left': '32px', 'margin-top': '5px', 'margin-bottom': '5px' }}>
              <input type="checkbox" name="example" />
              Item Name1
            </h3>
          </Grid.Row>
          <Grid.Row>
            <h3 className="ui checkbox" style={{ 'margin-left': '32px', 'margin-top': '5px', 'margin-bottom': '5px' }}>
              <input type="checkbox" name="example" />
              Item Name2
            </h3>
          </Grid.Row>
          <Grid.Row>
            <h3 className="ui checkbox" style={{ 'margin-left': '32px', 'margin-top': '5px', 'margin-bottom': '5px' }}>
              <input type="checkbox" name="example" />
              Item Name3
            </h3>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column align="right">
              <Button
                align="right"
                style={{ 'margin-top': '15px', marginRight: '20pt', width: '100pt' }}
                onClick={props.editOnClick}
                disabled={props.progress != 1}
              >
                {' '}
Continue
                {' '}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
  return (
    <div />
  );
};
export default EditItem;
