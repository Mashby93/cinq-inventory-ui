import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import ErrorCodeService from '../../../services/ErrorCodeService';
import CategoryService from '../../../services/CategoryService';

class EditErrorCode extends Component {

constructor(props) {
  super(props);

  this.state = {
    item: ErrorCodeService.getEmptyItem(),
    types: [],
    error:""
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeCode = this.handleChangeCode.bind(this);
  this.handleChangeDescription = this.handleChangeDescription.bind(this);
  this.handleChangeType = this.handleChangeType.bind(this);
}

handleChangeCode(event) {
  let item = {...this.state.item};
  item.code = event.target.value;
  this.setState({item: item});
}

handleChangeDescription(event) {
  let item = {...this.state.item};
  item.description = event.target.value;
  this.setState({item: item});
}

componentDidMount() {
  const id = this.props.match.params.id;

  CategoryService.getAllBulk()
  .then(types => {
    this.setState({types: types});
  });

  if (id) {
    ErrorCodeService.getById(id)
    .then(item => {
      this.setState({item: item});
    });
  }
}

handleChangeType(event) {
  let item = this.state.item;
  let type = this.state.types.filter(t => t.id == event.value);

  if (type.length > 0) {
    item["type"] = type[0];
    this.setState({item: item});
  }
}

handleSubmit(event) {
  event.preventDefault();
  const {item} = this.state;

  ErrorCodeService.save(item)
  .then(() => {
    this.props.history.push("/management/errors");
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

  const types = this.state.types.map(t => ({
    "value" : t.id,
    "label" : t.name
  }));

  const type = types.filter(t => item.type === undefined || item.type === null ? false : t.value === item.type.id);

  return <div>

    <Container>
      <h2>Manage Failure Code</h2>
      {this.state.error}
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Select options={types} onChange={this.handleChangeType} value={type}/>
      </FormGroup>
        <FormGroup>
          <Label for="code">Error Code</Label>
          <Input type="text" name="code" id="code" value={item.code} onChange={this.handleChangeCode}/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" value={item.description} onChange={this.handleChangeDescription}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>
          <Button color="secondary" tag={Link} to="/management/errors">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
  </div>;
}
}

export default withRouter(EditErrorCode);
