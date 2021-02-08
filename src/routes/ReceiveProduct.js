import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';
import axios from "axios";

import AuthService from '../AuthService';

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
    brands: [],
    brand: {
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
  this.handleRedirect = this.handleRedirect.bind(this);
  this.handleChangeBrand = this.handleChangeBrand.bind(this);
}

async componentDidMount() {
  const id = this.props.match.params.id;

  const suppliers = await (await fetch('/api/supplier/')).json();
  const brands = await (await fetch('/api/brand/')).json();
  const models = await (await fetch('/api/models/')).json();

  if (id) {
    var item = await (await fetch(`/api/routes/receive/${id}`)).json();
    this.setState({suppliers:suppliers.content, brands:brands.content, supplier: item.supplier, model: item.model.modelNumber, serial: item.serial, brand: item.model.brand, models:models.content});
  } else {
    this.setState({suppliers:suppliers.content, models:models.content, brands:brands.content});
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

async handleChangeBrand(event) {
  const value = event.value;
  const brands = this.state.brands.filter(brand => brand.id === value);

  if (brands.length > 0) {
    this.setState({brand: brands[0]});
  }
}

handleSubmit(event) {
  event.preventDefault();
  const id = this.props.match.params.id;

  let user = AuthService.getCurrentUser();

  if (id) {
    axios.patch(API_URL + "routes/receive", null, {
      params: {
        id: this.state.id,
        brandId: this.state.brand.id,
        modelNumber: this.state.model,
        supplierId: this.state.supplier.id,
        serial: this.state.serial
      }
    })
    .then(() => {
      this.props.history.push("/receivables");
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
  } else {
    axios.post(API_URL + "routes/receive", null, {
      params: {
        modelNumber: this.state.model,
        brandId:this.state.brand.id,
        supplierId: this.state.supplier.id,
        serial: this.state.serial,
        userId:user.id
      }
    })
    .then(() => {
      this.props.history.push("/receivables");
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

}

handleRedirect() {

}

render() {

  if (!(this.state || this.state.suppliers)) {
    return "Loading...";
  }

  const supplierList = this.state.suppliers.map(d => ({
    "value" : d.id,
    "label" : d.name
  }));

  const brandList = this.state.brands.map(d => ({
    "value" : d.id,
    "label" : d.name
  }));

  const val = supplierList.filter(o => o.value === this.state.supplier.id);
  const brand = brandList.filter(o => o.value === this.state.brand.id);

  return <div>

    <Container>
      <h2>Receive Product</h2>
      <h2>{this.state.error}</h2>
      <Form onSubmit={this.handleSubmit}>
      <FormGroup>
        <Label for="supplier">Supplier</Label>
        <Select options={supplierList} onChange={this.handleChangeSupplier} value={val}/>
      </FormGroup>
      <FormGroup>
        <Label for="brand">Brand</Label>
        <Select options={brandList} onChange={this.handleChangeBrand} value={brand}/>
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
