import React, { Component } from 'react';
import {
  Grid, Button, Header, Segment, Image,
} from 'semantic-ui-react';
import { DateRangePicker } from 'react-dates';
import Slider from '@material-ui/core/Slider';
import userImage from '../../../assets/responser.png';

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
      <div
        className="topTag"
        stretched
        style={{
          textAlign: 'center', height: '700px', borderStyle: 'none', padding: '5px',
        }}
      >
        <Header color="teal" size="huge" textAlign="center">Filter</Header>
        <Segment virticalAlign="middle" style={{ height: 120 }}>
          <Header color="teal" textAlign="center">Respondents</Header>
          <Grid>
            <Grid.Row verticalAlign="middle">
              <Grid.Column width="3">
                <Image size="little" style={{ height: 50 }} color="teal" src={userImage} />
              </Grid.Column>
              <Grid.Column>
                <Slider
                  max={1000}
                  min={1}
                  style={{ width: 270, color: '#008080' }}
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
          <Header color="teal" textAlign="center">Date</Header>
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
        <Button id="applyButton" textAlign="center" color="teal" onClick={this.onClickHandler}>Apply</Button>
      </div>
    );
  }
}

export default SearchFilter;
