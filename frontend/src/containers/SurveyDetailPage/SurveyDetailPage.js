import React, { Component } from 'react';
import { Icon, Grid, Label, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SurveyItem from '../../components/SurveyDetailPage/SurveyItem/SurveyItem';
import TopBar from '../../components/TopBar/TopBar';
import * as actionCreators from '../../store/actions/index';

const mapDispatchToProps = (dispatch) => ({
  onSurveyDetail: (id) => dispatch(actionCreators.getSurvey(id)),
});

const mapStateToProps = (state) => ({
  title: state.sv.title,
  item: state.sv.item,
  start_date: state.sv.survey_start_date,
  end_date: state.sv.survey_end_date,
  upload_date: state.sv.upload_date,
  author_name: state.sv.author,
  content: state.sv.content,
  respondant_count: state.sv.respondant_count,
  item: state.sv.item,
});

class SurveyDetailPage extends Component {
  state = {
    title: '',
    date: '',
    upload_date: '0000/00/00',
    start_date: '0000/00/00',
    end_date: '0000/00/00',
    author_name: '',
    content: '',
    respondant_count: 0,
    item: [
      {
        title: '',
        question_type: '',
        response: [],
      },
    ],
  };

  componentDidMount() {
    this.props.onSurveyDetail(this.props.match.params.id);
  }

  componentDidUpdate(prevProps){
    if(prevProps.title!=this.props.title){
      this.setState({ ...this.state,
        title: this.props.title,
        start_date: this.props.start_date,
        end_date:this.props.end_date,
        upload_date: this.props.upload_date,
        author_name: this.props.author_name,
        content: this.props.content,
        respondant_count: this.props.respondant_count,
        item: this.props.item,
      });
      }
  }

  render() {
    const items = this.props.item.map(it => {
      return (
          <SurveyItem
              title={it.title}
              question_type={it.question_type}
              response={it.response}
          />
      );
  });
    return (
      <div className="SurveyDetailPage">
        <TopBar searchBar />
        <Grid columns={2} style = {{minWidth: '800px', maxWidth : '800px'}}>
          <Grid.Row>
            <Grid.Column style = {{width: '400px'}}>
            <Table celled style = {{margin: 20, height:200, maxWidth :'350px', minWidth :'350px'}}>
              <Table.Header color = 'teal'>
              <Table.Row>
              <Table.HeaderCell style = {{textColor:'teal'}}>
                <Label ribbon style = {{color: '#00B5AD', 'font-size' : '2em'}}>
                  title: {this.state.title}
                </Label>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body style={{'font-size': '0.8em' }}>
            <Table.Row>
              <Table.Cell>
                date : {this.state.start_date}~{this.state.end_date}<br />
              author_name : {this.state.author_name}<br />
              content : {this.state.content}<br />
              respondant_count: {this.state.respondant_count}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
            </Grid.Column>
            <Grid.Column  verticalAlign = 'center' textAlign = 'middle'>
              <Icon size = 'huge' name = 'file outline' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        
        {items}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetailPage);
