import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Grid, Header, Segment, Checkbox, Button, Divider, Label,
} from 'semantic-ui-react';
import MLResult from '../../components/CartPage/MLResult/MLResult';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';
import SurveyBlock from '../../components/SurveyBlock/SurveyBlock';

class CartPage extends Component {
  state = {
    isChecked: [],
    isTotalChecked: false,
  }

  configureState() {
    this.setState({ ...this.state, isTotalChecked: false });
    const newChecked = [];
    const len = this.props.survey_list.length;
    for (let i = 0; i < len; i++) newChecked.push(false);
    this.setState({ ...this.state, isChecked: newChecked });
  }

  componentDidMount() {
    this.props.getCartSurveyList().then(() => { this.configureState(); });
  }

  onClickAnalysis = () => {
    const len = this.state.isChecked.length;
    const id_list = [];
    for (let i = 0; i < len; i++) {
      if (this.state.isChecked[i]) id_list.push(this.props.survey_list[i].id);
    }
    this.props.getMLResult(id_list);
  }

  onClickDownload = () => {
  }

  onClickDeleteFromCart = () => {
    const id_list = [];
    for (let i = 0; i < this.state.isChecked.length; i++) {
      if (this.state.isChecked[i]) {
        id_list.push(this.props.survey_list[i].id);
      }
    }
    this.props.deleteCart(id_list).then(() => { this.configureState(); });
  }

  onToggleTotal = () => {
    const newTotalChecked = !this.state.isTotalChecked;
    const newChecked = [];
    for (let i = 0; i < this.state.isChecked.length; i++) {
      newChecked.push(newTotalChecked);
    }
    this.setState({ ...this.state, isTotalChecked: newTotalChecked, isChecked: newChecked });
  }

  /* type : 0 -> toggle value, type : 1 -> set value to 1 */
  TOGGLE = 0;

  SET = 1;

  onToggleSelected = (list, reqType) => {
    const newChecked = this.state.isChecked.filter(() => true);
    for (let i = 0; i < list.length; i++) {
      newChecked[list[i]] = (reqType === this.TOGGLE ? !newChecked[list[i]] : true);
    }
    let newTotalChecked = true;
    for (let i = 0; i < newChecked.length; i++) newTotalChecked = newTotalChecked && newChecked[i];
    this.setState({
      ...this.state,
      isTotalChecked: newTotalChecked,
      isChecked: newChecked,
    });
  }

  getCartBar = (height) => (
    <Grid verticalAlign="middle" style={{ height: `${height}px` }}>
      <Grid.Row style={{ minWidth: 1200 }}>
        <Grid.Column style={{ width: 200, marginRight: 230 }}>
          <Header style={{ fontSize: '3em' }} textAlign="center" size="huge">
            Cart
          </Header>
        </Grid.Column>
        <Grid.Column style={{ width: 200 }}>
          <Checkbox label="Select All" checked={this.state.isTotalChecked} onChange={() => { this.onToggleTotal(); }} />
        </Grid.Column>
        <Grid.Column style={{ width: 570 }} textAlign="right">
          <Button onClick={() => { this.onClickAnalysis(); }}>ANALYSIS</Button>
          {' '}
          {' '}
          <Button onClick={() => { this.onClickDownload(); }}>DOWNLOAD</Button>
          {' '}
          {' '}
          <Button onClick={() => { this.onClickDeleteFromCart(); }}>DELETE FROM CART</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  getAnalysisRes = () => {
    const mlResults = this.props.ml_result.map((cur) => (
      <MLResult
        ml_result={cur}
        survey_list={this.props.survey_list}
        onClickSelect={this.onToggleSelected}
      />
    ));
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column textAlign="center" width={16}>
            <Header style={{ fontSize: '2em' }} size="medium" textAlign="center">
              Analysis Result
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment.Group>
              {this.props.ml_result.length > 0
                ? mlResults
                : (
                  <Segment>
                    <Header size="small" textAlign="center">
                      Please select surveys to analyze relevant items
                      {' '}
                      <br />
                      Then click the
                      {' '}
                      <Label>ANALYSIS</Label>
                      {' '}
button.
                    </Header>
                  </Segment>
                )}
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  getCartEntries = () => {
    const entries = this.props.survey_list.map((cur, index) => (
      <Grid.Row verticalAlign="middle">
        <Grid.Column style={{ width: 30 }}>
          <Checkbox
            checked={this.state.isChecked[index]}
            onClick={() => { this.onToggleSelected([index], this.TOGGLE); }}
          />
        </Grid.Column>
        <Grid.Column style={{ minWidth: 740 }}>
          <SurveyBlock id={cur.id} title={cur.title} search={false} />
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

const mapDispatchToProps = (dispatch) => ({
  getCartSurveyList: () => dispatch(actionCreators.getCart()),
  deleteCart: (id_list) => dispatch(actionCreators.deleteCart(id_list)),
  getMLResult: (id_list) => dispatch(actionCreators.getML(id_list)),
});

const mapStateToProps = (state) => ({
  survey_list: state.ct.survey_list,
  ml_result: state.ct.ml_result,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartPage));
