import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

/*

  This is a component drawing a searchBar.
  It is designed as fluid type,
  so you should use {Grid} to locate this to where you want.
  We need to modify ClickHandler.

  Props Required : size , (other css style props)


*/

export const mapDispatchToProps = (dispatch) => ({
  onSearch: (keyword) => { dispatch(actionCreators.getSurveyList(keyword)); },
});


export class SearchBar extends Component {
  state = {
    value: '',
  }

  clickListener = () => {
    if (this.state.value != '') {
      this.props.onSearch(this.state.value);
      this.setState({ ...this.state, value: '' });
      this.props.history.push('/search');
    }
  }

  enterListener = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) this.clickListener();
  }

  render() {
    return (
      <Input
        className = 'SearchBar'
        style={{ width: this.props.width, minWidth: this.props.minWidth }}
        size={this.props.size}
        fluid
        value={this.state.value}
        onChange={(e) => this.setState({ ...this.state, value: e.target.value })}
        onKeyPress={(e) => { this.enterListener(e); }}
        action={{
          className : 'searchButton',icon: 'search', size: this.props.size, color: 'teal', onClick: () => this.clickListener(),
        }}
        placeholder="Search..."
      />
    );
  }
}


export default connect(null, mapDispatchToProps)(withRouter(SearchBar));
