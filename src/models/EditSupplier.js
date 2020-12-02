import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';

class EditSupplier extends Component {

  emptyItem = {
    id: null,
    location: {},
    name: ''
  };

constructor(props) {
  super(props);

  this.state = {
    item: this.emptyItem
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeName = this.handleChangeName.bind(this);
}

async handleChangeName(event) {
  let item = {...this.state.item};
  item.name = event.target.value;
  this.setState({item: item});
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

  return <div>
    <AppNavbar/>
    <Container>
      <h2>Create Supplier</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="modelNumber">Supplier Name</Label>
          <Input type="text" name="supplierName" id="supplierName" value={item.name} onChange={(event) => this.handleChangeModel(event)}/>
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

export default withRouter(EditSupplier);
