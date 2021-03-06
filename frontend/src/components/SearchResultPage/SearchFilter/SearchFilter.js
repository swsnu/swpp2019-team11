import React, { Component } from 'react';
import {
  Grid, Segment, Image,
} from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import Slider from '@material-ui/core/Slider';
import userImage from '../../../assets/responser.png';
import './SearchFilter.css';

class SearchFilter extends Component {
  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    respondant: [1, 1000],

  }

  handleSlider = (event, newValue) => {
    this.setState({ ...this.state, respondant: newValue });
  }

  formatFunction = (num) => {
    if (num == '1000') {
      return '1000+';
    }
    return num;
  }

  falseReturn = () => false;

  onDatesChange = ({ startDate, endDate }) => { this.setState({ startDate, endDate }); }

  onFocusChange = (focusedInput) => { this.setState({ focusedInput }); }

  onClickHandler = () => {
    this.props.filterHandler(this.state.startDate, this.state.endDate, this.state.respondant);
  }

  render() {
    return (
      <div className="topTag" stretched>
        <h1 className="FilterHeader" size="huge" textAlign="center">Filter</h1>
        <Segment virticalAlign="middle" style={{ height: 120 }}>
          <h2 className="RespondantHeader" color="teal" textAlign="center">Respondents</h2>
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width="3">
                <Image size="little" style={{ height: 50 }} color="teal" src={userImage} />
              </Grid.Column>
              <Grid.Column>
                <Slider
                  className="Slider"
                  max={1000}
                  min={1}
                  style={{ width: 270, color: '#354649' }}
                  value={this.state.respondant}
                  onChange={this.handleSlider}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  valueLabelFormat={this.formatFunction}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment>
          <h2 className="DateHeader" textAlign="center">Date</h2>
          <DateRangePicker
            isOutsideRange={this.falseReturn}
            showDefaultInputIcon
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={this.onFocusChange}
          />
        </Segment>
        <button className="ApplyButton" onClick={this.onClickHandler}>Apply</button>
      </div>
    );
  }
}

export default SearchFilter;
