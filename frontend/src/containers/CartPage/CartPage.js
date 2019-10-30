import React, { Component } from 'react';
import { Grid, Header, Segment, Checkbox, Button, Divider } from 'semantic-ui-react';
import MLResult from '../../components/CartPage/MLResult/MLResult';
import TopBar from '../../components/TopBar/TopBar';

class CartPage extends Component {
  state = {
    cartEntry: [{ id: 1, title: 'AAAA' }, { id: 2, title: 'BBBB' }, { id: 3, title: 'CCCC' }],
    mlResult: [
      [{ item: 'xxxx', surveyId: 1 }, { item: 'yyyy', surveyId: 2 }],
      [{ item: 'zzzz', surveyId: 1 }, { item: 'wwww', surveyId: 3 }]
    ],
    isChecked: [false, false, false],
    isTotalChecked: false,
  }


  componentDidUpdate() {
    console.log(this.state);
  }

  onClickAnalysis = () => {
    alert("Analysis");
  }

  onClickDownload = () => {
    alert("Download");
  }

  onClickDeleteFromCart = () => {
    alert("Delete");
  }

  onToggleTotal = () => {
    let newTotalChecked = !this.state.isTotalChecked;
    let newChecked = [];
    for (let i = 0; i < this.state.isChecked.length; i++) {
      newChecked.push(newTotalChecked);
    }
    this.setState({ ...this.state, isTotalChecked: newTotalChecked, isChecked: newChecked });
  }

  /* type : 0 -> toggle value, type : 1 -> set value to 1 */
  TOGGLE = 0;
  SET = 1;
  onToggleSelected = (list, reqType) => {
    let newChecked = this.state.isChecked.filter(() => true);
    for (let i = 0; i < list.length; i++) newChecked[list[i]] = (reqType === this.TOGGLE ? !newChecked[list[i]] : true);
    let newTotalChecked = true;
    for (let i = 0; i < newChecked.length; i++) newTotalChecked &= newChecked[i];
    this.setState({ ...this.state, isTotalChecked: newTotalChecked, isChecked: newChecked });
  }

  getCartBar = (height) => (
    <Grid verticalAlign='middle' style={{ height: height+'px' }}>
      <Grid.Row style={{ minWidth: 1200 }}>
        <Grid.Column style={{ width: 200, marginRight: 230 }}>
          <Header style={{ fontSize: '3em' }} textAlign="center" size="huge">
            Cart
          </Header>
        </Grid.Column>
        <Grid.Column style={{ width: 200 }}>
          <Checkbox label='Select All' checked={this.state.isTotalChecked} onChange={() => { this.onToggleTotal() }} />
        </Grid.Column>
        <Grid.Column style={{ width: 570 }} textAlign='right'>
          <Button onClick={() => { this.onClickAnalysis() }} >ANALYSIS</Button> {' '}
          <Button onClick={() => { this.onClickDownload() }} >DOWNLOAD</Button> {' '}
          <Button onClick={() => { this.onClickDeleteFromCart() }} >DELETE FROM CART</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  getAnalysisRes = () => {
    const mlResults = this.state.mlResult.map((cur) =>
      (<MLResult mlResult={cur} cartEntry={this.state.cartEntry} onClickSelect={this.onToggleSelected} />)
    );
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column textAlign='center' width={16}>
            <Header style={{ fontSize: '2em' }} size="medium" textAlign="center">
              Analysis Result
            </Header></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment.Group>
              {mlResults}
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  getCartEntries = () => {
    const entries = this.state.cartEntry.map((cur, index) => (
      <Grid.Row verticalAlign="middle">
        <Grid.Column style={{ width: 30 }}>
          <Checkbox checked={this.state.isChecked[index]} onClick={() => { this.onToggleSelected([index], this.TOGGLE) }} />
        </Grid.Column>
        <Grid.Column style={{ minWidth: 740 }}>
          <Segment>
            {cur.title}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    ));

    return (
      <Grid>
        {entries}
      </Grid>
    );
  }

  getContents = () => (
    <Grid columns={2} divided style={{ minWidth: 1200 }}>
      <Grid.Column style={{ width: 430 }}>
        {this.getAnalysisRes()}
      </Grid.Column>
      <Grid.Column style={{ minWidth: 770 }}>
        {this.getCartEntries()}
      </Grid.Column>
    </Grid>
  );

  render() {
    const cartBar = this.getCartBar(100);
    const contents = this.getContents();

    return (
      <div>
        <TopBar searchBar={false} />
        {cartBar}
        <Divider />
        {contents}
      </div>
    );
  }
}

export default CartPage;
