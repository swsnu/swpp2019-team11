import React, { Component } from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import TopBar from '../../components/TopBar/TopBar';
import SurveyBlock from '../../components/SurveyBlock/SurveyBlock';
import SearchFilter from '../../components/SearchResultPage/SearchFilter/SearchFilter';
import * as actionCreators from '../../store/actions/index';

const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onSurveyDetail: (id) => dispatch(actionCreators.getSurvey(id)),
  onAddCart: (id) => dispatch(actionCreators.addCart(id)),
});

const mapStateToProps = (state) => ({
  survey_list: state.svl.survey_list,
});

class SearchResultPage extends Component {
  state = {
    survey_component_list: [],
    startDate: null,
    endDate: null,
    respondant_min: '1',
    respondant_max: '1000',
    cartPopup: false,
    cartPopupStatus: 0,
    cartPopupName: '',
  }

  filterHandler = (startDate, endDate, respondant) => {
    this.setState({
      ...this.state,
      startDate: (!startDate ? startDate : startDate.hour(0)),
      endDate: (!endDate ? endDate : endDate.hour(0)),
      respondant_min: respondant[0],
      respondant_max: respondant[1],
    });
  }

  onClickCart = (id, title) => {
    this.props.onAddCart(id).then((res) => {
      this.setState({
        ...this.state, cartPopup: true, cartPopupStatus: res.status, cartPopupName: title,
      });
    });
  }

  onClickPopupOff = () => {
    this.setState({ ...this.state, cartPopup: false });
  }

  componentDidMount() {
    this.props.checklogIn().then(() => {}).catch(() => {this.props.history.push('/login/')});
    this.setState({
      survey_component_list: this.props.survey_list
        .map((survey) => <SurveyBlock search survey={survey} onClickCart={this.onClickCart} />),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.survey_list != prevProps.survey_list
      || this.state.startDate != prevState.startDate
      || this.state.endDate != prevState.endDate
      || this.state.respondant_min != prevState.respondant_min
      || this.state.respondant_max != prevState.respondant_max) {
      this.setState({
        survey_component_list: this.props.survey_list
          .filter((survey) => (
            (this.state.startDate == null
              ? true : !this.state.startDate.isAfter(moment(survey.survey_end_date)))
          && (this.state.endDate == null
            ? true : !this.state.endDate.isBefore(moment(survey.survey_start_date)))
          && (this.state.respondant_max == 1000
            ? true : this.state.respondant_max >= survey.respondant_count)
          && (this.state.respondant_min <= survey.respondant_count)))
          .map((survey) => <SurveyBlock search survey={survey} onClickCart={this.onClickCart} />),
      });
    }
  }

  getCartPopup = () => (
    <Segment style={{ width: '850px' }}>
      <Grid>
        <Grid.Column width={15}>
          survey
          {` "${this.state.cartPopupName}" `}
          {
            this.state.cartPopupStatus === 201
              ? 'has added to my cart.'
              : 'is already in my cart.'
          }
        </Grid.Column>
        <Grid.Column width={1} textAlign="right">
          <Icon name="x" onClick={() => { this.onClickPopupOff(); }} />
        </Grid.Column>
      </Grid>
    </Segment>
  )

  render() {
    return (
      <div style={{ minWidth: '800px' }}>
        <TopBar searchBar history={this.props.history} />
        <Grid columns={2} divided padded>
          <Grid.Row>
            <Grid.Column centered style={{ minWidth: '430px', maxWidth: '430px' }}>
              {' '}
              <SearchFilter filterHandler={this.filterHandler} />
              {' '}
            </Grid.Column>
            <Grid.Column width={8}>
              {this.state.cartPopup ? this.getCartPopup() : null}
              {this.state.survey_component_list}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchResultPage));
