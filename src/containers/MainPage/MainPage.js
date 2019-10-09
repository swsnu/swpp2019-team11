import React, {Component} from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import {Grid, Header, Button} from 'semantic-ui-react'

class MainPage extends Component {

  addSurveyHandler = () => {
    this.props.history.push('/upload')
  }

  render(){
    return(
      <Grid textAlign='center' columns = {2}>
        <Grid.Row style = {{height: '80vh'}} verticalAlign = 'middle'>
          <Grid.Column > 
            <Header style = {{'font-size': '4em'}} size = 'huge' color='teal' textAlign='center'>
              surBing
            </Header>
            <SearchBar size = 'huge' />
            <br/>
            <Button size = 'big' color = 'teal'onClick = {() => this.addSurveyHandler()} >Add Your Survey</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
    )
  }


}

export default MainPage
