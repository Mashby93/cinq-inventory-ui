import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import JobCodeService from '../../../services/JobCodeService';

class EditJobCode extends Component {

constructor(props) {
  super(props);

  this.state = {
    code: null,
    description: null,
    error:""
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeCode = this.handleChangeCode.bind(this);
  this.handleChangeDescription = this.handleChangeDescription.bind(this);
}

handleChangeCode(event) {
  this.setState({code: event.target.value});
}

handleChangeDescription(event) {
  this.setState({description: event.target.value});
}

componentDidMount() {
  const id = this.props.match.params.id;

  if (id) {
    JobCodeService.getById(id)
    .then(item => {
      this.setState({code: item.code, description: item.description});
    });
  }
}

handleSubmit(event) {
  event.preventDefault();

  JobCodeService.save(this.props.match.params.id, this.state.code, this.state.description)
  .then(() => {
    this.props.history.push("/management/jobcodes");
    window.location.reload();
  }, error => {
    const resMessage =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    this.setState({
      error: resMessage
    });
  });
}

render() {

  if (!(this.state || this.state.item)) {
    return "Loading...";
  }

  const item = this.state.item;

  return <div>

    <Container>
      <h2>Manage Job Code</h2>
      {this.state.error}
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="code">Job Code</Label>
          <Input type="text" name="code" id="code" value={this.state.code} onChange={this.handleChangeCode}/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" value={this.state.description} onChange={this.handleChangeDescription}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>
          <Button color="secondary" tag={Link} to="/management/jobcodes">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
  </div>;
}
}

export default withRouter(EditJobCode);
