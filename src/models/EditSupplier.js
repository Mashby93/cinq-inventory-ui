import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';

import SupplierService from '../services/SupplierService';

class EditSupplier extends Component {

  emptyItem = {
    id: null,
    location: null,
    name: ''
  };

constructor(props) {
  super(props);

  this.state = {
    item: this.emptyItem,
    error: ""
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeName = this.handleChangeName.bind(this);
}

async handleChangeName(event) {
  let item = {...this.state.item};
  item.name = event.target.value;
  this.setState({item: item});
}

async componentDidMount(event) {
  const id = this.props.match.params.id;
  if (id) {
    const group = await (await fetch(`/api/supplier/${id}`)).json();
    this.setState({item: group});
  }
}

handleSubmit(event) {
  event.preventDefault();
  const {item} = this.state;

  SupplierService.save(item)
  .then(() => {
    this.props.history.push("/management/suppliers");
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
      <h2>Supplier</h2>
      {this.state.error}
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="modelNumber">Supplier Name</Label>
          <Input type="text" name="supplierName" id="supplierName" value={item.name} onChange={(event) => this.handleChangeName(event)}/>
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
