import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import ReportService from '../../../services/ReportService';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class GenerateReport extends Component {

constructor(props) {
  super(props);

  this.state = {startDate:new Date(), endDate:new Date()};

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
  this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
}

handleChangeStartDate(date) {
  date.setHours(3);
  this.setState({startDate: date});
}

handleChangeEndDate(date) {
  date.setHours(23);
  this.setState({endDate: date});
}

handleSubmit(event) {
  event.preventDefault();
  const {startDate, endDate} = this.state;

  ReportService.generateReport(startDate.getTime(), endDate.getTime());
  this.props.history.push("/management/reports");
  window.location.reload();
}

render() {

  return <div>

    <Container>
      <h2>Generate Report</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="code">Start Date: </Label>
          <DatePicker selected={this.state.startDate} onChange={date => this.handleChangeStartDate(date)} />
        </FormGroup>
        <FormGroup>
          <Label for="description">End Date: </Label>
          <DatePicker selected={this.state.endDate} onChange={date => this.handleChangeEndDate(date)} />
          </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Generate</Button>
          <Button color="secondary" tag={Link} to="/reports">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
  </div>;
}
}

export default withRouter(GenerateReport);
