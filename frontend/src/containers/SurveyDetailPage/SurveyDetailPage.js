import React, { Component } from 'react';
import {
  Icon, Grid, Label, Table, Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import SurveyItem from '../../components/SurveyDetailPage/SurveyItem/SurveyItem';
import TopBar from '../../components/TopBar/TopBar';
import CSVconverter from '../../components/CSVconverter/CSVconverter';
import * as actionCreators from '../../store/actions/index';

const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onSurveyDetail: (id) => dispatch(actionCreators.getSurvey(id)),
});

const mapStateToProps = (state) => ({
  survey: state.sv.survey,
});

class SurveyDetailPage extends Component {
  state = {
  };

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
        this.props.onSurveyDetail(this.props.match.params.id);
      })
      .catch(() => { this.props.history.push('/login/'); });
  }

  onClickDownload() {
    let csv = '';
    CSVconverter((res) => { csv = res; }, this.props.survey, false);
    saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `${this.props.survey.id}_${this.props.survey.title.replace(/ /g, '_')}.csv`);
  }

  render() {
    const items = this.props.survey.item.map((it) => (
      <SurveyItem
        title={it.title}
        question_type={it.question_type}
        response={it.response}
      />
    ));

    return (
      <div className="SurveyDetailPage">
        <TopBar searchBar />
        <Grid columns={2} style={{ minWidth: '800px', maxWidth: '800px' }}>
          <Grid.Row>
            <Grid.Column style={{ width: '400px' }}>
              <Table celled style={{ margin: 20, height: 200, width: '450px' }}>
                <Table.Header color="teal">
                  <Table.Row>
                    <Table.HeaderCell style={{ textColor: 'teal' }}>
                      <Label ribbon style={{ color: '#00B5AD', 'font-size': '2em' }}>
                        {' '}
                        {this.props.survey.title}
                        {' '}
                      </Label>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body style={{ 'font-size': '1.2em' }}>
                  <Table.Row>
                    <Table.Cell>
                    Upload Date :
                      {' '}
                      {this.props.survey.upload_date}
                      {' '}
                      <br />
                    Survey date :
                      {' '}
                      {this.props.survey.survey_start_date}
~
                      {this.props.survey.survey_end_date}
                      {' '}
                      <br />
                    author :
                      {' '}
                      {this.props.survey.author}
                      {' '}
                      <br />
                    respondant_count :
                      {' '}
                      {this.props.survey.respondant_count}
                      {' '}
                      <br />
                    Description :
                      {' '}
                      {this.props.survey.content}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column verticalAlign="center" textAlign="middle">
              <Button onClick={() => { this.onClickDownload(); }}>
                <Icon size="large" name="file outline" />
                {' '}
Download
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {items}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetailPage);
