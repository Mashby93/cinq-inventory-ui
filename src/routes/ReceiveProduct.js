import React, { Component, useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import Select from 'react-select';

class ReceiveProduct extends Component {

  emptyItem = {
    id: null,
    createdAt: '',
    updatedAt: '',
    model: {
      id: '',
      modelNumber: '',
      metaData: {
        checkList: {
        items: [{
          name: '',
          items:{}
        }]
      }}
    },
    serialNumber: '',
    plot: null,
    supplier: {
      id: ''
    },
    metadata: {
      routeStatus: '',
      technician: 'Test User',
      checkList: {
        items: [{
          name: '',
          items:{}
        }]
      }
    }
  };

constructor(props) {
  super(props);

  this.state = {
    item: this.emptyItem,
    suppliers: [],
    models:[]
  };

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeModel = this.handleChangeModel.bind(this);
  this.handleChangeSerial = this.handleChangeSerial.bind(this);
  this.handleChangeSupplier = this.handleChangeSupplier.bind(this);
}

async componentDidMount() {
  var item = this.state.item;
  const id = this.props.match.params.id;

  if (id) {
    item = await (await fetch(`/api/products/${id}`)).json();
  }

  const suppliers = await (await fetch('/api/supplier/')).json();
  const models = await (await fetch('/api/models/')).json()
  this.setState({item: item, suppliers:suppliers.content, models:models.content});
}

async handleChangeSerial(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
  let item = {...this.state.item};
  item.serialNumber = value;
  this.setState({item: item, suppliers: this.state.suppliers, models: this.state.models});
}

async handleChangeModel(event) {
  let item = {...this.state.item};
  console.log(event);
  item.model.modelNumber = event.target.value;
  console.log(item);
  this.setState({item: item, suppliers: this.state.suppliers, models: this.state.models});
}

async handleChangeSupplier(event) {
  const value = event.value;
  let item = {...this.state.item};
  const suppliers = this.state.suppliers.filter(supplier => supplier.id === value);
  if (suppliers.length > 0) {
    item.supplier = suppliers[0];
  }
  console.log(item);
  this.setState({item: item, suppliers: this.state.suppliers, models: this.state.models});
}

handleSubmit(event) {
  event.preventDefault();
  const {item} = this.state;
  item.metadata.routeStatus = 'RECEIVED';
  const models = this.state.models.filter(model => model.modelNumber === item.model.modelNumber);
  if (models.length > 0) {
    item.model = models[0];
    item.metadata.checkList = item.model.metaData.checkList;
  }
  console.log(item);
  fetch('/api/products', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item),
  });
}

render() {

  if (!(this.state || this.state.item || this.state.suppliers)) {
    return "Loading...";
  }
  const item = this.state.item;
  //console.log(this.state.suppliers);
  const data = this.state.suppliers;

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.name
  }));

  const val = options.filter(o => o.value === item.supplier.id);
  //const val = options.filter(o => o.value === item.supplier.id);

  return <div>
    <AppNavbar/>
    <Container>
      <h2>Receive Product</h2>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="modelNumber">Model Number</Label>
          <Input type="text" name="modelNumber" id="modelNumber" value={item.model.modelNumber} onChange={(event) => this.handleChangeModel(event)}/>
        </FormGroup>
        <FormGroup>
          <Label for="serialNumber">Serial Number</Label>
          <Input type="text" name="serialNumber" id="serialNumber" value={item.serialNumber} onChange={this.handleChangeSerial}/>
        </FormGroup>
        <FormGroup>
          <Label for="supplier">Supplier</Label>
          <Select options={options} onChange={this.handleChangeSupplier} value={val}/>
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
