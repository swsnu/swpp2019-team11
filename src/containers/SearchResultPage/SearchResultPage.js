import React, {Component} from 'react'
import {Grid, Header, Segment} from 'semantic-ui-react'
import ProfileButton from '../../components/ProfileButton/ProfileButton'
import SearchBar from '../../components/SearchBar/SearchBar'


class SearchResultPage extends Component {


  render(){

    return(
      <div>
      <Segment>
      <Grid  colums = {3}>
        <Grid.Row  verticalAlign = 'middle' style = {{height: '10vh'}}>
          <Grid.Column textAlign = 'center' style = {{minWidth : 200}}  width ={2}><Header style = {{'font-size' : '4em'}}  size = 'huge' color='teal' textAlign='center' >surBing</Header></Grid.Column>
          <Grid.Column width = {11} ><SearchBar size = 'huge' /></Grid.Column>
          <Grid.Column style = {{minWidth : 200}} floated = 'right' width={2} ><ProfileButton/></Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>
      <Grid>
      </Grid>
      </div>
    )
  }
}

export default SearchResultPage