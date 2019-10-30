import React, { Component } from 'react';
import { Grid, Header, Segment, Checkbox } from 'semantic-ui-react';
import ProfileButton from '../../components/ProfileButton/ProfileButton';

class CartPage extends Component {

  getTopBar = (height) => (
    <Segment style={{ minHeight: height + 'vh' }}>
      <Grid columns={2}>
        <Grid.Row verticalAlign="middle" style={{ height: height + 'vh', minHeight: height + 'vh' }}>
          <Grid.Column textAlign="center" style={{ minWidth: 200 }} width={2}>
            <Header style={{ 'font-size': '4em' }} size="huge" color="teal" textAlign="center">
              surBing
            </Header>
          </Grid.Column>
          <Grid.Column style={{ minWidth: 200 }} floated="right" width={2}>
            <ProfileButton />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );

  onClickAnalysis = () => {
    alert("Analysis");
  }

  onClickDownload = () => {
    alert("Download");
  }

  onClickDeleteFromCart = () => {
    alert("Delete");
  }

  getCartBar = (height) => (
    <Grid>
      <Grid.Row verticalAlign="middle" style={{ height: height + 'vh', minHeight: height + 'vh' }}>
        <Grid.Column style={{ minWidth: 200 }} width={2}>
          <Header padded style={{ 'font-size': '3em' }} textAlign="center" size="huge">
            Cart
          </Header>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column style={{ minWidth: 200 }} width={4}>
          <Checkbox label='Select All' />
        </Grid.Column>
        <Grid.Column style={{ minWidth: 500 }} width={5} textAlign="right">
          <button class="ui button" onClick={() => {this.onClickAnalysis()} } >ANALYSIS</button> {' '}
          <button class="ui button" onClick={() => {this.onClickDownload()} } >DOWNLOAD</button> {' '}
          <button class="ui button" onClick={() => {this.onClickDeleteFromCart()} } >DELETE FROM CART</button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  getAnalysisRes = () => (
    <Segment padded>
      <Grid>
        <Grid.Row>
          <Grid.Column textAlign='center' width={16}>
          <Header style={{ 'font-size': '2em' }} size="normal" textAlign="center">
            Analysis Result
          </Header></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment.Group>
              <Segment>A - A</Segment>
              <Segment>B - B</Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );

  getCartEntries = () => (
    <Grid>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Checkbox />
        </Grid.Column>
        <Grid.Column width={15}>
          <Segment>
            survey block 1
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Checkbox />
        </Grid.Column>
        <Grid.Column width={15}>
          <Segment>
            survey block 2
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  getContents = () => (
    <Grid padded columns={2}>
      <Grid.Column width={3}>
        {this.getAnalysisRes()}
      </Grid.Column>
      <Grid.Column width={9}>
        {this.getCartEntries()}
      </Grid.Column>
    </Grid>
  );

  render() {
    const topBar = this.getTopBar(10);
    const cartBar = this.getCartBar(8);
    const contents = this.getContents();

    return (
      <div>
        {topBar}
        {cartBar}
        {contents}
      </div>
    );
  }
}

export default CartPage;
