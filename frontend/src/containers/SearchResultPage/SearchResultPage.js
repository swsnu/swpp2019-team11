import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import SearchBar from '../../components/SearchBar/SearchBar';
import SurveyBlock from '../../components/SurveyBlock/SurveyBlock'
import SearchFilter from '../../components/SearchResultPage/SearchFilter/SearchFilter'
import * as actionCreators from '../../store/actions/index'
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    onSurveyDetail : (id) => {dispatch(actionCreators.getSurvey(id))}
  }
}

const mapStateToProps = state => {
  return {
    survey_list : state.svl.survey_list
  }
}

class SearchResultPage extends Component {

  state = {
    filtered_list : [],
    survey_component_list : [],
    startDate: '',
    endDate: '',
    respondant_min : '1',
    respondant_max : '1000',
  }

  filterHandler = (startDate, endDate, respondant) => {
    this.setState({...this.state, startDate : startDate, endDate: endDate, respondant_min : respondant[0], respondant_max : respondant[1] })
  }
  
  componentDidMount(){
    this.setState({...this.state, filtered_list : this.props.survey_list})
  }

  componentDidUpdate(prevProps){
    if(this.props.survey_list!=prevProps.survey_list){
      this.setState({survey_component_list : this.props.filtered_list.map((survey) => <SurveyBlock title = {survey.title} />)})
    }
  }

  render() {
    return (
      <div>
        <Segment style={{ height: '100px' }}>
          <Grid colums={3} style = {{'min-width' : '800px'}}>
            <Grid.Row verticalAlign="middle" >
              <Grid.Column textAlign="center" style={{ minWidth: 200, marginRight : '50px' }}><Header style={{ 'font-size': '4em', 'cursor':'pointer' }} onClick = {() => {this.props.history.push('/main')}} size="huge" color="teal" textAlign="center">surBing</Header></Grid.Column>
              <Grid.Column style = {{minWidth : 300}} ><SearchBar size="huge" minWidth = '300px' width = {'calc(100vw - 500px)'} /></Grid.Column>
              <Grid.Column style={{ minWidth: '180px' }} floated="right" ><ProfileButton /></Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Grid colums = {2} divided padded>
          <Grid.Row>
            <Grid.Column centered style = {{minWidth : '430px', maxWidth : '430px'}}> <SearchFilter filterHandler = {this.filterHandler}/> </Grid.Column>
            <Grid.Column width = {8}>{this.state.survey_component_list}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultPage);
