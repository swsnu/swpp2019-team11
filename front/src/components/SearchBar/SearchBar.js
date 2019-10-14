import React, {Component} from 'react'
import {Input} from 'semantic-ui-react'



/*

  This is a component drawing a searchBar.
  It is designed as fluid type,
  so you should use {Grid} to locate this to where you want.
  We need to modify ClickHandler.

  Props Required : size , (other css style props)


*/




class SearchBar extends Component {

  state = {
    value : '',
  }

  clickListener = () => {
    alert('clicked')
  }

  render() {
    return (
      <Input {...this.props} 
      size = {this.props.size} 
      fluid 
      value={this.state.value} 
      onChange = {(e) => this.setState({...this.state, value : e.target.value})} 
      action = {{icon: 'search', size: this.props.size , color : 'teal', onClick : () => this.clickListener()}} 
      placeholder='Search...'/>
    )
  }
}


export default SearchBar