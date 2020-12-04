import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import ErrorCodeService from '../../../services/ErrorCodeService';

class EditErrorCode extends Component {

constructor(props) {
  super(props);

  this.state = {
    item: ErrorCodeService.getEmptyItem(),
    types: []
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeName = this.handleChangeName.bind(this);
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

  if (id) {
    let item = ErrorCodeService.getById(id);
    this.setState({item: item});
  }
}

handleChangeType(event) {
  let item = this.state.item;
  let type = this.state.types.filter(t => t.id == event.value);

  if (type.length > 0) {
    item["category"] = type[0];
    this.setState({item: item});
  }
}

handleSubmit(event) {
  event.preventDefault();
  const {item} = this.state;

  fetch('/api/supplier', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
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

  const type = types.filter(t => t.value === item.type.id);

  return <div>
    <AppNavbar/>
    <Container>
      <h2>Create Supplier</h2>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Select options={types} onChange={this.handleChangeType} value={type}/>
      </FormGroup>
        <FormGroup>
          <Label for="code">Error Code</Label>
          <Input type="text" name="code" id="code" value={item.name} onChange={(event) => this.handleChangeModel(event)}/>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input type="text" name="description" id="description" value={item.name} onChange={(event) => this.handleChangeModel(event)}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>
          <Button color="secondary" tag={Link} to="/receivables">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
  </div>;
}
}

export default withRouter(EditErrorCode);
