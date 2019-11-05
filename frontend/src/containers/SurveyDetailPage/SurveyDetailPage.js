import React, { Component } from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SurveyItem from '../../components/SurveyDetailPage/SurveyItem/SurveyItem';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';

const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onSurveyDetail: (id) => dispatch(actionCreators.getSurvey(id)),
});

const mapStateToProps = (state) => ({
  title: state.sv.title,
});

class SurveyDetailPage extends Component {
  state = {
    title: '',
  };

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
        this.props.onSurveyDetail(this.props.match.params.id);
        this.setState({ ...this.state, title: this.props.title });
      })
      .catch(() => { this.props.history.push('/login/'); });
    
  }

  render() {
    return (
      <div className="SurveyDetailPage">
        <TopBar searchBar />
        <Grid columns={2} style={{ 'min-width': 800 }} divided>
          <Grid.Row
            verticalAlign="middle"
            style={{
              margin: 30, height: 130, border: '1px solid grey', 'box-shadow': '5px 3px 3px #BDBDBD', borderRadius: 10,
            }}
          >
            <Grid.Column style={{ width: '65%', 'font-size': '3.5em' }}>
              <Header style={{ color: '#00B5AD' }} textAlign="center" vertical-align="middle">
                {this.state.title}
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="center" style={{ width: '35%', 'font-size': '4em' }}>
              <Icon size="large" name="hand point right outline" color="teal" />
              <Icon size="large" name="hand point left outline" color="teal" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <SurveyItem
          id={this.props.match.params.id}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetailPage);
