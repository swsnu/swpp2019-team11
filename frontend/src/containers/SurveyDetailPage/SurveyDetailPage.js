import React, { Component } from 'react';
import {
  Icon, Grid, Label, Table, Button, Header,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveAs } from 'file-saver';
import SurveyItem from '../../components/SurveyDetailPage/SurveyItem/SurveyItem';
import TopBar from '../../components/TopBar/TopBar';
import CSVconverter from '../../components/CSVconverter/CSVconverter';
import ML from '../../components/ML/ML';
import * as actionCreators from '../../store/actions/index';
import './SurveyDetailPage.css';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onSurveyDetail: (id) => dispatch(actionCreators.getCompletedSurvey(id)),
  onOngoingSurveyDetail: (id) => dispatch(actionCreators.getOngoingSurvey(id)),
});

export const mapStateToProps = (state) => ({
  survey: state.sv.completed_survey,
  ongoing_survey: state.sv.ongoing_survey,
});

export class SurveyDetailPage extends Component {
  state = {
    survey: {},
  }

  componentDidMount() {
    this.props.checklogIn()
      .then(() => {
        if (this.props.ongoing) {
          this.props.onOngoingSurveyDetail(this.props.match.params.id);
        } else {
          this.props.onSurveyDetail(this.props.match.params.id);
        }
      })
      .catch(() => { this.props.history.push('/login/'); });
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      if (this.props.ongoing) {
        this.setState({ survey: this.props.ongoing_survey });
      } else {
        this.setState({ survey: this.props.survey });
      }
    }
  }


  onClickDownload() {
    CSVconverter((res) => { saveAs(new Blob([res], { type: 'text/csv;charset=utf-8;' }), `${this.state.survey.id}_${this.state.survey.title.replace(/ /g, '_')}.csv`); }, this.state.survey, false);
  }

  render() {
    if (!this.state.survey || !this.state.survey.item) {
      return <div />;
    }

    const items = this.state.survey.item.map((it, it_index) => (
      <SurveyItem
        multiple_choice={it.multiple_choice}
        number={it_index + 1}
        title={it.title}
        question_type={it.question_type}
        response={it.response}
        selection={it.selection}
      />
    ));

    return (
      <div className="surveyDetailPage">
        <TopBar searchBar />
        <Grid columns={2} style={{ maxWidth: '1000px' }}>
          <Grid.Row>
            <Grid.Column width={8} style={{ width: '400px' }}>
              <Table celled style={{ margin: 20, height: 200, width: '450px' }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Label ribbon style={{ color: '#354649', fontColor: '#354649', 'font-size': '2em' }}>
                        {' '}
                        {this.state.survey.title}
                        {' '}
                      </Label>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body style={{ 'font-size': '1.2em' }}>
                  <Table.Row>
                    <Table.Cell>
                      <Header className="headers" size="small">
                    Upload Date :
                        {' '}
                        {this.state.survey.upload_date}
                        {' '}
                      </Header>
                      <Header className="headers" style={{ marginTop: -5 }} size="small">
                    Survey date :
                        {' '}
                        {this.state.survey.survey_start_date}
~
                        {this.state.survey.survey_end_date}
                        {' '}
                      </Header>
                      <Header className="headers" style={{ marginTop: -5 }} size="small">
                    Author :
                        {' '}
                        {this.state.survey.author}
                        {' '}
                      </Header>
                      <Header className="headers" style={{ marginTop: -5 }} size="small">
                    Number of Respondants :
                        {' '}
                        {this.state.survey.respondant_count}
                        {' '}
                      </Header>
                      <Header className="headers" style={{ marginTop: -5 }} size="small">
                    Description :
                        {' '}
                        {this.state.survey.content}
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column verticalAlign="center" textAlign="middle">
              <Button className="downloadButton" onClick={() => this.onClickDownload()}>
                <Icon size="large" name="file outline" />
                {' '}
Download
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {items}
        {!this.props.ongoing && (<ML survey={this.props.survey.related_survey} />)}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetailPage);
