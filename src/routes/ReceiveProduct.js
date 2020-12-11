import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import axios from "axios";

const API_URL = "/api/";

class ReceiveProduct extends Component {


constructor(props) {
  super(props);

  this.state = {
    id: "",
    suppliers: [],
    supplier: {
      id: "",
      name: ""
    },
    model: "",
    serial: "",
    models:[],
    error: ""
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeModel = this.handleChangeModel.bind(this);
  this.handleChangeSerial = this.handleChangeSerial.bind(this);
  this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
}

async componentDidMount() {
  const id = this.props.match.params.id;

  const suppliers = await (await fetch('/api/supplier/')).json();
  const models = await (await fetch('/api/models/')).json()

  if (id) {
    var item = await (await fetch(`/api/receive/${id}`)).json();
    console.log(item);
    this.setState({suppliers:suppliers.content, supplier: item.supplier, model: item.model.modelNumber, serial: item.serial, models:models.content});
  } else {
    this.setState({suppliers:suppliers.content, models:models.content});
  }

}

async handleChangeSerial(event) {
  const target = event.target;
  const value = target.value;

  this.setState({serial: value, suppliers: this.state.suppliers, models: this.state.models});
}

async handleChangeModel(event) {
  this.setState({model: event.target.value, suppliers: this.state.suppliers, models: this.state.models});
}

async handleChangeSupplier(event) {
  const value = event.value;
  const suppliers = this.state.suppliers.filter(supplier => supplier.id === value);
  var supplier = "";

  if (suppliers.length > 0) {
    supplier = suppliers[0];
  }

  this.setState({supplier: supplier, suppliers: this.state.suppliers, models: this.state.models});
}

handleSubmit(event) {
  event.preventDefault();
  const id = this.props.match.params.id;

  if (id) {
    axios.patch(API_URL + "routes/receive", null, {
      params: {
        id: this.state.id,
        modelNumber: this.state.model,
        supplierId: this.state.supplier.id,
        serial: this.state.serial
      }
    })
  } else {
    axios.post(API_URL + "routes/receive", null, {
      params: {
        modelNumber: this.state.model,
        supplierId: this.state.supplier.id,
        serial: this.state.serial
      }
    });
  }

}

render() {

  if (!(this.state || this.state.suppliers)) {
    return "Loading...";
  }

  //console.log(this.state.suppliers);
  const data = this.state.suppliers;

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.name
  }));

  const val = options.filter(o => o.value === this.state.supplier.id);

  return <div>

    <Container>
      <h2>Receive Product</h2>
      <h2>{this.state.error}</h2>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="supplier">Supplier</Label>
        <Select options={options} onChange={this.handleChangeSupplier} value={val}/>
      </FormGroup>
        <FormGroup>
          <Label for="modelNumber">Model Number</Label>
          <Input type="text" name="modelNumber" id="modelNumber" disabled = {(val.length == 0) ? "disabled" : ""} value={this.state.model} onChange={(event) => this.handleChangeModel(event)}/>
        </FormGroup>
        <FormGroup>
          <Label for="serialNumber">Serial Number</Label>
          <Input type="text" name="serialNumber" id="serialNumber" disabled = {(val.length == 0) ? "disabled" : ""} value={this.state.serial} onChange={this.handleChangeSerial}/>
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

export default withRouter(ReceiveProduct);
