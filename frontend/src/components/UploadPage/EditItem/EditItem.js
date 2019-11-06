import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import {
  Grid, Header, Button, Segment, Input, TextArea, Form,
} from 'semantic-ui-react';
import ItemBlock from '../ItemBlock/ItemBlock';


class EditItem extends Component {
  state = {
    item: [],
    check: [],
    type: [],
    title: '',
    content: '',
    startDate: null,
    endDate: null,
    focusedInput: null,
  }

  check = (id, value) => {
    this.state.check[id] = value;
    this.setState({ ...this.state });
  }

  type = (id, value) => {
    this.state.type[id] = value;
    this.setState({ ...this.state });
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps && this.props.survey != null) {
      this.setState({ ...this.state, title: this.props.survey.title });
    }
  }

  render() {
    if (this.props.progress >= 1) {
      this.props.survey.item.map((item, item_index) => {
        this.state.item[item_index] = (
          <ItemBlock
            type={this.type}
            check={this.check}
            title={item.title}
            id={item_index}
            response={item.response}
          />
        );
        return item;
      });
      return (
        <Segment disabled = {this.props.progress==2} color="olive">
          <Header
            style={{ 'font-size': '2em', 'margin-left': '10px' }}
            size="huge"
            color="olive"
          >
2. Edit Your Survey
          </Header>
          <Segment style={{ height: 450 }}>
            <Grid>
              <Grid.Row>
                <Header floated="left" color="olive" style={{ 'font-size': '22px', marginLeft: '20px' }}>
                  Title:
                  {' '}
                  <Input
                    style={{ border: 'none' }}
                    size="small"
                    onChange={(e) => { this.setState({ ...this.state, title: e.target.value }); }}
                    value={this.state.title}
                  />
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Header floated="left" color="olive" style={{ 'font-size': '22px', marginLeft: '20px' }}>
                  Survey Date:
                  {' '}
                  <DateRangePicker
                    isOutsideRange={() => false}
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => {
                      this.setState({ startDate, endDate });
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={(focusedInput) => { this.setState({ focusedInput }); }}
                  />
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Header floated="left" color="olive" style={{ 'font-size': '22px', marginLeft: '20px' }}>
                  Brief Description:
                </Header>
                <Form style={{ height: '200px', width: '600px' }}>
                  <TextArea onChange={(e) => { this.setState({ ...this.state, content: e.target.value }); }} style={{ height: '200px', width: '600px' }} />
                </Form>
              </Grid.Row>
            </Grid>
          </Segment>
          {this.state.item}
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column align="right">
                <Button
                  color='olive'
                  align="right"
                  style={{ marginTop: '15px', marginRight: '20pt' }}
                  onClick={() => {
                    this.props.editOnClick(
                      this.state.check,
                      this.state.type,
                      this.state.title,
                      this.state.content,
                      this.state.startDate,
                      this.state.endDate,
                    );
                  }}
                  disabled={this.props.progress != 1}
                >
                Continue
                </Button>
                <Button
                  color='olive'
                  onClick={this.props.backOnClick}
                  disabled={this.props.progress != 1}
                >
                Back
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      );
    }

    this.state.item = [];
    this.state.check = [];
    return (null);
  }
}
export default EditItem;
